import type { NavItem } from "@/types/portfolio";
import { articles } from "@/content/articles";

/**
 * Every personal link and line of hero copy lives here.
 * Values wrapped in [square brackets] are placeholders: they are hidden on
 * the page and `npm run check` fails until they are replaced.
 */
export const siteConfig = {
  name: "Nidhi Sharma",
  initials: "NS",
  title: "AI/ML & Software Developer",
  headline: "Building useful AI systems and software, one problem at a time.",
  roleTarget:
    "Open to entry-level roles in AI/ML engineering, machine learning, and software development.",
  description:
    "Computer Science and Engineering (AI & ML) graduate, B.Tech 2026, building practical machine learning solutions, backend systems, and full-stack applications.",
  location: "Greater Noida, Uttar Pradesh, India",
  principles: [
    "Build with curiosity.",
    "Solve with empathy.",
    "Focus on practical impact.",
  ],
  email: "sharmanidhi97083@gmail.com",
  github: "https://github.com/nidhiisharma07",
  linkedin: "https://www.linkedin.com/in/nidhi-sharma-40247b272/",
  /** Drop your real PDF at public/resume.pdf (keep it under 1 MB). */
  resumeUrl: "/resume.pdf",
  /** Final domain. Canonical tag is only emitted once this is not a placeholder. */
  siteUrl: "https://portnew-nu.vercel.app",
} as const;

const baseNav: NavItem[] = [
  { id: "about", label: "About", route: "/about" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "scrapbook", label: "Scrapbook" },
];

export const navItems: NavItem[] = [
  ...baseNav,
  ...(articles.length > 0 ? [{ id: "writing", label: "Writing" }] : []),
  { id: "connect", label: "Connect" },
];

/** Sections rendered on the home page, in order (route items excluded). */
export const homeSections: NavItem[] = navItems.filter((n) => !n.route);

export function isPlaceholder(value: string | undefined): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}

export function isUsableUrl(value: string | undefined): value is string {
  if (isPlaceholder(value)) return false;
  return /^(https?:\/\/|mailto:|\/)/.test(value!);
}
