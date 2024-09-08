"use client";

import { useState, useEffect,  } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAnalysisResult } from '../../../store/userSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const [analysisResult, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setAnalysisResults(user?.analysisResult || null);
  }, [user]);

  const handleAnalyzeSkills = async () => {
    if (!user) return;

    setLoading(true);
    console.log("Sending request to analyze-skills",{
        currentSkills: user.currentSkills,
        careerGoals: user.careerGoals,
        jobTitle: user.jobTitle,
        industry: user.industry,
        yearsOfExperience: user.yearsOfExperience,
        educationalBackground: user.educationalBackground,
      });
    try {
      const response = await axios.post("/api/analyze-skills", {
        currentSkills: user.currentSkills,
        careerGoals: user.careerGoals,
        jobTitle: user.jobTitle,
        industry: user.industry,
        yearsOfExperience: user.yearsOfExperience,
        educationalBackground: user.educationalBackground,
      });
      dispatch(setAnalysisResult(response.data));
      setAnalysisResults(response.data);
    } catch (error) {
      console.error("Error fetching AI suggestions", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

      <button
        onClick={handleAnalyzeSkills}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        disabled={loading || !user}
      >
        {loading ? "Analyzing..." : "Analyze Skills"}
      </button>

      {analysisResult && (
        <div className="mt-6">
          <p>
            Skills required for short-term goal:{" "}
            {analysisResult.skillsForShortTerm.join(", ")}
          </p>
          <p>
            Skills required for long-term goal:{" "}
            {analysisResult.skillsForLongTerm.join(", ")}
          </p>
          <h2 className="text-xl font-bold">Skill Readiness</h2>
        <p>short term readiness: {analysisResult.shortTermReadiness}</p>
        <p>long term readiness: {analysisResult.longTermReadiness}</p>

          <h3 className="mt-4 font-semibold">
            Actionable Steps for Short-Term:
          </h3>
          <p>{analysisResult.stepsForShortTerm}</p>

          <h3 className="mt-4 font-semibold">
            Actionable Steps for Long-Term:
          </h3>
          <p>{analysisResult.stepsForLongTerm}</p>

          <h3 className="mt-4 font-semibold">Industry Recommendations:</h3>
          <p>{analysisResult.industryRecommendations}</p>

          <h3 className="mt-4 font-semibold">Career Progression Path:</h3>
          <p>{analysisResult.careerProgressionPath}</p>

          <h3 className="mt-4 font-semibold">Recommended Courses or Certifications:</h3>
          <ul>
            {analysisResult.recommendedCoursesOrCertifications.map((course, index) => (
              <li key={index}>{course.courseName} by {course.provider}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
