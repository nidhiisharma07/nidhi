/**
 * "How it works" drawn as a hand-sketched pipeline: numbered paper boxes joined
 * by pen arrows. Horizontal on wide screens, vertical on phones. Still an <ol>
 * for screen readers.
 */
const tilts = [-1.2, 0.8, -0.6, 1];
const tints = ["bg-paper-hi", "bg-[#fdf3a7]", "bg-[#e3ecd0]", "bg-[#ffe1d6]"];

export function ProjectFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col items-stretch gap-0 md:flex-row md:items-stretch">
      {steps.map((s, i) => (
        <li key={s} className="flex flex-col items-center md:flex-1 md:flex-row">
          <div
            className={`relative w-full rounded-md border-2 border-ink/80 px-4 pb-4 pt-6 text-[0.97rem] leading-snug shadow-[3px_4px_0_rgb(39_35_31/0.18)] md:h-full ${tints[i % tints.length]}`}
            style={{ rotate: `${tilts[i % tilts.length]}deg` }}
          >
            <span className="absolute -left-3 -top-3 grid size-8 place-items-center rounded-full border-2 border-ink bg-accent-strong font-mono text-xs font-bold text-paper-hi">
              {String(i + 1).padStart(2, "0")}
            </span>
            {s}
          </div>
          {i < steps.length - 1 && (
            <svg aria-hidden="true" viewBox="0 0 40 40" className="my-1 h-9 w-9 shrink-0 rotate-90 text-accent md:mx-1 md:my-0 md:rotate-0" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 22 C 12 14, 22 26, 32 18" />
              <path d="M25 13 L33 18 L26 24" />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
}
