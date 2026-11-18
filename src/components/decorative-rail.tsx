"use client";

import { useEffect, useRef } from "react";

/**
 * Columns of red ink stamps (AI/ML doodles) down both gutters on wide screens.
 * One SVG sprite repeated with CSS; the columns drift at half the scroll
 * speed for a little depth. Purely decorative and never a navigation route.
 */
export function DecorativeRails() {
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = reduce ? 0 : -window.scrollY * 0.5;
      left.current?.style.setProperty("--rail-y", `${y}px`);
      right.current?.style.setProperty("--rail-y", `${y}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const base =
    "pointer-events-none fixed inset-y-0 z-0 hidden w-[60px] bg-[url('/rail-stamps.svg')] bg-repeat-y opacity-90 [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)] min-[1360px]:block";
  return (
    <>
      <div ref={left} aria-hidden="true" className={`${base} left-4 [background-position:0_var(--rail-y,0px)]`} />
      <div
        ref={right}
        aria-hidden="true"
        className={`${base} right-4 [background-position:0_calc(var(--rail-y,0px)-390px)]`}
      />
    </>
  );
}
