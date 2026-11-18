"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section crosses the middle band of the viewport.
 * A short dwell before committing prevents flicker at boundaries (PRD 7.1).
 */
export function useActiveSection(ids: string[], enabled = true, dwellMs = 120) {
  const [active, setActive] = useState<string>("home");
  const key = ids.join(",");

  useEffect(() => {
    if (!enabled) return;
    const sectionIds = key.split(",");
    const els = ["home", ...sectionIds]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    let pending: string | null = null;
    let timer: number | undefined;
    const visible = new Set<string>();

    const commit = () => {
      // Pick the last visible section in document order (the one in the middle band).
      const next = els.map((e) => e.id).filter((id) => visible.has(id)).pop();
      if (!next || next === pending) return;
      pending = next;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setActive(next);
        const hash = next === "home" ? "" : `#${next}`;
        if (location.pathname === "/" && location.hash !== hash) {
          history.replaceState(null, "", hash || location.pathname);
        }
      }, dwellMs);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        commit();
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [key, enabled, dwellMs]);

  return active;
}
