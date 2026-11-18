import type { ExperienceEntry } from "@/types/portfolio";

/** Most recent first. Work entries only for verified roles. */
export const experience: ExperienceEntry[] = [
  {
    kind: "work",
    title: "AI / Machine Learning Intern",
    organization: "Ethara AI",
    location: "Gurugram, Haryana",
    period: "Jan 2026 – Jun 2026",
    points: [
      "Worked on RLHF (reinforcement learning from human feedback) to improve large language model responses.",
      "Worked on AI tooling built around MCP (Model Context Protocol).",
      "Processed, cleaned and annotated datasets of 5,000+ records for model training and evaluation.",
      "Built classification models with scikit-learn and TensorFlow, reaching 85% accuracy through feature engineering.",
      "Applied NLP preprocessing with NLTK: tokenisation, text cleaning and feature extraction.",
      "Integrated ML models with web interfaces for real-time prediction.",
    ],
    technologies: ["Python", "scikit-learn", "TensorFlow", "NLTK", "SQL", "RLHF", "MCP"],
  },
  {
    kind: "work",
    title: "Web Development Intern",
    organization: "Oasis Infobyte",
    location: "Remote",
    period: "Jun 2025 – Jul 2025",
    points: [
      "Built responsive web apps with HTML, CSS, JavaScript, Node.js and Express.js.",
      "Designed REST APIs connecting frontend and backend.",
      "Managed MySQL and MongoDB databases for the apps.",
    ],
    technologies: ["JavaScript", "Node.js", "Express.js", "MySQL", "MongoDB"],
  },
  {
    kind: "leadership",
    title: "Technical Team Member",
    organization: "NIET",
    location: "Greater Noida",
    period: "Feb 2024 – Jan 2025",
    points: ["Organised technical events and coordinated with the team for smooth execution."],
  },
  {
    kind: "leadership",
    title: "Event Volunteer",
    organization: "College tech events",
    location: "Greater Noida",
    period: "Jun 2023 – Dec 2023",
    points: ["Helped organise and manage technical and non-technical events."],
  },
  {
    kind: "education",
    title: "B.Tech, Computer Science and Engineering (AI & ML)",
    organization: "Noida Institute of Engineering & Technology (NIET)",
    location: "Greater Noida, Uttar Pradesh",
    period: "2022 – 2026",
    points: [
      "Coursework: Data Structures & Algorithms, Machine Learning, Artificial Intelligence, Operating Systems, DBMS, Computer Networks.",
    ],
  },
];
