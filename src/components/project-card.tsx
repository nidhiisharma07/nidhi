import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon as Github } from "@/components/brand-icons";
import type { Project } from "@/types/portfolio";
import { isUsableUrl } from "@/lib/site-config";
import { NotebookPanel, Tag } from "@/components/notebook";
import { PaperClip, Stamp } from "@/components/doodles";

const accentHex = { terracotta: "#D94B39", blue: "#315DA7", green: "#77943C" } as const;

/** A hand-drawn wireframe sketch of the project, shown until a screenshot exists. */
export function ProjectPlaceholder({ project }: { project: Project }) {
  const c = accentHex[project.accent ?? "terracotta"];
  const ink = "#27231F";
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-paper-hi">
      <svg aria-hidden="true" viewBox="0 0 320 200" className="absolute inset-0 size-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* browser chrome */}
        <path d="M10 12 Q160 9 310 12 L309 188 Q160 191 11 188 Z" stroke={ink} strokeWidth="2" />
        <path d="M11 32 Q160 30 309 33" stroke={ink} strokeWidth="1.6" />
        <circle cx="22" cy="22" r="3.5" fill={c} /><circle cx="34" cy="22" r="3.5" stroke={ink} /><circle cx="46" cy="22" r="3.5" stroke={ink} />
        <rect x="70" y="17" width="150" height="10" rx="5" stroke={ink} strokeOpacity="0.5" />
        {project.sketch === "chat" ? (
          <g strokeWidth="1.8">
            {/* sidebar of documents */}
            <path d="M26 46 h56 M26 60 h44 M26 74 h50 M26 88 h38" stroke={ink} strokeOpacity="0.45" />
            <rect x="22" y="42" width="66" height="132" rx="4" stroke={ink} strokeOpacity="0.4" strokeDasharray="3 4" />
            {/* chat bubbles */}
            <path d="M210 48 h86 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-80 l-8 7 v-7 a6 6 0 0 1 -4 -6 v-14 a6 6 0 0 1 6 -6Z" stroke={c} fill={c} fillOpacity="0.15" />
            <path d="M220 58 h60 M220 66 h40" stroke={c} />
            <path d="M104 90 h150 a6 6 0 0 1 6 6 v34 a6 6 0 0 1 -6 6 h-142 l-8 7 v-13 v-34 a6 6 0 0 1 6 -6Z" stroke={ink} />
            <path d="M114 102 h120 M114 112 h132 M114 122 h90" stroke={ink} strokeOpacity="0.55" />
            {/* source chip */}
            <rect x="106" y="148" width="74" height="14" rx="7" stroke={c} />
            <path d="M114 155 h4 M124 155 h48" stroke={c} />
            <rect x="104" y="172" width="196" height="10" rx="5" stroke={ink} strokeOpacity="0.5" />
          </g>
        ) : project.sketch === "form" ? (
          <g strokeWidth="1.8">
            <path d="M30 50 h120" stroke={ink} strokeWidth="2.4" />
            {[70, 92, 114, 136].map((y, k) => (
              <g key={y}>
                <rect x="30" y={y} width="12" height="12" rx="2" stroke={ink} />
                {k !== 2 && <path d={`M32 ${y + 6} l3 3 5 -7`} stroke={c} strokeWidth="2.2" />}
                <path d={`M50 ${y + 6} h${[70, 54, 80, 46][k]}`} stroke={ink} strokeOpacity="0.55" />
              </g>
            ))}
            <rect x="30" y="160" width="70" height="18" rx="9" fill={c} fillOpacity="0.85" />
            <path d="M44 169 h42" stroke="#FFF1D9" strokeWidth="2" />
            <path d="M176 60 h116 v108 h-116 Z" stroke={ink} strokeDasharray="4 4" strokeOpacity="0.5" />
            <path d="M234 72 v14 M227 79 h14" stroke={c} strokeWidth="3" />
            <path d="M190 104 h88 M190 118 h70 M190 132 h80" stroke={ink} strokeOpacity="0.55" />
            <rect x="190" y="146" width="52" height="10" rx="5" fill={c} fillOpacity="0.5" />
          </g>
        ) : project.sketch === "chart" ? (
          <g strokeWidth="1.8">
            <path d="M34 172 V48 M34 172 H296" stroke={ink} strokeWidth="2" />
            {[[60,150],[78,132],[92,156],[110,140],[128,160],[146,128],[170,150],[188,138],[210,158],[232,146],[256,136],[274,152],[98,118],[150,152],[220,128],[240,160],[66,124],[200,146]].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" fill={ink} fillOpacity="0.45" />
            ))}
            {[[140,70],[214,82],[262,62]].map(([x, y]) => (
              <g key={`f${x}`}>
                <circle cx={x} cy={y} r="4.5" fill={c} />
                <circle cx={x} cy={y} r="11" stroke={c} strokeDasharray="3 3" />
              </g>
            ))}
            <path d="M40 104 C 120 110, 200 96, 292 102" stroke={c} strokeDasharray="6 5" />
            <path d="M246 46 h44 v18 h-44 Z" stroke={c} />
            <path d="M252 55 h32" stroke={c} />
          </g>
        ) : (
          <g strokeWidth="1.8">
            <rect x="24" y="44" width="272" height="56" rx="6" stroke={c} fill={c} fillOpacity="0.12" />
            <path d="M38 62 q20 -10 44 0 M38 76 h120 M38 86 h80" stroke={ink} />
            <circle cx="250" cy="72" r="18" stroke={ink} />
            <path d="M244 72 q6 -14 12 0 q-6 10 -12 0" stroke="#77943C" />
            <rect x="24" y="112" width="84" height="64" rx="5" stroke={ink} />
            <rect x="118" y="112" width="84" height="64" rx="5" stroke={ink} />
            <rect x="212" y="112" width="84" height="64" rx="5" stroke={ink} />
            <path d="M34 124 h40 M128 124 h50 M222 124 h36" stroke={c} />
            <path d="M160 100 C 120 108, 80 104, 66 112" stroke={c} strokeDasharray="4 5" />
          </g>
        )}
      </svg>
      <span className="absolute bottom-2 right-3 rotate-[-2deg] rounded-sm bg-paper/90 px-2 font-hand text-lg leading-6 text-ink-soft">
        sketch · screenshot coming soon
      </span>
    </div>
  );
}

export function ProjectCard({ project, index, large }: { project: Project; index: number; large: boolean }) {
  const repo = isUsableUrl(project.repoUrl) ? project.repoUrl : undefined;
  const demo = isUsableUrl(project.demoUrl) ? project.demoUrl : undefined;
  const tilt = index % 2 ? "lg:rotate-[0.6deg]" : "lg:-rotate-[0.6deg]";

  return (
    <NotebookPanel
      as="article"
      className={`group relative p-5 transition-transform duration-300 hover:-translate-y-1 focus-within:-translate-y-1 sm:p-7 ${tilt} ${
        large ? "lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-10" : ""
      }`}
    >
      <PaperClip className="absolute -top-5 right-8 z-10 h-16 w-6 rotate-6" />
      <div className="absolute right-20 top-5 z-10 hidden sm:block">
        <Stamp label={project.status === "in-progress" ? "in progress" : "shipped"} tone={project.status === "in-progress" ? "accent" : "green"} />
      </div>
      {/* taped screenshot */}
      <div className="tape relative" style={{ ["--tape-angle" as string]: index % 2 ? "4deg" : "-4deg" }}>
        <div className="rounded-xl border-2 border-ink/80 bg-paper-hi p-2 shadow-[6px_6px_0_rgb(39_35_31/0.18)]">
          {project.image ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[16/10] rounded-lg object-cover"
            />
          ) : (
            <ProjectPlaceholder project={project} />
          )}
        </div>
      </div>

      <div className="mt-6 lg:mt-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent-ink">
            {project.category}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          {project.status === "in-progress" && (
            <span className="rounded-full border border-dashed border-ink/50 px-2 py-0.5 font-hand text-base leading-none sm:hidden">
              in progress
            </span>
          )}
        </div>
        <h3 className="mt-2 font-serif text-3xl leading-tight">
          {/* Stretched link: whole card is clickable, but only one tab stop */}
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-3 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent-hi"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed">{project.summary}</p>
        <p aria-hidden="true" className="mt-3 font-hand text-xl text-accent-ink">#{String(index + 1).padStart(2, "0")} in the notebook</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>
        <div className="relative z-10 mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-1 font-semibold text-accent-ink">
            Read the case study <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          {repo && (
            <a href={repo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 underline decoration-ink/30 underline-offset-4 hover:decoration-accent">
              <Github aria-hidden="true" className="size-4" /> Source<span className="sr-only"> code for {project.title} on GitHub</span>
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 underline decoration-ink/30 underline-offset-4 hover:decoration-accent">
              Live demo<span className="sr-only"> of {project.title}</span>
            </a>
          )}
        </div>
      </div>
    </NotebookPanel>
  );
}
