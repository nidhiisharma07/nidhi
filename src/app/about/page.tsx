import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, FileText, GraduationCap } from "lucide-react";
import { siteConfig, isUsableUrl } from "@/lib/site-config";
import { Parallax } from "@/components/parallax";
import { RotatingChip } from "@/components/rotating-chip";
import { CurlyArrow, Squiggle } from "@/components/doodles";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Nidhi Sharma: B.Tech CSE (AI & ML) 2026 graduate, former AI/ML intern at Ethara AI, building machine learning models and the software around them.",
};

const alsoChip = [
  "an RLHF / LLM-eval intern",
  "a full-stack web developer",
  "a hackathon regular",
  "an event organiser",
];

const alsoList = [
  "machine learning models",
  "LLM evaluation & RLHF",
  "NLP pipelines",
  "REST APIs & backends",
  "full-stack web apps",
];

const coreStack = ["Python", "scikit-learn", "TensorFlow", "SQL", "Flask", "Node.js"];

const workOn = [
  {
    term: "Machine Learning",
    text: "Classification models, feature engineering and model evaluation with scikit-learn and TensorFlow.",
  },
  {
    term: "LLM Evaluation",
    text: "RLHF and MCP-based workflows to improve large language model responses.",
  },
  {
    term: "Full-stack Apps",
    text: "REST APIs and web apps with Flask, Node.js and Express on top of SQL and MongoDB.",
  },
];

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="-10 -10 20 20" className={`pointer-events-none absolute ${className}`}>
      <path d="M0 -10 C 1.5 -2, 2 -1.5, 10 0 C 2 1.5, 1.5 2, 0 10 C -1.5 2, -2 1.5, -10 0 C -2 -1.5, -1.5 -2, 0 -10Z" fill="currentColor" />
    </svg>
  );
}

function StripedTape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-20 h-9 w-28 shadow-sm ${className}`}
      style={{
        background: "repeating-linear-gradient(135deg, rgb(217 75 57 / 0.75) 0 7px, rgb(255 241 217 / 0.8) 7px 14px)",
      }}
    />
  );
}

/** grid paper with a torn top edge */
const tornTop =
  "polygon(0 14px, 3% 6px, 7% 13px, 11% 4px, 15% 12px, 20% 5px, 25% 13px, 30% 6px, 35% 12px, 40% 4px, 45% 13px, 50% 6px, 55% 12px, 60% 5px, 65% 13px, 70% 6px, 75% 12px, 80% 4px, 85% 13px, 90% 6px, 95% 12px, 100% 5px, 100% 100%, 0 100%)";

export default function AboutPage() {
  const hasResume = isUsableUrl(siteConfig.resumeUrl);
  const [first] = siteConfig.name.split(" ");

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-8 sm:pt-12">
      <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-chalk-muted hover:text-chalk">
        <ArrowLeft aria-hidden="true" className="size-4" /> Back to the notebook
      </Link>

      <Parallax tilt={2} className="mt-8">
        {/* tab label on the top-left */}
        <p className="depth absolute -top-9 left-24 z-30 -rotate-3 font-hand text-3xl text-chalk sm:left-32" style={{ ["--d" as string]: 14 }}>
          hey, I’m {first} <span className="text-accent-hi">✦</span>
        </p>
        <StripedTape className="-left-3 top-1 -rotate-[24deg]" />
        <StripedTape className="-right-3 top-1 rotate-[24deg]" />

        <div className="drop-shadow-[0_24px_28px_rgb(0_0_0/0.55)]">
        <article
          className="paper relative overflow-hidden rounded-b-2xl border-r-[10px] border-accent px-6 pb-12 pt-14 sm:px-14 sm:pt-16"
          style={{ clipPath: tornTop }}
        >
          <Spark className="left-6 top-24 size-5 text-accent sm:left-9" />
          <Spark className="right-[24%] top-[33%] size-4 text-accent/80" />
          <Spark className="left-[45%] top-[52%] hidden size-4 text-accent sm:block" />

          {/* round stamp */}
          <span
            aria-hidden="true"
            className="depth absolute right-6 top-14 hidden size-20 rotate-12 sm:grid place-items-center rounded-full border-2 border-dashed border-accent bg-paper-hi/80 text-center font-mono text-[0.62rem] font-bold uppercase leading-tight tracking-widest text-accent-ink sm:right-12 sm:size-24"
            style={{ ["--d" as string]: 18 }}
          >
            about
            <br />
            me ✦
          </span>

          <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink sm:pr-28 sm:text-sm">
            <span aria-hidden="true" className="text-accent">★ </span>
            AI/ML Developer · Machine Learning · Full Stack
          </p>

          <h1 className="mt-6 max-w-3xl font-serif sm:pr-16 text-[2.1rem] leading-[1.15] text-accent sm:text-5xl">
            I turn messy data into machine learning models, and models into{" "}
            <span className="relative inline-block">
              software people can use.
              <Squiggle className="absolute -bottom-3 left-0 h-3.5 w-full text-accent" />
            </span>
          </h1>

          <p className="mt-8 font-hand text-2xl text-ink-soft">
            prev. @ Ethara AI · @ Oasis Infobyte · NIET ’26
          </p>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="font-mono text-sm leading-relaxed text-ink">
                I’m an AI/ML developer
                <br />
                but I’m also…
              </p>
              <p className="mt-3">
                <RotatingChip items={alsoChip} />
              </p>

              <p className="mt-10 font-mono text-sm leading-relaxed text-ink">
                and I spend my time on…
              </p>
              <ul className="mt-3 space-y-2">
                {alsoList.map((t) => (
                  <li key={t} className="flex items-center gap-3 font-hand text-[1.75rem] leading-tight text-accent-ink">
                    <span aria-hidden="true" className="text-base text-accent">★</span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="depth mt-10 max-w-sm rotate-[-1.5deg] bg-[#e3ecd0] px-5 py-4 text-ink shadow-[3px_8px_16px_-8px_rgb(0_0_0/0.55)]" style={{ ["--d" as string]: 12 }}>
                <p className="flex items-center gap-2 font-hand text-2xl">
                  <GraduationCap aria-hidden="true" className="size-5 text-accent-ink" /> Education
                </p>
                <p className="mt-1">B.Tech, CSE (AI & ML)</p>
                <p className="text-sm text-ink-soft">NIET, Greater Noida · 2022 – 2026</p>
              </div>
            </div>

            {/* portrait polaroid */}
            <div className="depth relative mx-auto w-[85%] max-w-[20rem] lg:mt-[-2rem]" style={{ ["--d" as string]: 22 }}>
              <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 size-5 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#ff8a7f,#d94b39_60%,#8f2a1c)] shadow-[0_3px_4px_rgb(0_0_0/0.35)]" />
              <figure className="tilt bg-[#fffaf0] p-3 pb-2 shadow-[4px_16px_28px_-10px_rgb(0_0_0/0.7)]" style={{ ["--tilt" as string]: "2.5deg" }}>
                <div className="relative aspect-[4/5] overflow-hidden bg-ink/10">
                  <Image
                    src="/nidhi.webp"
                    alt="Nidhi Sharma smiling, holding a bouquet of sunflowers and roses outdoors"
                    fill
                    priority
                    quality={85}
                    sizes="(min-width: 1024px) 320px, 80vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="pt-2.5 text-center font-hand text-3xl leading-none text-accent-ink">{first}</figcaption>
              </figure>
              <p aria-hidden="true" className="mt-4 flex items-center justify-center gap-1 font-hand text-2xl text-ink">
                <CurlyArrow className="h-9 w-12 rotate-[70deg] text-accent" /> that’s me!
              </p>
            </div>
          </div>

          {/* coffee mug doodle */}
          <svg aria-hidden="true" viewBox="0 0 60 50" className="absolute bottom-6 right-10 hidden h-12 w-14 text-accent sm:block" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M8 18 h32 v16 a10 10 0 0 1 -10 10 h-12 a10 10 0 0 1 -10 -10 Z" />
            <path d="M40 22 c 10 0 10 14 0 14" />
            <path className="steam" d="M18 12 c -4 -4 4 -6 0 -10" />
            <path className="steam steam-2" d="M28 12 c -4 -4 4 -6 0 -10" />
          </svg>
        </article>
        </div>
      </Parallax>

      {/* full story / résumé */}
      {hasResume && (
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="font-hand text-3xl text-chalk">
            want the full story? <span className="text-accent-hi">✦</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={siteConfig.resumeUrl}
              download="Nidhi-Sharma-Resume.pdf"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-strong px-6 font-semibold text-paper-hi shadow-[0_4px_0_#8f2a1c] transition-transform hover:-translate-y-0.5"
            >
              <Download aria-hidden="true" className="size-4" /> Download Résumé
            </a>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-chalk/80 px-6 font-semibold text-chalk transition-colors hover:bg-chalk hover:text-ink"
            >
              <FileText aria-hidden="true" className="size-4" /> View Résumé
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          </div>
        </div>
      )}

      {/* core stack + what I work on */}
      <div className="mt-14 grid items-start gap-8 md:grid-cols-[1fr_2fr]">
        <section aria-labelledby="stack-title" className="tape relative rotate-[-1deg] rounded-md bg-paper-hi p-6 text-ink shadow-[3px_10px_20px_-10px_rgb(0_0_0/0.7)]" style={{ ["--tape-color" as string]: "rgb(253 222 120 / 0.8)" }}>
          <h2 id="stack-title" className="font-serif text-3xl">Core Stack</h2>
          <ul className="mt-4 space-y-1.5 font-mono text-[0.95rem]">
            {coreStack.map((t) => (
              <li key={t}>
                <span aria-hidden="true" className="text-accent">· </span>
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="workon-title" className="paper relative rounded-md border-2 border-accent p-6 text-ink shadow-[3px_10px_20px_-10px_rgb(0_0_0/0.7)] sm:p-8">
          <h2 id="workon-title" className="font-serif text-3xl">What I Work On</h2>
          <p className="mt-1 font-hand text-2xl text-accent-ink">models, evaluation, and the apps around them</p>
          <dl className="mt-5 space-y-4">
            {workOn.map((w) => (
              <div key={w.term} className="border-l-4 border-accent/70 pl-4">
                <dt className="font-serif text-xl">{w.term}</dt>
                <dd className="mt-0.5 leading-relaxed text-ink-soft">{w.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
