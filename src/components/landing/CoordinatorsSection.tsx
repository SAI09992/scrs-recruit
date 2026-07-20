"use client";

import { useState, useEffect } from "react";
import { MessageCircle, User } from "lucide-react";

const DEFAULT_COORDINATORS = [
  {
    name: "SAI DHANUSH",
    role: "Technical Lead",
    whatsapp: "https://wa.me/919381276836",
  },
  {
    name: "RAHUL",
    role: "Recruitment Lead",
    whatsapp: "https://wa.me/919515392839",
  },
  {
    name: "N HARSHITHA SAI",
    role: "Student Representative",
    whatsapp: "https://chat.whatsapp.com/LHyUVSReaYKIaZXayxSguX",
  },
];

export default function CoordinatorsSection() {
  const [coordinators, setCoordinators] = useState(DEFAULT_COORDINATORS);

  useEffect(() => {
    const saved = localStorage.getItem("scrs_coordinators");
    if (saved) {
      try {
        setCoordinators(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider px-3 py-1 bg-brand-blue/5 rounded-full border border-brand-blue/10">
            GET IN TOUCH
          </span>
          <h2 className="font-space font-bold text-2xl sm:text-4xl text-brand-navy">
            Student Coordinators
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Have queries regarding recruitment or society operations? Reach out directly to our student leads.
          </p>
        </div>

        {/* Coordinators Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {coordinators.map((c) => (
            <div
              key={c.name}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-md hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300 space-y-6 text-center group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Avatar Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 text-brand-blue flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <User className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-space font-bold text-lg text-brand-navy group-hover:text-brand-blue transition-colors uppercase tracking-tight">
                    {c.name}
                  </h3>
                  <span className="inline-block mt-1 text-xs font-semibold text-brand-blue px-3 py-1 bg-brand-blue/5 rounded-full border border-brand-blue/10">
                    {c.role}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Button */}
              <div className="pt-4 border-t border-gray-100">
                <a
                  href={c.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-[#05A870] hover:bg-[#049362] text-white font-bold text-xs rounded-xl inline-flex items-center justify-center gap-2 shadow-md shadow-[#05A870]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
