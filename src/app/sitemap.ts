import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteConfig, isPlaceholder } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  // Until the real domain is set, fall back to a relative-safe local URL.
  const base = isPlaceholder(siteConfig.siteUrl) ? "http://localhost:3000" : siteConfig.siteUrl.replace(/\/$/, "");
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/about`, priority: 0.9 },
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, priority: 0.7 })),
  ];
}
