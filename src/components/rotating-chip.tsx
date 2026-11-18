"use client";

import { useEffect, useState } from "react";

/**
 * A highlighted label that flips through phrases.
 * Screen readers get the full list once (sr-only); the animated chip is aria-hidden.
 * Under reduced motion it stays on the first phrase.
 */
export function RotatingChip({ items, interval = 2400 }: { items: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % items.length), interval);
    return () => window.clearInterval(t);
  }, [items.length, interval]);

  return (
    <>
      <span className="sr-only">{items.join(", ")}</span>
      <span aria-hidden="true" className="relative inline-grid -rotate-2 overflow-hidden rounded-sm bg-accent-strong px-3 py-1 align-middle shadow-[3px_4px_0_rgb(39_35_31/0.25)]">
        {items.map((t, k) => (
          <span
            key={t}
            className="col-start-1 row-start-1 whitespace-nowrap font-hand text-[1.7rem] leading-tight text-paper-hi transition-all duration-500 ease-out"
            style={{
              opacity: k === i ? 1 : 0,
              visibility: k === i ? "visible" : "hidden",
              transform: `translateY(${k === i ? 0 : k === (i - 1 + items.length) % items.length ? -110 : 110}%)`,
            }}
          >
            {t}
          </span>
        ))}
      </span>
    </>
  );
}
