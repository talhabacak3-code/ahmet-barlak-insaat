"use client";

import Link from "next/link";
import { useRef } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { site } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Yatay kaydırma: ≥1024px ve hareket serbestken dikey kaydırma → yatay hareket (CSS sticky + scrub, pin yok).
 * Aksi hâlde native yatay kaydırma + scroll-snap.
 */
export function ProjectsRail() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const section = root.current!;
        const rail = track.current!;
        const distance = () => rail.scrollWidth - window.innerWidth;
        const setHeight = () => (section.style.height = `${window.innerHeight + distance()}px`);
        setHeight();

        gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onRefreshInit: setHeight,
          },
        });
        return () => {
          section.style.height = "";
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="projeler-baslik" className="relative">
      <div className="lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:flex lg:motion-safe:h-svh lg:motion-safe:flex-col lg:motion-safe:justify-center lg:motion-safe:overflow-hidden">
        <div
          ref={track}
          className="flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto py-[var(--section-y)] pl-[max(var(--gutter),calc((100vw-1200px)/2))] pr-[var(--gutter)] [scrollbar-width:none] lg:motion-safe:w-max lg:motion-safe:snap-none lg:motion-safe:gap-6 lg:motion-safe:overflow-visible lg:motion-safe:py-0 [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          role="region"
          aria-label="Projeler — yatay liste"
        >
          <div className="flex w-[82vw] shrink-0 snap-start flex-col justify-between gap-10 sm:w-[60vw] lg:w-[min(30vw,380px)] lg:pr-10">
            <div>
              <p className="label text-muted">Projeler</p>
              <h2 id="projeler-baslik" className="display mt-4 text-[clamp(2rem,3.6vw,3rem)] text-ink">
                Her proje bir pafta.
              </h2>
            </div>
            <div className="grid gap-6">
              <p className="max-w-sm text-[17px] leading-[1.55] text-charcoal">
                Tamamlanan ve devam eden işlerimizi; konumu, türü ve durumuyla birlikte teknik bir kayıt olarak sunuyoruz.
              </p>
              <Link href="/projeler" className="btn btn-secondary w-fit">
                Tüm projeler
                <span aria-hidden="true" className="btn-arrow">
                  →
                </span>
              </Link>
            </div>
          </div>

          {site.projects.map((p, i) => (
            <Link
              key={p.slug}
              href="/projeler"
              className="block w-[82vw] shrink-0 snap-start rounded-xl sm:w-[56vw] lg:w-[min(36vw,520px)]"
              aria-label={`${p.title} — ${p.type}, ${p.location}`}
            >
              <ProjectCard project={p} index={i} />
            </Link>
          ))}
          <div aria-hidden="true" className="w-px shrink-0 lg:w-[4vw]" />
        </div>
      </div>
    </section>
  );
}
