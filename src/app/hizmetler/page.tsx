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
        eyebrow="Hizmetler"
        lines={["Keşiften", <em key="t" className="text-brand">teslime,</em>, "tek masa."]}
        lead="Her hizmet, aynı mühendislik disipliniyle ve aynı ekip tarafından yönetilir. Kapsamı projenize göre birlikte belirleriz."
      />

      <div className="shell pb-[var(--section-y)] lg:grid lg:grid-cols-12 lg:gap-10">
        {/* Dizin — masaüstünde yapışkan */}
        <nav aria-label="Hizmet dizini" className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-[calc(var(--header-h)+24px)] grid gap-1">
            {site.services.map((s, i) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="flex items-baseline gap-3 rounded-lg px-3 py-2 text-[15px] text-charcoal transition-colors hover:bg-linen hover:text-ink">
                  <span className="label text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-4 lg:col-span-9">
          {site.services.map((s, i) => (
            <article key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-baslik`} className="card grid scroll-mt-28 gap-8 p-6 sm:p-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="flex items-center gap-4">
                  <span className="diagram-card grid size-16 shrink-0 place-items-center text-ink">
                    <ServiceGlyph name={s.glyph} className="size-11" />
                  </span>
                  <span className="label text-muted">Hizmet {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h2 id={`${s.slug}-baslik`} data-reveal="lines" className="display mt-6 text-[clamp(1.9rem,3vw,2.5rem)] text-ink">
                  {s.title}
                </h2>
                <p className="mt-4 max-w-xl text-[17px] leading-[1.55] text-charcoal" data-reveal="fade">
                  {s.description}
                </p>
              </div>
              <div className="md:col-span-5">
                <p className="label mb-2 text-muted">Kapsam</p>
                <ul>
                  {s.scope.map((item) => (
                    <li key={item} className="flex gap-3 border-b hairline py-3 text-[15px] text-charcoal last:border-b-0">
                      <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={`/iletisim?hizmet=${s.slug}`} className="btn btn-primary mt-6">
                  Bu hizmet için görüşelim
                  <span aria-hidden="true" className="btn-arrow">
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
