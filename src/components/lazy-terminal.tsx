"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { TerminalData } from "@/components/mini-terminal";

const MiniTerminal = dynamic(() => import("@/components/mini-terminal").then((m) => m.MiniTerminal), {
  ssr: false,
  loading: () => <TerminalShell />,
});

/** Same frame as the real terminal, shown until it loads (keeps layout stable). */
function TerminalShell() {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-ink bg-[#1f1b18] text-[0.92rem] text-chalk shadow-[5px_6px_0_rgb(39_35_31/0.25)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#2b2521] px-3 py-2">
        <span aria-hidden="true" className="size-3 rounded-full bg-accent" />
        <span aria-hidden="true" className="size-3 rounded-full bg-[#FDDE78]" />
        <span aria-hidden="true" className="size-3 rounded-full bg-deco-green" />
        <span className="ml-2 font-mono text-xs text-chalk-muted">nidhi.py — python 3</span>
      </div>
      <div className="min-h-36 px-4 py-3 font-mono leading-relaxed">
        <p className="text-chalk-muted"># a tiny REPL that knows about me. loading…</p>
        <p className="mt-2 text-accent-hi">&gt;&gt;&gt; <span className="animate-pulse">▍</span></p>
      </div>
      <div className="h-[3.25rem] border-t border-white/10" />
    </div>
  );
}

/** Loads the interactive terminal only when it comes near the viewport. */
export function LazyTerminal({ data }: { data: TerminalData }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{show ? <MiniTerminal data={data} /> : <TerminalShell />}</div>;
}
