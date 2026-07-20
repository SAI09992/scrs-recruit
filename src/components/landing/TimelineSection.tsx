"use client";

import { CheckCircle2, ArrowDown } from "lucide-react";

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Fill Application Form",
    description: "Complete the online 3-step registration form with your personal details, domain preference, tech skills, and projects.",
    badge: "Step 01",
  },
  {
    step: 2,
    title: "Application Screening by Club Heads",
    description: "Our core team and domain leads review your submitted application, skills, and project background.",
    badge: "Step 02",
  },
  {
    step: 3,
    title: "Interview Round",
    description: "Shortlisted candidates attend a quick 1-on-1 domain interaction with our interview panel.",
    badge: "Step 03",
  },
  {
    step: 4,
    title: "Selection & Result Publication",
    description: "Final selected candidates receive official recruitment confirmation via email and status lookup.",
    badge: "Step 04",
  },
  {
    step: 5,
    title: "Welcome to SCRS",
    description: "Orientation, official welcome letter, onboarding into domain teams, and initial project allocation.",
    badge: "Step 05",
  },
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
            SELECTION ROADMAP
          </span>
          <h2 className="font-space font-bold text-2xl sm:text-4xl text-brand-navy">
            Application Process
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            5 simple steps from registration to becoming an official SCRS member.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-10 space-y-8 sm:space-y-10 border-l-2 border-brand-blue/20">
          {PROCESS_STEPS.map((item, idx) => (
            <div key={item.step} className="relative group">
              {/* Vertical Circle Dot Marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-light text-white font-bold font-space text-sm flex items-center justify-center shadow-lg shadow-brand-blue/25 group-hover:scale-110 transition-transform">
                {item.step}
              </div>

              {/* Vertical Step Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-md hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-100 uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-brand-blue/40 group-hover:text-brand-blue transition-colors" />
                </div>

                <h3 className="font-space font-bold text-xl text-brand-navy group-hover:text-brand-blue transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
