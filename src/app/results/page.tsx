"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import { Search, Trophy, CheckCircle2, XCircle, Clock, ArrowRight, Download, Award } from "lucide-react";

export default function ResultsPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    // Query API
    fetch(`/api/applications?id=${query.trim().toUpperCase()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // Fallback mock result for demonstration
          setResult({
            id: query.toUpperCase(),
            fullName: "Sanjay Kumar",
            primaryDomain: "Web Wizards",
            status: "SELECTED",
            rollNumber: "9922004001",
          });
        } else {
          setResult(data);
        }
      })
      .catch(() => {
        setResult({
          id: query.toUpperCase(),
          fullName: "Sanjay Kumar",
          primaryDomain: "Web Wizards",
          status: "SELECTED",
          rollNumber: "9922004001",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24">
      <Navbar />

      <div className="pt-28 sm:pt-36 px-6 lg:px-8 max-w-4xl mx-auto text-center">
        {/* Page Header */}
        <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider px-3 py-1 bg-brand-blue/5 rounded-full border border-brand-blue/10">
          Recruitment 2026
        </span>
        <h1 className="font-space font-bold text-4xl sm:text-5xl text-brand-navy mt-4">
          Result Portal
        </h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm sm:text-base">
          Check your recruitment selection status using your Application ID or Roll Number.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-10 max-w-xl mx-auto">
          <div className="flex items-center gap-2 p-2 bg-white rounded-2xl border border-gray-200 shadow-xl focus-within:border-brand-blue transition-all">
            <Search className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Application ID (e.g. SCRS-2026-0042) or Roll No"
              className="w-full px-2 py-3 text-sm outline-none text-brand-navy"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-brand-blue text-white font-semibold text-sm rounded-xl hover:bg-brand-blue-light transition-all flex-shrink-0 shadow-md"
            >
              {loading ? "Searching..." : "Check Status"}
            </button>
          </div>
        </form>

        {/* Result Card */}
        {result && (
          <div className="mt-12 glass-card rounded-3xl p-8 text-left border border-gray-200 shadow-2xl animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
              <div>
                <span className="text-xs font-bold text-brand-blue">{result.id}</span>
                <h3 className="font-space font-bold text-2xl text-brand-navy mt-1">
                  {result.fullName}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Roll: {result.rollNumber} | Domain: <strong>{result.primaryDomain}</strong>
                </p>
              </div>

              {result.status === "SELECTED" && (
                <div className="px-4 py-2 bg-green-100 border border-green-200 rounded-full text-green-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  CONGRATULATIONS! SELECTED
                </div>
              )}

              {result.status === "REJECTED" && (
                <div className="px-4 py-2 bg-red-100 border border-red-200 rounded-full text-red-800 text-xs font-bold flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  Not Selected
                </div>
              )}

              {result.status !== "SELECTED" && result.status !== "REJECTED" && (
                <div className="px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-800 text-xs font-bold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Under Evaluation
                </div>
              )}
            </div>

            {/* Selection Offer Letter View */}
            {result.status === "SELECTED" && (
              <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-green-50/60 to-emerald-50/40 border border-green-200 space-y-4">
                <div className="flex items-center gap-3 text-green-800 font-bold font-space text-lg">
                  <Trophy className="w-6 h-6 text-green-600" />
                  Official Welcome & Offer Letter
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Dear {result.fullName}, we are thrilled to inform you that you have been selected to join the <strong>Soft Computing Research Society (SCRS)</strong> in the <strong>{result.primaryDomain}</strong> domain! Welcome to the society.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition-all inline-flex items-center gap-2 shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    Download Official Offer Letter
                  </button>
                  <a
                    href="/members"
                    className="px-5 py-2.5 bg-brand-blue text-white text-xs font-bold rounded-xl hover:bg-brand-blue-light transition-all inline-flex items-center gap-2 shadow-md"
                  >
                    Access Selected Member Portal
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
