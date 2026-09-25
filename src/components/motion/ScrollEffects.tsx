"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, MOTION_OK } from "@/lib/gsap";

/**
 * Sunucu bileşenlerinde veri öznitelikleriyle bildirilen scroll efektleri:
 *  - data-reveal="lines"  → satırlar maskeden yükselir
 *  - data-reveal="fade"   → yumuşak yükselerek belirir (data-stagger ile çocuklar)
 *  - data-reveal="words"  → kelimeler kaydırmayla koyulaşır (scrub)
 *  - data-draw            → içindeki .dl/.df/.db öğeleri çizilir (CSS geçişi)
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const q = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T & Element>(s)) as T[];

      q<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "rl",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            return gsap.from(self.lines, {
              yPercent: 112,
              duration: 1.15,
              stagger: 0.08,
              delay: Number(el.dataset.delay ?? 0),
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        });
      });

      q<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
        const targets = el.hasAttribute("data-stagger") ? Array.from(el.children) : [el];
        gsap.set(el, { visibility: "visible" });
        gsap.from(targets, {
          y: 28,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.07,
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      q<HTMLElement>('[data-reveal="words"]').forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 55%", scrub: 0.6 },
          },
        );
      });

      q<HTMLElement>("[data-draw]:not(.hero-draw)").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => el.classList.add("is-in"),
        });
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });

    // Hareket azaltıldığında çizimler baştan tam görünsün.
    mm.add("(prefers-reduced-motion: reduce)", () => {
      document.querySelectorAll("[data-draw]").forEach((el) => el.classList.add("is-in"));
    });

    return () => mm.revert();
  }, [pathname]);

  return null;
}
