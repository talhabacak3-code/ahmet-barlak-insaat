"use client";

import { useRef, useState } from "react";
import { BuildingStages } from "@/components/drawings/BuildingStages";
import { site } from "@/content/site";
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
    <section ref={root} aria-labelledby="surec-baslik" className="relative bg-paper-2 text-ink">
      <div className="shell section-y">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="label text-brand lg:col-span-3">
            <span aria-hidden="true">§ </span>Süreç
          </p>
          <div className="lg:col-span-9">
            <h2 id="surec-baslik" data-reveal="lines" className="display text-[clamp(2.4rem,6vw,5.6rem)]">
              Arsadan anahtara beş aşama.
            </h2>
            <p data-reveal="fade" className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/70">
              Her aşamanın bir çıktısı, bir sorumlusu ve bir takvimi var. Kaydırdıkça yapının nasıl yükseldiğini izleyin.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-0 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {/* Çizim masası — mobilde bölüm başında yapışkan şerit, masaüstünde sol sütun */}
          <div className="sticky top-0 z-10 -mx-[var(--gutter)] bg-paper-2 px-[var(--gutter)] pb-4 pt-[var(--header-h)] lg:top-[calc(var(--header-h)+24px)] lg:col-span-6 lg:mx-0 lg:h-[calc(100svh-var(--header-h)-48px)] lg:self-start lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0">
            <div data-frame className="crop mm-grid relative flex h-[36svh] flex-col border border-ink/20 text-ink shadow-[0_1px_0_rgb(25_23_21/0.04),0_18px_40px_-24px_rgb(25_23_21/0.25)] lg:h-full">
              <div className="flex min-h-0 flex-1 items-center justify-center p-3 lg:p-6">
                <BuildingStages className="scale-lines h-full w-auto max-w-full [&_.accent]:text-brand [&_[data-stage='1']]:text-brand" />
              </div>
              {/* antet */}
              <div aria-hidden="true" className="label grid grid-cols-3 border-t border-ink/20 bg-paper text-[0.62rem] text-muted">
                <span className="border-r border-ink/20 px-3 py-2">Pafta · Süreç</span>
                <span className="border-r border-ink/20 px-3 py-2">
                  Aşama <span className="text-brand">{pad(active + 1)}</span> / {pad(steps.length)}
                </span>
                <span className="px-3 py-2 text-right">Ölçek 1:100</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-ink/10" aria-hidden="true">
                <div className="h-full origin-left bg-brand transition-transform duration-500" style={{ transform: `scaleX(${(active + 1) / steps.length})` }} />
              </div>
            </div>
          </div>

          <ol data-steps className="lg:col-span-5 lg:col-start-8">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-step
                className={`flex min-h-[46svh] flex-col justify-center border-b border-ink/15 py-12 transition-opacity duration-500 last:border-b-0 lg:min-h-[62svh] motion-reduce:opacity-100 ${
                  active === i ? "opacity-100" : "opacity-40"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`grid size-9 place-items-center rounded-full border font-mono text-xs transition-colors duration-500 ${
                      active === i ? "border-brand bg-brand text-paper" : "border-ink/30 text-ink/70"
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="label text-brand">Aşama</span>
                </span>
                <h3 className="display mt-5 text-[clamp(2rem,4vw,3.4rem)]">{s.title}</h3>
                <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
