export interface AICandidateAnalysis {
  summary: string;
  skillGaps: string[];
  recommendation: "STRONG_YES" | "YES" | "MAYBE" | "NO";
  matchScore: number; // 0 - 100
  suggestedQuestions: string[];
  duplicateWarning?: string;
}

export function analyzeCandidateWithAI(data: {
  fullName: string;
  rollNumber: string;
  email: string;
  primaryDomain: string;
  skills: string;
  programmingLanguages: string;
  frameworks: string;
  experience?: string;
  leadership?: string;
  achievements?: string;
  technicalAnswers?: string;
}): AICandidateAnalysis {
  const domain = data.primaryDomain;
  const skillsList = `${data.skills}, ${data.programmingLanguages}, ${data.frameworks}`.toLowerCase();
  
  let matchScore = 70;
  const gaps: string[] = [];
  const questions: string[] = [];

  // Domain specific rule checks
  if (domain === "Web Wizards") {
    if (skillsList.includes("react") || skillsList.includes("next")) matchScore += 10;
    if (skillsList.includes("typescript")) matchScore += 10;
    if (!skillsList.includes("git")) gaps.push("Missing Git / Version Control knowledge");
    if (!skillsList.includes("node") && !skillsList.includes("backend")) gaps.push("Limited backend experience noted");

    questions.push("Explain the difference between Server Components and Client Components in Next.js.");
    questions.push("How would you optimize the load time and render performance of a React application?");
    questions.push("Describe how REST APIs differ from GraphQL or WebSockets.");
  } else if (domain === "ML Minds") {
    if (skillsList.includes("python")) matchScore += 10;
    if (skillsList.includes("pytorch") || skillsList.includes("tensorflow")) matchScore += 15;
    if (!skillsList.includes("pandas") && !skillsList.includes("numpy")) gaps.push("Fundamental data manipulation libraries (Pandas/NumPy) omitted");

    questions.push("Explain how overfitting occurs in machine learning models and how to prevent it.");
    questions.push("What is the difference between supervised, unsupervised, and reinforcement learning?");
    questions.push("How do CNNs handle spatial feature extraction in Computer Vision tasks?");
  } else if (domain === "Innovators Den") {
    if (data.experience && data.experience.length > 50) matchScore += 15;
    if (!skillsList.includes("research") && !skillsList.includes("prototype")) gaps.push("Prior research or patent drafting experience not explicitly mentioned");

    questions.push("Walk us through a technical prototype or innovative solution you built recently.");
    questions.push("How do you evaluate whether a research idea has practical commercial or societal value?");
  } else if (domain === "Pixel Crafters") {
    if (skillsList.includes("figma")) matchScore += 15;
    if (!skillsList.includes("user research") && !skillsList.includes("ux")) gaps.push("Focus appears heavier on UI aesthetics than UX research");

    questions.push("What is your design workflow when taking a wireframe to a high-fidelity prototype in Figma?");
    questions.push("How do you maintain design system consistency across multiple screens?");
  } else {
    // Event Architects
    if (data.leadership && data.leadership.length > 30) matchScore += 15;
    questions.push("How would you manage event logistics and sponsorship outreach under tight deadlines?");
    questions.push("Describe a conflict you resolved while managing a team or event.");
  }

  // Cap match score between 40 and 98
  matchScore = Math.min(98, Math.max(40, matchScore));

  let recommendation: "STRONG_YES" | "YES" | "MAYBE" | "NO" = "MAYBE";
  if (matchScore >= 85) recommendation = "STRONG_YES";
  else if (matchScore >= 75) recommendation = "YES";
  else if (matchScore < 60) recommendation = "NO";

  const summary = `${data.fullName} is applying for ${data.primaryDomain}. Demonstrates familiarity with ${data.programmingLanguages || "core fundamentals"}. Strong alignment score of ${matchScore}%. ${
    data.experience ? "Has documented project experience." : "Encouraged to showcase practical projects during interview."
  }`;

  return {
    summary,
    skillGaps: gaps.length > 0 ? gaps : ["No critical skill gaps detected"],
    recommendation,
    matchScore,
    suggestedQuestions: questions,
  };
}
