"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * A spiral-bound notebook cover that sits over the hero on the first visit of
 * a session and flips open (top-bound, like a reporter's notebook).
 * Opens by itself after a moment, or on click / key / scroll.
 *
 * Visibility is decided before paint by the inline script in layout.tsx:
 * shown only when JS runs, motion is allowed and it has not been opened in
 * this session. The hero underneath is fully rendered and accessible.
 */
export function NotebookCover() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"closed" | "opening" | "gone">("closed");

  useEffect(() => {
    const el = ref.current;
    if (!el || getComputedStyle(el).display === "none") {
      setState("gone");
      return;
    }
    let done = false;
    const open = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem("cover-seen", "1");
      } catch {}
      setState("opening");
      window.setTimeout(() => {
        setState("gone");
        document.documentElement.classList.add("cover-seen");
      }, 1150);
    };
    const t = window.setTimeout(open, 1500);
    const onKey = () => open();
    window.addEventListener("keydown", onKey, { once: true });
    window.addEventListener("wheel", open, { once: true, passive: true });
    window.addEventListener("touchmove", open, { once: true, passive: true });
    el.addEventListener("click", open);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", open);
      window.removeEventListener("touchmove", open);
      el.removeEventListener("click", open);
    };
  }, []);

  if (state === "gone") return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="notebook-cover absolute inset-0 z-40 [perspective:1600px]"
    >
      <div className={`cover-leaf relative size-full ${state === "opening" ? "cover-open" : ""}`}>
        {/* front of the cover */}
        <div className="cover-face absolute inset-0 overflow-hidden rounded-[22px] border-[3px] border-[#5e1a10] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.85)]">
          {/* linen texture */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgb(255 255 255 / 0.035) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgb(0 0 0 / 0.06) 0 1px, transparent 1px 4px), radial-gradient(120% 90% at 30% 20%, #c8432f, #9c2f1f 60%, #7a2216)",
            }}
          />
          {/* elastic band */}
          <span className="absolute inset-y-0 right-[9%] w-3.5 bg-[#2b201b] shadow-[inset_2px_0_0_rgb(255_255_255/0.08),2px_0_6px_rgb(0_0_0/0.4)]" />
          {/* corner doodles stamped in cream */}
          <svg viewBox="0 0 120 120" className="absolute left-[6%] top-[16%] h-24 w-24 opacity-40 sm:h-32 sm:w-32" fill="none" stroke="#FFF1D9" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="20" cy="30" r="6" /><circle cx="20" cy="60" r="6" /><circle cx="20" cy="90" r="6" />
            <circle cx="60" cy="45" r="6" /><circle cx="60" cy="75" r="6" />
            <circle cx="100" cy="60" r="7" />
            <path d="M26 30 L54 45 M26 30 L54 75 M26 60 L54 45 M26 60 L54 75 M26 90 L54 45 M26 90 L54 75 M66 45 L93 60 M66 75 L93 60" />
          </svg>
          <svg viewBox="0 0 120 80" className="absolute bottom-[10%] left-[8%] h-16 w-24 opacity-35 sm:h-20 sm:w-32" fill="none" stroke="#FFF1D9" strokeWidth="2.2" strokeLinecap="round">
            <path d="M8 70 V10 M8 70 H112" />
            <path d="M14 18 C 34 52, 56 60, 108 64" />
          </svg>

          {/* label plate */}
          <div className="absolute left-1/2 w-[min(80%,26rem)] -translate-x-1/2 -translate-y-1/2" style={{ top: "min(44vh, 50%)" }}>
          <div className="rotate-[-1.5deg] rounded-md border-2 border-[#5e1a10]/40 bg-paper-hi px-6 py-5 text-center text-ink shadow-[0_8px_18px_-6px_rgb(0_0_0/0.6)] sm:px-8 sm:py-7">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-ink-soft sm:text-xs">notebook no. 01 · 2026</p>
            <p className="mt-2 font-hand text-5xl leading-none text-accent sm:text-6xl">{siteConfig.name}</p>
            <span className="mx-auto mt-3 block h-px w-3/4 bg-ink/30" />
            <p className="mt-3 font-serif text-lg sm:text-xl">{siteConfig.title}</p>
            <p className="mt-1 font-hand text-lg text-ink-soft">models · experiments · things I built</p>
          </div>
          <p className="cover-hint relative left-1/2 mt-6 inline-block whitespace-nowrap font-hand text-2xl text-paper-hi/90">
            tap to open ✦
          </p>
          </div>
        </div>
        {/* back of the cover (seen while flipping) */}
        <div className="cover-back absolute inset-0 rounded-[22px] bg-[#e9d9bd]" />
      </div>

      {/* spiral rings along the top edge */}
      <div
        className="pointer-events-none absolute -top-3 left-6 right-6 z-50 h-7"
        style={{
          background:
            "radial-gradient(ellipse 5px 11px at 50% 55%, transparent 3px, #3a3330 3.6px, #9a928a 5px, #3a3330 5.6px, transparent 6px) 0 0 / 26px 100% repeat-x",
        }}
      />
    </div>
  );
}
