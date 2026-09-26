import Image from "next/image";
import type { Project } from "@/content/site";
import { ElevationSheet } from "@/components/drawings/ElevationSheet";

/** Proje kartı (beyaz içerik kartı): görsel ya da teknik çizim + künye. */
export function ProjectCard({ project, index, sizes = "(min-width: 1024px) 40vw, 85vw" }: { project: Project; index: number; sizes?: string }) {
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-shadow duration-500 hover:shadow-[0_1px_1px_rgb(0_0_0/0.08),0_10px_24px_-8px_rgb(0_0_0/0.14)]">
      <div className="relative aspect-[4/3] overflow-hidden border-b hairline bg-linen">
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
          <span className="label absolute right-3 top-3 rounded-lg border border-mist bg-card px-2 py-1 text-[12px] text-muted">Örnek · görsel eklenecek</span>
        )}
      </div>
      <div className="flex items-baseline gap-3 px-5 pb-4 pt-5">
        <span className="label text-muted">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="display text-[1.6rem] text-ink">{project.title}</h3>
      </div>
      <dl className="mt-auto grid grid-cols-3 border-t hairline text-[14px]">
        {[
          ["Tür", project.type],
          ["Konum", project.location],
          ["Durum", project.status],
        ].map(([k, v], i) => (
          <div key={k} className={`px-5 py-3.5 ${i ? "border-l hairline" : ""}`}>
            <dt className="label text-[12px] text-muted">{k}</dt>
            <dd className="mt-0.5 leading-snug text-charcoal">{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
