import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../../models/User';

// The configuration for NextAuth
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          username: user.username,
          jobTitle: user.jobTitle,
          industry: user.industry,
          yearsOfExperience: user.yearsOfExperience,
          educationalBackground: user.educationalBackground,
          currentSkills: user.currentSkills,
          careerGoals: user.careerGoals,
          country: user.country,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.jobTitle = user.jobTitle;
        token.industry = user.industry;
        token.yearsOfExperience = user.yearsOfExperience;
        token.educationalBackground = user.educationalBackground;
        token.currentSkills = user.currentSkills;
        token.careerGoals = user.careerGoals;
        token.country = user.country;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.jobTitle = token.jobTitle;
      session.user.industry = token.industry;
      session.user.yearsOfExperience = token.yearsOfExperience;
      session.user.educationalBackground = token.educationalBackground;
      session.user.currentSkills = token.currentSkills;
      session.user.careerGoals = token.careerGoals;
      session.user.country = token.country;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // or any other URL you want to redirect to
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Set up the NextAuth handler for the API routes
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };
