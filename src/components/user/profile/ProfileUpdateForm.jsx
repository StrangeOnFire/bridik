"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setAnalysisResult, setUser } from "../../../store/userSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Briefcase,
  GraduationCap,
  MapPin,
  User,
} from "lucide-react";
import { useCallback } from "react";
import { debounce } from "lodash";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";

export default function ProfileUpdateForm({ user }) {
  const { data: session, status, update } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    jobTitle: "",
    industry: "",
    yearsOfExperience: "",
    educationalBackground: {
      degree: "",
      fieldOfStudy: "",
    },
    currentSkills: [],
    careerGoals: {
      shortTerm: "",
      longTerm: "",
    },
    country: "",
  });
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setFormData({
        username: session.user.username || "",
        email: session.user.email || "",

        fullName: session.user.name || "",
        jobTitle: user.jobTitle || "",
        industry: user.industry || "",
        yearsOfExperience: user.yearsOfExperience || "",
        educationalBackground: {
          degree: user.educationalBackground?.degree || "",
          fieldOfStudy: user.educationalBackground?.fieldOfStudy || "",
        },
        currentSkills: user.currentSkills || [],
        careerGoals: {
          shortTerm: user.careerGoals?.shortTerm || "",
          longTerm: user.careerGoals?.longTerm || "",
        },
        country: user.country || "",
      });
      setIsLoading(false);
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, user]);

  const handleAnalyzeSkills = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/analyze-skills", {
        currentSkills: formData.currentSkills,
        careerGoals: formData.careerGoals,
        jobTitle: formData.jobTitle,
        industry: formData.industry,
        yearsOfExperience: formData.yearsOfExperience,
        educationalBackground: formData.educationalBackground,
      });
      dispatch(setAnalysisResult(response.data));
    } catch (error) {
      console.error("Error fetching AI suggestions", error);
    } finally {
      setIsLoading(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // Handle nested objects
      if (name.includes(".")) {
        const [objectKey, nestedKey] = name.split(".");
        return {
          ...prev,
          [objectKey]: {
            ...prev[objectKey],
            [nestedKey]: value,
          },
        };
      }
      // Handle non-nested fields
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length === 0) return setUsernameError("");
      if (username.length < 3)
        return setUsernameError("username must be at least 3 characters");

      try {
        const res = await fetch(
          `/api/auth/check-username?username=${username}`
        );
        const data = await res.json();

        if (data.isTaken) {
          setUsernameError("This username is already taken.");
        } else {
          setUsernameError("");
        }
      } catch (error) {
        console.error("Error checking username:", error);
      }
    }, 500),
    []
  );

  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    checkUsername(value);
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setFormData((prev) => ({ ...prev, currentSkills: skills }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (usernameError) {
      setError("Please choose a different username.");
      return;
    }
    try {
      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Update the user in the Redux store
        dispatch(setUser(data));
        // Update the session
        await update({
          ...session,
          user: {
            ...session.user,
            ...formData,
          },
        });
        await handleAnalyzeSkills();
        router.push("/dashboard");
      } else {
        setError(
          data.message || "An error occurred while updating the profile"
        );
      }
    } catch (err) {
      console.error("Profile update error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/parts-1ffae.appspot.com/o/icons%2Floading.png?alt=media&token=6773e6d3-199b-4ae1-babf-d2ce6c552816"
          alt="logo"
          className="animate-spin "
          width={100}
          height={100}
        />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="mb-4 mt-2 sm:mt-0 sm:mb-0">
        <CardTitle className="text-2xl font-bold">Update Profile</CardTitle>
        <CardDescription>
          Update your profile to get the best out of our platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleUsernameChange}
                  required
                />
                {usernameError && (
                  <p className="text-sm text-red-600">{usernameError}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Current Job Title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Software Developer"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. Technology"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  type="number"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  min="0"
                  max="50"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  name="country"
                  value={formData.country}
                  onValueChange={(value) =>
                    handleChange({ target: { name: "country", value } })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">
                      United Kingdom
                    </SelectItem>
                    {/* Add more countries as needed */}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Educational Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Highest Degree</Label>
                <Input
                  id="degree"
                  name="educationalBackground.degree"
                  value={formData.educationalBackground.degree}
                  onChange={handleChange}
                  placeholder="e.g. Bachelor's"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fieldOfStudy">Field of Study</Label>
                <Input
                  id="fieldOfStudy"
                  name="educationalBackground.fieldOfStudy"
                  value={formData.educationalBackground.fieldOfStudy}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science"
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skills and Goals</h3>
            <div className="space-y-2">
              <Label htmlFor="currentSkills">
                Current Skills (comma-separated)
              </Label>
              <Input
                id="currentSkills"
                name="currentSkills"
                value={formData.currentSkills.join(", ")}
                onChange={handleSkillsChange}
                placeholder="e.g. JavaScript, React, Node.js"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shortTermGoal">Short-term Career Goal</Label>
                <Input
                  id="shortTermGoal"
                  name="careerGoals.shortTerm"
                  value={formData.careerGoals.shortTerm}
                  onChange={handleChange}
                  placeholder="e.g. Become a Senior Developer"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longTermGoal">Long-term Career Goal</Label>
                <Input
                  id="longTermGoal"
                  name="careerGoals.longTerm"
                  value={formData.careerGoals.longTerm}
                  onChange={handleChange}
                  placeholder="e.g. Start my own tech company"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-700 to-lime-600 font-semibold"
          >
            {isLoading ? "Loading..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          By updating your profile, your data will be automatically reanalyzed
          to provide you with the best possible suggestions.
        </p>
      </CardFooter>
    </Card>
  );
}
