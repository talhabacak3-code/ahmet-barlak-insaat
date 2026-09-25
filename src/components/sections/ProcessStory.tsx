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

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el.querySelector("[data-steps]"), start: "top 70%", end: "bottom 75%", scrub: 0.6 },
        });

        // 0 keşif
        tl.to(pd(stage(0)), { strokeDashoffset: 0, stagger: 0.15, duration: 1 }).to(pf(stage(0)), { opacity: 1, duration: 0.4 }, "<0.3");
        // 1 aks & kot
        tl.to(pf(stage(1)), { opacity: 1, stagger: 0.08, duration: 0.5 }, "+=0.3");
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

  return (
    <section ref={root} aria-labelledby="surec-baslik" className="on-dark relative bg-ink text-paper">
      <div className="shell section-y">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="label text-brand-soft lg:col-span-3">
            <span aria-hidden="true">§ </span>Süreç
          </p>
          <h2 id="surec-baslik" data-reveal="lines" className="display text-[clamp(2.4rem,6vw,5.6rem)] lg:col-span-9">
            Arsadan anahtara beş aşama.
          </h2>
        </div>

        <div className="mt-12 grid gap-0 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {/* Çizim — mobilde bölüm başında yapışkan şerit, masaüstünde sol sütun */}
          <div className="sticky top-0 z-10 -mx-[var(--gutter)] bg-ink px-[var(--gutter)] pb-4 pt-[calc(var(--header-h)-24px)] lg:top-[calc(var(--header-h)+24px)] lg:col-span-6 lg:mx-0 lg:h-[calc(100svh-var(--header-h)-48px)] lg:self-start lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0">
            <div className="relative flex h-[34svh] items-center justify-center text-paper/85 lg:h-full lg:border lg:border-paper/15">
              <BuildingStages className="scale-lines h-full w-auto max-w-full [&_.accent]:text-brand-soft" />
              <p className="label absolute right-0 top-0 hidden p-4 text-paper/50 lg:block" aria-hidden="true">
                Aşama {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </p>
              <div className="absolute inset-x-0 bottom-0 h-px bg-paper/15 lg:hidden" aria-hidden="true">
                <div className="h-full origin-left bg-brand-soft transition-transform duration-500" style={{ transform: `scaleX(${(active + 1) / steps.length})` }} />
              </div>
            </div>
          </div>

          <ol data-steps className="lg:col-span-5 lg:col-start-8">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-step
                className={`flex min-h-[46svh] flex-col justify-center border-b border-paper/15 py-12 transition-opacity duration-500 last:border-b-0 lg:min-h-[62svh] motion-reduce:opacity-100 ${
                  active === i ? "opacity-100" : "opacity-35"
                }`}
              >
                <span className="label text-brand-soft">Aşama {String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-4 text-[clamp(2rem,4vw,3.4rem)]">{s.title}</h3>
                <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-paper/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
