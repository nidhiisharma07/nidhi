import type { SkillGroup } from "@/types/portfolio";

/** Only list what you can discuss in an interview. Remove anything you can't. */
export const skillGroups: SkillGroup[] = [
  { category: "Programming", skills: ["Python", "SQL", "JavaScript", "Java"] },
  { category: "AI & ML", skills: ["scikit-learn", "TensorFlow", "Keras", "NLP (NLTK)", "pandas", "NumPy", "Classification", "Model evaluation"] },
  { category: "GenAI & LLMs", skills: ["RLHF", "MCP", "LLM evaluation"] },
  { category: "Backend", skills: ["Flask", "Django", "Node.js", "Express.js", "REST APIs"] },
  { category: "Databases", skills: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"] },
  { category: "Tools", skills: ["Git & GitHub", "Docker", "Linux", "Vercel"] },
];
