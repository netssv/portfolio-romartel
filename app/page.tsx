"use client";

import { useLanguage } from "@/src/context/LanguageContext";
import { Navbar } from "@/src/components/Navbar";
import { HeroSection } from "@/src/components/HeroSection";
import { AboutMeSection } from "@/src/components/AboutMeSection";
import { BtcTrendTelemetryBar } from "@/src/components/BtcTrendTelemetryBar";
import { SloganSection } from "@/src/components/SloganSection";
import { TrustedStack } from "@/src/components/TrustedStack";
import { ProjectsSection } from "@/src/components/ProjectsSection";
import { MetricsSection } from "@/src/components/MetricsSection";
import { ExperienceTimeline } from "@/src/components/ExperienceTimeline";
import { SkillsGrid } from "@/src/components/SkillsGrid";
import { PhilosophySection } from "@/src/components/PhilosophySection";
import { ArchitectureSection } from "@/src/components/ArchitectureSection";
import { CertificationsSection } from "@/src/components/CertificationsSection";
import { CaseStudiesSection } from "@/src/components/CaseStudiesSection";
import { ContactSection } from "@/src/components/ContactSection";
import { CustomScrollRail } from "@/src/components/layout/CustomScrollRail";
import { SmoothScrollProvider } from "@/src/components/layout/SmoothScrollProvider";
import { GlobalWebGLStage } from "@/src/components/canvas/GlobalWebGLStage";
import { useViewportGrid } from "@/src/lib/useViewportGrid";

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
    { name: t.nav.about, path: "#about" },
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
          tagline={profile.tagline}
          bio={profile.bio}
          location={profile.location}
          avatar={profile.avatar}
          email={contact.email}
        />

        {/* ── [01] About Me (Editorial Narrative & Bitcoin Enthusiast) ── */}
        <AboutMeSection />

        {/* ── Real-Time BTC Macro Trend & Automation Watchdog Bar ── */}
        <BtcTrendTelemetryBar />

        {/* ── Think Big, Start Small: Kinetic Architectural Transition ── */}
        <SloganSection />

        {/* ── [02] Projects Showcase (AlejandroHA Split Architectural Stage) ── */}
        <ProjectsSection flagship={flagshipProject} projects={sideProjects} />

        {/* ── Tech Stack ─────────────────────────────── */}
        <TrustedStack stack={trustedStack} />

        {/* ── Metrics ────────────────────────────────── */}
        <MetricsSection metrics={metrics} />

        {/* ── Experience Timeline ────────────────────── */}
        <ExperienceTimeline items={experience} />

        {/* ── Skills & Capabilities (Architectural Contrast Canvas) ── */}
        <div className="bg-[#F4F5F7] dark:bg-[#12161E] pt-16 sm:pt-24 border-t border-border-subtle transition-colors duration-700">
          <SkillsGrid skillsMatrix={skillsMatrix} />
        </div>

        {/* ── Architecture & Strategy ────────────────── */}
        <div className="bg-[#F4F5F7] dark:bg-[#12161E] pb-16 sm:pb-24 border-b border-border-subtle transition-colors duration-700">
          <ArchitectureSection />
        </div>

        {/* ── Certifications & Credentials (Monumental Scatter Convergence) ── */}
        <CertificationsSection />

        {/* ── Case Studies ───────────────────────────── */}
        <CaseStudiesSection />

        {/* ── Philosophy & Vision ────────────────────── */}
        <PhilosophySection quote={philosophy.quote} focus={philosophy.focus} />

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
              className="directional-underline hover:text-text-primary transition-colors duration-150"
            >
              GitHub
            </a>
            <a
              href={metadata.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="directional-underline hover:text-text-primary transition-colors duration-150"
            >
              LinkedIn
            </a>
            <a
              href="#top"
              className="directional-underline hover:text-accent transition-colors duration-150"
            >
              {t.footer.topLink}
            </a>
          </div>
        </div>
      </footer>
    </SmoothScrollProvider>
  );
}
