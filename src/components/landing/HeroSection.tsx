"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating particles canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number }[] = [];
    const particleCount = Math.min(Math.floor(width / 25), 45);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col items-center justify-between pt-24 pb-12 sm:pt-36 sm:pb-16 overflow-hidden">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />

      {/* Mesh Glow Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-tr from-brand-blue/15 via-brand-cyan/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 sm:space-y-8 my-auto">
        {/* WE ARE HIRING BADGE */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-brand-blue/5 border border-brand-blue/15 text-brand-blue font-bold text-xs sm:text-sm tracking-wider uppercase shadow-sm">
          <Sparkles className="w-4 h-4 text-brand-blue flex-shrink-0 animate-pulse" />
          <span>WE ARE HIRING</span>
        </div>

        {/* Hero Main Headline */}
        <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
          <h1 className="font-space font-extrabold text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-brand-navy tracking-tight leading-[1.1]">
            Soft Computing <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-cyan bg-clip-text text-transparent">
              Research Society
            </span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed px-2">
            Join the SCRS KARE Student Chapter. Explore Web Engineering, Machine Learning, Hardware Projects, UI/UX Design, and Event Management.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto px-4">
          <Link
            href="/apply"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-semibold text-sm sm:text-base rounded-2xl shadow-xl shadow-brand-blue/25 hover:shadow-brand-blue/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#domains"
            className="w-full sm:w-auto px-8 py-3.5 bg-white border border-gray-200 hover:border-brand-blue text-brand-navy font-semibold text-sm sm:text-base rounded-2xl hover:bg-brand-blue/5 transition-all duration-300 inline-flex items-center justify-center"
          >
            Explore Domains
          </a>
        </div>
      </div>

      {/* Dynamic Scroll Down Indicator */}
      <button
        onClick={scrollToAbout}
        className="relative z-10 mt-8 group flex flex-col items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-brand-blue transition-colors cursor-pointer"
        aria-label="Scroll Down"
      >
        <span className="uppercase tracking-widest text-[10px]">Scroll Down</span>
        <div className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center group-hover:border-brand-blue group-hover:bg-blue-50 transition-all animate-bounce">
          <ChevronDown className="w-4 h-4 text-brand-blue" />
        </div>
      </button>
    </section>
  );
}
