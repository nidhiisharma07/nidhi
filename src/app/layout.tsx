import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig, isPlaceholder } from "@/lib/site-config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealObserver } from "@/components/reveal-observer";
import { ClickSparkles } from "@/components/click-sparkles";
import { DecorativeRails } from "@/components/decorative-rail";

// Font budget (PRD 5.3): three self-hosted WOFF2 files, swap loading.
const hand = localFont({
  src: "../fonts/caveat-latin-600-normal.woff2",
  weight: "600",
  variable: "--font-hand-face",
  display: "swap",
  preload: true,
});
const serif = localFont({
  src: "../fonts/dm-serif-display-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-serif-face",
  display: "swap",
  preload: true,
});
const sans = localFont({
  src: "../fonts/source-sans-3-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-sans-face",
  display: "swap",
  preload: true,
});

const hasDomain = !isPlaceholder(siteConfig.siteUrl);

export const metadata: Metadata = {
  ...(hasDomain ? { metadataBase: new URL(siteConfig.siteUrl) } : {}),
  title: {
    default: `${siteConfig.name} · ${siteConfig.title}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: `${siteConfig.description} ${siteConfig.roleTarget}`,
  ...(hasDomain ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    title: `${siteConfig.name} · ${siteConfig.title}`,
    description: siteConfig.headline,
    siteName: siteConfig.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${siteConfig.name}, ${siteConfig.title}: notebook-style portfolio preview` }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#202020" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${hand.variable} ${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Marks JS as available so reveal styles apply only when they can be undone.
          dangerouslySetInnerHTML={{
            __html:
              "(function(d){d.classList.add('js');try{if(sessionStorage.getItem('cover-seen'))d.classList.add('cover-seen')}catch(e){d.classList.add('cover-seen')}})(document.documentElement)",
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <DecorativeRails />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
        <ClickSparkles />
      </body>
    </html>
  );
}
