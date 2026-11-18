import { ArrowRight, FileText, MapPin } from "lucide-react";
import { siteConfig, isUsableUrl } from "@/lib/site-config";
import { HeroArt } from "@/components/hero-art";
import { CoffeeRing, PaperClip, ScribbleCircle, Squiggle } from "@/components/doodles";
import { Parallax } from "@/components/parallax";
import { NotebookCover } from "@/components/notebook-cover";
import { LazyTerminal } from "@/components/lazy-terminal";
import { skillGroups } from "@/content/skills";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";

/** Renders the headline with the word "useful" highlighted and circled. */
function Headline({ text }: { text: string }) {
  const [before, after] = text.split(/useful/);
  if (after === undefined) return <>{text}</>;
  return (
    <>
      {before}
      <span className="relative inline-block">
        <span className="marker">useful</span>
        <ScribbleCircle className="pointer-events-none absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] text-accent" />
      </span>
      {after}
    </>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="-10 -10 20 20" className={className}>
      <path d="M0 -10 C 1.5 -2, 2 -1.5, 10 0 C 2 1.5, 1.5 2, 0 10 C -1.5 2, -2 1.5, -10 0 C -2 -1.5, -1.5 -2, 0 -10Z" fill="currentColor" />
    </svg>
  );
}

const todo = [
  { text: "ship my portfolio", done: true },
  { text: "build my next ML project", done: false },
  { text: "land my first AI/ML role", done: false },
];

export function Hero() {
  const hasResume = isUsableUrl(siteConfig.resumeUrl);
  const [first, ...rest] = siteConfig.name.split(" ");
  return (
    <section id="home" aria-labelledby="hero-name" className="relative pt-6 sm:pt-10">
      <Parallax tilt={2.5}>
      {/* Open notebook: stacked pages peek out underneath for depth */}
      <div aria-hidden="true" style={{ ["--d" as string]: -10 }} className="depth absolute inset-x-3 bottom-[-10px] top-2 rotate-[0.8deg] rounded-[22px] bg-[#e6d5b8]" />
      <div aria-hidden="true" style={{ ["--d" as string]: -5 }} className="depth absolute inset-x-1.5 bottom-[-5px] top-1 -rotate-[0.5deg] rounded-[22px] bg-[#ecdcc0]" />

      <div className="relative overflow-hidden rounded-[22px] border-[3px] border-accent shadow-[0_30px_60px_-24px_rgb(0_0_0/0.8)]">
        <div className="grid lg:grid-cols-2">
          {/* ───────────── left page ───────────── */}
          <div className="paper relative py-8 pl-11 pr-5 sm:py-12 sm:pl-16 sm:pr-10">
            <span aria-hidden="true" className="binding absolute inset-y-0 left-0 w-8 sm:w-10 lg:hidden" />
            <span aria-hidden="true" className="absolute inset-y-0 left-8 w-px bg-accent/45 sm:left-11" />

            <div aria-hidden="true" className="mb-6 flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft">
              <span>p. 01 · hello, world</span>
              <span className="hidden sm:inline">vol. 2026</span>
            </div>

            <h1 id="hero-name" style={{ ["--d" as string]: 6 }} className="depth relative">
              <span className="block font-hand text-[4.2rem] leading-[0.82] text-accent sm:text-[6.4rem]">
                {first}
                <span aria-hidden="true" className="inline-block -translate-y-8 sm:-translate-y-14"><Sparkle className="twinkle ml-1 inline-block size-5 text-accent sm:size-7" /></span>
              </span>
              <span className="mt-1 block font-hand text-[2.6rem] leading-none text-ink sm:text-6xl">{rest.join(" ")}</span>
              <Squiggle className="mt-1 h-3.5 w-48 text-accent sm:w-72" />
            </h1>

            <p className="mt-4 font-serif text-2xl text-ink sm:text-[1.9rem]">
              {siteConfig.title}
            </p>
            <span aria-hidden="true" className="mt-2 block h-0.5 w-16 rounded bg-accent" />

            <p className="mt-5 max-w-xl font-serif text-[1.7rem] leading-[1.12] text-accent-ink sm:text-[2.5rem]">
              <Headline text={siteConfig.headline} />
            </p>

            <p className="mt-5 max-w-xl border-l-4 border-accent pl-3 text-[1.05rem] text-ink sm:text-lg">
              <strong className="font-semibold">{siteConfig.roleTarget}</strong>
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-strong px-6 font-semibold text-paper-hi shadow-[0_4px_0_#8f2a1c] transition-transform hover:-translate-y-0.5 hover:bg-[#a8321f] active:translate-y-0.5 active:shadow-[0_1px_0_#8f2a1c]"
              >
                Explore My Work <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              {hasResume && (
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-ink bg-paper-hi/70 px-6 font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <FileText aria-hidden="true" className="size-4" /> View Résumé
                  <span className="sr-only">(PDF, opens in a new tab)</span>
                </a>
              )}
            </div>

            <p className="mt-7 max-w-lg text-ink-soft">{siteConfig.description}</p>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.16em] text-accent-ink">
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="size-4" /> {siteConfig.location.split(",")[0]}, India
              </span>
              <span aria-hidden="true">•</span>
              <span>IST · UTC+5:30</span>
            </p>
          </div>

          {/* ───────────── right page ───────────── */}
          <div className="paper relative overflow-hidden px-5 pb-10 pt-6 sm:px-10 lg:pt-12">
            {/* spine shadow between the two pages */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden w-14 bg-gradient-to-r from-[rgb(39_35_31/0.16)] to-transparent lg:block" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[rgb(39_35_31/0.1)] to-transparent lg:hidden" />
            <CoffeeRing className="pointer-events-none absolute -bottom-12 -right-10 size-52 rotate-12" />

            {/* torn note, taped */}
            <div
              aria-hidden="true"
              className="depth float-c tape absolute right-4 top-6 z-10 hidden rotate-[4deg] bg-paper-hi px-5 py-3 shadow-[2px_6px_12px_-4px_rgb(0_0_0/0.4)] sm:block"
              style={{
                clipPath: "polygon(0 4%, 8% 0, 22% 5%, 38% 1%, 55% 6%, 72% 0, 88% 5%, 100% 2%, 98% 96%, 84% 100%, 66% 95%, 48% 100%, 30% 96%, 12% 100%, 0 95%)",
                ["--tape-color" as string]: "rgb(217 75 57 / 0.4)",
                ["--d" as string]: 24,
              }}
            >
              <p className="font-hand text-2xl leading-tight text-ink">
                fresh grad,
                <br />
                full of ideas <span className="text-accent">✦</span>
              </p>
            </div>

            <div style={{ ["--d" as string]: 16 }} className="depth">
              <HeroArt className="float-a relative mx-auto mt-4 h-auto w-full max-w-[34rem] lg:mt-10" />
            </div>

            {/* to-do sticky with a paper clip */}
            <div style={{ ["--d" as string]: 20 }} className="depth float-d relative mx-auto mt-2 w-64 rotate-[-3deg] bg-[#fdf3a7] px-5 pb-4 pt-5 text-ink shadow-[3px_8px_14px_-6px_rgb(0_0_0/0.5)] lg:absolute lg:bottom-8 lg:left-8 lg:mt-0 lg:w-56">
              <PaperClip className="absolute -top-6 right-6 h-14 w-5 -rotate-6" />
              <p className="font-hand text-2xl leading-none">today’s to-do</p>
              <ul className="mt-2 space-y-1 font-hand text-xl leading-tight">
                {todo.map((t) => (
                  <li key={t.text} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-0.5 grid size-4 shrink-0 place-items-center border-2 border-ink/70 text-xs leading-none text-accent-ink">
                      {t.done ? "✓" : ""}
                    </span>
                    <span className={t.done ? "line-through decoration-accent decoration-2" : ""}>
                      {t.text}
                      {t.done && <span className="sr-only"> (done)</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ───────────── bottom strip: what I believe ───────────── */}
        <div className="paper-plain relative border-t-2 border-dashed border-accent/40 px-5 pb-10 pt-8 sm:px-12">
          <p className="font-serif text-xl text-accent-ink">
            3 things I build by <span aria-hidden="true" className="font-hand text-2xl">↓</span>
          </p>
          <ul className="mt-7 grid gap-8 sm:grid-cols-3" aria-label="Principles">
            {siteConfig.principles.map((p, i) => {
              const styles = [
                // ruled index card with a clip
                "index-card rotate-[-2deg] pt-7",
                // graph paper with tape
                "paper tape rotate-[1.5deg]",
                // kraft paper with a pin
                "pin rotate-[-1deg] bg-[#d9bf98]",
              ];
              return (
                <li key={p} style={{ ["--d" as string]: [9, 14, 11][i] }} className={`depth relative ${["float-b", "float-a", "float-c"][i]}`}>
                  {i === 0 && <PaperClip className="absolute -top-6 left-8 z-10 h-14 w-5 rotate-[8deg]" />}
                  <div className={`relative h-full min-h-28 rounded-sm px-5 pb-5 pt-6 text-ink shadow-[3px_8px_16px_-8px_rgb(0_0_0/0.55)] ${styles[i]}`}>
                    <span aria-hidden="true" className="block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
                      rule #{i + 1}
                    </span>
                    <span className="mt-1 block font-hand text-[1.75rem] leading-tight">{p}</span>
                    <Squiggle className="mt-1 h-2.5 w-28 text-accent" />
                  </div>
                </li>
              );
            })}
          </ul>
          {/* mini terminal: ask the notebook */}
          <div className="mt-12 grid items-center gap-6 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <p className="font-serif text-xl text-accent-ink">
                or ask my notebook <span aria-hidden="true" className="font-hand text-2xl">↓</span>
              </p>
              <p className="mt-2 max-w-sm font-hand text-2xl leading-snug text-ink-soft">
                it’s a tiny Python prompt. try <span className="text-accent-ink">skills()</span>,{" "}
                <span className="text-accent-ink">projects()</span> or{" "}
                <span className="text-accent-ink">hire_me()</span> ✦
              </p>
            </div>
            <LazyTerminal
              data={{
                name: siteConfig.name,
                title: siteConfig.title,
                roleTarget: siteConfig.roleTarget,
                location: siteConfig.location,
                email: siteConfig.email,
                github: isUsableUrl(siteConfig.github) ? siteConfig.github : undefined,
                linkedin: isUsableUrl(siteConfig.linkedin) ? siteConfig.linkedin : undefined,
                resumeUrl: hasResume ? siteConfig.resumeUrl : undefined,
                skills: skillGroups,
                projects: projects.map((p) => ({ slug: p.slug, title: p.title, category: p.category })),
                experience: experience
                  .filter((e) => e.kind !== "education")
                  .map((e) => ({ title: e.title, organization: e.organization, period: e.period })),
              }}
            />
          </div>

          {/* ruler edge along the bottom of the page */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-3 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #27231F 0 1px, transparent 1px 10px), repeating-linear-gradient(90deg, #27231F 0 1px, transparent 1px 50px)",
              backgroundSize: "auto 6px, auto 12px",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "0 100%, 0 100%",
            }}
          />
          <Sparkle className="twinkle absolute right-8 top-6 size-5 text-accent" />
          <Sparkle className="twinkle twinkle-2 absolute bottom-8 right-1/3 size-3 text-deco-blue" />
        </div>
      </div>
      <NotebookCover />
      </Parallax>
    </section>
  );
}
