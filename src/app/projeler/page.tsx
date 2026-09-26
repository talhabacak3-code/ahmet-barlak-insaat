import type { Metadata } from "next";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ContactFinale } from "@/components/sections/ContactFinale";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { site } from "@/content/site";

export const metadata: Metadata = pageMeta({
  title: "Projeler",
  description: `${site.name} proje portföyü: Afyonkarahisar'da konut, ticari, endüstriyel ve kentsel dönüşüm projeleri.`,
  path: "/projeler/",
});

export default function ProjelerPage() {
  return (
    <>
      <PageHero
        sheet="04"
        eyebrow="Projeler"
        lines={["Her proje", <>bir <em className="italic text-brand wdth-125">pafta.</em></>]}
        lead="Tamamlanan ve devam eden işlerimiz; türü, konumu ve durumuyla teknik bir kayıt olarak."
      />
      <ProjectsGrid projects={site.projects} />
      <ContactFinale heading="Sıradaki pafta sizin projeniz olsun." />
    </>
  );
}
