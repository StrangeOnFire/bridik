'use client';

import { useState } from 'react';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement);

export default function ProfilePage() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyzeSkills = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/analyze-skills', {
        currentSkills: ['JavaScript', 'React'],
        careerGoals: {
          shortTerm: 'Become a Senior Developer',
          longTerm: 'Lead a tech team',
        }
      });
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error fetching AI suggestions', error);
    } finally {
      setLoading(false);
    }
  };

  const radarData = analysisResult ? {
    labels: ['Short-Term Readiness', 'Long-Term Readiness'],
    datasets: [
      {
        label: 'Skill Readiness (%)',
        data: [analysisResult.shortTermReadiness, analysisResult.longTermReadiness],
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
      }
    ]
  } : null;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      
      <button
        onClick={handleAnalyzeSkills}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Skills'}
      </button>

      {analysisResult && (
        <div className="mt-6">
          <p>Skills required for short-term goal: {analysisResult.skillsForShortTerm.join(', ')}</p>
          <p>Skills required for long-term goal: {analysisResult.skillsForLongTerm.join(', ')}</p>
          <h2 className="text-xl font-bold">Skill Readiness</h2>
          <Radar data={radarData} />

          <h3 className="mt-4 font-semibold">Actionable Steps for Short-Term:</h3>
          <p>{analysisResult.stepsForShortTerm}</p>

          <h3 className="mt-4 font-semibold">Actionable Steps for Long-Term:</h3>
          <p>{analysisResult.stepsForLongTerm}</p>
        </div>
      )}
    </div>
  );
}
