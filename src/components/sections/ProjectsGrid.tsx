"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/content/site";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const types = useMemo(() => ["Tümü", ...Array.from(new Set(projects.map((p) => p.type)))], [projects]);
  const [filter, setFilter] = useState("Tümü");
  const list = filter === "Tümü" ? projects : projects.filter((p) => p.type === filter);
  const listRef = useRef<HTMLUListElement>(null);

  // Filtreyle yeni yerleşen kartların çizimlerini tetikle.
  useEffect(() => {
    const id = requestAnimationFrame(() => listRef.current?.querySelectorAll("[data-draw]").forEach((el) => el.classList.add("is-in")));
    return () => cancelAnimationFrame(id);
  }, [filter]);

  return (
    <section aria-label="Proje listesi" className="border-t hairline pb-[var(--section-y)]">
      <div className="shell">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3 py-8" role="group" aria-label="Türe göre filtrele">
          <span className="label mr-4 text-muted">Filtre</span>
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              aria-pressed={filter === t}
              className={`label h-10 border px-4 transition-colors ${
                filter === t ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink hover:border-ink"
              }`}
            >
              {t}
            </button>
          ))}
          <span className="label ml-auto text-muted" aria-live="polite">
            {String(list.length).padStart(2, "0")} kayıt
          </span>
        </div>

        <ul ref={listRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {list.map((p, i) => (
            <li key={p.slug} className={i % 3 === 0 ? "lg:col-span-7" : i % 3 === 1 ? "lg:col-span-5 lg:mt-24" : "lg:col-span-6 lg:col-start-4"}>
              <ProjectCard project={p} index={projects.indexOf(p)} sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
