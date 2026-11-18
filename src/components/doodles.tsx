/* Small original hand-drawn doodles. All decorative (aria-hidden). */

type P = { className?: string; reveal?: boolean };

export function Squiggle({ className = "", reveal = false }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 16" preserveAspectRatio="none" className={className} fill="none">
      <path
        d="M3 10 C 22 3, 34 14, 54 8 S 88 4, 106 9 S 140 14, 160 7 S 186 6, 197 9"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        className={reveal ? "draw-on-reveal" : "draw-on"}
        style={{ ["--len" as string]: 220 }}
      />
    </svg>
  );
}

export function ScribbleCircle({ className = "" }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 90" preserveAspectRatio="none" className={className} fill="none">
      <path
        d="M120 8 C 60 2, 10 18, 8 46 C 6 74, 70 86, 128 82 C 184 78, 214 60, 210 38 C 206 14, 150 4, 92 12"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="draw-on"
        style={{ ["--len" as string]: 560 }}
      />
    </svg>
  );
}

export function CurlyArrow({ className = "" }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 50" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M76 40 C 60 46, 44 40, 46 28 C 48 16, 64 18, 60 30 C 56 42, 30 40, 8 18" />
      <path d="M8 18 L 9 30 M8 18 L 20 17" />
    </svg>
  );
}

export function CoffeeRing({ className = "" }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 120" className={className} fill="none">
      <circle cx="60" cy="60" r="46" stroke="#8a5a2b" strokeOpacity="0.16" strokeWidth="7" />
      <circle cx="60" cy="60" r="41" stroke="#8a5a2b" strokeOpacity="0.08" strokeWidth="3" />
      <path d="M100 30 c6 8 9 16 9 26" stroke="#8a5a2b" strokeOpacity="0.2" strokeWidth="4" strokeLinecap="round" />
      <circle cx="104" cy="96" r="4" fill="#8a5a2b" fillOpacity="0.12" />
    </svg>
  );
}

export function PaperClip({ className = "" }: P) {
  return (
    <svg aria-hidden="true" viewBox="0 0 30 80" className={className} fill="none" stroke="#7d8790" strokeWidth="3" strokeLinecap="round">
      <path d="M20 22 V62 a7 7 0 0 1 -14 0 V14 a10 10 0 0 1 20 0 V58 a3.5 3.5 0 0 1 -7 0 V24" />
    </svg>
  );
}

export function Stamp({ label, tone = "accent" }: { label: string; tone?: "accent" | "green" }) {
  return (
    <span
      className={`stamp inline-block -rotate-6 rounded-md px-2.5 py-1 font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] ${
        tone === "green" ? "text-[#4f6a1d]" : "text-accent-ink"
      }`}
    >
      {label}
    </span>
  );
}

/** One doodle per skill category, keyed by category name. */
export function CategoryDoodle({ name, className = "" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    Programming: <path d="M9 7 L3 12 L9 17 M15 7 L21 12 L15 17 M13 5 L11 19" />,
    "AI & ML": (
      <>
        <circle cx="5" cy="6" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="19" cy="18" r="2" />
        <path d="M7 7 L10 11 M7 17 L10 13 M14 11 L17 7 M14 13 L17 17" />
      </>
    ),
    "GenAI & LLMs": <path d="M12 3 l1.8 5.2 L19 10 l-5.2 1.8 L12 17 l-1.8-5.2 L5 10 l5.2-1.8Z M18.5 15.5 l.8 2.2 2.2.8 -2.2.8 -.8 2.2 -.8-2.2 -2.2-.8 2.2-.8Z" />,
    Backend: (
      <>
        <rect x="4" y="4" width="16" height="6" rx="1.5" /><rect x="4" y="14" width="16" height="6" rx="1.5" />
        <path d="M8 7 h.01 M8 17 h.01 M12 10 v4" />
      </>
    ),
    Frontend: (
      <>
        <rect x="3" y="4" width="18" height="15" rx="2" /><path d="M3 8.5 H21 M6 6.3 h.01 M8.5 6.3 h.01 M7 13 h6 M7 16 h9" />
      </>
    ),
    Databases: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="2.6" /><path d="M5 6 V18 c0 1.5 3 2.6 7 2.6 s7-1.1 7-2.6 V6 M5 12 c0 1.5 3 2.6 7 2.6 s7-1.1 7-2.6" />
      </>
    ),
    Tools: <path d="M14.5 5.5 a4 4 0 0 0 4.9 4.9 L12 17.8 a2.4 2.4 0 1 1 -3.4-3.4 L16 7 a4 4 0 0 1 -1.5-1.5Z M4 20 l3-3" />,
  };
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] ?? <circle cx="12" cy="12" r="7" />}
    </svg>
  );
}
