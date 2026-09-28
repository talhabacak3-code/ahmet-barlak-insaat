import { site } from "@/content/site";

export function Principles({ heading = "Nasıl çalışırız?" }: { heading?: string }) {
  return (
    <section aria-labelledby="ilkeler-baslik" className="on-dark relative overflow-hidden bg-brand text-paper">
      {/* piksel motifi — logodaki yapı taşları */}
      <svg aria-hidden="true" viewBox="0 0 60 60" className="pointer-events-none absolute -right-4 top-10 w-40 text-paper/15 md:w-64">
        {[
          [40, 0], [50, 0], [50, 10], [30, 10], [40, 10], [50, 20], [40, 20], [20, 20], [50, 30], [30, 30], [50, 40], [40, 50],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="8" height="8" fill="currentColor" />
        ))}
      </svg>

      <div className="shell section-y relative">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="label text-paper/70 lg:col-span-3">
            <span aria-hidden="true">§ </span>İlkeler
          </p>
          <h2 id="ilkeler-baslik" data-reveal="lines" className="display text-[clamp(2.4rem,6vw,5.6rem)] lg:col-span-8">
            {heading}
          </h2>
        </div>

        <ol className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:mt-24 lg:grid-cols-12" data-reveal="fade" data-stagger>
          {site.principles.map((p, i) => (
            <li
              key={p.title}
              className={`border-t border-paper/30 pt-6 ${["lg:col-span-5 lg:col-start-4", "lg:col-span-4 lg:mt-24", "lg:col-span-5 lg:col-start-2", "lg:col-span-5 lg:col-start-8 lg:-mt-12"][i]}`}
            >
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="display text-[clamp(1.8rem,3vw,2.6rem)]">{p.title}</h3>
                <span className="font-display text-5xl italic text-paper/25" aria-hidden="true">
                  {i + 1}
                </span>
              </div>
              <p className="mt-4 max-w-md leading-relaxed text-paper/80">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
