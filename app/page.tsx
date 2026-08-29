"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/src/context/LanguageContext";
import { Navbar } from "@/src/components/Navbar";
import { HeroSection } from "@/src/components/HeroSection";
import { BtcTrendTelemetryBar } from "@/src/components/BtcTrendTelemetryBar";
import { TrustedStack } from "@/src/components/TrustedStack";
import { ProjectsSection } from "@/src/components/ProjectsSection";
import { MetricsSection } from "@/src/components/MetricsSection";
import { ExperienceTimeline } from "@/src/components/ExperienceTimeline";
import { SkillsGrid } from "@/src/components/SkillsGrid";
import { PhilosophySection } from "@/src/components/PhilosophySection";
import { ArchitectureSection } from "@/src/components/ArchitectureSection";
import { CaseStudiesSection } from "@/src/components/CaseStudiesSection";
import { ContactSection } from "@/src/components/ContactSection";
import { CustomScrollRail } from "@/src/components/layout/CustomScrollRail";
import { SmoothScrollProvider } from "@/src/components/layout/SmoothScrollProvider";
import { useViewportGrid } from "@/src/lib/useViewportGrid";

const GlobalWebGLStage = dynamic(
  () => import("@/src/components/canvas/GlobalWebGLStage").then((m) => m.GlobalWebGLStage),
  { ssr: false }
);

export default function Home() {
  useViewportGrid();
  const { data, t } = useLanguage();

  const {
    profile,
    experience,
    flagshipProject,
    sideProjects,
    skillsMatrix,
    contact,
    trustedStack,
    metrics,
    philosophy,
    metadata,
  } = data;

  const navItems = [
    { name: t.nav.home, path: "#top" },
    { name: t.nav.projects, path: "#projects" },
    { name: t.nav.experience, path: "#experience" },
    { name: t.nav.insights, path: "#skills" },
    { name: t.nav.architecture, path: "#architecture" },
    { name: t.nav.caseStudies, path: "#case-studies" },
  ];

  return (
    <SmoothScrollProvider>
      <GlobalWebGLStage />
      <CustomScrollRail />
      <Navbar
        authorName={profile.name}
        navItems={navItems}
      />
      <main className="flex-1 w-full flex flex-col min-w-0 relative z-10">
        {/* ── Hero ───────────────────────────────────── */}
        <HeroSection
          name={profile.name}
          title={profile.title}
          bio={profile.bio}
          location={profile.location}
          avatar={profile.avatar}
          email={contact.email}
        />

        {/* ── Real-Time BTC Macro Trend & Automation Watchdog Bar ── */}
        <BtcTrendTelemetryBar />

        {/* ── Tech Stack ─────────────────────────────── */}
        <TrustedStack stack={trustedStack} />

        {/* ── Projects Showcase ──────────────────────── */}
        <ProjectsSection flagship={flagshipProject} projects={sideProjects} />

        {/* ── Metrics ────────────────────────────────── */}
        <MetricsSection metrics={metrics} />

        {/* ── Experience Timeline ────────────────────── */}
        <ExperienceTimeline items={experience} />

        {/* ── Skills & Capabilities ──────────────────── */}
        <div className="content-auto">
          <SkillsGrid skillsMatrix={skillsMatrix} />
        </div>

        {/* ── Architecture & Strategy ────────────────── */}
        <div className="content-auto">
          <ArchitectureSection />
        </div>

        {/* ── Case Studies ───────────────────────────── */}
        <div className="content-auto">
          <CaseStudiesSection />
        </div>

        {/* ── Philosophy & Vision ────────────────────── */}
        <div className="content-auto">
          <PhilosophySection quote={philosophy.quote} focus={philosophy.focus} />
        </div>

        {/* ── Contact Funnel ─────────────────────────── */}
        <ContactSection contact={contact} />
      </main>

      {/* ── Footer ─────────────────────────────────── */}
      <footer className="py-8 border-t border-border-subtle bg-bg-surface/50 relative z-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-body text-text-muted">
            &copy; {new Date().getFullYear()} {metadata.author}. {t.footer.rights}
          </p>
          <div className="flex gap-5 text-xs font-body text-text-muted">
            <a
              href={metadata.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors duration-150"
            >
              GitHub
            </a>
            <a
              href={metadata.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors duration-150"
            >
              LinkedIn
            </a>
            <a
              href="#top"
              className="hover:text-accent transition-colors duration-150"
            >
              {t.footer.topLink}
            </a>
          </div>
        </div>
      </footer>
    </SmoothScrollProvider>
  );
}
