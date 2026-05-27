"use client";

import React from "react";
import { PCBBoard } from "./PCBBoard";
import { PCBInfoPanel } from "./PCBInfoPanel";
import { PCBContentSections } from "./PCBContentSections";
import { DesignSelector } from "@/src/components/ui/DesignSelector";

interface PCBLayoutProps {
  profile: { name: string; title: string; bio: string; location: string; avatar: { src: string; alt: string } };
  sideProjects: { id: string; title: string; subtitle: string; description: string; category: string; status: string; links: { github: string; demo: string } }[];
  experience: { company: string; role: string; period: string; location: string; description: string; impact: string[]; operations: string[]; isSecondary?: boolean }[];
  trustedStack: string[];
  contact: { email: string; location: string; social: { name: string; url: string }[] };
  metadata: { socialLinks: { github: string; linkedin: string } };
}

export const PCBLayout: React.FC<PCBLayoutProps> = ({
  profile, sideProjects, experience, trustedStack, contact, metadata,
}) => {
  return (
    <div className="min-h-screen font-mono" style={{ background: "#0a1628" }}>
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.022]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #00ff41 0px, transparent 1px, transparent 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Background grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(#00ff41 1px,transparent 1px),linear-gradient(90deg,#00ff41 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header bar */}
      <header className="sticky top-0 z-20 border-b border-[#00ff41]/20 bg-[#0a1628]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
            <span className="text-[11px] font-mono text-[#f4fbf7] tracking-widest uppercase font-bold">
              {profile.name} · System Active
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {["#projects", "#experience", "#skills", "#contact"].map((href) => (
              <a
                key={href}
                href={href}
                className="text-[10px] font-mono text-[#a9e2c1] hover:text-[#00ff41] transition-colors uppercase tracking-widest font-bold"
              >
                {href.replace("#", "")}
              </a>
            ))}
          </nav>
          {/* Mobile nav dots */}
          <nav className="flex md:hidden items-center gap-3">
            {["#projects", "#experience", "#skills", "#contact"].map((href) => (
              <a
                key={href}
                href={href}
                className="text-[9px] font-mono text-[#a9e2c1] hover:text-[#00ff41] transition-colors uppercase tracking-widest font-bold"
              >
                {href.replace("#", "").slice(0, 3)}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <div className="relative" style={{ minHeight: "100svh" }}>
        {/*
          Mobile: info panel on top, board below (full-width square canvas)
          Desktop: side-by-side, board takes ~60% width
        */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-6 lg:gap-10 items-center min-h-[calc(100svh-3rem)]">

          {/* Info panel — on mobile comes FIRST so user reads name/bio before board */}
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

          {/* Board canvas — responsive square that fills available space */}
          <div
            className="flex-1 relative order-2 w-full"
            style={{
              /**
               * On mobile: square based on viewport width minus padding.
               * On desktop: min-height so canvas is large enough.
               */
              height: "min(90vw, 560px)",
              minHeight: 320,
            }}
          >
            <PCBBoard avatarSrc={profile.avatar.src} avatarAlt={profile.avatar.alt} />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[9px] font-mono text-[#a9e2c1] tracking-widest">SCROLL</span>
          <div className="w-px h-7 bg-gradient-to-b from-[#00ff41]/40 to-transparent" />
        </div>
      </div>

      {/* Scrollable content sections */}
      <PCBContentSections
        sideProjects={sideProjects}
        experience={experience}
        skills={trustedStack}
        contact={{ email: contact.email, location: contact.location }}
      />

      {/* Footer */}
      <footer className="border-t border-[#00ff41]/20 py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] font-mono text-[#a9e2c1]/70">
            <span className="text-[#00ff41]/40">©</span> {new Date().getFullYear()} {profile.name} · All Rights Reserved
          </p>
          <p className="text-[10px] font-mono text-[#a9e2c1]/40">BUILD::PCB_THEME_v2</p>
        </div>
      </footer>

      <DesignSelector />
    </div>
  );
};
