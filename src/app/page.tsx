import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { ServicesIndex } from "@/components/sections/ServicesIndex";
import { ProcessStory } from "@/components/sections/ProcessStory";
import { ProjectsRail } from "@/components/sections/ProjectsRail";
import { Principles } from "@/components/sections/Principles";
import { ContactFinale } from "@/components/sections/ContactFinale";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ServicesIndex />
      <ProcessStory />
      <ProjectsRail />
      <Principles />
      <ContactFinale />
    </>
  );
}
