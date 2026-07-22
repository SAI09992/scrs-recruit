export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function generateApplicationId(sequence: number): string {
  const padded = String(sequence).padStart(4, "0");
  return `SCRS-2026-${padded}`;
}

export const DOMAINS = [
  {
    id: "web-wizards",
    name: "Web Wizards",
    tagline: "Full-Stack & Web Engineering",
    description:
      "Craft modern, responsive web applications with Next.js, React, Tailwind CSS, and cloud backend architectures.",
    icon: "Code2",
    color: "from-blue-500 to-cyan-400",
    skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Node.js & APIs", "Database Design"],
  },
  {
    id: "ml-minds",
    name: "ML Minds",
    tagline: "Machine Learning & AI Systems",
    description:
      "Develop neural networks, predictive models, Computer Vision, and Generative AI applications with PyTorch & Python.",
    icon: "Brain",
    color: "from-purple-500 to-indigo-500",
    skills: ["Python & PyTorch", "Computer Vision", "NLP & LLMs", "Data Science", "Scikit-Learn"],
  },
  {
    id: "innovators-den",
    name: "Innovators Den",
    tagline: "Cross-Domain Innovation & Integration",
    description:
      "Integrate different technical and creative domains, combining software, hardware, AI, design, and operations to build multidisciplinary solutions.",
    icon: "Cpu",
    color: "from-emerald-500 to-teal-400",
    skills: ["Cross-Domain Integration", "Multidisciplinary R&D", "System Architecture", "Prototyping", "Interdisciplinary Innovation"],
  },
  {
    id: "pixel-crafters",
    name: "Pixel Crafters",
    tagline: "UI/UX, Branding & Graphic Design",
    description:
      "Design futuristic user interfaces, brand identities, motion graphics, and high-converting event posters.",
    icon: "Palette",
    color: "from-pink-500 to-rose-400",
    skills: ["Figma & UI Design", "Photoshop & Illustrator", "Branding & Typography", "Motion Design", "Wireframing"],
  },
  {
    id: "social-pulse",
    name: "Social Pulse",
    tagline: "Social Media, PR & Content Strategy",
    description:
      "Manage social media presence, digital marketing campaigns, content creation, public relations, and audience engagement.",
    icon: "Share2",
    color: "from-cyan-500 to-blue-500",
    skills: ["Social Media Marketing", "Content Strategy", "Public Relations", "Digital Campaigns", "Copywriting & Analytics"],
  },
  {
    id: "lens-league",
    name: "Lens League",
    tagline: "Photography, Videography & Media Production",
    description:
      "Capture events, produce promotional videos, handle event photography, video editing, and visual storytelling for SCRS.",
    icon: "Camera",
    color: "from-amber-500 to-red-400",
    skills: ["Photography", "Videography", "Video Editing (Premiere/DaVinci)", "Lighting & Composition", "Visual Storytelling"],
  },
  {
    id: "event-architects",
    name: "Event Architects",
    tagline: "Operations, PR & Hackathon Management",
    description:
      "Lead national hackathons, technical workshops, industry webinars, public relations, and community management.",
    icon: "Sparkles",
    color: "from-amber-500 to-orange-400",
    skills: ["Event Operations", "Public Relations", "Community Management", "Sponsorship & PR", "Hosting & Logistics"],
  },
];

export const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Artificial Intelligence & Data Science",
  "Information Technology",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering",
  "Biotechnology",
  "Civil Engineering",
];

export const YEARS = ["2nd Year", "3rd Year"];
export const SECTIONS = ["A", "B", "C", "D", "E", "F"];
export const GENDERS = ["Male", "Female", "Other"];
