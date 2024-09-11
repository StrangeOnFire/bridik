import dbConnect from '../../../../lib/mongodb';
import User from '../../../../../models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  const { 
    username, 
    email, 
    password, 
    fullName, 
    jobTitle, 
    industry, 
    yearsOfExperience, 
    educationalBackground, 
    currentSkills, 
    careerGoals, 
    country 
  } = await req.json();

  if (!username || !email || !password || !fullName) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      username, 
      email, 
      password: hashedPassword, 
      fullName, 
      jobTitle, 
      industry, 
      yearsOfExperience, 
      educationalBackground, 
      currentSkills, 
      careerGoals, 
      country 
    });

    // Create a sanitized user object without the password
    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;

    return NextResponse.json(sanitizedUser, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'An error occurred during registration' }, { status: 500 });
  }
}