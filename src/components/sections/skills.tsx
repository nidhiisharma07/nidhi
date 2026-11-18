import { skillGroups } from "@/content/skills";
import { SectionHeading } from "@/components/notebook";
import { CategoryDoodle } from "@/components/doodles";

const tilts = [-1.4, 1, -0.6, 1.2, -1, 0.7];
const tapes = [
  "rgb(217 75 57 / 0.45)",
  "rgb(49 93 167 / 0.4)",
  "rgb(119 148 60 / 0.5)",
  "rgb(253 222 120 / 0.75)",
  "rgb(217 75 57 / 0.35)",
  "rgb(49 93 167 / 0.3)",
];

export function Skills({ index, side }: { index: number; side: "left" | "right" }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24">
      <SectionHeading index={index} side={side} eyebrow="tools in the pencil case" title="Skills" id="skills-title" />
      <ul data-reveal className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <li key={group.category}>
            <article
              className="tape tilt index-card relative h-full rounded-md px-5 pb-6 pt-4 shadow-[3px_10px_18px_-8px_rgb(0_0_0/0.6)]"
              style={{
                ["--tilt" as string]: `${tilts[i % tilts.length]}deg`,
                ["--tape-color" as string]: tapes[i % tapes.length],
                ["--tape-angle" as string]: `${i % 2 ? 4 : -3}deg`,
              }}
            >
              <h3 className="flex h-9 items-center gap-2.5 font-serif text-2xl">
                <CategoryDoodle name={group.category} className="size-6 text-accent-ink" />
                {group.category}
              </h3>
              <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-2">
                {group.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-sm border border-ink/15 bg-paper/80 px-2 py-0.5 text-[0.98rem] leading-6"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <span aria-hidden="true" className="absolute bottom-2 right-3 font-mono text-[0.7rem] text-ink-soft/70">
                card {i + 1}/{skillGroups.length}
              </span>
            </article>
          </li>
        ))}
      </ul>
      <p aria-hidden="true" className="mt-8 text-center font-hand text-xl text-chalk-muted">
        no progress bars here: ask me about any of these in an interview ✎
      </p>
    </section>
  );
}
