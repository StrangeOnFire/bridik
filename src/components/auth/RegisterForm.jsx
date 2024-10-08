"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
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
export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    jobTitle: "",
    industry: "",
    yearsOfExperience: "",
    educationalBackground: { degree: "", fieldOfStudy: "" },
    currentSkills: [],
    careerGoals: { shortTerm: "", longTerm: "" },
    country: "",
  });
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // Handle nested objects
      if (name.includes('.')) {
        const [objectKey, nestedKey] = name.split('.');
        return {
          ...prev,
          [objectKey]: {
            ...prev[objectKey],
            [nestedKey]: value
          }
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

    // Check if email is already taken
    try {
      const emailCheckRes = await fetch(`/api/auth/check-email?email=${encodeURIComponent(formData.email)}`);
      const emailCheckData = await emailCheckRes.json();

      if (emailCheckData.isTaken) {
        setError("This email is already registered. Please login instead.");
        return;
      }
    } catch (err) {
      console.error("Error checking email:", err);
      setError("An unexpected error occurred. Please try again.");
      return;
    }

    // If email is not taken, proceed with registration
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const userData = await res.json();
        // Dispatch the setUser action to update the global state
        dispatch(setUser(userData));
        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "An error occurred during registration");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  {
    if (error) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center overflow-y-scroll "
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-red-600 to-rose-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className=" text-black w-16 h-16 mb-2 rounded-full text-3xl  grid place-items-center mx-auto">
                <AlertCircle size={40} />
              </div>

              <p className="text-center mb-6">{error}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Clear all fields
                </button>
                <button
                  onClick={() => setError("")}
                  className="bg-white hover:opacity-90 transition-opacity text-rose-600 font-semibold w-full py-2 rounded"
                >
                  Understood!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      );
    }
  }
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="mb-4 mt-2 sm:mt-0 sm:mb-0">
        <CardTitle className="text-2xl font-bold">
          Get started for free
        </CardTitle>
        <CardDescription>
          Join our platform to kickstart your career journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
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
            {isLoading ? "Loading..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </CardFooter>
    </Card>
  );
}
