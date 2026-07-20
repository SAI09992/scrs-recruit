"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  Calendar,
  Video,
  Download,
  Bell,
  MessageCircle,
  AlertTriangle,
  ExternalLink,
  Search,
  User,
} from "lucide-react";

const DEFAULT_COORDINATORS = [
  {
    id: "1",
    name: "N HARSHITHA SAI",
    role: "Student Representative",
    whatsapp: "https://chat.whatsapp.com/GjE2kPLPloK5vU38bSCrsW",
  },
  {
    id: "2",
    name: "SAI DHANUSH",
    role: "Technical Lead",
    whatsapp: "https://chat.whatsapp.com/GjE2kPLPloK5vU38bSCrsW",
  },
  {
    id: "3",
    name: "SAI JASWANTH",
    role: "Recruitment Coordinator",
    whatsapp: "https://chat.whatsapp.com/GjE2kPLPloK5vU38bSCrsW",
  },
];

export default function CandidateDashboardClient() {
  const [searchQuery, setSearchQuery] = useState("SCRS-2026-0042");
  const [appId, setAppId] = useState("SCRS-2026-0042");
  const [application, setApplication] = useState<any>(null);
  const [joinedWhatsApp, setJoinedWhatsApp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [coordinators, setCoordinators] = useState(DEFAULT_COORDINATORS);

  useEffect(() => {
    // Check local storage for WhatsApp join state & coordinators
    const saved = localStorage.getItem("scrs_joined_whatsapp");
    setJoinedWhatsApp(saved === "true");

    const savedCoords = localStorage.getItem("scrs_coordinators");
    if (savedCoords) {
      try {
        setCoordinators(JSON.parse(savedCoords));
      } catch (e) {
        console.error(e);
      }
    }

    fetchApplication(appId);
  }, [appId]);

  const fetchApplication = (id: string) => {
    setLoading(true);
    setNotFound(false);
    fetch(`/api/applications?id=${id.trim()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) {
          setNotFound(true);
          setApplication(null);
        } else {
          setApplication(data);
        }
      })
      .catch((e) => {
        console.error(e);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setAppId(searchQuery.trim());
    }
  };

  const handleGoogleCalendarSync = () => {
    if (!application?.interviews?.[0]) return;
    const interview = application.interviews[0];
    const title = encodeURIComponent("SCRS Recruitment Interview");
    const details = encodeURIComponent(
      `Interview for ${application.primaryDomain} domain with SCRS Panel.`
    );
    const location = encodeURIComponent(interview.venue || "Google Meet");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(url, "_blank");
  };

  const statusList = [
    { key: "RECEIVED", label: "Application Received" },
    { key: "REVIEWING", label: "Under Review" },
    { key: "SHORTLISTED", label: "Shortlisted" },
    { key: "SCHEDULED", label: "Interview Scheduled" },
    { key: "COMPLETED", label: "Interview Completed" },
    { key: "SELECTED", label: "Selected" },
  ];

  const currentStatusIndex = statusList.findIndex(
    (s) => s.key === (application?.status || "RECEIVED")
  );

  return (
    <div className="space-y-12">
      {/* Search Header Bar */}
      <div className="glass-card p-6 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
              Candidate Status Lookup
            </span>
            <h1 className="font-space font-bold text-2xl sm:text-3xl text-brand-navy mt-1">
              Candidate Dashboard
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              No login required — enter your Application ID or Roll Number to track status.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Application ID (e.g. SCRS-2026-0042)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none text-brand-navy w-48 sm:w-64 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-blue text-white text-xs font-semibold rounded-xl hover:bg-brand-blue-light transition-all shadow-md"
            >
              Track Status
            </button>
          </form>
        </div>
      </div>

      {loading && (
        <div className="py-12 text-center text-gray-400 text-sm font-medium">
          Loading application status...
        </div>
      )}

      {notFound && !loading && (
        <div className="p-8 rounded-3xl glass-card text-center text-gray-500 space-y-3">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="font-space font-bold text-lg text-brand-navy">Application Not Found</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            No application was found matching <strong>{appId}</strong>. Please check your Application ID or submit a new application.
          </p>
        </div>
      )}

      {application && !loading && (
        <>
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-card p-6 rounded-3xl border border-gray-200">
            <div>
              <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
                Application Profile
              </span>
              <h2 className="font-space font-bold text-2xl text-brand-navy mt-1">
                {application.fullName}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Roll Number: <strong className="text-brand-navy">{application.rollNumber}</strong> | Domain: <strong className="text-brand-blue">{application.primaryDomain}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-brand-navy text-xs font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download Application PDF
              </button>
            </div>
          </div>

          {/* WhatsApp Reminder Banner if not joined */}
          {!joinedWhatsApp && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <div>
                  <h4 className="font-space font-bold text-sm text-amber-900">
                    WhatsApp Community Reminder
                  </h4>
                  <p className="text-xs text-amber-700 mt-0.5">
                    You haven&apos;t joined the SCRS WhatsApp Community yet. Join now to avoid missing important recruitment updates.
                  </p>
                </div>
              </div>
              <a
                href="https://chat.whatsapp.com/GjE2kPLPloK5vU38bSCrsW"
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  localStorage.setItem("scrs_joined_whatsapp", "true");
                  setJoinedWhatsApp(true);
                }}
                className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-xl hover:bg-[#20bd5a] transition-all flex-shrink-0 inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Join WhatsApp Now
              </a>
            </div>
          )}

          {/* Status & Progress Tracker */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-200">
            <h3 className="font-space font-bold text-lg text-brand-navy mb-6">
              Application Progress Tracker
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {statusList.map((step, i) => {
                const isPassed = i <= (currentStatusIndex >= 0 ? currentStatusIndex : 0);
                const isCurrent = i === currentStatusIndex;

                return (
                  <div
                    key={step.key}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      isCurrent
                        ? "bg-brand-blue/10 border-brand-blue text-brand-blue font-bold shadow-md scale-105"
                        : isPassed
                        ? "bg-green-50 border-green-200 text-green-700 font-semibold"
                        : "bg-gray-50 border-gray-100 text-gray-400"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-bold">
                      {isPassed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-300" />
                      )}
                    </div>
                    <div className="text-xs">{step.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interview Details (if scheduled) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-space font-bold text-lg text-brand-navy flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-blue" />
                  Interview & Meeting Details
                </h3>
                <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  Scheduled
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border border-blue-100 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-gray-400 block">Date & Time</span>
                    <span className="font-semibold text-brand-navy">August 18, 2026 @ 10:30 AM</span>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400 block">Venue / Format</span>
                    <span className="font-semibold text-brand-navy flex items-center gap-1">
                      <Video className="w-4 h-4 text-brand-blue" />
                      Google Meet (Online)
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400 block">Interview Panel</span>
                    <span className="font-semibold text-brand-navy">Panel B - ML & Web Domain</span>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400 block">Meeting Link</span>
                    <a
                      href="https://meet.google.com/abc-defg-hij"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-brand-blue hover:underline inline-flex items-center gap-1"
                    >
                      meet.google.com/abc-defg-hij
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-100 flex flex-wrap gap-3">
                  <button
                    onClick={handleGoogleCalendarSync}
                    className="px-4 py-2 bg-brand-blue text-white text-xs font-semibold rounded-xl hover:bg-brand-blue-light transition-all inline-flex items-center gap-2 shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    Add to Google Calendar
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications & Announcements */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-200">
              <h3 className="font-space font-bold text-lg text-brand-navy mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-brand-blue" />
                Recruitment Notices
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-semibold text-brand-blue uppercase tracking-wider">
                    System Announcement
                  </span>
                  <h4 className="font-semibold text-sm text-brand-navy mt-1">
                    Interview Slots Allocated
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Interview time slots have been published. Please check your assigned Google Meet link above.
                  </p>
                  <span className="text-[10px] text-gray-400 mt-2 block">July 20, 2026</span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Notice
                  </span>
                  <h4 className="font-semibold text-sm text-brand-navy mt-1">
                    Registration Closing Soon
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Registration closes on August 15, 2026. Submissions are final once sent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* GET IN TOUCH - STUDENT COORDINATORS SECTION */}
      <div className="pt-12 border-t border-gray-200 text-center space-y-8">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-2">
            GET IN TOUCH
          </span>
          <h2 className="font-space font-bold text-3xl sm:text-4xl text-brand-navy">
            Our Coordinators
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto mt-2 leading-relaxed">
            Have queries regarding recruitment or society operations? Reach out to our student coordinators.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-brand-navy uppercase tracking-widest mb-6">
            STUDENT COORDINATORS
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {coordinators.map((coord) => (
              <div
                key={coord.id || coord.name}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-orange-100/80 text-orange-500 flex items-center justify-center mx-auto">
                  <User className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="font-space font-bold text-base text-brand-navy">
                    {coord.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    {coord.role}
                  </p>
                </div>

                <a
                  href={coord.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-[#05A870] hover:bg-[#049362] text-white font-bold rounded-2xl text-xs inline-flex items-center justify-center gap-2 transition-all shadow-md shadow-[#05A870]/20"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  Connect on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
