import User from '../../../../../models/User';
import connectDB from '../../../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req) {
  if (req.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const url = new URL(req.url);
  const username = url.searchParams.get('username');

  if (!username) {
    return NextResponse.json({ message: 'Username is required' }, { status: 400 });
  }

  try {
    await connectDB();
    const existingUser = await User.findOne({ username });
    
    return NextResponse.json({ isTaken: !!existingUser }, { status: 200 });
  } catch (error) {
    console.error('Error checking username:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}