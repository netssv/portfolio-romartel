"use client";

import React from "react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { useLanguage } from "@/src/context/LanguageContext";
import { ContactTerminal } from "./contact/ContactTerminal";
import { ContactActionLinks } from "./contact/ContactActionLinks";

interface SocialLink {
  name: string;
  url: string;
  display: string;
}

interface ContactData {
  title: string;
  description: string;
  email: string;
  location: string;
  social: SocialLink[];
}

interface ContactSectionProps {
  contact: ContactData;
  manifesto?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  manifesto,
}) => {
  const { t, isSpanish } = useLanguage();

  const leftWord = isSpanish ? "HABLE" : "LET'S";
  const rightWord = isSpanish ? "MOS" : "TALK";

  return (
    <section id="contact" className="py-24 bg-bg-base border-t border-border-subtle relative overflow-hidden">
      {/* Background architectural glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Section Architectural Index */}
        <FadeIn>
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 text-center select-none">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-bold tracking-tighter bg-accent/10 border border-accent/20 text-accent shadow-xs">
              [06]
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-text-muted">
              {t.contact.eyebrow}
            </span>
          </div>
        </FadeIn>

        {/* Flanking Monumental Typography + Center Terminal */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 my-4">
          <div className="hidden lg:flex flex-1 items-center justify-end select-none pointer-events-none">
            <span className="text-7xl xl:text-8xl 2xl:text-9xl font-black uppercase tracking-tight text-accent/25 hover:text-accent/40 transition-colors">
              {leftWord}
            </span>
          </div>

          <div className="lg:hidden text-center select-none mb-2">
            <span className="text-5xl sm:text-6xl font-black uppercase tracking-tight text-accent/30">
              {leftWord} {rightWord}
            </span>
          </div>

          <div className="w-full lg:max-w-xl z-10">
            <ContactTerminal />
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-start select-none pointer-events-none">
            <span className="text-7xl xl:text-8xl 2xl:text-9xl font-black uppercase tracking-tight text-accent/25 hover:text-accent/40 transition-colors">
              {rightWord}
            </span>
          </div>
        </div>

        {/* High-Intent Direct Action Pairing */}
        <ContactActionLinks
          email={contact.email}
          social={contact.social}
        />
      </div>
    </section>
  );
};
