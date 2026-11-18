"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site-config";
import { useActiveSection } from "@/lib/use-active-section";

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(navItems.filter((n) => !n.route).map((n) => n.id), onHome);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const href = (id: string) => {
    const route = navItems.find((n) => n.id === id)?.route;
    if (route) return route;
    if (id === "home") return onHome ? "#home" : "/";
    return onHome ? `#${id}` : `/#${id}`;
  };
  const isCurrent = (id: string) => {
    const route = navItems.find((n) => n.id === id)?.route;
    return route ? pathname === route : onHome && active === id;
  };

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Focus management for the mobile menu: move in, trap Tab, Escape closes.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab") return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-50 h-(--header-h) border-b border-white/5 bg-desk/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          aria-label={`Home: ${siteConfig.name}`}
          title="back home"
          className="smiley-link group relative flex min-h-11 items-center gap-2 rounded-full pr-2"
        >
          {/* hand-drawn smiley: winks and grins on hover/focus */}
          <svg aria-hidden="true" viewBox="0 0 40 40" className="size-10 text-chalk transition-transform duration-300 group-hover:-rotate-12 group-focus-visible:-rotate-12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path className="text-accent" stroke="currentColor" d="M20 4.5 C 30 4, 36 11, 35.5 20.5 C 35 30, 28 35.8, 19.5 35.5 C 10 35.2, 4.2 28.5, 4.6 19.6 C 5 11, 11 5, 20 4.5 Z" />
            {/* left eye (stays open) */}
            <path d="M14.5 15.5 v3" />
            {/* right eye: open dot, becomes a wink */}
            <path className="smiley-eye-open" d="M25.5 15.5 v3" />
            <path className="smiley-eye-wink" d="M23.5 17.5 q2 -2 4 0" />
            {/* smile: gentle, grows into a grin */}
            <path className="smiley-smile" d="M13 24 C 16 27.5, 24 27.5, 27 24" />
            <path className="smiley-grin" d="M13.5 23.5 C 16 29, 24 29, 26.5 23.5 Z" fill="currentColor" fillOpacity="0.15" />
            {/* blush */}
            <circle className="smiley-blush" cx="9.2" cy="21" r="1.6" fill="#FF6A5E" stroke="none" />
            <circle className="smiley-blush" cx="30.8" cy="21" r="1.6" fill="#FF6A5E" stroke="none" />
          </svg>
          <span className="hidden font-hand text-2xl leading-none text-chalk xs:inline">
            {siteConfig.name.split(" ")[0]}
          </span>
          {/* little handwritten hint, shown on hover when away from home */}
          {!onHome && (
            <span aria-hidden="true" className="pointer-events-none absolute left-1 top-full mt-0.5 whitespace-nowrap font-hand text-lg text-accent-hi opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              ↑ back home
            </span>
          )}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = isCurrent(item.id);
            return (
              <li key={item.id}>
                <a
                  href={href(item.id)}
                  aria-current={isActive ? (navItems.find((n) => n.id === item.id)?.route ? "page" : "location") : undefined}
                  className={`relative block rounded-md px-3 py-2 text-[0.95rem] transition-colors hover:text-chalk ${
                    isActive ? "text-chalk" : "text-chalk-muted"
                  }`}
                >
                  {item.label}
                  {/* non-colour cue: underline bar */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-transform ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <button
          ref={buttonRef}
          type="button"
          className="grid size-11 place-items-center rounded-md text-chalk md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu aria-hidden="true" className="size-6" />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col bg-desk px-6 pt-4 md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-hand text-2xl text-chalk">Contents</span>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-md text-chalk"
              aria-label="Close menu"
              onClick={() => close()}
            >
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <ol className="mt-6 space-y-1">
            {[{ id: "home", label: "Home" }, ...navItems].map((item, i) => {
              const isActive = isCurrent(item.id);
              return (
                <li key={item.id}>
                  <a
                    href={href(item.id)}
                    onClick={() => close(false)}
                    aria-current={isActive ? (navItems.find((n) => n.id === item.id)?.route ? "page" : "location") : undefined}
                    className="flex min-h-12 items-center gap-4 border-b border-white/10 py-3 font-serif text-2xl text-chalk"
                  >
                    <span aria-hidden="true" className="w-7 font-mono text-sm text-accent-hi">
                      {String(i).padStart(2, "0")}
                    </span>
                    {item.label}
                    {isActive && (
                      <span className="ml-auto font-hand text-lg text-accent-hi">you are here</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </header>
  );
}
