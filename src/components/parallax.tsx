"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Cursor-reactive notebook page.
 * - The page tilts a few degrees toward the pointer (3D).
 * - Children marked `data-depth="N"` drift N px with the pointer, so layers
 *   (notes, photos, sparkles) float at different depths.
 * - A soft light follows the pointer across the paper.
 * Pointer devices only; disabled under prefers-reduced-motion.
 * One rAF loop runs only while the values are still easing.
 */
export function Parallax({
  children,
  className = "",
  tilt = 3,
}: {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees */
  tilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let tx = 0, ty = 0, x = 0, y = 0; // target and current, -1..1
    let sx = 0, sy = 0, glow = 0, glowT = 0;
    let raf = 0;
    let box = el.getBoundingClientRect();

    const tick = () => {
      x += (tx - x) * 0.1;
      y += (ty - y) * 0.1;
      glow += (glowT - glow) * 0.12;
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
      el.style.setProperty("--sx", `${sx}px`);
      el.style.setProperty("--sy", `${sy}px`);
      el.style.setProperty("--glow", glow.toFixed(3));
      const settled = Math.abs(tx - x) < 0.001 && Math.abs(ty - y) < 0.001 && Math.abs(glowT - glow) < 0.005;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = Math.max(-1, Math.min(1, ((e.clientX - box.left) / box.width) * 2 - 1));
      ty = Math.max(-1, Math.min(1, ((e.clientY - box.top) / box.height) * 2 - 1));
      sx = e.clientX - box.left;
      sy = e.clientY - box.top;
      glowT = 1;
      kick();
    };
    const onEnter = () => {
      box = el.getBoundingClientRect();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      glowT = 0;
      kick();
    };
    const onScroll = () => {
      box = el.getBoundingClientRect();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    el.dataset.parallax = "on";
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      delete el.dataset.parallax;
    };
  }, []);

  return (
    <div ref={ref} className={`parallax ${className}`} style={{ ["--ptilt" as string]: `${tilt}deg` }}>
      {children}
      <span aria-hidden="true" className="parallax-light" />
    </div>
  );
}
