"use client";

import Navbar from "@/components/landing/Navbar";
import { UserCheck, Award, BookOpen, Calendar, CheckSquare, Sparkles, Download, ArrowRight } from "lucide-react";

export default function SelectedMemberPortal() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24">
      <Navbar />

      <div className="pt-28 sm:pt-36 px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Welcome Banner */}
        <div className="glass-card p-8 rounded-3xl border border-blue-100 bg-gradient-to-br from-brand-blue/5 via-blue-50/20 to-indigo-50/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-800 rounded-full">
              Member Verified
            </span>
            <h1 className="font-space font-bold text-3xl sm:text-4xl text-brand-navy mt-3">
              Welcome to SCRS, Sanjay!
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Domain: <strong className="text-brand-blue">Web Wizards</strong> | Batch: 2026–2027
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-brand-blue text-white text-xs font-bold rounded-xl hover:bg-brand-blue-light transition-all inline-flex items-center gap-2 shadow-lg shadow-brand-blue/25"
          >
            <Award className="w-4 h-4" />
            Download Member Certificate
          </button>
        </div>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Assigned Mentor */}
          <div className="glass-card p-6 rounded-3xl border border-gray-200 space-y-4">
            <h3 className="font-space font-bold text-lg text-brand-navy flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-brand-blue" />
              Assigned Mentor
            </h3>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-blue text-white font-bold font-space flex items-center justify-center text-lg">
                AK
              </div>
              <div>
                <h4 className="font-bold text-sm text-brand-navy">Dr. A. Kumar</h4>
                <p className="text-xs text-gray-500">Domain Lead & Research Mentor</p>
                <span className="text-[10px] text-brand-blue font-semibold">a.kumar@kalasalingam.ac.in</span>
              </div>
            </div>
          </div>

          {/* Starter Tasks */}
          <div className="glass-card p-6 rounded-3xl border border-gray-200 space-y-4">
            <h3 className="font-space font-bold text-lg text-brand-navy flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-brand-blue" />
              Onboarding Checklist
            </h3>
            <ul className="space-y-3 text-xs text-brand-navy">
              <li className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded text-brand-blue" />
                <span>Join Official WhatsApp Group</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded text-brand-blue" />
                <span>Attend Orientation (August 28)</span>
              </li>
              <li className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-brand-blue" />
                <span>Complete Domain Skill Assessment</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="glass-card p-6 rounded-3xl border border-gray-200 space-y-4">
            <h3 className="font-space font-bold text-lg text-brand-navy flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-blue" />
              Member Resources
            </h3>
            <div className="space-y-2 text-xs">
              <a href="#" className="block p-3 rounded-xl bg-gray-50 hover:bg-brand-blue/5 text-brand-navy font-semibold transition-all">
                📚 SCRS Tech Stack & Guidelines →
              </a>
              <a href="#" className="block p-3 rounded-xl bg-gray-50 hover:bg-brand-blue/5 text-brand-navy font-semibold transition-all">
                💻 GitHub Organization Access →
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
