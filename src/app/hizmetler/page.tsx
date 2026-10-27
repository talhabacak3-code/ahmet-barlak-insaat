import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessStory } from "@/components/sections/ProcessStory";
import { ContactFinale } from "@/components/sections/ContactFinale";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { asset, serviceHref, site } from "@/content/site";

export const metadata: Metadata = pageMeta({
  title: "Hizmetler",
  description: "Afyonkarahisar'da kaba inşaat taşeronluk hizmeti, müteahhitlik hizmeti, proje yönetimi ve danışmanlığı ile anahtar teslim uygulama hizmetleri.",
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
              <span className="label text-brand md:col-span-9">Hizmet {String(i + 1).padStart(2, "0")}</span>
              <figure className="relative aspect-[16/10] overflow-hidden bg-paper-2 md:col-span-9 md:aspect-[21/9]" data-reveal="fade">
                <Image
                  src={asset(s.image)}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 68vw, 100vw"
                  priority={i === 0}
                  className="object-cover"
                />
                <figcaption className="label absolute bottom-0 right-0 bg-paper/85 px-3 py-1.5 text-[0.62rem] text-muted">Temsili görsel</figcaption>
              </figure>
              <h2 id={`${s.slug}-baslik`} data-reveal="lines" className="display text-h2 md:col-span-6">
                {s.title}
              </h2>
              <p className="max-w-xl text-lead text-ink/80 md:col-span-5" data-reveal="fade">
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
                <a
                  href={serviceHref(s)}
                  {...(site.whatsapp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group mt-6 inline-flex h-12 items-center gap-3 rounded-full bg-[#25D366] pl-4 pr-5 ui-btn text-ink transition-colors duration-300 hover:bg-[#1ebe5a]"
                >
                  <WhatsAppIcon className="size-5" />
                  <span>{site.whatsapp ? "WhatsApp'tan bilgi alın" : "Bu hizmet için görüşelim"}</span>
                  <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </a>
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
