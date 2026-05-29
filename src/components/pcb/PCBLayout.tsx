"use client";

import React from "react";
import { PCBBoard } from "./PCBBoard";
import { PCBInfoPanel } from "./PCBInfoPanel";
import { DesignSelector } from "@/src/components/ui/DesignSelector";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { ProjectCard } from "@/src/components/ProjectCard";
import { MetricsSection } from "@/src/components/MetricsSection";
import { ExperienceTimeline } from "@/src/components/ExperienceTimeline";
import { SkillsGrid } from "@/src/components/SkillsGrid";
import { ArchitectureSection } from "@/src/components/ArchitectureSection";
import { CaseStudiesSection } from "@/src/components/CaseStudiesSection";
import { PhilosophySection } from "@/src/components/PhilosophySection";
import { ContactSection } from "@/src/components/ContactSection";
import siteData from "@/src/data/siteData.json";

export const PCBLayout: React.FC = () => {
  const {
    profile, sideProjects, experience, skillsMatrix, contact, metrics, philosophy
  } = siteData;
  const metadata = siteData.metadata;

  return (
    <div className="theme-pcb min-h-screen font-mono" style={{ background: "var(--bg-base)" }}>
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.022]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, var(--accent) 0px, transparent 1px, transparent 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Background grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px,transparent 1px),linear-gradient(90deg,var(--accent) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header bar */}
      <header className="sticky top-0 z-20 border-b border-border-subtle bg-bg-surface/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-mono text-text-primary tracking-widest uppercase font-bold">
              {profile.name} · System Active
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {["#projects", "#experience", "#skills", "#case-studies", "#contact"].map((href) => (
              <a
                key={href}
                href={href}
                className="text-[10px] font-mono text-text-muted hover:text-accent transition-colors uppercase tracking-widest font-bold"
              >
                {href.replace("#", "")}
              </a>
            ))}
          </nav>
          {/* Mobile nav dots */}
          <nav className="flex md:hidden items-center gap-3">
            {["#projects", "#experience", "#skills", "#case-studies", "#contact"].map((href) => (
              <a
                key={href}
                href={href}
                className="text-[9px] font-mono text-text-muted hover:text-accent transition-colors uppercase tracking-widest font-bold"
              >
                {href.replace("#", "").slice(0, 3)}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <div className="relative" style={{ minHeight: "100svh" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-6 lg:gap-10 items-center min-h-[calc(100svh-3rem)]">
          <div className="w-full lg:w-[360px] flex-none z-10 order-1">
            <PCBInfoPanel
              name={profile.name}
              title={profile.title}
              bio={profile.bio}
              email={contact.email}
              location={profile.location}
              github={metadata.socialLinks.github}
              linkedin={metadata.socialLinks.linkedin}
            />
          </div>
          <div
            className="flex-1 relative order-2 w-full"
            style={{ height: "min(90vw, 560px)", minHeight: 320 }}
          >
            <PCBBoard avatarSrc={profile.avatar.src} avatarAlt={profile.avatar.alt} />
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[9px] font-mono text-text-muted tracking-widest">SCROLL</span>
          <div className="w-px h-7 bg-gradient-to-b from-accent/40 to-transparent" />
        </div>
      </div>

      <main className="relative z-10 w-full flex flex-col">
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

        {/* ── Architecture ───────────────────────────── */}
        <ArchitectureSection />

        {/* ── Case Studies ──────────────────────────── */}
        <CaseStudiesSection />

        {/* ── Philosophy ─────────────────────────────── */}
        <PhilosophySection quote={philosophy.quote} focus={philosophy.focus} />

        {/* ── Contact ────────────────────────────────── */}
        <ContactSection contact={contact} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle py-8 bg-bg-surface/20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] font-mono text-text-muted">
            <span className="text-accent/40">©</span> {new Date().getFullYear()} {profile.name} · All Rights Reserved
          </p>
          <p className="text-[10px] font-mono text-text-muted/60">BUILD::PCB_THEME_v2</p>
        </div>
      </footer>

      <DesignSelector />
    </div>
  );
};
