"use client";

import { Users, Award, BookOpen, Presentation, Code, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const activities = [
    {
      title: "Technical Workshops",
      description: "Hands-on sessions on Full-Stack Web Development, AI/ML, Cloud Computing & Microcontrollers.",
      icon: Code,
      badge: "Hands-On",
    },
    {
      title: "Hackathons",
      description: "24-hour code marathons to build real-world software & hardware solutions for industry problems.",
      icon: Award,
      badge: "Competitive",
    },
    {
      title: "Coding Competitions",
      description: "Algorithmic challenges and competitive programming contests to hone problem-solving skills.",
      icon: Sparkles,
      badge: "Skill-Building",
    },
    {
      title: "Webinars & Tech Talks",
      description: "Interactive sessions with industry leaders, researchers, and alumni sharing cutting-edge tech trends.",
      icon: Presentation,
      badge: "Industry Insight",
    },
    {
      title: "Project Expos",
      description: "Platform to showcase innovative student research papers, IoT devices, and full-stack web applications.",
      icon: BookOpen,
      badge: "Showcase",
    },
  ];

  const benefits = [
    {
      title: "Real-World Experience",
      description: "Work on live products, hackathon solutions, and collaborative club projects for your portfolio.",
    },
    {
      title: "Research & Paper Publishing",
      description: "Receive mentorship to publish research papers in Soft Computing, AI, and Machine Learning.",
    },
    {
      title: "Industry Mentorship",
      description: "Learn directly from senior developers, alumni, and faculty advisors across tech domains.",
    },
    {
      title: "Placement & Resume Boost",
      description: "Stand out in campus placements with verified club project experience and leadership credentials.",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section 1: Who We Are (Grid with Emblem Showcase to fill empty space) */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Text Information */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider px-3 py-1 bg-brand-blue/5 rounded-full border border-brand-blue/10">
                  WHO WE ARE
                </span>
                <h2 className="font-space font-bold text-2xl sm:text-4xl text-brand-navy mt-4 leading-tight">
                  Soft Computing Research Society (SCRS) Student Chapter
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
                  SCRS Kalasalingam is a premier student research and technical society dedicated to fostering excellence in Soft Computing, Artificial Intelligence, Web Engineering, and IoT. We bridge academic theory with industry practice through hands-on technical workshops, national hackathons, coding competitions, and research publishing.
                </p>
              </div>

              {/* Highlight Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-brand-navy">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <span>KARE Student Chapter</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-brand-navy">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <span>AI & Machine Learning Focus</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-brand-navy">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <span>National Level Hackathons</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-brand-navy">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <span>Research Paper Publications</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual SCRS Emblem Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-br from-brand-navy via-slate-900 to-brand-navy p-8 text-white text-center space-y-6 shadow-2xl overflow-hidden group">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-blue/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  {/* Emblem Logo */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-white/10 p-2 border border-white/20 backdrop-blur-md shadow-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="/scrs-logo.png"
                      alt="SCRS Official Emblem"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>

                  <div>
                    <h3 className="font-space font-bold text-xl tracking-tight text-white">
                      Soft Computing Research Society
                    </h3>
                    <p className="text-xs text-blue-200 mt-1">
                      Kalasalingam Academy of Research & Education
                    </p>
                  </div>

                  {/* Feature Pills */}
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    <span className="text-[10px] font-bold px-3 py-1 bg-white/10 rounded-full border border-white/10 text-white">
                      Established Student Chapter
                    </span>
                    <span className="text-[10px] font-bold px-3 py-1 bg-brand-blue/30 rounded-full border border-brand-blue/30 text-blue-100">
                      Research & Innovation
                    </span>
                    <span className="text-[10px] font-bold px-3 py-1 bg-white/10 rounded-full border border-white/10 text-white">
                      Industry Mentorship
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: What We Do */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
              OUR INITIATIVES
            </span>
            <h2 className="font-space font-bold text-2xl sm:text-4xl text-brand-navy">
              What We Do
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Empowering students through continuous learning, innovation, and practical exposure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {activities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-brand-blue/30 transition-all duration-300 space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-space font-bold text-lg text-brand-navy group-hover:text-brand-blue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Why Join Us */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-gray-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
              BENEFITS & GROWTH
            </span>
            <h2 className="font-space font-bold text-2xl sm:text-4xl text-brand-navy">
              Why Join Us?
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Accelerate your technical career and build lifelong connections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((b, idx) => (
              <div
                key={b.title}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2"
              >
                <div className="text-brand-blue font-bold font-space text-lg">0{idx + 1}.</div>
                <h4 className="font-space font-bold text-base text-brand-navy">{b.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
