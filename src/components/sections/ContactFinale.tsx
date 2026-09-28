import { MagneticButton } from "@/components/motion/MagneticButton";
import { NightSkyline } from "@/components/drawings/NightSkyline";
import { WhatsAppIcon } from "@/components/brand/WhatsAppIcon";
import { directionsHref, site, whatsappHref } from "@/content/site";

/** Her sayfanın kapanışı: hero'daki kentin gece hâli + doğrudan iletişim eylemleri. */
export function ContactFinale({ heading = "Projenizi konuşalım." }: { heading?: string }) {
  const wa = whatsappHref("Merhaba, bir proje hakkında görüşmek istiyorum.");
  const [first, ...rest] = site.phone.display.split(" ");

  const actions = [
    { label: "Telefon", title: "Hemen arayın", sub: site.phone.display, href: site.phone.href, external: false },
    ...(wa ? [{ label: "WhatsApp", title: "Mesaj yazın", sub: "Proje bilginizi iletin", href: wa, external: true }] : []),
    { label: "Ofis", title: "Yol tarifi alın", sub: `${site.address.district}, ${site.address.street}`, href: directionsHref, external: true },
  ];

  return (
    <section aria-labelledby="final-baslik" className="on-dark relative overflow-hidden bg-ink text-paper" data-hide-callbar>
      <div className="shell pt-[var(--section-y)]">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="label text-brand-soft lg:col-span-3">
            <span aria-hidden="true">§ </span>İletişim
          </p>
          <div className="lg:col-span-9">
            <h2 id="final-baslik" data-reveal="lines" className="display text-[clamp(2.4rem,6vw,5.6rem)]">
              {heading}
            </h2>
            <p data-reveal="fade" className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-paper/60">
              Keşif, fiyat ya da henüz yalnızca bir fikir. İlk görüşme bir telefon uzaklığında.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-12 lg:mt-24 lg:flex-row lg:items-center lg:justify-between">
          <a href={site.phone.href} className="group block w-fit" aria-label={`Telefon: ${site.phone.display}`}>
            {/* ölçü çizgisi — numaranın genişliği kadar */}
            <span aria-hidden="true" className="label flex items-center gap-3 text-paper/40">
              <span className="h-3 w-px bg-current" />
              <span className="h-px flex-1 bg-current" />
              <span>Doğrudan hat</span>
              <span className="h-px flex-1 bg-current" />
              <span className="h-3 w-px bg-current" />
            </span>
            <span className="display mt-4 block whitespace-nowrap text-[clamp(2.2rem,9vw,4rem)] leading-none lg:text-[clamp(3rem,5vw,5.25rem)]">
              <span className="text-paper/40 transition-colors duration-500 group-hover:text-brand-soft/70">{first}</span>{" "}
              <span className="transition-colors duration-500 group-hover:text-brand-soft">{rest.join(" ")}</span>
            </span>
          </a>

          <div className="flex items-center gap-5 self-start md:gap-8 lg:self-auto">
          {/* Dönen halka + manyetik Ara butonu */}
          <div className="relative grid size-44 shrink-0 place-items-center md:size-56">
            <svg viewBox="0 0 200 200" aria-hidden="true" className="ring-spin absolute inset-0 text-paper/45">
              <defs>
                <path id="cta-ring" d="M100 100m-86 0a86 86 0 1 1 172 0a86 86 0 1 1-172 0" />
              </defs>
              <text fill="currentColor" className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.12em" }}>
                <textPath href="#cta-ring" textLength="536" lengthAdjust="spacing">
                  HEMEN ARA · {site.phone.display} · HEMEN ARA · {site.phone.display} ·
                </textPath>
              </text>
            </svg>
            <MagneticButton
              href={site.phone.href}
              aria-label="Hemen ara"
              className="flex size-28 items-center justify-center rounded-full bg-brand text-paper transition-colors duration-500 hover:bg-paper hover:text-brand md:size-36"
            >
              <span className="label">Hemen</span>
              <span className="display text-2xl md:text-3xl">Ara</span>
            </MagneticButton>
          </div>

          {/* WhatsApp — tanınır yeşil daire */}
          {wa && (
            <div className="flex flex-col items-center gap-3">
              <MagneticButton
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp'tan yazın"
                className="flex size-24 items-center justify-center rounded-full bg-[#25D366] text-white transition-colors duration-500 hover:bg-[#1ebe5a] md:size-28"
              >
                <WhatsAppIcon className="size-11 md:size-12" />
              </MagneticButton>
              <span className="label text-paper/60">WhatsApp</span>
            </div>
          )}
          </div>
        </div>

        <ul className={`mt-16 grid border-y border-paper/15 lg:mt-24 ${actions.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`} data-reveal="fade" data-stagger>
          {actions.map((a, i) => (
            <li key={a.label} className="border-b border-paper/15 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
              <a
                href={a.href}
                {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group relative flex h-full flex-col justify-between gap-5 overflow-hidden px-1 py-6 md:gap-10 md:px-8 md:py-9 ${i === 0 ? "md:pl-0" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-soft transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
                <span className="flex items-center justify-between">
                  <span className="label text-brand-soft">
                    {String(i + 1).padStart(2, "0")} — {a.label}
                  </span>
                  <span aria-hidden="true" className="text-lg text-paper/60 transition-[transform,color] duration-500 group-hover:-rotate-45 group-hover:text-paper">
                    →
                  </span>
                </span>
                <span>
                  <span className="display block text-[clamp(1.6rem,2.4vw,2.2rem)]">{a.title}</span>
                  <span className="mt-2 block text-sm text-paper/55">{a.sub}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <NightSkyline className="mt-6 aspect-[1000/380] w-full md:aspect-[1600/360]" />
    </section>
  );
}
