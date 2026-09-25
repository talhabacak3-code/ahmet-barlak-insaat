import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { directionsHref, site, whatsappHref } from "@/content/site";

export function Footer() {
  const wa = whatsappHref();
  return (
    <footer className="on-dark bg-ink pb-24 text-paper md:pb-10" data-hide-callbar>
      <div className="shell">
        <div className="grid gap-12 border-t border-paper/15 pt-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/65">{site.description}</p>
          </div>

          <nav aria-label="Alt menü" className="md:col-span-2">
            <p className="label mb-4 text-paper/50">Sayfalar</p>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link href="/" className="u-link">
                  Ana Sayfa
                </Link>
              </li>
              {site.nav.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="u-link">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="label mb-4 text-paper/50">Hizmetler</p>
            <ul className="grid gap-2 text-sm">
              {site.services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/hizmetler#${s.slug}`} className="u-link">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label mb-4 text-paper/50">Merkez</p>
            <address className="text-sm not-italic leading-relaxed text-paper/80">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <ul className="mt-5 grid gap-2 text-sm">
              <li>
                <a href={site.phone.href} className="u-link">
                  {site.phone.display}
                </a>
              </li>
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="u-link">
                    WhatsApp ↗
                  </a>
                </li>
              )}
              <li>
                <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="u-link">
                  Yol tarifi ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="label mt-16 flex flex-col gap-3 border-t border-paper/15 pt-6 text-paper/45 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{site.coordinates} · Afyonkarahisar</span>
        </div>
      </div>
    </footer>
  );
}
