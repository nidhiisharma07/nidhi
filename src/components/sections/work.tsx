import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/notebook";

export function Work({ index, side }: { index: number; side: "left" | "right" }) {
  // Every project gets the large stacked scrapbook composition.
  const large = true;
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24">
      <SectionHeading index={index} side={side} eyebrow="taped into the notebook" title="Selected work" id="work-title" />
      <ul className={large ? "space-y-12" : "grid gap-10 lg:grid-cols-2"}>
        {projects.map((p, i) => (
          <li key={p.slug} data-reveal className={!large && i === 0 ? "lg:col-span-2" : ""}>
            <ProjectCard project={p} index={i} large={large || i === 0} />
          </li>
        ))}
      </ul>
    </section>
  );
}
