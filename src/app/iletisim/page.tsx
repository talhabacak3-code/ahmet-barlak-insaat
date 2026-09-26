import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectRequestForm } from "@/components/contact/ProjectRequestForm";
import { MapFacade } from "@/components/contact/MapFacade";
import { directionsHref, site, whatsappHref } from "@/content/site";
import { SectionHead } from "@/components/ui/SectionHead";

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
        eyebrow="İletişim"
        lines={["Bir telefon,", <>bir <em className="text-brand">keşif,</em></>, "bir plan."]}
        lead="İlk görüşmede ihtiyacınızı dinliyor, gerekirse yerinde keşif için randevu planlıyoruz."
      />

      <section aria-label="İletişim bilgileri ve talep formu" data-hide-callbar>
        <div className="shell grid gap-4 pb-[var(--section-y)] lg:grid-cols-12">
          <div className="grid content-start gap-4 lg:col-span-4">
            <div className="card p-6">
              <p className="label text-muted">Telefon</p>
              <a href={site.phone.href} className="display mt-2 block whitespace-nowrap text-[clamp(1.9rem,2.6vw,2.4rem)] text-ink transition-colors hover:text-brand">
                {site.phone.display}
              </a>
              <a href={site.phone.href} className="btn btn-dark mt-5 w-full">
                Hemen ara
                <span aria-hidden="true" className="btn-arrow">
                  →
                </span>
              </a>
            </div>
            {wa && (
              <div className="card p-6">
                <p className="label text-muted">WhatsApp</p>
                <p className="mt-2 text-[15px] leading-[1.5] text-charcoal">Proje bilginizi yazılı iletmek isterseniz.</p>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-5 w-full">
                  Mesaj gönderin
                  <span aria-hidden="true" className="btn-arrow">
                    ↗
                  </span>
                </a>
              </div>
            )}
            <div className="card p-6">
              <p className="label text-muted">Adres</p>
              <address className="mt-2 text-[16px] not-italic leading-[1.5] text-charcoal">
                {site.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 w-full">
                Yol tarifi al
                <span aria-hidden="true" className="btn-arrow">
                  ↗
                </span>
              </a>
            </div>
          </div>

          <div className="card p-6 sm:p-10 lg:col-span-8">
            <p className="label text-muted">Proje talebi</p>
            <h2 className="display mt-3 text-[clamp(2rem,3.2vw,2.75rem)] text-ink">Birkaç bilgi bırakın.</h2>
            <p className="mb-10 mt-3 max-w-lg text-[17px] leading-[1.55] text-charcoal">Sizi arayarak detayları konuşalım; gerekirse yerinde keşif için randevu planlayalım.</p>
            <Suspense fallback={null}>
              <ProjectRequestForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section aria-labelledby="konum-baslik" className="pb-[var(--section-y)]">
        <div className="shell">
          <SectionHead id="konum-baslik" eyebrow={site.coordinates} title="Konum" className="mb-8" />
          <MapFacade />
        </div>
      </section>
    </>
  );
}
