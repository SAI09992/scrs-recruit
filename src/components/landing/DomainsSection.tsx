"use client";

import Link from "next/link";
import { Code2, Brain, Cpu, Palette, Sparkles, Share2, Camera, ArrowRight } from "lucide-react";
import { DOMAINS } from "@/lib/utils";

const ICON_MAP: Record<string, any> = {
  Code2: Code2,
  Brain: Brain,
  Cpu: Cpu,
  Palette: Palette,
  Sparkles: Sparkles,
  Share2: Share2,
  Camera: Camera,
};

export default function DomainsSection() {
  return (
    <section id="domains" className="py-16 sm:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
            CHOOSE YOUR SPECIALIZATION
          </span>
          <h2 className="font-space font-bold text-2xl sm:text-4xl text-brand-navy">
            Recruitment Domains
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Select your domain of interest and build groundbreaking projects with SCRS.
          </p>
        </div>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DOMAINS.map((domain) => {
            const IconComponent = ICON_MAP[domain.icon] || Code2;

            return (
              <div
                key={domain.id || domain.name}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-md hover:shadow-2xl hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Top Icon & Tagline Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 text-brand-blue flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-100">
                      {domain.tagline}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-space font-bold text-xl sm:text-2xl text-brand-navy group-hover:text-brand-blue transition-colors">
                      {domain.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                      {domain.description}
                    </p>
                  </div>

                  {/* Tech Skills Tags */}
                  {domain.skills && domain.skills.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                        Core Tech & Skills:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {domain.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card CTA Action Button */}
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href={`/apply?domain=${encodeURIComponent(domain.name)}`}
                    className="w-full py-3 px-4 bg-brand-blue/5 hover:bg-brand-blue text-brand-blue hover:text-white font-semibold text-xs rounded-xl inline-flex items-center justify-between transition-all duration-300 group-hover:shadow-md"
                  >
                    <span>Apply for {domain.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
