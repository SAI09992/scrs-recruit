"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { DOMAINS, DEPARTMENTS, YEARS, SECTIONS, GENDERS } from "@/lib/utils";
import {
  User,
  BookOpen,
  Code,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  FileText,
  Briefcase,
} from "lucide-react";

export default function ApplyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    department: "Computer Science & Engineering",
    year: "2nd Year",
    section: "A",
    gender: "Male",
    dob: "",
    phoneNumber: "",
    email: "",
    linkedin: "",
    github: "",
    portfolio: "",
    primaryDomain: "Web Wizards",
    secondaryDomain: "",
    skills: "",
    programmingLanguages: "",
    frameworks: "",
    designTools: "",
    reasonToJoin: "",
    projects: "", // Key Projects & Contributions field in Step 2
    agreeToTerms: false,
  });

  // Autosave Draft
  useEffect(() => {
    const saved = localStorage.getItem("scrs_application_draft");
    if (saved) {
      try {
        setFormData((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        console.error("Draft load error:", e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      localStorage.setItem("scrs_application_draft", JSON.stringify(updated));
      return updated;
    });
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) return "Please enter your Full Name.";
    if (!formData.rollNumber.trim()) return "Please enter your Roll / Registration Number.";
    if (!formData.phoneNumber.trim()) return "Please enter your Phone Number.";
    if (!formData.email.trim()) return "Please enter your Email Address.";
    return null;
  };

  const validateStep2 = () => {
    if (!formData.primaryDomain) return "Please select your primary domain.";
    if (!formData.reasonToJoin.trim()) return "Please tell us why you want to join SCRS.";
    return null;
  };

  const handleNext = () => {
    setError("");
    let err: string | null = null;
    if (currentStep === 1) err = validateStep1();
    if (currentStep === 2) err = validateStep2();

    if (err) {
      setError(err);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.agreeToTerms) {
      setError("You must confirm that your information is accurate before submitting.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          rollNumber: formData.rollNumber,
          department: formData.department,
          year: formData.year,
          section: formData.section,
          gender: formData.gender,
          dob: formData.dob,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          linkedin: formData.linkedin,
          github: formData.github,
          portfolio: formData.portfolio,
          primaryDomain: formData.primaryDomain,
          secondaryDomain: formData.secondaryDomain,
          skills: formData.skills,
          programmingLanguages: formData.programmingLanguages,
          frameworks: formData.frameworks,
          designTools: formData.designTools,
          reasonToJoin: formData.reasonToJoin,
          achievements: formData.projects,
          experience: formData.projects,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Failed to submit application. Please try again.");
      } else {
        localStorage.removeItem("scrs_application_draft");
        router.push(`/apply/success?id=${data.applicationId}`);
      }
    } catch (err: any) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white pb-24">
      <Navbar />

      <div className="pt-28 sm:pt-36 px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider px-3 py-1 bg-brand-blue/5 rounded-full border border-brand-blue/10">
          RECRUITMENT 2026
        </span>
        <h1 className="font-space font-bold text-3xl sm:text-5xl text-brand-navy mt-4">
          Join SCRS Kalasalingam
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Streamlined 3-step application. Direct submission without login.
        </p>

        {/* 3-Step Wizard Indicator */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 my-8">
          {[
            { step: 1, label: "Personal Details", icon: User },
            { step: 2, label: "Domain & Tech Skills", icon: Code },
            { step: 3, label: "Review & Submit", icon: CheckCircle2 },
          ].map((s) => {
            const Icon = s.icon;
            const isDone = currentStep > s.step;
            const isCurrent = currentStep === s.step;

            return (
              <div key={s.step} className="flex items-center gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isDone
                      ? "bg-green-500 text-white"
                      : isCurrent
                      ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30 scale-110"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : s.step}
                </div>
                <span
                  className={`text-xs font-semibold hidden sm:inline ${
                    isCurrent ? "text-brand-navy" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 mb-6 text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Wizard Form Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 text-left shadow-2xl border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="font-space font-bold text-xl text-brand-navy border-b pb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-brand-blue" />
                  Step 1: Personal & Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. N Harshitha Sai"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:border-brand-blue"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Roll Number / Registration ID *
                    </label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                      placeholder="e.g. 99230040792"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-mono outline-none focus:border-brand-blue"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Department *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-brand-navy outline-none"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Academic Year *
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-brand-navy outline-none"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Section
                    </label>
                    <select
                      name="section"
                      value={formData.section}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-brand-navy outline-none"
                    >
                      {SECTIONS.map((sec) => (
                        <option key={sec} value={sec}>
                          Section {sec}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-brand-navy outline-none"
                    >
                      {GENDERS.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:border-brand-blue"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. student@kalasalingam.ac.in"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none focus:border-brand-blue"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Social & Portfolio Links (Optional)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="LinkedIn Profile URL"
                      className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                    />
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="GitHub Profile URL"
                      className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                    />
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="Portfolio / Website URL"
                      className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Domain Choice, Tech Skills & Projects */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fade-in">
                <h3 className="font-space font-bold text-xl text-brand-navy border-b pb-3 flex items-center gap-2">
                  <Code className="w-5 h-5 text-brand-blue" />
                  Step 2: Domain Choice, Technical Skills & Projects
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Primary Domain Choice *
                    </label>
                    <select
                      name="primaryDomain"
                      value={formData.primaryDomain}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-brand-blue outline-none"
                    >
                      {DOMAINS.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name} ({d.tagline})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Secondary Domain Choice (Optional)
                    </label>
                    <select
                      name="secondaryDomain"
                      value={formData.secondaryDomain}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-brand-navy outline-none"
                    >
                      <option value="">None (Primary Only)</option>
                      {DOMAINS.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Programming Languages
                    </label>
                    <input
                      type="text"
                      name="programmingLanguages"
                      value={formData.programmingLanguages}
                      onChange={handleChange}
                      placeholder="e.g. Python, C++, JavaScript, TypeScript"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-navy mb-1">
                      Frameworks & Tools
                    </label>
                    <input
                      type="text"
                      name="frameworks"
                      value={formData.frameworks}
                      onChange={handleChange}
                      placeholder="e.g. Next.js, PyTorch, Figma, Git"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Key Projects & Contributions (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Key Projects & Contributions (Optional)
                  </label>
                  <p className="text-[11px] text-gray-400 mb-2">
                    Mention 1-2 notable projects, GitHub repositories, web apps, or achievements you built.
                  </p>
                  <textarea
                    name="projects"
                    rows={3}
                    value={formData.projects}
                    onChange={handleChange}
                    placeholder="e.g. Built a Smart Attendance Web App using Next.js & OpenCV. GitHub: github.com/user/project"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">
                    Why do you want to join SCRS? *
                  </label>
                  <textarea
                    name="reasonToJoin"
                    rows={4}
                    value={formData.reasonToJoin}
                    onChange={handleChange}
                    placeholder="Tell us what drives your passion and what you hope to contribute or learn at SCRS..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs outline-none resize-none"
                    required
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Review & Submit */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-space font-bold text-xl text-brand-navy border-b pb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                  Step 3: Review Your Application & Final Submission
                </h3>

                <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">Candidate Name</span>
                      <span className="font-bold text-brand-navy text-sm">{formData.fullName}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">Roll Number</span>
                      <span className="font-bold text-brand-navy font-mono text-sm">{formData.rollNumber}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">Department & Year</span>
                      <span className="font-semibold text-brand-navy">{formData.department} ({formData.year})</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">Primary Domain</span>
                      <span className="font-bold text-brand-blue">{formData.primaryDomain}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">Phone & Email</span>
                      <span className="font-semibold text-brand-navy">{formData.phoneNumber} | {formData.email}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">Tech Skills</span>
                      <span className="font-semibold text-brand-navy">{formData.programmingLanguages || "General"}</span>
                    </div>
                  </div>

                  {formData.projects && (
                    <div className="pt-3 border-t border-blue-100">
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">Key Projects</span>
                      <p className="font-medium text-brand-navy mt-1">{formData.projects}</p>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                  <div className="font-bold">Submission Policy Reminder:</div>
                  <p>
                    Submissions are final. Once submitted, candidate applications cannot be modified. Please ensure all information above is correct.
                  </p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="mt-1 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                  />
                  <span className="text-xs text-gray-600 font-medium">
                    I confirm that the information provided is accurate and truthful to the best of my knowledge.
                  </span>
                </label>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-brand-navy font-semibold text-xs hover:bg-gray-50 transition-all inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous Step
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-brand-blue text-white font-semibold text-xs rounded-xl hover:bg-brand-blue-light transition-all inline-flex items-center gap-2 shadow-lg shadow-brand-blue/25"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-bold text-xs rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-blue/30 inline-flex items-center gap-2"
                >
                  {loading ? "Submitting Application..." : "Submit Application"}
                  <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
