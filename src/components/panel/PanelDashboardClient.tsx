"use client";

import { useState } from "react";
import { UserCheck, Star, Award, CheckCircle, Save, ExternalLink } from "lucide-react";

export default function PanelDashboardClient() {
  const [candidates] = useState([
    {
      id: "SCRS-2026-0042",
      fullName: "Sanjay Kumar",
      domain: "Web Wizards",
      rollNumber: "9922004001",
      time: "10:30 AM",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      id: "SCRS-2026-0043",
      fullName: "Ananya Ramesh",
      domain: "ML Minds",
      rollNumber: "9922004002",
      time: "11:00 AM",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  ]);

  const [activeCandidate, setActiveCandidate] = useState(candidates[0]);

  const [ratings, setRatings] = useState({
    technical: 8,
    communication: 9,
    problemSolving: 8,
    confidence: 9,
    leadership: 7,
    teamwork: 8,
  });

  const [recommendation, setRecommendation] = useState<"SELECT" | "WAITLIST" | "REJECT">("SELECT");
  const [comments, setComments] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const averageScore =
    Math.round(
      ((ratings.technical +
        ratings.communication +
        ratings.problemSolving +
        ratings.confidence +
        ratings.leadership +
        ratings.teamwork) /
        6) *
        10
    ) / 10;

  const handleSaveEvaluation = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-card p-6 rounded-3xl">
        <div>
          <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
            Evaluation Workspace
          </span>
          <h1 className="font-space font-bold text-2xl sm:text-3xl text-brand-navy mt-1">
            Interview Panel Portal
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Evaluator: Dr. A. Kumar (ML & Web Domain Lead)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule List */}
        <div className="glass-card p-6 rounded-3xl border border-gray-200 space-y-4">
          <h3 className="font-space font-bold text-lg text-brand-navy">Today&apos;s Candidates</h3>
          <div className="space-y-3">
            {candidates.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveCandidate(c)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activeCandidate.id === c.id
                    ? "bg-brand-blue/10 border-brand-blue shadow-md"
                    : "bg-white border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-blue">{c.id}</span>
                  <span className="text-xs text-gray-400 font-medium">{c.time}</span>
                </div>
                <h4 className="font-bold text-brand-navy mt-1">{c.fullName}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{c.domain}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Form Workspace */}
        <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-gray-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-2">
            <div>
              <span className="text-xs font-semibold text-brand-blue">{activeCandidate.id}</span>
              <h2 className="font-space font-bold text-2xl text-brand-navy">
                {activeCandidate.fullName}
              </h2>
              <p className="text-xs text-gray-500">
                Roll: {activeCandidate.rollNumber} | Domain: {activeCandidate.domain}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-400 block font-medium">Overall Rating</span>
              <span className="font-space font-bold text-3xl text-brand-blue">{averageScore} / 10</span>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-4 rounded-2xl bg-green-50 text-green-700 text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Evaluation score and recommendation saved successfully!
            </div>
          )}

          {/* 6 Pillars Rating Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { key: "technical", label: "Technical Competence" },
              { key: "communication", label: "Communication & Clarity" },
              { key: "problemSolving", label: "Problem Solving & Logic" },
              { key: "confidence", label: "Confidence & Attitude" },
              { key: "leadership", label: "Leadership & Initiative" },
              { key: "teamwork", label: "Teamwork & Creativity" },
            ].map((pillar) => (
              <div key={pillar.key} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-brand-navy">
                  <span>{pillar.label}</span>
                  <span className="text-brand-blue font-bold">
                    {(ratings as any)[pillar.key]} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={(ratings as any)[pillar.key]}
                  onChange={(e) =>
                    setRatings({ ...ratings, [pillar.key]: Number(e.target.value) })
                  }
                  className="w-full accent-brand-blue"
                />
              </div>
            ))}
          </div>

          {/* Recommendation Selection */}
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-xs font-semibold text-brand-navy mb-3">
              Panel Recommendation
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "SELECT", label: "Select Candidate", color: "bg-green-600" },
                { id: "WAITLIST", label: "Waitlist", color: "bg-amber-500" },
                { id: "REJECT", label: "Reject", color: "bg-red-600" },
              ].map((rec) => (
                <button
                  key={rec.id}
                  type="button"
                  onClick={() => setRecommendation(rec.id as any)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold transition-all text-center ${
                    recommendation === rec.id
                      ? `${rec.color} text-white shadow-lg`
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {rec.label}
                </button>
              ))}
            </div>
          </div>

          {/* Evaluation Comments */}
          <div>
            <label className="block text-xs font-semibold text-brand-navy mb-2">
              Detailed Comments & Technical Notes
            </label>
            <textarea
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Candidate demonstrated strong knowledge in React and Next.js..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-blue"
            />
          </div>

          {/* Submit Evaluation */}
          <button
            onClick={handleSaveEvaluation}
            className="w-full py-3.5 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-light transition-all text-xs inline-flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/25"
          >
            <Save className="w-4 h-4" />
            Submit Final Evaluation
          </button>
        </div>
      </div>
    </div>
  );
}
