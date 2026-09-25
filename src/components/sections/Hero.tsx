import Link from "next/link";
import type { CSSProperties } from "react";
import { LivingSkyline } from "@/components/drawings/LivingSkyline";
import { site } from "@/content/site";

const dl = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-baslik" className="relative pt-[var(--header-h)]">
      {/* Antet satırı */}
      <div className="shell">
        <div className="label hero-fade grid grid-cols-2 gap-y-2 border-b hairline py-4 text-muted md:grid-cols-4" style={dl(0.1)}>
          <span>Pafta 01 — Ana sayfa</span>
          <span className="text-right md:text-left">İnşaat &amp; Mühendislik</span>
          <span className="hidden md:block">{site.coordinates}</span>
          <span className="hidden text-right md:block">Afyonkarahisar</span>
        </div>
      </div>

      <div className="shell grid gap-10 pb-10 pt-10 md:pt-14 lg:grid-cols-12 lg:gap-6 lg:pb-4">
        <h1 id="hero-baslik" className="display text-[clamp(3rem,11.6vw,9.8rem)] lg:col-span-9 lg:text-[clamp(3rem,8.4vw,9.8rem)]">
          <span className="hero-line block overflow-clip pb-[0.04em]">
            <span style={dl(0.15)}>Her yapı</span>
          </span>
          <span className="hero-line block overflow-clip pb-[0.04em]">
            <span style={dl(0.25)}>
              bir <em className="font-extrabold italic text-brand wdth-125">hesapla</em>
            </span>
          </span>
          <span className="hero-line block overflow-clip pb-[0.04em]">
            <span style={dl(0.35)}>başlar.</span>
          </span>
        </h1>

        <div className="hero-fade flex flex-col justify-end gap-8 lg:col-span-3 lg:pb-4" style={dl(0.7)}>
          <p className="max-w-md text-[1.05rem] leading-relaxed text-ink/80">
            {site.name}; Afyonkarahisar&apos;da konut, ticari yapı ve kentsel dönüşüm projelerinde keşiften teslime kadar tek muhatap.
          </p>
          <div className="flex flex-col gap-3 xs:flex-row lg:flex-col">
            <Link
              href="/iletisim"
              className="group flex h-14 items-center justify-between gap-6 bg-ink px-6 text-paper transition-colors hover:bg-brand"
            >
              <span className="font-medium">Proje görüşmesi</span>
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <a href={site.phone.href} className="group flex h-14 items-center justify-between gap-6 border border-ink/80 px-6 transition-colors hover:border-brand hover:text-brand">
              <span className="font-medium">{site.phone.display}</span>
              <span className="label">Ara</span>
            </a>
          </div>
        </div>
      </div>

      <LivingSkyline className="aspect-[1000/380] w-full md:aspect-[1600/360]" />

      <div className="shell">
        <dl className="hero-fade grid grid-cols-2 border-t hairline md:grid-cols-4" style={dl(1.2)}>
          <div className="py-5 pr-4">
            <dt className="label text-muted">Merkez</dt>
            <dd className="mt-1.5 text-sm">{site.address.district}, {site.address.street}</dd>
          </div>
          <div className="border-l hairline py-5 pl-4 md:pr-4">
            <dt className="label text-muted">Hizmet bölgesi</dt>
            <dd className="mt-1.5 text-sm">{site.serviceArea}</dd>
          </div>
          <div className="hidden border-l hairline py-5 pl-4 md:block">
            <dt className="label text-muted">Uzmanlık</dt>
            <dd className="mt-1.5 text-sm">Konut · Ticari · Dönüşüm</dd>
          </div>
          <div className="hidden items-end justify-end border-l hairline py-5 pl-4 md:flex">
            <a href="#tanim" className="label u-link text-muted hover:text-ink">
              Aşağı kaydırın ↓
            </a>
          </div>
        </dl>
      </div>
    </section>
  );
}
