import Link from "next/link";
import { ServiceGlyph } from "@/components/drawings/ServiceGlyph";
import { SectionHead } from "@/components/ui/SectionHead";
import { site } from "@/content/site";

export function ServicesIndex() {
  return (
    <section aria-labelledby="hizmetler-baslik" className="pb-[var(--section-y)]">
      <div className="shell">
        <SectionHead
          id="hizmetler-baslik"
          eyebrow="Hizmetler"
          title="Temelden anahtara, altı iş kalemi."
          action={
            <Link href="/hizmetler" className="btn btn-secondary">
              Tüm kapsam
              <span aria-hidden="true" className="btn-arrow">
                →
              </span>
            </Link>
          }
        />

        <ol className="card mt-10 overflow-hidden lg:mt-14">
          {site.services.map((s, i) => (
            <li key={s.slug} className="border-b hairline last:border-b-0">
              <Link
                href={`/hizmetler#${s.slug}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-1.5 px-4 py-5 transition-colors duration-300 hover:bg-linen md:grid-cols-12 md:gap-x-6 md:px-6 md:py-6"
              >
                <span className="label text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-[clamp(1.4rem,2.2vw,1.7rem)] text-ink md:col-span-4">{s.title}</span>
                <span className="col-span-2 col-start-2 max-w-md text-[15px] leading-[1.5] text-charcoal md:col-span-5 md:col-start-auto">{s.short}</span>
                <span className="col-start-3 row-start-1 flex items-center justify-end gap-5 md:col-span-2 md:col-start-auto md:row-start-auto">
                  <ServiceGlyph name={s.glyph} className="hidden h-11 w-11 text-muted transition-colors duration-300 group-hover:text-brand md:block" />
                  <span aria-hidden="true" className="btn-arrow text-muted transition-colors duration-300 group-hover:text-brand">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
