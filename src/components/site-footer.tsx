import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-8 text-center text-sm text-chalk-muted">
      <p>
        © 2026 {siteConfig.name}. Thanks for flipping through my notebook ✎
      </p>
    </footer>
  );
}
