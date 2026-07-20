"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "Who is eligible to apply for SCRS recruitment?",
    answer:
      "Recruitment is open exclusively to 2nd Year and 3rd Year undergraduate students across all engineering departments at Kalasalingam Academy of Research and Education.",
  },
  {
    question: "Can I edit my application after submitting?",
    answer:
      "No. Once submitted, candidate applications are final and cannot be edited. Please carefully review your personal details, domain choice, and projects in Step 3 before submitting.",
  },
  {
    question: "Do I need prior technical experience or coding projects to join?",
    answer:
      "While prior experience or projects are a plus, we value passion, problem-solving mindset, and willingness to learn above all. Beginner-friendly training and mentorship are provided across all domains.",
  },
  {
    question: "Can I apply for more than one domain?",
    answer:
      "Yes! You can choose a Primary Domain choice and optionally select a Secondary Domain choice during Step 2 of the application form.",
  },
  {
    question: "How do I check my application status?",
    answer:
      "Click the 'Check Status' button in the top navigation bar and enter your Roll Number or Application ID to view your live status instantly.",
  },
  {
    question: "How are candidate interviews conducted?",
    answer:
      "Shortlisted candidates will be invited for a quick 1-on-1 interaction with our domain heads via Google Meet. Time slots will be communicated via WhatsApp and status lookup.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-space font-bold text-2xl sm:text-4xl text-brand-navy">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Everything you need to know about SCRS recruitment and selection process.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.question}
                className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-space font-bold text-base sm:text-lg text-brand-navy hover:text-brand-blue transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-blue flex-shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-blue" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100/80 animate-fade-in mt-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
