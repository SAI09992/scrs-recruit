"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DOMAINS } from "@/lib/utils";
import { ChevronRight, ChevronLeft, Check, AlertCircle, Send } from "lucide-react";

const STEPS = [
  { id: 1, title: "Personal Details", subtitle: "Basic information & social links" },
  { id: 2, title: "Domain & Skills", subtitle: "Select domain and tech stack" },
  { id: 3, title: "Review & Submit", subtitle: "Verify details and submit application" },
];

export default function RegistrationWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    department: "Computer Science & Engineering",
    year: "1",
    section: "A",
    gender: "Male",
    dob: "2006-01-15",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    linkedin: "",
    github: "",
    portfolio: "",
    primaryDomain: "Web Wizards",
    secondaryDomain: "ML Minds",
    skills: "",
    programmingLanguages: "JavaScript, TypeScript, Python",
    frameworks: "React, Next.js, Node.js",
    designTools: "Figma",
    reasonToJoin: "Enthusiastic about learning and building real-world projects with SCRS.",
    declaration: false,
  });

  // Autosave draft to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("scrs_recruitment_draft");
    if (saved) {
      try {
        setFormData((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  const updateField = (field: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      localStorage.setItem("scrs_recruitment_draft", JSON.stringify(updated));
      return updated;
    });
  };

  const handleNext = () => {
    setError("");
    // Step validations
    if (currentStep === 1) {
      if (!formData.fullName.trim() || !formData.rollNumber.trim() || !formData.email.trim()) {
        setError("Please fill in your Full Name, Roll Number, and Email.");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.primaryDomain) {
        setError("Please select a Primary Domain.");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const handleSubmit = async () => {
    setError("");
    if (!formData.declaration) {
      setError("You must agree to the declaration before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          technicalAnswers: {},
          experience: "",
          achievements: "",
          leadership: "",
          hoursPerWeek: 10,
          strengths: "",
          weaknesses: "",
          goals: "",
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      // Clear draft
      localStorage.removeItem("scrs_recruitment_draft");

      // Redirect to submission success flow
      router.push(`/apply/success?id=${data.applicationId}`);
    } catch (err: any) {
      setError(err.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step) => (
            <div
              key={step.id}
              onClick={() => step.id < currentStep && setCurrentStep(step.id)}
              className={`flex items-center gap-2 cursor-pointer transition-all ${
                step.id === currentStep
                  ? "text-brand-blue font-bold"
                  : step.id < currentStep
                  ? "text-green-600 font-medium"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-space text-sm font-semibold transition-all ${
                  step.id === currentStep
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30 scale-110"
                    : step.id < currentStep
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.id < currentStep ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <span className="hidden md:inline text-sm">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan transition-all duration-500"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Step Container */}
      <div className="glass-card rounded-3xl p-8 sm:p-10 shadow-xl border border-white/80">
        <div className="mb-8 border-b border-gray-100 pb-5">
          <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
            Step {currentStep} of 3
          </span>
          <h2 className="font-space font-bold text-2xl sm:text-3xl text-brand-navy mt-1">
            {STEPS[currentStep - 1].title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{STEPS[currentStep - 1].subtitle}</p>
        </div>

        {/* STEP 1: Personal Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">
                  Roll Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) => updateField("rollNumber", e.target.value)}
                  placeholder="9922004001"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => updateField("department", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all text-sm"
                >
                  <option>Computer Science & Engineering</option>
                  <option>Artificial Intelligence & Data Science</option>
                  <option>Information Technology</option>
                  <option>Electronics & Communication Engineering</option>
                  <option>Electrical & Electronics Engineering</option>
                  <option>Mechanical Engineering</option>
                  <option>Civil Engineering</option>
                  <option>Biotechnology</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => updateField("year", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all text-sm"
                >
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">
                  Section
                </label>
                <input
                  type="text"
                  value={formData.section}
                  onChange={(e) => updateField("section", e.target.value)}
                  placeholder="A"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => updateField("phoneNumber", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="sanjay@klu.ac.in"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all text-sm"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => updateField("github", e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">Portfolio / Web Link</label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => updateField("portfolio", e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue transition-all text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Domain Selection & Skills */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-brand-navy mb-3">
                Select Primary Domain <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DOMAINS.map((domain) => (
                  <div
                    key={domain.id}
                    onClick={() => updateField("primaryDomain", domain.name)}
                    className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
                      formData.primaryDomain === domain.name
                        ? "border-brand-blue bg-brand-blue/5 shadow-md"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{domain.icon}</span>
                      <div>
                        <h4 className="font-space font-bold text-brand-navy">{domain.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{domain.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-navy mb-2">
                Secondary Domain (Optional)
              </label>
              <select
                value={formData.secondaryDomain}
                onChange={(e) => updateField("secondaryDomain", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue transition-all text-sm"
              >
                <option value="">-- None --</option>
                {DOMAINS.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">
                  Programming Languages
                </label>
                <input
                  type="text"
                  value={formData.programmingLanguages}
                  onChange={(e) => updateField("programmingLanguages", e.target.value)}
                  placeholder="e.g. C++, Python, JavaScript, Java"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-navy mb-2">
                  Frameworks & Tools
                </label>
                <input
                  type="text"
                  value={formData.frameworks}
                  onChange={(e) => updateField("frameworks", e.target.value)}
                  placeholder="e.g. React, PyTorch, Figma, Node.js"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-blue transition-all text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Submit */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-gray-200 space-y-3">
              <h3 className="font-space font-bold text-lg text-brand-navy mb-4 border-b pb-2">
                Application Summary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400 block text-xs">Full Name</span>
                  <span className="font-semibold text-brand-navy">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Roll Number</span>
                  <span className="font-semibold text-brand-navy font-mono">{formData.rollNumber}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Department</span>
                  <span className="font-semibold text-brand-navy">{formData.department}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Primary Domain</span>
                  <span className="font-semibold text-brand-blue">{formData.primaryDomain}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Phone</span>
                  <span className="font-semibold text-brand-navy">{formData.phoneNumber}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs">Email</span>
                  <span className="font-semibold text-brand-navy">{formData.email}</span>
                </div>
              </div>
            </div>

            {/* Declaration Checkbox */}
            <div className="pt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declaration}
                  onChange={(e) => updateField("declaration", e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue mt-0.5"
                />
                <span className="text-sm text-gray-600">
                  I hereby declare that all details provided in this application are true and correct. I understand that my application is final once submitted.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-brand-blue to-brand-blue-light text-white font-semibold rounded-xl shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-9 py-3.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-green-600/25 hover:shadow-green-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Application"}
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
