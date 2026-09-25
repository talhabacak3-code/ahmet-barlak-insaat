import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", ...site.nav.map((n) => n.href)];
  return pages.map((p) => ({
    url: `${site.url}${p}/`,
    changeFrequency: p === "/projeler" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
