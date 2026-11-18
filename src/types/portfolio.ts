export type ProjectStatus = "completed" | "in-progress";

export interface Project {
  slug: string;
  title: string;
  category: string;
  year?: string;
  status: ProjectStatus;
  summary: string;
  problem: string;
  objectives: string[];
  technologies: string[];
  implementation: string[];
  challenges: { challenge: string; solution: string }[];
  /** Only verified results. Leave empty rather than guess. */
  results: string[];
  decisions?: string[];
  nextSteps?: string[];
  repoUrl?: string;
  demoUrl?: string;
  /** Path under /public, e.g. /projects/fraud-detection.webp. Missing = designed placeholder. */
  image?: { src: string; alt: string; width: number; height: number };
  accent?: "terracotta" | "blue" | "green";
  /** Hand-drawn wireframe shown until a real screenshot exists. */
  sketch?: "chat" | "layout" | "form" | "chart";
  /** false = kept in the file but not shown anywhere on the site. */
  published?: boolean;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ExperienceEntry {
  kind: "education" | "work" | "leadership";
  title: string;
  organization: string;
  location: string;
  period: string;
  arrangement?: string;
  points: string[];
  technologies?: string[];
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readingTime: string;
  url: string;
  relatedProject?: string;
}

export interface NavItem {
  id: string;
  label: string;
  /** Set for items that open their own page instead of a home-page section. */
  route?: string;
}
