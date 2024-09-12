import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Newsletter from "../../../../models/Newsletter";

export async function POST(req) {
  await dbConnect();

  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const existingUser = await Newsletter.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 200 }
    );
  }

  const newUser = await Newsletter.create({ email });

  return NextResponse.json(newUser, { status: 201 });
}
