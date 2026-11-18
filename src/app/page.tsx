import { homeSections } from "@/lib/site-config";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Writing } from "@/components/sections/writing";
import { Moments } from "@/components/sections/moments";
import { Connect } from "@/components/sections/connect";
import { ScrollPath } from "@/components/scroll-path";

const sections = { skills: Skills, work: Work, experience: Experience, scrapbook: Moments, writing: Writing, connect: Connect };

export default function Home() {
  return (
    <>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <ScrollPath />
        {/* Mobile: a single static dotted line along the left edge, no JS (PRD 11.1) */}
        <span aria-hidden="true" className="static-path absolute bottom-0 left-1.5 top-[min(100vh,52rem)] w-1 md:hidden" />
        <div className="relative z-10">
          <Hero />
          <div className="mt-20 space-y-24 pl-3 sm:mt-28 sm:space-y-32 md:pl-0">
            {homeSections.map((item, i) => {
              const Section = sections[item.id as keyof typeof sections];
              return <Section key={item.id} index={i + 1} side={i % 2 ? "right" : "left"} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
