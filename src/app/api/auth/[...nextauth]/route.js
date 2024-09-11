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
        try {
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
        } catch (error) {
          // Instead of throwing a generic error, we'll throw the specific error message
          throw new Error(error.message);
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        await dbConnect();
        
        try {
          let existingUser = await User.findOne({ email: profile.email });
          
          if (!existingUser) {
            // Create a new user without password for Google authentication
            const newUser = new User({
              email: profile.email,
              fullName: profile.name,
              username: profile.email.split('@')[0], // Generate a username from email
              isGoogleUser: true,
              // Set default values for other required fields
              jobTitle: 'Not specified',
              industry: 'Not specified',
              yearsOfExperience: 0,
              educationalBackground: { degree: 'Not specified', fieldOfStudy: 'Not specified' },
              currentSkills: [],
              careerGoals: { shortTerm: 'Not specified', longTerm: 'Not specified' },
              country: 'Not specified',
              // Set a flag to indicate this is a Google-authenticated user
              isGoogleUser: true,
              password: 'googlesigninn'  // Explicitly set password to undefined for Google users
            });
            existingUser = await newUser.save();
            user.isNewUser = true;
          } else {
            user.isNewUser = false;
          }
          
          // Update the user object with database values
          user.id = existingUser._id.toString();
          user.fullName = existingUser.fullName;
          user.username = existingUser.username;
          user.jobTitle = existingUser.jobTitle;
          user.industry = existingUser.industry;
          user.yearsOfExperience = existingUser.yearsOfExperience;
          user.educationalBackground = existingUser.educationalBackground;
          user.currentSkills = existingUser.currentSkills;
          user.careerGoals = existingUser.careerGoals;
          user.country = existingUser.country;
          user.isGoogleUser = existingUser.isGoogleUser;
          
          return true;
        } catch (error) {
          console.error('Error during Google sign in:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.fullName = user.fullName;
        token.username = user.username;
        token.jobTitle = user.jobTitle;
        token.industry = user.industry;
        token.yearsOfExperience = user.yearsOfExperience;
        token.educationalBackground = user.educationalBackground;
        token.currentSkills = user.currentSkills;
        token.careerGoals = user.careerGoals;
        token.country = user.country;
        token.isNewUser = user.isNewUser;
        token.isGoogleUser = user.isGoogleUser;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.fullName = token.fullName;
      session.user.username = token.username;
      session.user.jobTitle = token.jobTitle;
      session.user.industry = token.industry;
      session.user.yearsOfExperience = token.yearsOfExperience;
      session.user.educationalBackground = token.educationalBackground;
      session.user.currentSkills = token.currentSkills;
      session.user.careerGoals = token.careerGoals;
      session.user.country = token.country;
      session.user.isNewUser = token.isNewUser;
      session.user.isGoogleUser = token.isGoogleUser;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard"; // or any other URL you want to redirect to
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
