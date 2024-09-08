import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getServerSession } from "next-auth/next";
import { MongoClient } from "mongodb";
import dbConnect from "@/lib/mongodb";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    await dbConnect();
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      currentSkills,
      careerGoals,
      jobTitle,
      industry,
      yearsOfExperience,
      educationalBackground,
    } = await req.json();

    const prompt = `
      Analyze the following user's data:
      Current Skills: ${currentSkills.join(", ")}.
      Career Goals: Short-term: ${careerGoals.shortTerm}. Long-term: ${
      careerGoals.longTerm
    }.
      Job Title: ${jobTitle}
      Industry: ${industry}
      Years of Experience: ${yearsOfExperience}
      Educational Background: Degree - ${
        educationalBackground.degree
      }, Field of Study - ${educationalBackground.fieldOfStudy}
      
      Provide the following information in JSON format:
      1. List of skills required for short-term goal.
      2. List of skills required for long-term goal.
      3. Percentage readiness for short-term and long-term goals.
      4. Actionable steps for each goal.
      5. Industry-specific recommendations based on current job and industry.
      6. Career progression path based on current job title and experience.
      7. Recommended courses or certifications based on educational background and career goals.
      
      Respond with a JSON format as:
      {
        "skillsForShortTerm": [...],
        "skillsForLongTerm": [...],
        "shortTermReadiness": 0-100,
        "longTermReadiness": 0-100,
        "stepsForShortTerm": "...",
        "stepsForLongTerm": "...",
        "industryRecommendations": "...",
        "careerProgressionPath": "...",
        "recommendedCoursesOrCertifications": [...]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    const rawResponse = response.choices[0].message.content.trim();
    const jsonResponse = JSON.parse(
      rawResponse.replace(/^```json|```$/g, "").trim()
    );

    const serializableResponse = {
      skillsForShortTerm: jsonResponse.skillsForShortTerm || [],
      skillsForLongTerm: jsonResponse.skillsForLongTerm || [],
      shortTermReadiness: jsonResponse.shortTermReadiness || 0,
      longTermReadiness: jsonResponse.longTermReadiness || 0,
      stepsForShortTerm: jsonResponse.stepsForShortTerm || "",
      stepsForLongTerm: jsonResponse.stepsForLongTerm || "",
      industryRecommendations: jsonResponse.industryRecommendations || "",
      careerProgressionPath: jsonResponse.careerProgressionPath || "",
      recommendedCoursesOrCertifications:
        jsonResponse.recommendedCoursesOrCertifications || [],
      lastUpdated: new Date().toISOString(),
    };

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();

    const result = await db
      .collection("users")
      .updateOne(
        { email: session.user.email },
        { $set: { analysisResult: serializableResponse } }
      );

    if (result.matchedCount === 0) {
      await client.close();
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await client.close();

    return NextResponse.json(serializableResponse);
  } catch (error) {
    return NextResponse.json(
      { error: "Error analyzing skills", details: error.message },
      { status: 500 }
    );
  }
}
