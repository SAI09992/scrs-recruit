"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Trophy, BookOpen, Calendar, Award, Lightbulb } from "lucide-react";

const STATS = [
  { label: "Active Members", value: 120, suffix: "+", icon: Users, color: "#2563EB" },
  { label: "Hackathons Won", value: 35, suffix: "+", icon: Trophy, color: "#7C3AED" },
  { label: "Research Projects", value: 50, suffix: "+", icon: BookOpen, color: "#059669" },
  { label: "Events Conducted", value: 80, suffix: "+", icon: Calendar, color: "#EA580C" },
  { label: "Workshops", value: 40, suffix: "+", icon: Lightbulb, color: "#DB2777" },
  { label: "Certificates Given", value: 500, suffix: "+", icon: Award, color: "#0891B2" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return count;
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3">
            Our Impact
          </p>
          <h2 className="font-space font-bold text-3xl sm:text-4xl lg:text-5xl text-brand-navy">
            Numbers that speak
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            We&apos;ve been building, researching, and innovating — here&apos;s what we&apos;ve accomplished so far.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
  isVisible,
}: {
  stat: (typeof STATS)[number];
  index: number;
  isVisible: boolean;
}) {
  const count = useCountUp(stat.value, 2000, isVisible);
  const Icon = stat.icon;

  return (
    <div
      className="glass-card rounded-2xl p-6 text-center transition-all duration-500"
      style={{
        transitionDelay: `${index * 100}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
        style={{ backgroundColor: `${stat.color}10` }}
      >
        <Icon className="w-6 h-6" style={{ color: stat.color }} />
      </div>
      <div className="font-space font-bold text-3xl text-brand-navy tabular-nums">
        {count}
        {stat.suffix}
      </div>
      <div className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">
        {stat.label}
      </div>
    </div>
  );
}
