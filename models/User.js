import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Basic Information
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },

  // Professional Information
  jobTitle: { type: String },
  industry: { type: String },
  yearsOfExperience: { type: Number },
  educationalBackground: {
    degree: { type: String },
    fieldOfStudy: { type: String }
  },

  // Skill Information
  currentSkills: [{ type: String }],
  careerGoals: {
    shortTerm: { type: String },
    longTerm: { type: String }
  },

  // Location
  country: { type: String },

  // Additional fields
  image: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);