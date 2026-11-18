import Image from "next/image";
import { moments, type Moment } from "@/content/moments";
import { SectionHeading } from "@/components/notebook";

const tilts = [-2.5, 1.8, -1.2, 2.4, -2, 1.4, -1.6, 2];
const tapes = ["rgb(217 75 57 / 0.45)", "rgb(49 93 167 / 0.38)", "rgb(119 148 60 / 0.5)", "rgb(253 222 120 / 0.8)"];

function Star({ className = "", d = "spark" }: { className?: string; d?: "spark" | "star" | "heart" | "asterisk" }) {
  const paths = {
    spark: "M0 -10 C 1.5 -2, 2 -1.5, 10 0 C 2 1.5, 1.5 2, 0 10 C -1.5 2, -2 1.5, -10 0 C -2 -1.5, -1.5 -2, 0 -10Z",
    star: "M0 -10 L2.9 -3.1 L9.5 -3.1 L4.2 1.2 L6.2 8.1 L0 4 L-6.2 8.1 L-4.2 1.2 L-9.5 -3.1 L-2.9 -3.1Z",
    heart: "M0 8 C -12 0, -10 -10, -4 -9 C -1.5 -8.5, 0 -6, 0 -5 C 0 -6, 1.5 -8.5, 4 -9 C 10 -10, 12 0, 0 8Z",
    asterisk: "M0 -10 V10 M-8.6 -5 L8.6 5 M-8.6 5 L8.6 -5",
  };
  return (
    <svg aria-hidden="true" viewBox="-11 -11 22 22" className={`pointer-events-none absolute ${className}`}>
      <path
        d={paths[d]}
        fill={d === "asterisk" ? "none" : "currentColor"}
        stroke={d === "asterisk" ? "currentColor" : "none"}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Polaroid({ m, i }: { m: Moment; i: number }) {
  return (
    <figure
      className={`tilt relative flex h-full flex-col bg-[#fffaf0] p-2.5 pb-1.5 shadow-[3px_10px_18px_-8px_rgb(0_0_0/0.55)] sm:p-3 ${m.fix === "tape" ? "tape" : ""}`}
      style={{
        ["--tilt" as string]: `${tilts[i % tilts.length]}deg`,
        ["--tape-color" as string]: tapes[i % tapes.length],
        ["--tape-angle" as string]: `${i % 2 ? 5 : -4}deg`,
      }}
    >
      {m.fix === "pin" && (
        <span aria-hidden="true" className="absolute -top-2 left-1/2 z-10 size-4 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#ff8a7f,#d94b39_60%,#8f2a1c)] shadow-[0_3px_4px_rgb(0_0_0/0.35)]" />
      )}
      {m.badge && (
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-3 z-10 grid size-16 rotate-12 place-items-center rounded-full bg-accent-strong text-center font-mono text-[0.6rem] font-bold uppercase leading-tight tracking-wider text-paper-hi shadow-[0_4px_8px_-2px_rgb(0_0_0/0.4)] ring-2 ring-paper-hi ring-offset-0 sm:size-[4.5rem] sm:text-[0.66rem]"
        >
          {m.badge}
        </span>
      )}
      <div className={`relative overflow-hidden bg-ink/10 ${m.tall ? "aspect-[3/4] flex-1 xs:aspect-auto" : m.wide ? "aspect-[4/3] xs:aspect-[16/9]" : "aspect-[4/3]"}`}>
        <Image
          src={m.src}
          alt={m.alt}
          fill
          quality={85}
          sizes={m.wide ? "(min-width: 1024px) 620px, 90vw" : "(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"}
          className="object-cover"
        />
      </div>
      <figcaption className="px-1 pb-1 pt-2.5 text-center font-hand text-[1.3rem] leading-tight text-ink">{m.caption}</figcaption>
    </figure>
  );
}

/** One big grid-paper board with pinned and taped polaroids. */
export function Moments({ index, side }: { index: number; side: "left" | "right" }) {
  if (moments.length === 0) return null;
  return (
    <section id="scrapbook" aria-labelledby="scrapbook-title" className="scroll-mt-24">
      <SectionHeading index={index} side={side} eyebrow="photos tucked between the pages" title="Scrapbook" id="scrapbook-title" />

      <div data-reveal className="relative">
        {/* tape holding the board's corners */}
        <span aria-hidden="true" className="absolute -left-4 -top-3 z-20 h-8 w-32 -rotate-[32deg] bg-[rgb(200_190_170/0.55)] shadow-sm" />
        <span aria-hidden="true" className="absolute -right-4 -top-3 z-20 h-8 w-32 rotate-[32deg] bg-[rgb(200_190_170/0.55)] shadow-sm" />

        <div className="relative rounded-2xl bg-paper px-4 pb-12 pt-10 shadow-[0_24px_50px_-22px_rgb(0_0_0/0.8)] sm:px-10"
          style={{
            backgroundImage:
              "linear-gradient(rgb(217 75 57 / 0.1) 1px, transparent 1px), linear-gradient(90deg, rgb(217 75 57 / 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <p className="text-center font-hand text-3xl text-accent-ink sm:text-4xl">
            a few good memories <span aria-hidden="true">♡</span>
          </p>

          {/* scattered doodles */}
          <Star d="spark" className="left-5 top-6 size-8 text-accent" />
          <Star d="star" className="left-[58%] top-4 size-6 text-deco-green" />
          <Star d="star" className="right-[22%] top-12 size-5 text-accent/70" />
          <Star d="heart" className="-bottom-1 left-6 size-7 text-accent" />
          <Star d="asterisk" className="bottom-4 right-6 size-7 text-accent" />
          <Star d="spark" className="right-4 top-[45%] hidden size-5 text-deco-blue sm:block" />

          <ul className="mt-10 grid grid-flow-dense grid-cols-1 gap-x-6 gap-y-10 xs:grid-cols-2 lg:grid-cols-4">
            {moments.map((m, i) => (
              <li key={m.src} className={m.tall ? "xs:row-span-2" : m.wide ? "xs:col-span-2" : ""}>
                <Polaroid m={m} i={i} />
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center font-hand text-2xl text-ink-soft">
            more pages coming, one project at a time <span aria-hidden="true" className="text-accent">✎</span>
          </p>
        </div>
      </div>
    </section>
  );
}
