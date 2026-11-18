"use client";

import { useEffect, useRef, useState } from "react";

type Pt = { x: number; y: number; n: number };

const MIN_WIDTH = 768; // below this a static CSS dotted line is used instead (PRD 11.1)

/**
 * Winding red path behind the content. Geometry is measured at runtime from
 * [data-path-marker] anchors (never hardcoded) and rebuilt on resize, font
 * load, and image load, all coalesced into one requestAnimationFrame.
 */
export function ScrollPath() {
  const hostRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [geo, setGeo] = useState<{ d: string; pts: Pt[]; w: number; h: number } | null>(null);
  const [current, setCurrent] = useState(-1);
  const lenRef = useRef(0);

  // ---- geometry ----
  useEffect(() => {
    const host = hostRef.current;
    const container = host?.parentElement;
    if (!host || !container) return;
    let raf = 0;

    const measure = () => {
      raf = 0;
      if (window.innerWidth < MIN_WIDTH) return setGeo(null);
      const box = container.getBoundingClientRect();
      const anchors = Array.from(container.querySelectorAll<HTMLElement>("[data-path-marker]"));
      // batch all reads first
      const pts: Pt[] = anchors.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2, n: Number(el.dataset.pathMarker) };
      });
      if (pts.length < 2) return setGeo(null);
      const w = box.width;
      const h = container.scrollHeight;
      // start just under the hero, wander between markers, trail off at the end
      const start = { x: w / 2, y: Math.max(0, pts[0].y - 160), n: 0 };
      const all = [start, ...pts];
      let d = `M ${start.x} ${start.y}`;
      for (let i = 1; i < all.length; i++) {
        const a = all[i - 1];
        const b = all[i];
        const my = (a.y + b.y) / 2;
        // overshoot sideways a little for a hand-drawn swing
        const swing = (i % 2 ? 1 : -1) * Math.min(80, w * 0.06);
        d += ` C ${a.x + swing} ${my} ${b.x - swing} ${my} ${b.x} ${b.y}`;
      }
      const last = all[all.length - 1];
      d += ` C ${last.x} ${last.y + 120} ${w / 2} ${last.y + 140} ${w / 2} ${Math.min(h, last.y + 260)}`;
      setGeo({ d, pts, w, h });
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(container);
    document.fonts?.ready.then(schedule);
    const imgs = Array.from(container.querySelectorAll("img"));
    imgs.forEach((img) => !img.complete && img.addEventListener("load", schedule, { once: true }));
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      imgs.forEach((img) => img.removeEventListener("load", schedule));
    };
  }, []);

  // ---- reveal on scroll (one rAF-throttled handler; reads cached geometry only) ----
  useEffect(() => {
    const path = pathRef.current;
    const host = hostRef.current;
    if (!geo || !path || !host) return;
    const len = path.getTotalLength();
    lenRef.current = len;
    path.style.strokeDasharray = `${len}`;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hostTop = host.getBoundingClientRect().top + window.scrollY;
    let raf = 0;

    const update = () => {
      raf = 0;
      const line = window.scrollY + window.innerHeight * 0.55 - hostTop;
      const p = reduce ? 1 : Math.min(1, Math.max(0, line / geo.h));
      path.style.strokeDashoffset = `${len * (1 - p)}`;
      let cur = -1;
      geo.pts.forEach((pt, i) => {
        if (pt.y <= line) cur = i;
      });
      setCurrent(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      hostTop = host.getBoundingClientRect().top + window.scrollY;
      onScroll();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [geo]);

  return (
    <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden md:block">
      {geo && (
        <svg width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} className="absolute left-0 top-0 overflow-visible">
          {/* faint full route so the reader sees where it goes */}
          <path d={geo.d} fill="none" stroke="#D94B39" strokeOpacity="0.16" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
          <path ref={pathRef} d={geo.d} fill="none" stroke="#D94B39" strokeWidth="3.5" strokeLinecap="round" />
          {geo.pts.map((pt, i) => {
            const on = i === current;
            const passed = i <= current;
            return (
              <g key={pt.n} transform={`translate(${pt.x} ${pt.y})`}>
                {on && <circle r="27" fill="none" stroke="#FF6A5E" strokeWidth="2" strokeDasharray="4 4" />}
                <circle r={on ? 21 : 18} fill={passed ? "#D94B39" : "#292725"} stroke="#D94B39" strokeWidth="2.5" />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="var(--font-mono)"
                  fontSize="13"
                  fontWeight="700"
                  fill={passed ? "#FFF1D9" : "#F2E6D4"}
                >
                  {String(pt.n).padStart(2, "0")}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
