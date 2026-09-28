import Image from "next/image";
import type { Project } from "@/content/site";
import { ElevationSheet } from "@/components/drawings/ElevationSheet";

/** "Pafta" formatında proje kartı: görsel/çizim + antet tablosu. */
export function ProjectCard({ project, index, sizes = "(min-width: 1024px) 40vw, 85vw" }: { project: Project; index: number; sizes?: string }) {
  return (
    <article className="group flex h-full flex-col border border-ink/25 bg-paper">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-ink/25 bg-paper-2/60">
        {project.image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${project.image}`}
            alt={`${project.title} — ${project.location}`}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
        ) : (
          <ElevationSheet drawing={project.drawing} label={`Görünüş — ${project.code}`} className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]" />
        )}
        {project.placeholder && (
          <span className="label absolute right-3 top-3 bg-paper px-2 py-1 text-[0.6rem] text-muted">Örnek pafta · görsel eklenecek</span>
        )}
      </div>
      <div className="grid grid-cols-[auto_1fr] text-sm">
        <span className="label flex items-center border-r border-ink/25 px-4 text-brand">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="display px-4 py-4 text-[1.5rem]">{project.title}</h3>
      </div>
      <dl className="mt-auto grid grid-cols-3 border-t border-ink/25 text-[0.8rem]">
        {[
          ["Tür", project.type],
          ["Konum", project.location],
          ["Durum", project.status],
        ].map(([k, v], i) => (
          <div key={k} className={`px-4 py-3 ${i ? "border-l border-ink/25" : ""}`}>
            <dt className="label text-[0.6rem] text-muted">{k}</dt>
            <dd className="mt-1 leading-snug">{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
