"use client";

import { useState, useEffect,  } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAnalysisResult } from '../../../store/userSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const [analysisResult, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setAnalysisResults(user?.analysisResult || null);
    console.log(user)
  }, [user]);

  const handleAnalyzeSkills = async () => {
    if (!user) return;

    setLoading(true);
   
    try {
      const response = await axios.post("/api/analyze-skills", {
        currentSkills: user.currentSkills,
        careerGoals: user.careerGoals,
        jobTitle: user.jobTitle,
        industry: user.industry,
        yearsOfExperience: user.yearsOfExperience,
        educationalBackground: user.educationalBackground,
      });
      dispatch(setAnalysisResult(response.data));
      setAnalysisResults(response.data);
    } catch (error) {
      console.error("Error fetching AI suggestions", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pl-4 pt-2">

      <button
        onClick={handleAnalyzeSkills}
        className="text-blue-600 font-[500] hover:text-blue-700 text-sm"
        disabled={loading || !user}
      >
        {loading ? "Analyzing..." : "Want to analyze again? Click here!"}
      </button>

      
    </div>
  );
}
