"use client";

import siteData from "@/src/data/siteData.json";
import { Navbar } from "@/src/components/Navbar";
import { HeroSection } from "@/src/components/HeroSection";
import { TrustedStack } from "@/src/components/TrustedStack";
import { ProjectCard } from "@/src/components/ProjectCard";
import { MetricsSection } from "@/src/components/MetricsSection";
import { ExperienceTimeline } from "@/src/components/ExperienceTimeline";
import { SkillsGrid } from "@/src/components/SkillsGrid";
import { PhilosophySection } from "@/src/components/PhilosophySection";
import { ContactSection } from "@/src/components/ContactSection";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { useDesign } from "@/src/context/DesignContext";
import { PCBLayout } from "@/src/components/pcb/PCBLayout";
import { DesignSelector } from "@/src/components/ui/DesignSelector";
import { ScrollIndicator } from "@/src/components/layout/ScrollIndicator";

const {
  profile, experience, sideProjects,
  skillsMatrix, contact, trustedStack, metrics, philosophy,
} = siteData;

export default function Home() {
  const { design } = useDesign();

  if (design === "pcb") {
    return (
      <PCBLayout
        profile={profile}
        sideProjects={sideProjects}
        experience={experience}
        trustedStack={trustedStack}
        contact={contact}
        metadata={siteData.metadata}
      />
    );
  }

  return (
    <>
      <ScrollIndicator />
      <Navbar 

        authorName={profile.name} 
        navItems={[
          { name: "Home", path: "#top" },
          { name: "Projects", path: "#projects" },
          { name: "Experience", path: "#experience" },
          { name: "Insights", path: "#skills" }
        ]} 
      />
      <main className="flex-1 w-full flex flex-col min-w-0">
        {/* ── Hero ───────────────────────────────────── */}
        <HeroSection
          name={profile.name}
          title={profile.title}
          bio={profile.bio}
          location={profile.location}
          avatar={profile.avatar}
          email={contact.email}
        />

        {/* ── Tech Stack ─────────────────────────────── */}
        <TrustedStack stack={trustedStack} />

        {/* ── Projects ───────────────────────────────── */}
        <section id="projects" className="py-24 border-b border-border-subtle">
          <div className="mx-auto max-w-6xl px-6">
            <FadeIn>
              <SectionLabel
                eyebrow="Portfolio"
                heading="Featured Projects"
                description="Open-source tools and applications built to solve real operational and consumer problems."
              />
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sideProjects.slice(0, 3).map((project, i) => (
                <FadeIn key={project.id} delay={i * 80}>
                  <ProjectCard {...project} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Metrics ────────────────────────────────── */}
        <MetricsSection metrics={metrics} />

        {/* ── Experience ─────────────────────────────── */}
        <ExperienceTimeline items={experience} />

        {/* ── Skills ─────────────────────────────────── */}
        <SkillsGrid skillsMatrix={skillsMatrix} />

        {/* ── Philosophy ─────────────────────────────── */}
        <PhilosophySection quote={philosophy.quote} focus={philosophy.focus} />

        {/* ── Contact ────────────────────────────────── */}
        <ContactSection contact={contact} />
      </main>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="py-8 border-t border-border-subtle bg-zinc-950/20">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-body text-text-muted">
            &copy; {new Date().getFullYear()} {siteData.metadata.author}. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs font-body text-text-muted">
            <a href={siteData.metadata.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-text-secondary transition-colors duration-150">GitHub</a>
            <a href={siteData.metadata.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-text-secondary transition-colors duration-150">LinkedIn</a>
            <a href="#top" className="hover:text-text-secondary transition-colors duration-150">↑ Top</a>
          </div>
        </div>
      </footer>

      {/* Floating Design Selector */}
      <DesignSelector />
    </>
  );
}

