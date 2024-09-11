import mongoose from "mongoose";

const AnalysisResultSchema = new mongoose.Schema(
  {
    skillsForShortTerm: [String],
    skillsForLongTerm: [String],
    shortTermReadiness: Number,
    longTermReadiness: Number,
    stepsForShortTerm: [],
    stepsForLongTerm: [],
    industryRecommendations: String,
    careerProgressionPath: [],
    recommendedCoursesOrCertifications: [],
    lastUpdated: { type: Date, default: Date.now },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    // Basic Information
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: String,
    fullName: { type: String, required: true },

    // Professional Information
    jobTitle: { type: String, default: "Not specified" },
    industry: { type: String, default: "Not specified" },
    yearsOfExperience: { type: Number, default: 0 },
    educationalBackground: {
      degree: { type: String, default: "Not specified" },
      fieldOfStudy: { type: String, default: "Not specified" },
    },

    // Skill Information
    currentSkills: [String],
    careerGoals: {
      shortTerm: { type: String, default: "Not specified" },
      longTerm: { type: String, default: "Not specified" },
    },

    // Location
    country: { type: String, default: "Not specified" },

    // Additional fields
    image: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    // New field for analysis result
    analysisResult: {
      type: AnalysisResultSchema,
      default: null,
    },
    isGoogleUser: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Add this line to ensure the model uses the schema
UserSchema.set("toObject", { getters: true, virtuals: true });
UserSchema.set("toJSON", { getters: true, virtuals: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
