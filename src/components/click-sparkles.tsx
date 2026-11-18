"use client";

import { useEffect } from "react";

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Click ink: wherever the user clicks, a hand-drawn red asterisk is quickly
 * sketched with six short pen strokes and then fades away, like a mark in the
 * margin of a notebook. Decorative only (pointer-events none, aria-hidden);
 * skipped under prefers-reduced-motion.
 */
export function ClickSparkles() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden";
    document.body.appendChild(layer);

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const size = 64;
      const svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("viewBox", "-32 -32 64 64");
      svg.setAttribute("width", String(size));
      svg.setAttribute("height", String(size));
      const tiltDeg = Math.random() * 60 - 30;
      svg.style.cssText = `position:absolute;left:${e.clientX - size / 2}px;top:${e.clientY - size / 2}px;overflow:visible;rotate:${tiltDeg}deg`;

      // three crossing strokes = six rays, each a slightly wobbly pen line
      for (let k = 0; k < 6; k++) {
        const a = (k / 6) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
        const r0 = 2 + Math.random() * 2;
        const r1 = 15 + Math.random() * 7;
        const bend = (Math.random() - 0.5) * 2.4;
        const x0 = Math.cos(a) * r0, y0 = Math.sin(a) * r0;
        const x1 = Math.cos(a) * r1, y1 = Math.sin(a) * r1;
        const mx = (x0 + x1) / 2 - Math.sin(a) * bend;
        const my = (y0 + y1) / 2 + Math.cos(a) * bend;
        const p = document.createElementNS(SVG_NS, "path");
        p.setAttribute("d", `M${x0.toFixed(1)} ${y0.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`);
        p.setAttribute("fill", "none");
        p.setAttribute("stroke", "#D94B39");
        p.setAttribute("stroke-width", (2.4 + Math.random() * 1.2).toFixed(1));
        p.setAttribute("stroke-linecap", "round");
        svg.appendChild(p);
        const len = r1 - r0 + 4;
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
        p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
          duration: 170,
          delay: k * 22,
          easing: "cubic-bezier(.3,.7,.4,1)",
          fill: "forwards",
        });
      }
      layer.appendChild(svg);

      svg.animate(
        [
          { transform: "scale(0.7)", opacity: 1 },
          { transform: "scale(1)", opacity: 1, offset: 0.35 },
          { transform: "scale(1.04)", opacity: 0.85, offset: 0.55 },
          { transform: "scale(1.08)", opacity: 0 },
        ],
        { duration: 900, easing: "ease-out", fill: "forwards" },
      ).onfinish = () => svg.remove();
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      layer.remove();
    };
  }, []);
  return null;
}
