import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Principles } from "@/components/sections/Principles";
import { ContactFinale } from "@/components/sections/ContactFinale";
import { LivingSkyline } from "@/components/drawings/LivingSkyline";
import { site } from "@/content/site";

export const metadata: Metadata = pageMeta({
  title: "Kurumsal",
  description: `${site.name} hakkında: Afyonkarahisar merkezli inşaat ve mühendislik firmasının çalışma yaklaşımı ve ilkeleri.`,
  path: "/kurumsal/",
});

export default function KurumsalPage() {
  return (
    <>
      <PageHero
        sheet="02"
        eyebrow="Kurumsal"
        lines={[
          "Hesapla başlayan,",
          <>
            <em className="italic text-brand wdth-125">yerinde</em> yürüyen
          </>,
          "yapılar.",
        ]}
        lead={`${site.name}, Afyonkarahisar merkezli bir inşaat ve mühendislik firmasıdır.`}
      />

      <section aria-labelledby="yaklasim-baslik" className="border-t hairline">
        <div className="shell grid gap-12 py-[var(--section-y)] lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <p className="label text-brand">
              <span aria-hidden="true">§ </span>Yaklaşım
            </p>
          </div>
          <div className="lg:col-span-5">
            <h2 id="yaklasim-baslik" data-reveal="lines" className="display text-[clamp(2rem,4.2vw,3.8rem)]">
              Bir binayı değil, bir süreci teslim ederiz.
            </h2>
          </div>
          <div className="grid gap-6 text-[1.05rem] leading-relaxed text-ink/80 lg:col-span-4" data-reveal="fade" data-stagger>
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

      <section aria-labelledby="yerel-baslik" className="overflow-hidden">
        <div className="shell grid gap-10 pt-[var(--section-y)] lg:grid-cols-12 lg:gap-6">
          <p className="label text-brand lg:col-span-3">
            <span aria-hidden="true">§ </span>Yerel
          </p>
          <div className="lg:col-span-9">
            <h2 id="yerel-baslik" data-reveal="lines" className="display text-[clamp(2rem,5vw,4.6rem)]">
              Afyonkarahisar&apos;da, şantiyeye yakın.
            </h2>
            <p className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ink/80" data-reveal="fade">
              Merkezimiz {site.address.district}, {site.address.street} adresinde. Kentin iklimini, yapı stokunu ve yerel süreçlerini bilerek çalışmak; hızlı
              karar, kolay ulaşım ve yerinde takip demek.
            </p>
            <Link href="/iletisim" className="label u-link mt-8 inline-block text-ink">
              Ofisimize yol tarifi →
            </Link>
          </div>
        </div>
        <div className="mt-16">
          <LivingSkyline mode="scroll" className="aspect-[1000/380] w-full md:aspect-[1600/360]" />
        </div>
      </section>

      <ContactFinale />
    </>
  );
}
