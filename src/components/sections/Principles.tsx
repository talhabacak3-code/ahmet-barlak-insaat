import { site } from "@/content/site";

/** Atmosferik yüzey: sitede rengin tamamen serbest kaldığı tek an (bordo, 24px). */
export function Principles({ heading = "Nasıl çalışırız?" }: { heading?: string }) {
  return (
    <section aria-labelledby="ilkeler-baslik" className="pb-[var(--section-y)]">
      <div className="shell">
        <div className="on-dark atmos relative overflow-hidden bg-brand px-6 py-14 text-paper sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          {/* piksel motifi — logodaki yapı taşları */}
          <svg aria-hidden="true" viewBox="0 0 60 60" className="pointer-events-none absolute -right-2 top-8 w-32 text-[#8f3540] md:w-52">
            {[
              [40, 0], [50, 0], [50, 10], [30, 10], [40, 10], [50, 20], [40, 20], [20, 20], [50, 30], [30, 30], [50, 40], [40, 50],
            ].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="8" height="8" rx="1" fill="currentColor" />
            ))}
          </svg>

          <div className="relative max-w-2xl">
            <p className="label text-brand-soft">İlkeler</p>
            <h2 id="ilkeler-baslik" data-reveal="lines" className="display mt-4 text-[clamp(2rem,3.6vw,3rem)] text-paper">
              {heading}
            </h2>
          </div>

          <ol className="relative mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:mt-16" data-reveal="fade" data-stagger>
            {site.principles.map((p, i) => (
              <li key={p.title} className="border-t border-[#9a4a53] pt-6">
                <span className="label text-brand-soft">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-3 text-[27px] tracking-[-0.03em] text-paper">{p.title}</h3>
                <p className="mt-3 max-w-md text-[16px] leading-[1.55] text-[#ecdcdd]">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
