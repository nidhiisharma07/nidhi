import { articles } from "@/content/articles";
import { NotebookPanel, SectionHeading } from "@/components/notebook";

/** Rendered only when at least one real article exists (PRD 7.7). */
export function Writing({ index, side }: { index: number; side: "left" | "right" }) {
  if (articles.length === 0) return null;
  return (
    <section id="writing" aria-labelledby="writing-title" className="scroll-mt-24">
      <SectionHeading index={index} side={side} eyebrow="margin notes" title="Writing" id="writing-title" />
      <ul className="grid gap-6 md:grid-cols-2">
        {articles.map((a) => (
          <li key={a.slug} data-reveal>
            <NotebookPanel as="article" tone="plain" className="h-full p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
                {a.category} · <time dateTime={a.date}>{a.date}</time> · {a.readingTime}
              </p>
              <h3 className="mt-2 font-serif text-2xl">
                <a href={a.url} className="hover:underline">{a.title}</a>
              </h3>
              <p className="mt-2">{a.summary}</p>
            </NotebookPanel>
          </li>
        ))}
      </ul>
    </section>
  );
}
