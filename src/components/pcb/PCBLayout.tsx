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
      <div className="pointer-events-none fixed inset-0 z-10 opacity-[0.025]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #00ff41 0px, transparent 1px, transparent 3px)", backgroundSize: "100% 4px" }} />

      {/* Background grid */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{ backgroundImage: "linear-gradient(#00ff41 1px,transparent 1px),linear-gradient(90deg,#00ff41 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Header bar */}
      <header className="sticky top-0 z-20 border-b border-[#00ff41]/20 bg-[#0a1628]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
            <span className="text-[11px] font-mono text-[#f4fbf7] tracking-widest uppercase font-bold">
              {profile.name} · System Active
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {["#projects", "#experience", "#skills", "#contact"].map((href) => (
              <a key={href} href={href}
                className="text-[10px] font-mono text-[#a9e2c1] hover:text-[#00ff41] transition-colors uppercase tracking-widest font-bold">
                {href.replace("#", "")}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero board section */}
      <div className="relative overflow-hidden" style={{ minHeight: "100vh" }}>
        {/* Two-column layout: info + board */}
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8 items-center min-h-[calc(100vh-3rem)]">
          {/* Left: Info panel */}
          <div className="lg:w-[380px] flex-none z-10 order-2 lg:order-1">
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

          {/* Right: Circuit board canvas */}
          <div className="flex-1 relative order-1 lg:order-2" style={{ minHeight: "560px" }}>
            <PCBBoard
              avatarSrc={profile.avatar.src}
              avatarAlt={profile.avatar.alt}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[9px] font-mono text-[#a9e2c1] tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#00ff41]/40 to-transparent" />
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

      {/* Design selector */}
      <DesignSelector />
    </div>
  );
};
