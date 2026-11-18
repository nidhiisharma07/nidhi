import { Squiggle } from "@/components/doodles";
import type { ReactNode } from "react";

type Tone = "grid" | "plain";

export function NotebookPanel({
  children,
  tone = "grid",
  className = "",
  as: Tag = "div",
  taped = false,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  as?: "div" | "article" | "section" | "aside";
  taped?: boolean;
}) {
  return (
    <Tag
      className={`${tone === "grid" ? "paper" : "paper-plain"} ${taped ? "tape" : ""} relative rounded-2xl border-2 border-accent shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7)] ${className}`}
    >
      {children}
    </Tag>
  );
}

export function StickyNote({
  children,
  rotate = 0,
  className = "",
  bg = "bg-paper-hi",
}: {
  children: ReactNode;
  rotate?: number;
  className?: string;
  bg?: string;
}) {
  return (
    <div
      style={{ rotate: `${rotate}deg` }}
      className={`pin rounded-sm ${bg} px-4 pb-3 pt-4 text-ink shadow-[2px_6px_12px_-4px_rgb(0_0_0/0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  side = "left",
  id,
}: {
  index: number;
  eyebrow: string;
  title: string;
  side?: "left" | "right";
  id?: string;
}) {
  const right = side === "right";
  return (
    <div
      className={`relative mb-8 flex items-end gap-4 md:mb-10 ${right ? "md:flex-row-reverse md:text-right" : ""}`}
    >
      {/* Desktop path anchor: the ScrollPath draws a numbered marker here. */}
      <span
        aria-hidden="true"
        data-path-marker={index}
        className="hidden size-12 shrink-0 md:block"
      />
      <div>
        <p className="font-hand text-xl text-accent-hi md:text-2xl">
          <span aria-hidden="true" className="mr-2 font-mono text-sm text-chalk-muted">
            {String(index).padStart(2, "0")}
          </span>
          {eyebrow}
        </p>
        <h2 id={id} data-reveal className="relative inline-block font-serif text-4xl leading-tight text-chalk sm:text-5xl">
          {title}
          <Squiggle reveal className="absolute -bottom-3 left-0 h-3 w-full text-accent" />
        </h2>
      </div>
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-ink/25 bg-paper-hi/70 px-2.5 py-0.5 font-mono text-[0.78rem] text-ink">
      {children}
    </li>
  );
}
