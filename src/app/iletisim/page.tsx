import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectRequestForm } from "@/components/contact/ProjectRequestForm";
import { MapFacade } from "@/components/contact/MapFacade";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { directionsHref, site, whatsappHref } from "@/content/site";

export const metadata: Metadata = pageMeta({
  title: "İletişim",
  description: `${site.name} iletişim: ${site.phone.display} · ${site.address.full}`,
  path: "/iletisim/",
});

export default function IletisimPage() {
  const wa = whatsappHref("Merhaba, bir proje hakkında bilgi almak istiyorum.");
  return (
    <>
      <PageHero
        sheet="05"
        eyebrow="İletişim"
        lines={["Bir telefon,", <>bir <em className="italic text-brand wdth-125">keşif,</em></>, "bir plan."]}
        lead="İlk görüşmede ihtiyacınızı dinliyor, gerekirse yerinde keşif için randevu planlıyoruz."
      />

      <section aria-label="İletişim bilgileri ve talep formu" className="border-t hairline" data-hide-callbar>
        <div className="shell grid gap-16 py-[var(--section-y)] lg:grid-cols-12 lg:gap-6">
          <div className="grid content-start gap-12 lg:col-span-4">
            <div>
              <p className="label text-muted">Telefon</p>
              <a href={site.phone.href} className="display mt-3 block whitespace-nowrap text-[clamp(2rem,3.2vw,3rem)] transition-colors hover:text-brand">
                {site.phone.display}
              </a>
            </div>
            {wa && (
              <div>
                <p className="label text-muted">WhatsApp</p>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="u-link mt-3 inline-block text-lg">
                  Mesaj gönderin ↗
                </a>
              </div>
            )}
            <div>
              <p className="label text-muted">Adres</p>
              <address className="mt-3 text-lg not-italic leading-relaxed">
                {site.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="label u-link mt-4 inline-block text-brand">
                Yol tarifi al ↗
              </a>
            </div>
            <MagneticButton
              href={site.phone.href}
              aria-label="Hemen ara"
              className="hidden h-36 w-36 items-center justify-center rounded-full bg-brand text-paper transition-colors hover:bg-ink lg:flex"
            >
              <span className="label">Hemen</span>
              <span className="display text-2xl">Ara</span>
            </MagneticButton>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="display text-[clamp(2rem,3.6vw,3.2rem)]">Proje talebi</h2>
            <p className="mb-10 mt-4 max-w-lg leading-relaxed text-muted">Birkaç bilgi bırakın, sizi arayarak detayları konuşalım.</p>
            <Suspense fallback={null}>
              <ProjectRequestForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section aria-labelledby="konum-baslik" className="pb-[var(--section-y)]">
        <div className="shell">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2 id="konum-baslik" className="display text-[clamp(2rem,3.6vw,3.2rem)]">
              Konum
            </h2>
            <p className="label text-muted">{site.coordinates}</p>
          </div>
          <MapFacade />
        </div>
      </section>
    </>
  );
}
