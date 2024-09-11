import User from '../../../../../models/User';
import connectDB from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    await connectDB();
    const existingUser = await User.findOne({ email });
    
    return NextResponse.json({ isTaken: !!existingUser }, { status: 200 });
  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}