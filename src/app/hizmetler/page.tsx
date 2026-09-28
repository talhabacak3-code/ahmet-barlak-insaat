import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessStory } from "@/components/sections/ProcessStory";
import { ContactFinale } from "@/components/sections/ContactFinale";
import { ServiceGlyph } from "@/components/drawings/ServiceGlyph";
import { site } from "@/content/site";

export const metadata: Metadata = pageMeta({
  title: "Hizmetler",
  description: "Afyonkarahisar'da konut projeleri, ticari ve endüstriyel yapılar, proje ve mühendislik, kentsel dönüşüm, tadilat ve anahtar teslim uygulama hizmetleri.",
  path: "/hizmetler/",
});

export default function HizmetlerPage() {
  return (
    <>
      <PageHero
        sheet="03"
        eyebrow="Hizmetler"
        lines={["Keşiften", <em key="t" className="italic text-brand">teslime,</em>, "tek masa."]}
        lead="Her hizmet, aynı mühendislik disipliniyle ve aynı ekip tarafından yönetilir. Kapsamı projenize göre birlikte belirleriz."
      />

      <div className="shell border-t hairline lg:grid lg:grid-cols-12 lg:gap-6">
        {/* Dizin — masaüstünde yapışkan */}
        <nav aria-label="Hizmet dizini" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-[calc(var(--header-h)+32px)] grid gap-3 py-16">
            {site.services.map((s, i) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="group flex items-baseline gap-3 text-sm text-muted transition-colors hover:text-ink">
                  <span className="label text-[0.62rem] group-hover:text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <span className="u-link">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="lg:col-span-9">
          {site.services.map((s, i) => (
            <article key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-baslik`} className="grid scroll-mt-24 gap-8 border-b hairline py-16 last:border-b-0 md:grid-cols-9 md:gap-6 md:py-24">
              <div className="flex items-start justify-between md:col-span-9">
                <span className="label text-brand">Hizmet {String(i + 1).padStart(2, "0")}</span>
                <ServiceGlyph name={s.glyph} className="h-16 w-16 text-ink md:h-20 md:w-20" />
              </div>
              <h2 id={`${s.slug}-baslik`} data-reveal="lines" className="display text-[clamp(2.2rem,5vw,4.4rem)] md:col-span-6">
                {s.title}
              </h2>
              <p className="max-w-xl text-[1.08rem] leading-relaxed text-ink/80 md:col-span-5" data-reveal="fade">
                {s.description}
              </p>
              <div className="md:col-span-4">
                <p className="label mb-3 text-muted">Kapsam</p>
                <ul className="border-t hairline">
                  {s.scope.map((item) => (
                    <li key={item} className="flex gap-3 border-b hairline py-3 text-[0.95rem]">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={`/iletisim?hizmet=${s.slug}`} className="group mt-6 inline-flex items-center gap-3 font-medium text-brand">
                  <span className="u-link">Bu hizmet için görüşelim</span>
                  <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProcessStory />
      <ContactFinale />
    </>
  );
}
