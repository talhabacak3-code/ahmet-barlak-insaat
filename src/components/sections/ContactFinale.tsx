import { MagneticButton } from "@/components/motion/MagneticButton";
import { directionsHref, site, whatsappHref } from "@/content/site";

export function ContactFinale({ heading = "Projenizi konuşalım." }: { heading?: string }) {
  const wa = whatsappHref("Merhaba, bir proje hakkında görüşmek istiyorum.");
  const [first, ...rest] = site.phone.display.split(" ");

  return (
    <section aria-labelledby="final-baslik" className="on-dark relative bg-ink text-paper" data-hide-callbar>
      <div className="shell pb-16 pt-[var(--section-y)]">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="label text-brand-soft lg:col-span-3">
            <span aria-hidden="true">§ </span>İletişim
          </p>
          <h2 id="final-baslik" data-reveal="lines" className="display text-[clamp(2.4rem,6vw,5.6rem)] lg:col-span-9">
            {heading}
          </h2>
        </div>

        <div className="mt-14 grid items-end gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          <a
            href={site.phone.href}
            className="group lg:col-span-9"
            aria-label={`Telefon: ${site.phone.display}`}
          >
            <span className="label block text-paper/50">Doğrudan hat</span>
            <span className="display mt-3 block text-[clamp(3rem,14vw,12rem)] leading-[0.9] transition-colors duration-500 group-hover:text-brand-soft lg:text-[clamp(3rem,9.4vw,10.5rem)]">
              <span className="block text-paper/40 transition-colors duration-500 group-hover:text-brand-soft/60">{first}</span>
              <span className="block whitespace-nowrap">{rest.join(" ")}</span>
            </span>
          </a>
          <div className="flex items-center gap-6 lg:col-span-3 lg:justify-end">
            <MagneticButton
              href={site.phone.href}
              aria-label="Hemen ara"
              className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-brand text-paper transition-colors hover:bg-paper hover:text-brand md:h-40 md:w-40"
            >
              <span className="label">Hemen</span>
              <span className="display text-2xl">Ara</span>
            </MagneticButton>
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <p className="label text-paper/50">Adres</p>
            <address className="mt-3 not-italic leading-relaxed text-paper/85">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div className="lg:col-span-3">
            <p className="label text-paper/50">Yol</p>
            <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="u-link mt-3 inline-block text-paper/85">
              Yol tarifi al ↗
            </a>
          </div>
          {wa && (
            <div className="lg:col-span-3">
              <p className="label text-paper/50">Mesaj</p>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="u-link mt-3 inline-block text-paper/85">
                WhatsApp&apos;tan yazın ↗
              </a>
            </div>
          )}
          <div className="lg:col-span-2 lg:text-right">
            <p className="label text-paper/50">Konum</p>
            <p className="mt-3 text-paper/85">{site.coordinates}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
