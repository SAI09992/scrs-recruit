"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, Search, AlertCircle, MessageCircle } from "lucide-react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#domains", label: "Domains" },
  { href: "#timeline", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

const DEFAULT_COORDINATORS = [
  {
    name: "N HARSHITHA SAI",
    role: "Student Representative",
    whatsapp: "https://chat.whatsapp.com/GjE2kPLPloK5vU38bSCrsW",
  },
  {
    name: "SAI DHANUSH",
    role: "Technical Lead",
    whatsapp: "https://chat.whatsapp.com/GjE2kPLPloK5vU38bSCrsW",
  },
  {
    name: "SAI JASWANTH",
    role: "Recruitment Coordinator",
    whatsapp: "https://chat.whatsapp.com/GjE2kPLPloK5vU38bSCrsW",
  },
];

const MAIN_WHATSAPP_LINK = "https://chat.whatsapp.com/GjE2kPLPloK5vU38bSCrsW";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const [inputQuery, setInputQuery] = useState("");
  const [statusResult, setStatusResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coordinators, setCoordinators] = useState(DEFAULT_COORDINATORS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    setLoading(true);
    setError("");
    setStatusResult(null);

    fetch(`/api/applications?id=${encodeURIComponent(inputQuery.trim())}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) {
          setError(`No application found for ID / Roll Number "${inputQuery.trim()}".`);
        } else {
          setStatusResult(data);
        }
      })
      .catch(() => {
        setError("Unable to connect to database. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-nav shadow-lg shadow-brand-blue/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/scrs-logo.png"
                alt="SCRS Logo"
                className="w-10 h-10 rounded-full object-contain shadow-md shadow-brand-blue/20 group-hover:scale-105 transition-transform"
              />
              <span className="font-space font-bold text-lg text-brand-navy tracking-tight hidden sm:block">
                SCRS
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand-blue rounded-xl hover:bg-brand-blue/5 transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA + WhatsApp + Check Status Button */}
            <div className="flex items-center gap-2.5">
              {/* WhatsApp Community Button */}
              <a
                href={MAIN_WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#05A870] hover:bg-[#049362] rounded-xl shadow-md shadow-[#05A870]/20 hover:scale-105 active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Join WhatsApp</span>
              </a>

              {/* Check Status Button */}
              <button
                onClick={() => setStatusModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-brand-navy hover:text-brand-blue rounded-xl bg-gray-100 hover:bg-brand-blue/5 border border-gray-200 transition-all active:scale-95"
              >
                <Search className="w-4 h-4 text-brand-blue" />
                Check Status
              </button>

              {/* Apply Now Button */}
              <Link
                href="/apply"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-blue to-brand-blue-light text-white text-sm font-semibold rounded-2xl shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Apply Now
                <ChevronRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass-panel mx-4 mb-4 rounded-2xl p-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-brand-blue hover:bg-brand-blue/5 rounded-xl transition-all"
              >
                {link.label}
              </a>
            ))}
            <a
              href={MAIN_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full text-left px-4 py-2.5 text-sm font-bold text-white bg-[#05A870] rounded-xl flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Join WhatsApp Community
            </a>
            <button
              onClick={() => {
                setMobileOpen(false);
                setStatusModalOpen(true);
              }}
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/5 rounded-xl transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Check Status
            </button>
            <Link
              href="/apply"
              onClick={() => setMobileOpen(false)}
              className="block mt-2 px-4 py-3 bg-gradient-to-r from-brand-blue to-brand-blue-light text-white text-sm font-semibold rounded-xl text-center"
            >
              Apply Now →
            </Link>
          </div>
        </div>
      </nav>

      {/* Application Status Lookup Modal */}
      {statusModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 text-left relative animate-scale-up">
            <button
              onClick={() => {
                setStatusModalOpen(false);
                setStatusResult(null);
                setError("");
              }}
              className="absolute top-6 right-6 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
                APPLICATION STATUS LOOKUP
              </span>
              <h3 className="font-space font-bold text-2xl text-brand-navy mt-1">
                Check Application Status
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Enter your Roll Number, Application ID, or Email below to match our database.
              </p>
            </div>

            <form onSubmit={handleCheckStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-2">
                  Registration / Roll Number / Application ID
                </label>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                  <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Enter Roll Number or Application ID"
                    className="w-full text-xs outline-none bg-transparent font-mono text-brand-navy"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-brand-blue text-white font-semibold text-xs rounded-xl hover:bg-brand-blue-light transition-all shadow-md"
              >
                {loading ? "Matching Database..." : "Lookup Application"}
              </button>
            </form>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Direct Status Display Inside Modal */}
            {statusResult && (
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold block uppercase">Application ID</span>
                    <span className="text-xs font-bold text-brand-blue font-mono">{statusResult.id}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      statusResult.status === "SELECTED"
                        ? "bg-green-100 text-green-800"
                        : statusResult.status === "SHORTLISTED"
                        ? "bg-blue-100 text-blue-800"
                        : statusResult.status === "REJECTED"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    STATUS: {statusResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase block">Candidate Name</span>
                    <span className="font-bold text-brand-navy">{statusResult.fullName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase block">Roll Number</span>
                    <span className="font-semibold text-brand-navy font-mono">{statusResult.rollNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase block">Primary Domain</span>
                    <span className="font-bold text-brand-blue">{statusResult.primaryDomain}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase block">Department</span>
                    <span className="font-semibold text-brand-navy">{statusResult.department}</span>
                  </div>
                </div>

                {/* Coordinators Contact Section */}
                <div className="pt-3 border-t border-blue-100 space-y-2">
                  <span className="text-[10px] font-bold text-brand-navy uppercase tracking-wider block">
                    Have queries? Reach out to Coordinators:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {coordinators.slice(0, 2).map((c) => (
                      <a
                        key={c.name}
                        href={c.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-[#05A870] hover:bg-[#049362] text-white text-[11px] font-bold rounded-xl inline-flex items-center gap-1.5 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        {c.name.split(" ")[0]}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      setProgress(totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
      <div
        className="h-full bg-gradient-to-r from-brand-blue via-brand-blue-light to-brand-cyan rounded-r-full transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
