import type { MetadataRoute } from "next";
import { siteConfig, isPlaceholder } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(isPlaceholder(siteConfig.siteUrl) ? {} : { sitemap: `${siteConfig.siteUrl.replace(/\/$/, "")}/sitemap.xml` }),
  };
}
