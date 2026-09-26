"use client";

import { useRef, useState } from "react";
import { BuildingStages } from "@/components/drawings/BuildingStages";
import { site } from "@/content/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Sticky story: çizim CSS sticky ile sabit kalır (GSAP pin yok → mobilde de güvenli),
 * yapı aşamaları adımların kaydırma ilerlemesine bağlı olarak çizilir.
 */
export function ProcessStory() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const steps = site.process;

  useGSAP(
    () => {
      const el = root.current!;
      const svg = el.querySelector("svg")!;
      const stage = (n: number) => svg.querySelector<SVGGElement>(`[data-stage="${n}"]`)!;
      const pd = (g: Element) => g.querySelectorAll(".pd");
      const pf = (g: Element) => g.querySelectorAll(".pf");
      const pb = (g: Element) => g.querySelectorAll(".pb");

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(svg.querySelectorAll(".pd"), { strokeDasharray: "1 1", strokeDashoffset: 1 });
        gsap.set(svg.querySelectorAll(".pf"), { opacity: 0 });
        gsap.set(svg.querySelectorAll(".pb"), { scaleY: 0, transformOrigin: "50% 100%" });

        // 0 keşif — çizim görünür olur olmaz kendiliğinden çizilir (kutu hiç boş kalmaz)
        gsap
          .timeline({ scrollTrigger: { trigger: el.querySelector("[data-frame]"), start: "top 80%", once: true } })
          .to(pd(stage(0)), { strokeDashoffset: 0, stagger: 0.18, duration: 1.3, ease: "power2.out" })
          .to(pf(stage(0)), { opacity: 1, duration: 0.6 }, "<0.5");

        // 1–4 kaydırmayla inşa edilir
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el.querySelector("[data-steps]"), start: "top 55%", end: "bottom 75%", scrub: 0.6 },
        });
        // 1 aks & kot
        tl.to(pf(stage(1)), { opacity: 1, stagger: 0.08, duration: 0.5 });
        // 2 temel (keşif ekipmanı çekilir)
        tl.to(svg.querySelector("[data-survey]"), { opacity: 0, duration: 0.4 }, "+=0.3")
          .to(pd(stage(2)), { strokeDashoffset: 0, stagger: 0.1, duration: 0.8 }, "<")
          .to(pf(stage(2)), { opacity: 1, duration: 0.4 }, "<0.4");
        // 3 karkas — kat kat
        stage(3)
          .querySelectorAll("[data-floor]")
          .forEach((f, i) => tl.to(pd(f), { strokeDashoffset: 0, stagger: 0.05, duration: 0.5 }, i === 0 ? "+=0.3" : ">-0.1"));
        // 4 teslim
        tl.to(pd(stage(4)), { strokeDashoffset: 0, stagger: 0.02, duration: 1.2 }, "+=0.3")
          .to(pb(stage(4)), { scaleY: 1, stagger: 0.06, duration: 0.3, ease: "power2.out" }, ">-0.3")
          .to({}, { duration: 0.4 });

        el.querySelectorAll<HTMLElement>("[data-step]").forEach((s, i) => {
          ScrollTrigger.create({
            trigger: s,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => self.isActive && setActive(i),
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section ref={root} aria-labelledby="surec-baslik" className="relative border-y hairline bg-card text-ink">
      <div className="shell section-y">
        <SectionHead
          id="surec-baslik"
          eyebrow="Süreç"
          title="Arsadan anahtara beş aşama."
          lead="Her aşamanın bir çıktısı, bir sorumlusu ve bir takvimi var. Kaydırdıkça yapının nasıl yükseldiğini izleyin."
        />

        <div className="mt-12 grid gap-0 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {/* Çizim masası — mobilde bölüm başında yapışkan şerit, masaüstünde sol sütun */}
          <div className="sticky top-0 z-10 -mx-[var(--gutter)] bg-card px-[var(--gutter)] pb-4 pt-[var(--header-h)] lg:top-[calc(var(--header-h)+24px)] lg:col-span-6 lg:mx-0 lg:h-[calc(100svh-var(--header-h)-48px)] lg:self-start lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0">
            <div data-frame className="diagram-card relative flex h-[36svh] flex-col overflow-hidden p-2 text-ink lg:h-full lg:p-3">
              <div className="mm-grid flex min-h-0 flex-1 items-center justify-center rounded-[10px] p-3 lg:p-6">
                <BuildingStages className="scale-lines h-full w-auto max-w-full [&_.accent]:text-brand [&_[data-stage='1']]:text-brand" />
              </div>
              {/* antet */}
              <div aria-hidden="true" className="label grid grid-cols-3 pt-2 text-[12px] text-muted">
                <span className="px-2 py-1">Süreç</span>
                <span className="px-2 py-1 text-center">
                  Aşama <span className="text-brand">{pad(active + 1)}</span> / {pad(steps.length)}
                </span>
                <span className="px-2 py-1 text-right">Ölçek 1:100</span>
              </div>
              <div className="absolute inset-x-3 bottom-0 h-0.5 overflow-hidden rounded-full bg-mist" aria-hidden="true">
                <div className="h-full origin-left bg-brand transition-transform duration-500" style={{ transform: `scaleX(${(active + 1) / steps.length})` }} />
              </div>
            </div>
          </div>

          <ol data-steps className="lg:col-span-5 lg:col-start-8">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-step
                className={`flex min-h-[46svh] flex-col justify-center border-b hairline py-12 transition-opacity duration-500 last:border-b-0 lg:min-h-[62svh] motion-reduce:opacity-100 ${
                  active === i ? "opacity-100" : "opacity-40"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`grid size-9 place-items-center rounded-full border font-mono text-xs transition-colors duration-500 ${
                      active === i ? "border-brand bg-brand text-paper" : "border-mist text-muted"
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="label text-muted">Aşama</span>
                </span>
                <h3 className="display mt-5 text-[clamp(1.7rem,2.6vw,2.5rem)] text-ink">{s.title}</h3>
                <p className="mt-4 max-w-md text-[17px] leading-[1.55] text-charcoal">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
