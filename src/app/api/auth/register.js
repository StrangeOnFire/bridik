import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
  } = req.body;

  if (!username || !email || !password || !fullName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
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

    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
}