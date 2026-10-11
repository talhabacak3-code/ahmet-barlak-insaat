import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { asset, serviceHref, site } from "@/content/site";

export function ServicesIndex() {
  return (
    <section aria-labelledby="hizmetler-baslik" className="pb-[var(--section-y)]">
      <div className="shell">
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12">
          <p className="label text-brand lg:col-span-3">
            <span aria-hidden="true">§ </span>Hizmetler
          </p>
          <h2 id="hizmetler-baslik" data-reveal="lines" className="display text-[clamp(2.4rem,6vw,5.6rem)] lg:col-span-7">
            Temelden anahtara, dört hizmet.
          </h2>
          <Link href="/hizmetler" className="label u-link self-end justify-self-start text-muted hover:text-ink lg:col-span-2 lg:justify-self-end">
            Tüm kapsam →
          </Link>
        </div>

        <ol className="border-t border-ink/70">
          {site.services.map((s, i) => (
            <li key={s.slug} className="border-b hairline">
              <a
                href={serviceHref(s)}
                {...(site.whatsapp ? { target: "_blank", rel: "noopener noreferrer", "aria-label": `${s.title} — WhatsApp'tan bilgi alın` } : {})}
                className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-x-4 gap-y-2 overflow-hidden px-2 py-6 md:grid-cols-12 md:gap-x-6 md:px-4 md:py-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 bg-brand transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="label relative text-muted transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-paper/70 md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display relative text-[clamp(1.6rem,3.4vw,3rem)] transition-colors duration-500 group-hover:text-paper md:col-span-4">
                  {s.title}
                </span>
                <span className="relative col-span-2 col-start-2 max-w-md text-[0.95rem] leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/80 md:col-span-4 md:col-start-auto">
                  {s.short}
                </span>
                <span className="relative col-start-3 row-start-1 flex items-center justify-end gap-3 md:col-span-3 md:col-start-auto md:row-start-auto md:gap-5">
                  {/* Hizmet görseli — soluk başlar, üzerine gelince renklenir */}
                  <span className="relative block aspect-[4/3] w-16 shrink-0 overflow-hidden bg-paper-2 md:w-32 lg:w-36">
                    <Image
                      src={asset(s.image.replace(".webp", "-thumb.webp"))}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 144px, (min-width: 768px) 128px, 64px"
                      className="object-cover saturate-[0.75] transition-[transform,filter] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06] group-hover:saturate-100"
                    />
                  </span>
                  {site.whatsapp ? (
                    <span className="flex items-center gap-2 text-[#127a3a] transition-colors duration-500 group-hover:text-paper">
                      <span className="label hidden lg:inline">WhatsApp</span>
                      <WhatsAppIcon className="size-6" />
                    </span>
                  ) : (
                    <span aria-hidden="true" className="text-xl transition-[transform,color] duration-500 group-hover:-rotate-45 group-hover:text-paper">
                      →
                    </span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
