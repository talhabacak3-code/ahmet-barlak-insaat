import Link from "next/link";
import type { CSSProperties } from "react";
import { LivingSkyline } from "@/components/drawings/LivingSkyline";
import { site } from "@/content/site";

const dl = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

/** İllüstrasyonlu hero: canlı kent silüeti 24px'lik yüzeyde, başlık buzlu cam kartta. */
export function Hero() {
  return (
    <section aria-labelledby="hero-baslik" className="pt-[var(--header-h)]">
      <div className="shell">
        <div className="atmos relative flex min-h-[calc(100svh-var(--header-h)-20px)] flex-col overflow-hidden border border-mist bg-linen">
          <div className="relative z-10 p-3 sm:p-6 lg:p-10">
            <div className="frost hero-fade max-w-[580px] rounded-3xl p-6 sm:p-9 lg:p-11" style={dl(0.05)}>
              <p className="label text-muted">İnşaat &amp; Mühendislik · Afyonkarahisar</p>
              <h1 id="hero-baslik" className="display mt-5 text-[clamp(2.6rem,5.4vw,4.25rem)] text-ink">
                <span className="hero-line block overflow-clip pb-[0.06em]">
                  <span style={dl(0.15)}>Her yapı bir</span>
                </span>
                <span className="hero-line block overflow-clip pb-[0.06em]">
                  <span style={dl(0.25)}>
                    <em className="text-brand">hesapla</em> başlar.
                  </span>
                </span>
              </h1>
              <p className="mt-6 max-w-md text-[17px] leading-[1.55] text-charcoal">
                {site.name}; Afyonkarahisar&apos;da konut, ticari yapı ve kentsel dönüşüm projelerinde keşiften teslime kadar tek muhatap.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/iletisim" className="btn btn-primary">
                  Proje görüşmesi
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </Link>
                <a href={site.phone.href} className="btn btn-dark">
                  {site.phone.display}
                  <span aria-hidden="true" className="btn-arrow">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <LivingSkyline className="aspect-[1000/380] w-full md:aspect-[1600/360]" />
          </div>
        </div>

        <dl className="hero-fade grid grid-cols-2 gap-x-6 gap-y-4 py-7 md:grid-cols-4" style={dl(1.2)}>
          <div>
            <dt className="label text-muted">Merkez</dt>
            <dd className="mt-1 text-[15px] text-charcoal">
              {site.address.district}, {site.address.street}
            </dd>
          </div>
          <div>
            <dt className="label text-muted">Hizmet bölgesi</dt>
            <dd className="mt-1 text-[15px] text-charcoal">{site.serviceArea}</dd>
          </div>
          <div className="hidden md:block">
            <dt className="label text-muted">Uzmanlık</dt>
            <dd className="mt-1 text-[15px] text-charcoal">Konut · Ticari · Dönüşüm</dd>
          </div>
          <div className="hidden items-end justify-end md:flex">
            <a href="#tanim" className="label u-link text-muted hover:text-ink">
              Aşağı kaydırın ↓
            </a>
          </div>
        </dl>
      </div>
    </section>
  );
}
