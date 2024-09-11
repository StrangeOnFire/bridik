import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import User from "../../../../models/User";
import { getServerSession } from "next-auth/next";

export async function POST(req) {
  try {
    await dbConnect();
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userData = await req.json();
    const { email, ...updateData } = userData;

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update the session
    session.user = {
      ...session.user,
      ...updateData
    };

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
