"use client";

import siteData from "@/src/data/siteData.json";
import { Navbar } from "@/src/components/Navbar";
import { HeroSection } from "@/src/components/HeroSection";
import { TrustedStack } from "@/src/components/TrustedStack";
import { ProjectsSection } from "@/src/components/ProjectsSection";
import { MetricsSection } from "@/src/components/MetricsSection";
import { ExperienceTimeline } from "@/src/components/ExperienceTimeline";
import { SkillsGrid } from "@/src/components/SkillsGrid";
import { PhilosophySection } from "@/src/components/PhilosophySection";
import { ArchitectureSection } from "@/src/components/ArchitectureSection";
import { CaseStudiesSection } from "@/src/components/CaseStudiesSection";
import { ContactSection } from "@/src/components/ContactSection";
import { ScrollIndicator } from "@/src/components/layout/ScrollIndicator";

const {
  profile, experience, flagshipProject, sideProjects,
  skillsMatrix, contact, trustedStack, metrics, philosophy,
} = siteData;

export default function Home() {
  return (
    <>
      <ScrollIndicator />
      <Navbar 
        authorName={profile.name} 
        navItems={[
          { name: "Home", path: "#top" },
          { name: "Projects", path: "#projects" },
          { name: "Experience", path: "#experience" },
          { name: "Insights", path: "#skills" },
          { name: "Architecture", path: "#architecture" },
          { name: "Case Studies", path: "#case-studies" },
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

        {/* ── Projects (Flagship + 5 Specialized Projects) ──── */}
        <ProjectsSection
          flagship={flagshipProject}
          projects={sideProjects}
        />

        {/* ── Metrics ────────────────────────────────── */}
        <MetricsSection metrics={metrics} />

        {/* ── Experience ─────────────────────────────── */}
        <ExperienceTimeline items={experience} />

        {/* ── Skills ─────────────────────────────────── */}
        <SkillsGrid skillsMatrix={skillsMatrix} />

        {/* ── Architecture ───────────────────────────── */}
        <ArchitectureSection />

        {/* ── Case Studies ──────────────────────────── */}
        <CaseStudiesSection />

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
    </>
  );
}
