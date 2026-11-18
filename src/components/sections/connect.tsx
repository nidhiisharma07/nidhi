import { Download, FileText, Mail } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/brand-icons";
import { siteConfig, isUsableUrl, isPlaceholder } from "@/lib/site-config";
import { SectionHeading } from "@/components/notebook";

export function Connect({ index, side }: { index: number; side: "left" | "right" }) {
  const hasEmail = !isPlaceholder(siteConfig.email);
  const links = [
    hasEmail && { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail, external: false },
    isUsableUrl(siteConfig.linkedin) && { href: siteConfig.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
    isUsableUrl(siteConfig.github) && { href: siteConfig.github, label: "GitHub", Icon: Github, external: true },
  ].filter(Boolean) as { href: string; label: string; Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" }>; external: boolean }[];
  const hasResume = isUsableUrl(siteConfig.resumeUrl);

  return (
    <section id="connect" aria-labelledby="connect-title" className="scroll-mt-24 pb-10">
      <SectionHeading index={index} side={side} eyebrow="last page of the notebook" title="Connect" id="connect-title" />
      <div
        data-reveal
        className="rounded-2xl p-2.5 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7)] sm:p-3"
        style={{
          background:
            "repeating-linear-gradient(135deg, #D94B39 0 14px, #FFF1D9 14px 24px, #315DA7 24px 38px, #FFF1D9 38px 48px)",
        }}
      >
      <div className="paper-plain relative grid overflow-hidden rounded-xl md:grid-cols-2">
        {/* page spine / vertical divider */}
        <span aria-hidden="true" className="absolute inset-y-6 left-1/2 hidden w-0.5 -translate-x-1/2 bg-accent/60 md:block" />

        <div className="p-6 sm:p-10">
          <p className="font-hand text-2xl text-accent-ink">a postcard from my notebook ✉</p>
          <h3 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">Let’s build something useful.</h3>
          <p className="mt-4 max-w-md font-hand text-2xl leading-8 text-ink-soft">Dear reader,</p>
          <p className="mt-2 max-w-md text-[1.075rem] leading-relaxed">
            I’m interested in opportunities in AI/ML, backend development, and full-stack software engineering. If my
            work matches what you’re building, I’d be happy to connect.
          </p>
          <p className="mt-4 font-hand text-2xl text-ink-soft">
            Warmly,<br /><span className="text-3xl text-ink">Nidhi</span>
          </p>
          {hasEmail && (
            <p className="mt-6">
              <span className="block font-mono text-xs uppercase tracking-widest text-ink-soft">Email me at</span>
              <span className="select-all break-all font-serif text-2xl">{siteConfig.email}</span>
            </p>
          )}
        </div>

        <div className="relative flex flex-col gap-3 border-t-2 border-dashed border-accent/40 p-6 sm:p-10 md:border-t-0">
          {/* postage stamp + postmark */}
          <div aria-hidden="true" className="flex items-start justify-end gap-2">
            <svg viewBox="0 0 120 70" className="-mr-6 mt-3 h-14 w-24 text-ink/50" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="38" cy="35" r="28" />
              <circle cx="38" cy="35" r="20" strokeDasharray="2 3" />
              <text x="38" y="31" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="currentColor" stroke="none">GREATER NOIDA</text>
              <text x="38" y="43" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">2026</text>
              <path d="M70 22 q8 -5 16 0 t16 0 t16 0 M70 35 q8 -5 16 0 t16 0 t16 0 M70 48 q8 -5 16 0 t16 0 t16 0" />
            </svg>
            <svg viewBox="0 0 70 84" className="h-24 w-20 rotate-3 drop-shadow-[2px_3px_0_rgb(39_35_31/0.18)]">
              <rect x="2" y="2" width="66" height="80" fill="#FFF1D9" stroke="#D94B39" strokeWidth="4" strokeDasharray="4 3" />
              <rect x="9" y="9" width="52" height="56" fill="#D94B39" />
              <path d="M35 58 V34" stroke="#FFF1D9" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M35 44 c-8-2-12-8-12-14 c8 0 12 6 12 14Z M35 38 c8-2 12-8 12-14 c-8 0-12 6-12 14Z" fill="#B7C98A" />
              <circle cx="49" cy="18" r="3" fill="#FFF1D9" />
              <text x="35" y="76" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="#27231F">₹ 2026</text>
            </svg>
          </div>
          <div aria-hidden="true" className="mb-2 space-y-2 font-hand text-2xl leading-8 text-ink">
            <p className="ruled-line">To: you, the team</p>
            <p className="ruled-line pl-8">building something great</p>
            <p className="ruled-line pl-16 text-accent-ink">wherever you are ✈</p>
          </div>
          <ul className="space-y-3">
            {links.map(({ href, label, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex min-h-12 items-center gap-3 rounded-xl border-2 border-ink/80 bg-paper-hi px-4 font-semibold shadow-[4px_4px_0_rgb(39_35_31/0.2)] transition-transform hover:-translate-y-0.5"
                >
                  <Icon aria-hidden="true" className="size-5 text-accent-ink" /> {label}
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
          {hasResume && (
            <div className="mt-2 flex flex-wrap gap-3">
              <a href={siteConfig.resumeUrl} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-strong px-5 font-semibold text-paper-hi hover:bg-[#a8321f]">
                <FileText aria-hidden="true" className="size-4" /> View résumé
                <span className="sr-only">(PDF, opens in a new tab)</span>
              </a>
              <a href={siteConfig.resumeUrl} download="Nidhi-Sharma-Resume.pdf" className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-ink px-5 font-semibold hover:bg-ink hover:text-paper">
                <Download aria-hidden="true" className="size-4" /> Download résumé
              </a>
            </div>
          )}
          {links.length === 0 && (
            <p className="font-hand text-xl text-ink-soft">Contact links appear here once they’re added to site-config.</p>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
