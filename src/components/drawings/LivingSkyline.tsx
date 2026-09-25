"use client";

import { useRef } from "react";
import { Skyline, CLOUDS, CRANE, PICKUP, SLOTS } from "@/components/drawings/Skyline";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Silüeti canlandırır — "inşaat sürüyor" hissi:
 *  - vinç paletten blok alıp çatıdaki boş yuvalara yerleştirir; yuvalar dolunca bloklar
 *    logodaki pikseller gibi dağılır ve döngü yeniden başlar
 *  - kaledeki bayrak dalgalanır, pencereler yanıp söner, bulutlar süzülür
 *  - kaydırmada arka katmanlar hafif parallax yapar
 * Ekrandan çıkınca durur; hareket azaltılmışsa hiç çalışmaz.
 */
export function LivingSkyline({ className = "", mode = "hero" }: { className?: string; mode?: "hero" | "scroll" }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const q = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));
      const one = <T extends Element>(s: string) => el.querySelector<T>(s)!;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const loops: gsap.core.Animation[] = [];

        // ── Vinç ──────────────────────────────────────────────
        const trolley = one<SVGGElement>("[data-trolley]");
        const cable = one<SVGLineElement>("[data-cable]");
        const hook = one<SVGGElement>("[data-hook]");
        const load = one<SVGRectElement>("[data-load]");
        const pickup = one<SVGGElement>("[data-pickup]");
        const slots = q<SVGRectElement>("[data-slot]");
        const floats = q<SVGGElement>("[data-float]");

        const state = { x: CRANE.restX, hy: CRANE.restHook };
        const render = () => {
          trolley.setAttribute("transform", `translate(${state.x} 0)`);
          cable.setAttribute("y2", String(state.hy));
          hook.setAttribute("transform", `translate(0 ${state.hy})`);
        };
        const CARRY_Y = 76; // taşıma yüksekliği (kanca üstü)
        const px = PICKUP[0] + 5;
        const move = (x: number, duration: number) => ({ x, duration, ease: "power2.inOut", onUpdate: render });
        const hoist = (hy: number, duration: number) => ({ hy, duration, ease: "power2.inOut", onUpdate: render });

        const crane = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.6 });
        SLOTS.forEach(([sx, sy], i) => {
          crane
            .to(state, move(px, 1.6))
            .to(state, hoist(PICKUP[1] - 6, 1.5))
            .set(pickup, { opacity: 0 })
            .set(load, { opacity: 1 })
            .to(state, hoist(CARRY_Y, 1.6))
            .to(pickup, { opacity: 1, duration: 0.6 }, "<0.6")
            .to(state, move(sx + 5, 1.5))
            .to(state, hoist(sy - 6, 0.9))
            .set(load, { opacity: 0 })
            .set(slots[i], { opacity: 1 })
            .to(state, hoist(CARRY_Y + 8, 0.8));
        });
        // Yuvalar doldu → pikseller logodaki gibi dağılır, sonra sessizce yerine döner
        crane
          .to(state, move(CRANE.restX, 1.4))
          .to(
            [...slots, ...floats],
            {
              x: () => gsap.utils.random(14, 46),
              y: () => gsap.utils.random(-70, -24),
              opacity: 0,
              duration: 1.4,
              stagger: 0.08,
              ease: "power2.in",
            },
            "<",
          )
          .set(slots, { x: 0, y: 0, opacity: 0 })
          .set(floats, { x: 0, y: 0 })
          .to(floats, { opacity: 1, duration: 0.8, stagger: 0.1 });
        loops.push(crane);

        // ── Bayrak ────────────────────────────────────────────
        loops.push(
          gsap.to(one("[data-flag]"), {
            keyframes: { skewY: [0, -5, 3, -2, 0], scaleX: [1, 0.94, 0.98, 0.95, 1] },
            svgOrigin: "262 20",
            duration: 2.6,
            ease: "sine.inOut",
            repeat: -1,
            paused: true,
          }),
        );

        // ── Pencereler ────────────────────────────────────────
        q<SVGRectElement>("[data-lit]").forEach((w) => {
          loops.push(
            gsap
              .timeline({ repeat: -1, paused: true, delay: gsap.utils.random(0, 6) })
              .to(w, { opacity: 0.55, duration: 0.5, ease: "power1.out" })
              .to(w, { opacity: 0, duration: 0.9, ease: "power1.in" }, `+=${gsap.utils.random(3, 7)}`)
              .to({}, { duration: gsap.utils.random(4, 10) }),
          );
        });

        // ── Bulutlar ──────────────────────────────────────────
        q<SVGGElement>("[data-cloud]").forEach((c, i) => {
          const [x0, y] = CLOUDS[i];
          const t = gsap.fromTo(c, { x: -90, y }, { x: 1640, duration: gsap.utils.random(110, 150), ease: "none", repeat: -1, paused: true });
          t.progress((x0 + 90) / 1730);
          loops.push(t);
        });

        // ── Başlat / durdur ───────────────────────────────────
        let started = false;
        const play = () => loops.forEach((l) => l.play());
        const pause = () => loops.forEach((l) => l.pause());

        // Açılış çizimi bitince devreye girer
        const intro = gsap
          .delayedCall(mode === "hero" ? 3.1 : 2.4, () => {
            started = true;
            if (vis.isActive) play();
          })
          .pause();

        const vis = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (!self.isActive) return pause();
            if (started) play();
            else intro.play();
          },
        });
        if (vis.isActive) intro.play();

        // ── Parallax (yalnızca arka katmanlar; zemine basan yapılar sabit) ──
        const st = { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 };
        gsap.to(one("[data-layer='far']"), { x: -40, ease: "none", scrollTrigger: st });
        gsap.to(one("[data-layer='castle']"), { x: -18, ease: "none", scrollTrigger: { ...st } });

        return () => {
          state.x = CRANE.restX;
          state.hy = CRANE.restHook;
          render();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative w-full overflow-hidden">
      <Skyline mode={mode} className={className} />
    </div>
  );
}
