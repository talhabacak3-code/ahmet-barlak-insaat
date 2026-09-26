import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { directionsHref, site, whatsappHref } from "@/content/site";

/** Beyaz künye: büyük serif kapanış cümlesi + küçük sans bağlantılar. */
export function Footer() {
  const wa = whatsappHref();
  return (
    <footer className="border-t hairline bg-card pb-24 md:pb-10" data-hide-callbar>
      <div className="shell">
        <p className="display max-w-[18em] pt-16 text-[clamp(1.9rem,3.4vw,3rem)] text-ink md:pt-24">
          Her yapı bir <em>hesapla</em> başlar; biz de işe oradan başlıyoruz.
        </p>

        <div className="mt-14 grid gap-10 border-t hairline pt-10 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-[14px] leading-[1.55] text-muted">{site.description}</p>
          </div>

          <nav aria-label="Alt menü" className="md:col-span-2">
            <p className="label mb-3 text-muted">Sayfalar</p>
            <ul className="grid gap-2 text-[15px] text-charcoal">
              <li>
                <Link href="/" className="u-link hover:text-ink">
                  Ana Sayfa
                </Link>
              </li>
              {site.nav.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="u-link hover:text-ink">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label mb-3 text-muted">Hizmetler</p>
            <ul className="grid gap-2 text-[15px] text-charcoal">
              {site.services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/hizmetler#${s.slug}`} className="u-link hover:text-ink">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label mb-3 text-muted">Merkez</p>
            <address className="text-[15px] not-italic leading-[1.5] text-charcoal">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <ul className="mt-4 grid gap-2 text-[15px] text-charcoal">
              <li>
                <a href={site.phone.href} className="u-link hover:text-ink">
                  {site.phone.display}
                </a>
              </li>
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="u-link hover:text-ink">
                    WhatsApp ↗
                  </a>
                </li>
              )}
              <li>
                <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="u-link hover:text-ink">
                  Yol tarifi ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="label mt-14 flex flex-col gap-3 border-t hairline pt-6 text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="hidden md:block">{site.coordinates} · Afyonkarahisar</span>
          <a href="#icerik" className="u-link w-fit hover:text-ink">
            Başa dön ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
