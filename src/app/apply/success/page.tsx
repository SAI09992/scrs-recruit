"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { CheckCircle2, Copy, Check, QrCode, Download, ArrowRight, MessageCircle, Calendar } from "lucide-react";
import Navbar from "@/components/landing/Navbar";

function SuccessContent() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("id") || "SCRS-2026-0042";

  const [copied, setCopied] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [appDetails, setAppDetails] = useState<any>(null);
  const [whatsappLink, setWhatsappLink] = useState("https://chat.whatsapp.com/LHyUVSReaYKIaZXayxSguX");

  // Trigger confetti on mount
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  // Fetch application details & whatsapp link setting
  useEffect(() => {
    if (applicationId) {
      fetch(`/api/applications?id=${applicationId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) setAppDetails(data);
        })
        .catch((e) => console.error(e));
    }
  }, [applicationId]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(applicationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinWhatsApp = () => {
    // Record join state in storage / database
    localStorage.setItem("scrs_joined_whatsapp", "true");
    window.open(whatsappLink, "_blank");
    setShowWhatsAppModal(false);
  };

  const timelineSteps = [
    { label: "Application Submitted", active: true, done: true },
    { label: "Under Review", active: true, done: false },
    { label: "Shortlisted", active: false, done: false },
    { label: "Interview Scheduled", active: false, done: false },
    { label: "Interview Completed", active: false, done: false },
    { label: "Results Published", active: false, done: false },
  ];

  return (
    <div className="pt-28 sm:pt-36 px-6 lg:px-8 max-w-4xl mx-auto text-center pb-24">
      {/* Animated Checkmark */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 text-green-600 shadow-xl shadow-green-600/10 animate-bounce">
        <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16" />
      </div>

      <h1 className="font-space font-bold text-3xl sm:text-5xl text-brand-navy">
        Application Submitted Successfully!
      </h1>
      <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
        Thank you for applying to the Soft Computing Research Society (SCRS). Your application has been received successfully. Further updates regarding shortlisting and interviews will be communicated through Email, WhatsApp, and your Candidate Dashboard.
      </p>

      {/* Details Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 mt-10 text-left border border-gray-200 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block">Application ID</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-space font-bold text-lg text-brand-blue">{applicationId}</span>
              <button
                onClick={handleCopyId}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-500 hover:text-brand-blue"
                title="Copy Application ID"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block">Candidate Name</span>
            <span className="font-semibold text-brand-navy text-base mt-1 block">
              {appDetails?.fullName || "Candidate"}
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block">Primary Domain</span>
            <span className="font-semibold text-brand-navy text-base mt-1 block">
              {appDetails?.primaryDomain || "Web Wizards"}
            </span>
          </div>

          <div>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block">Current Status</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mt-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              Application Received
            </span>
          </div>
        </div>

        {/* Animated Progress Timeline */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6">
            Recruitment Progress Tracker
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {timelineSteps.map((step, i) => (
              <div
                key={step.label}
                className={`p-3 rounded-xl border text-center transition-all ${
                  i === 0
                    ? "bg-green-50 border-green-200 text-green-800 font-semibold"
                    : i === 1
                    ? "bg-blue-50 border-blue-200 text-blue-800 font-semibold"
                    : "bg-gray-50 border-gray-100 text-gray-400"
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider mb-1">Step 0{i + 1}</div>
                <div className="text-xs">{step.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 space-y-4">
        {/* Primary WhatsApp Green Button */}
        <button
          onClick={() => setShowWhatsAppModal(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl shadow-xl shadow-[#25D366]/25 hover:scale-[1.02] active:scale-[0.98] transition-all text-base"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          Join SCRS WhatsApp Community
        </button>

        {/* Secondary Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-brand-navy text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            <Download className="w-4 h-4" />
            Download Application PDF
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white text-sm font-semibold rounded-xl hover:bg-brand-blue-light transition-all shadow-md"
          >
            Go to Candidate Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>

      {/* Official WhatsApp QR Code Card */}
      <div className="mt-10 p-6 glass-card rounded-3xl inline-block max-w-md mx-auto border border-green-100 bg-gradient-to-b from-green-50/50 to-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="p-2 bg-white rounded-2xl border border-gray-200 shadow-md flex-shrink-0">
            <img
              src="/whatsapp-qr.png"
              alt="SCRS WhatsApp Group QR Code"
              className="w-36 sm:w-44 h-auto rounded-xl object-contain"
            />
          </div>
          <div className="text-left space-y-2">
            <span className="text-[10px] font-bold text-[#05A870] uppercase tracking-wider px-2.5 py-0.5 bg-green-100 rounded-full">
              SCAN OR TAP
            </span>
            <h5 className="font-space font-bold text-base text-brand-navy">Scan to Join WhatsApp</h5>
            <p className="text-xs text-gray-500 leading-relaxed">
              Scan with your phone camera or click the green button to join <strong>SCRS HIRING 2026-27</strong> group directly.
            </p>
            <a
              href="https://chat.whatsapp.com/LHyUVSReaYKIaZXayxSguX"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#05A870] hover:underline pt-1"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#05A870]" />
              Open Group Link →
            </a>
          </div>
        </div>
      </div>

      {/* WhatsApp Modal with Official QR */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-5 animate-scale-up relative">
            <div className="w-14 h-14 rounded-2xl bg-[#05A870]/10 text-[#05A870] flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 fill-[#05A870]" />
            </div>

            <div>
              <h3 className="font-space font-bold text-xl text-brand-navy">Join SCRS HIRING 2026-27</h3>
              <p className="text-xs text-gray-500 mt-1">
                Scan QR or click below to receive instant recruitment announcements and interview updates.
              </p>
            </div>

            {/* Official QR Code Display */}
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 inline-block">
              <img
                src="/whatsapp-qr.png"
                alt="SCRS HIRING 2026-27 QR Code"
                className="w-48 h-auto mx-auto rounded-xl object-contain shadow-sm"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleJoinWhatsApp}
                className="flex-1 py-3.5 px-4 bg-[#05A870] text-white font-bold rounded-xl hover:bg-[#049362] transition-all text-center text-xs shadow-md"
              >
                Join WhatsApp Group Now
              </button>
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="py-3.5 px-4 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-all text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ApplicationSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      <Navbar />
      <Suspense fallback={<div className="pt-36 text-center text-gray-400">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
