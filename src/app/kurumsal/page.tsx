import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Principles } from "@/components/sections/Principles";
import { ContactFinale } from "@/components/sections/ContactFinale";
import { LivingSkyline } from "@/components/drawings/LivingSkyline";
import { site } from "@/content/site";
import { SectionHead } from "@/components/ui/SectionHead";

export const metadata: Metadata = pageMeta({
  title: "Kurumsal",
  description: `${site.name} hakkında: Afyonkarahisar merkezli inşaat ve mühendislik firmasının çalışma yaklaşımı ve ilkeleri.`,
  path: "/kurumsal/",
});

export default function KurumsalPage() {
  return (
    <>
      <PageHero
        eyebrow="Kurumsal"
        lines={[
          "Hesapla başlayan,",
          <>
            <em className="text-brand">yerinde</em> yürüyen
          </>,
          "yapılar.",
        ]}
        lead={`${site.name}, Afyonkarahisar merkezli bir inşaat ve mühendislik firmasıdır.`}
      />

      <section aria-labelledby="yaklasim-baslik" className="border-t hairline">
        <div className="shell grid gap-10 py-[var(--section-y)] md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <p className="label text-muted">Yaklaşım</p>
            <h2 id="yaklasim-baslik" data-reveal="lines" className="display mt-4 text-[clamp(2rem,3.6vw,3rem)] text-ink">
              Bir binayı değil, bir süreci teslim ederiz.
            </h2>
          </div>
          <div className="grid gap-5 text-[17px] leading-[1.55] text-charcoal md:col-span-6" data-reveal="fade" data-stagger>
            <p>
              İnşaat, arsa sahibi için çoğu zaman hayatının en büyük kararlarından biridir. Bu yüzden işe yapıdan önce insandan başlıyoruz: ihtiyacı, bütçeyi ve
              beklentiyi netleştirmeden tek bir çizgi çizmiyoruz.
            </p>
            <p>
              Mühendislik bizim için bir disiplin: keşif, hesap ve planlama doğru kurulduğunda şantiyede sürpriz azalır, takvim ve maliyet öngörülebilir hâle gelir.
            </p>
            <p>
              Proje, resmi süreçler ve uygulama aynı masada yönetilir. Siz de süreç boyunca tek bir muhatapla, açık bir iş programı üzerinden ilerlersiniz.
            </p>
          </div>
        </div>
      </section>

      <Principles heading="Dört çalışma ilkesi." />

      <section aria-labelledby="yerel-baslik" className="pb-[var(--section-y)]">
        <div className="shell">
          <SectionHead
            id="yerel-baslik"
            eyebrow="Yerel"
            title="Afyonkarahisar'da, şantiyeye yakın."
            lead={`Merkezimiz ${site.address.district}, ${site.address.street} adresinde. Kentin iklimini, yapı stokunu ve yerel süreçlerini bilerek çalışmak; hızlı karar, kolay ulaşım ve yerinde takip demek.`}
            action={
              <Link href="/iletisim" className="btn btn-secondary">
                Ofisimize yol tarifi
                <span aria-hidden="true" className="btn-arrow">
                  →
                </span>
              </Link>
            }
          />
          <div className="atmos mt-10 overflow-hidden border border-mist bg-linen pt-16 md:mt-14 md:pt-24">
            <LivingSkyline mode="scroll" className="aspect-[1000/380] w-full md:aspect-[1600/360]" />
          </div>
        </div>
      </section>

      <ContactFinale />
    </>
  );
}
