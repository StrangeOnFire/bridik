import mongoose from "mongoose";

const AnalysisResultSchema = new mongoose.Schema(
  {
    skillsForShortTerm: [String],
    skillsForLongTerm: [String],
    shortTermReadiness: Number,
    longTermReadiness: Number,
    stepsForShortTerm: String,
    stepsForLongTerm: String,
    industryRecommendations: String,
    careerProgressionPath: String,
    recommendedCoursesOrCertifications: [String],
    lastUpdated: Date,
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
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
      fieldOfStudy: { type: String },
    },

    // Skill Information
    currentSkills: [{ type: String }],
    careerGoals: {
      shortTerm: { type: String },
      longTerm: { type: String },
    },

    // Location
    country: { type: String },

    // Additional fields
    image: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    // New field for analysis result
    analysisResult: {
      type: AnalysisResultSchema,
      default: null,
    },
  },
  { timestamps: true }
);

// Add this line to ensure the model uses the schema
UserSchema.set("toObject", { getters: true, virtuals: true });
UserSchema.set("toJSON", { getters: true, virtuals: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
