"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export type TerminalData = {
  name: string;
  title: string;
  roleTarget: string;
  location: string;
  email: string;
  github?: string;
  linkedin?: string;
  resumeUrl?: string;
  skills: { category: string; skills: string[] }[];
  projects: { slug: string; title: string; category: string }[];
  experience: { title: string; organization: string; period: string }[];
};

type Line = { id: number; kind: "in" | "out"; node: ReactNode };

const COMMANDS = ["help", "about", "skills", "projects", "experience", "contact", "resume", "hire_me", "clear"] as const;
const SUGGEST = ["help()", "skills()", "projects()", "experience()", "contact()", "hire_me()"];

const linkCls = "text-[#FDDE78] underline decoration-dotted underline-offset-4 hover:text-paper-hi";

/** A tiny notebook-themed Python REPL that answers from the site's own data. */
export function MiniTerminal({ data }: { data: TerminalData }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const run = (raw: string): ReactNode => {
    const cmd = raw.trim().toLowerCase().replace(/^nidhi\./, "").replace(/\(\s*\)$/, "").replace(/;$/, "");
    switch (cmd) {
      case "":
        return null;
      case "help":
        return (
          <>
            <p>available commands:</p>
            <ul className="mt-1 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
              {COMMANDS.map((c) => (
                <li key={c}>
                  <span className="text-[#B7C98A]">{c}()</span>
                </li>
              ))}
            </ul>
          </>
        );
      case "about":
      case "whoami":
        return (
          <>
            <p>
              <span className="text-[#FDDE78]">{data.name}</span>: {data.title}
            </p>
            <p>{data.roleTarget}</p>
            <p className="text-chalk-muted">📍 {data.location}</p>
          </>
        );
      case "skills":
        return (
          <ul className="space-y-0.5">
            {data.skills.map((g) => (
              <li key={g.category}>
                <span className="text-[#B7C98A]">{g.category.toLowerCase().replace(/[^a-z]+/g, "_")}</span> = [
                {g.skills.map((s, k) => (
                  <span key={s}>
                    <span className="text-[#FDDE78]">&quot;{s}&quot;</span>
                    {k < g.skills.length - 1 ? ", " : ""}
                  </span>
                ))}
                ]
              </li>
            ))}
          </ul>
        );
      case "projects":
        return (
          <ul className="space-y-0.5">
            {data.projects.map((p, k) => (
              <li key={p.slug}>
                [{k}] <Link href={`/projects/${p.slug}`} className={linkCls}>{p.title}</Link>{" "}
                <span className="text-chalk-muted"># {p.category}</span>
              </li>
            ))}
          </ul>
        );
      case "experience":
        return (
          <ul className="space-y-0.5">
            {data.experience.map((e) => (
              <li key={e.title + e.organization}>
                <span className="text-[#FDDE78]">{e.organization}</span> → {e.title}{" "}
                <span className="text-chalk-muted"># {e.period}</span>
              </li>
            ))}
          </ul>
        );
      case "contact":
        return (
          <ul className="space-y-0.5">
            <li>
              email&nbsp;&nbsp;&nbsp;= <a href={`mailto:${data.email}`} className={linkCls}>{data.email}</a>
            </li>
            {data.linkedin && (
              <li>
                linkedin = <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>linkedin.com/in/…</a>
              </li>
            )}
            {data.github && (
              <li>
                github&nbsp;&nbsp;&nbsp;= <a href={data.github} target="_blank" rel="noopener noreferrer" className={linkCls}>{data.github.replace("https://", "")}</a>
              </li>
            )}
          </ul>
        );
      case "resume":
      case "cv":
        return data.resumeUrl ? (
          <p>
            opening… <a href={data.resumeUrl} target="_blank" rel="noopener" className={linkCls}>resume.pdf</a>
          </p>
        ) : (
          <p>résumé coming soon</p>
        );
      case "hire_me":
      case "hire":
        return (
          <>
            <p className="text-[#B7C98A]">model.predict(you + nidhi) → 0.99 great fit ✦</p>
            <p>
              say hi at <a href={`mailto:${data.email}`} className={linkCls}>{data.email}</a>
            </p>
          </>
        );
      case "coffee":
        return <p>☕ brewing… done. fuel for the next epoch.</p>;
      case "import antigravity":
      case "import this":
        return <p>Beautiful is better than ugly. Useful is better than clever. ✦</p>;
      case "exit":
      case "quit":
        return <p>nice try 🙂 the notebook stays open. try contact()</p>;
      default:
        return (
          <p>
            <span className="text-accent-hi">NameError</span>: name &apos;{raw.trim()}&apos; is not defined. try{" "}
            <span className="text-[#B7C98A]">help()</span>
          </p>
        );
    }
  };

  const submit = (raw: string) => {
    const cmd = raw.trim().toLowerCase().replace(/\(\s*\)$/, "");
    if (cmd === "clear" || cmd === "cls") {
      setLines([]);
      setValue("");
      return;
    }
    const out = run(raw);
    setLines((ls) => [
      ...ls.slice(-40),
      { id: idRef.current++, kind: "in", node: raw },
      ...(out ? [{ id: idRef.current++, kind: "out" as const, node: out }] : []),
    ]);
    if (raw.trim()) setHistory((h) => [raw, ...h].slice(0, 30));
    setHIdx(-1);
    setValue("");
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-ink bg-[#1f1b18] text-[0.92rem] text-chalk shadow-[5px_6px_0_rgb(39_35_31/0.25)]">
      {/* window bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#2b2521] px-3 py-2">
        <span aria-hidden="true" className="size-3 rounded-full bg-accent" />
        <span aria-hidden="true" className="size-3 rounded-full bg-[#FDDE78]" />
        <span aria-hidden="true" className="size-3 rounded-full bg-deco-green" />
        <span className="ml-2 font-mono text-xs text-chalk-muted">nidhi.py — python 3</span>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="max-h-64 min-h-36 overflow-y-auto px-4 py-3 font-mono leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        <p className="text-chalk-muted"># a tiny REPL that knows about me. type help() and press Enter</p>
        {lines.map((l) =>
          l.kind === "in" ? (
            <p key={l.id} className="mt-2">
              <span className="text-accent-hi">&gt;&gt;&gt;</span> {l.node}
            </p>
          ) : (
            <div key={l.id} className="mt-0.5 pl-0 text-chalk/90">
              {l.node}
            </div>
          ),
        )}
        <form
          className="mt-2 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            submit(value);
          }}
        >
          <label htmlFor={inputId} className="font-mono text-accent-hi">
            <span aria-hidden="true">&gt;&gt;&gt;</span>
            <span className="sr-only">Type a command, for example skills()</span>
          </label>
          <input
            id={inputId}
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" && history.length) {
                e.preventDefault();
                const n = Math.min(hIdx + 1, history.length - 1);
                setHIdx(n);
                setValue(history[n]);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const n = hIdx - 1;
                setHIdx(n);
                setValue(n >= 0 ? history[n] : "");
              }
            }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
            placeholder="help()"
            className="min-w-0 flex-1 bg-transparent font-mono text-chalk caret-accent-hi outline-none placeholder:text-chalk-muted/60"
          />
        </form>
      </div>

      {/* tap-friendly suggestions */}
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-3 py-2.5">
        {SUGGEST.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => submit(s)}
            className="min-h-9 rounded-full border border-white/15 bg-white/5 px-3 font-mono text-xs text-chalk transition-colors hover:border-accent-hi hover:text-accent-hi"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
