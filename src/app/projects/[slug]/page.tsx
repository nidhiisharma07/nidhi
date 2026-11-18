import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, getProject } from "@/content/projects";
import { isUsableUrl } from "@/lib/site-config";
import { NotebookPanel, StickyNote, Tag } from "@/components/notebook";
import { ProjectPlaceholder } from "@/components/project-card";
import { GithubIcon } from "@/components/brand-icons";
import { ProjectFlow } from "@/components/project-flow";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl">{title}</h2>
      <div className="mt-3 leading-relaxed">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const repo = isUsableUrl(project.repoUrl) ? project.repoUrl : undefined;
  const demo = isUsableUrl(project.demoUrl) ? project.demoUrl : undefined;

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-8">
      <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 text-chalk-muted hover:text-chalk">
        <ArrowLeft aria-hidden="true" className="size-4" /> Back to all work
      </Link>

      <header className="mt-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-hi">{project.category}{project.year ? ` · ${project.year}` : ""}</p>
        <h1 className="mt-2 font-serif text-5xl leading-tight text-chalk sm:text-6xl">{project.title}</h1>
        {project.status === "in-progress" && (
          <p className="mt-2 font-hand text-2xl text-chalk-muted">work in progress, updated as it grows</p>
        )}
      </header>

      <NotebookPanel taped className="mt-10 p-5 sm:p-10">
        <div className="rounded-xl border-2 border-ink/80 bg-paper-hi p-2">
          {project.image ? (
            <Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} priority className="rounded-lg" />
          ) : (
            <ProjectPlaceholder project={project} />
          )}
        </div>

        <p className="mt-8 text-lg leading-relaxed">{project.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {repo && (
            <a href={repo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-5 font-semibold text-paper hover:bg-black">
              <GithubIcon aria-hidden="true" className="size-4" /> View source <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-ink px-5 font-semibold hover:bg-ink hover:text-paper">
              Live demo <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>

        <Block title="The problem">
          <p>{project.problem}</p>
        </Block>
        <Block title="Objectives">
          <ul className="list-disc space-y-1.5 pl-5 marker:text-accent">
            {project.objectives.map((o) => <li key={o}>{o}</li>)}
          </ul>
        </Block>
        <Block title="Technologies">
          <ul className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => <Tag key={t}>{t}</Tag>)}
          </ul>
        </Block>
        <Block title="How it works">
          <div className="mt-2">
            <ProjectFlow steps={project.implementation} />
          </div>
        </Block>
        {project.decisions && project.decisions.length > 0 && (
          <Block title="Key decisions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-accent">
              {project.decisions.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </Block>
        )}
        {project.challenges.length > 0 && (
          <Block title="Challenges and solutions">
            <div className="grid gap-5 sm:grid-cols-2">
              {project.challenges.map((c, k) => (
                <StickyNote key={c.challenge} rotate={k % 2 ? 1 : -1}>
                  <p className="font-hand text-xl leading-snug">{c.challenge}</p>
                  <p className="mt-2 text-[0.95rem]">{c.solution}</p>
                </StickyNote>
              ))}
            </div>
          </Block>
        )}
        {project.results.length > 0 && (
          <Block title="Results">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-accent">
              {project.results.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </Block>
        )}
        {project.nextSteps && project.nextSteps.length > 0 && (
          <Block title="What I’d do next">
            <ul className="space-y-1.5">
              {project.nextSteps.map((n) => (
                <li key={n} className="flex gap-2"><span aria-hidden="true" className="font-hand text-xl leading-6 text-accent-ink">→</span>{n}</li>
              ))}
            </ul>
          </Block>
        )}
      </NotebookPanel>

      {projects.length > 1 && (
        <nav aria-label="More projects" className="mt-10 flex flex-wrap justify-between gap-4">
          <Link href={`/projects/${prev.slug}`} className="inline-flex min-h-11 items-center gap-2 text-chalk hover:text-accent-hi">
            <ArrowLeft aria-hidden="true" className="size-4" /> <span><span className="sr-only">Previous project: </span>{prev.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="inline-flex min-h-11 items-center gap-2 text-chalk hover:text-accent-hi">
            <span><span className="sr-only">Next project: </span>{next.title}</span> <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </nav>
      )}
    </article>
  );
}
