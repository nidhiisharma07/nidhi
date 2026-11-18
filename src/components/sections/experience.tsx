import { Briefcase, GraduationCap, Users } from "lucide-react";
import { experience } from "@/content/experience";
import { isPlaceholder } from "@/lib/site-config";
import { NotebookPanel, SectionHeading, Tag } from "@/components/notebook";

export function Experience({ index, side }: { index: number; side: "left" | "right" }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24">
      <SectionHeading index={index} side={side} eyebrow="the logbook" title="Experience & education" id="experience-title" />
      <ol className="relative space-y-8 pl-8 sm:pl-12">
        {/* timeline spine */}
        <span aria-hidden="true" className="absolute inset-y-2 left-3 w-0.5 bg-[repeating-linear-gradient(to_bottom,var(--color-accent)_0_8px,transparent_8px_14px)] sm:left-5" />
        {experience.map((e) => {
          const isEdu = e.kind === "education";
          const isLead = e.kind === "leadership";
          const Icon = isEdu ? GraduationCap : isLead ? Users : Briefcase;
          const points = e.points.filter((p) => !isPlaceholder(p));
          return (
            <li key={`${e.organization}-${e.title}`} data-reveal className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-8 top-6 grid size-7 place-items-center rounded-full border-2 sm:-left-12 sm:size-9 ${
                  isEdu ? "border-deco-blue bg-paper-hi text-deco-blue" : "border-accent bg-accent text-paper-hi"
                }`}
              >
                <Icon className="size-3.5 sm:size-4" />
              </span>
              <NotebookPanel as="article" tone={isEdu ? "plain" : "grid"} className={`p-5 sm:p-7 ${isEdu ? "border-dashed !border-deco-blue" : ""}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                    {isEdu ? "Education" : isLead ? "Leadership" : "Work"} · {e.period}
                  </p>
                  <p className="text-sm text-ink-soft">
                    {e.location}
                    {e.arrangement ? ` · ${e.arrangement}` : ""}
                  </p>
                </div>
                <h3 className="mt-2 font-serif text-2xl leading-snug">{e.title}</h3>
                <p className="font-hand text-2xl text-accent-ink">{e.organization}</p>
                {points.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-accent">
                    {points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
                {e.technologies && e.technologies.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                    {e.technologies.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </ul>
                )}
              </NotebookPanel>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
