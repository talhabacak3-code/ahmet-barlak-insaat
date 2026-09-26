import { NightSkyline } from "@/components/drawings/NightSkyline";
import { directionsHref, site, whatsappHref } from "@/content/site";

/** Her sayfanın kapanışı: hero'daki kentin gece hâli (atmosferik kart) + doğrudan iletişim eylemleri. */
export function ContactFinale({ heading = "Projenizi konuşalım." }: { heading?: string }) {
  const wa = whatsappHref("Merhaba, bir proje hakkında görüşmek istiyorum.");

  const actions = [
    { title: "Hemen arayın", sub: site.phone.display, href: site.phone.href, external: false },
    ...(wa ? [{ title: "WhatsApp'tan yazın", sub: "Proje bilginizi iletin", href: wa, external: true }] : []),
    { title: "Yol tarifi alın", sub: `${site.address.district}, ${site.address.street}`, href: directionsHref, external: true },
  ];

  return (
    <section aria-labelledby="final-baslik" className="pb-[var(--section-y)]" data-hide-callbar>
      <div className="shell">
        <div className="on-dark atmos relative overflow-hidden bg-dusk text-paper">
          <div className="relative z-10 grid gap-12 px-6 pt-14 sm:px-12 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:px-20 lg:pt-24">
            <div className="lg:col-span-7">
              <p className="label text-dim">İletişim</p>
              <h2 id="final-baslik" data-reveal="lines" className="display mt-4 text-[clamp(2rem,3.6vw,3rem)] text-paper">
                {heading}
              </h2>
              <p data-reveal="fade" className="mt-5 max-w-md text-[17px] leading-[1.55] text-dim">
                Keşif, fiyat ya da henüz yalnızca bir fikir. İlk görüşme bir telefon uzaklığında.
              </p>
              <a href={site.phone.href} className="group mt-10 inline-block" aria-label={`Telefon: ${site.phone.display}`}>
                <span className="label block text-dim">Doğrudan hat</span>
                <span className="display mt-2 block whitespace-nowrap text-[clamp(2.4rem,5.4vw,4.25rem)] tracking-[-0.03em] text-paper transition-colors duration-300 group-hover:text-brand-soft">
                  {site.phone.display}
                </span>
              </a>
            </div>

            <ul className="grid content-end gap-3 lg:col-span-5" data-reveal="fade" data-stagger>
              {actions.map((a) => (
                <li key={a.title}>
                  <a
                    href={a.href}
                    {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-[#3a3a47] bg-[#262631] px-5 py-4 transition-colors duration-300 hover:border-[#6a6b78] hover:bg-[#2c2c38]"
                  >
                    <span>
                      <span className="block text-[16px] font-medium text-paper">{a.title}</span>
                      <span className="mt-0.5 block text-[14px] text-dim">{a.sub}</span>
                    </span>
                    <span aria-hidden="true" className="btn-arrow text-dim transition-colors group-hover:text-paper">
                      {a.external ? "↗" : "→"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <NightSkyline className="mt-12 aspect-[1000/380] w-full md:aspect-[1600/360]" />
        </div>
      </div>
    </section>
  );
}
