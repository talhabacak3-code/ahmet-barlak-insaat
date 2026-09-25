import type { Metadata } from "next";
import { site } from "@/content/site";

export const ogImage = { url: "/og.png", width: 1200, height: 630, alt: `${site.name} — Afyonkarahisar` };

/** Sayfa metadata'sı: openGraph alt sayfada üzerine yazıldığı için ortak alanlar her sayfada tekrar verilir. */
export function pageMeta({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const fullTitle = title ? `${title} | ${site.shortName}` : `${site.name} | Afyonkarahisar`;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage.url] },
  };
}
