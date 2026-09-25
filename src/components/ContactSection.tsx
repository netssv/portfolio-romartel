"use client";

import React from "react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
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
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionLabel
              index="06"
              eyebrow={t.contact.eyebrow}
              heading={t.contact.heading}
              description={contact.description}
            />

            {/* Strategic Manifesto Callout (Integrated from Philosophy) */}
            {manifesto && (
              <div className="mt-8 p-6 rounded-2xl border border-border-subtle bg-bg-surface/60 backdrop-blur-xs relative overflow-hidden">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent block mb-2 font-semibold">
                  {isSpanish ? "Manifiesto Operativo" : "Operating Manifesto"}
                </span>
                <blockquote className="text-sm sm:text-base font-heading font-medium text-text-primary leading-relaxed italic">
                  &ldquo;{manifesto}&rdquo;
                </blockquote>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] font-mono text-text-muted">
                  <span className="px-2.5 py-1 rounded-md bg-bg-raised/70 border border-border-subtle">
                    {isSpanish ? "Fiabilidad de Sistemas" : "Systems Reliability"}
                  </span>
                  <span>·</span>
                  <span className="px-2.5 py-1 rounded-md bg-bg-raised/70 border border-border-subtle">
                    {isSpanish ? "Telemetría de Crecimiento" : "Growth Telemetry"}
                  </span>
                  <span>·</span>
                  <span className="px-2.5 py-1 rounded-md bg-bg-raised/70 border border-border-subtle">
                    {isSpanish ? "Automatización Pragmática" : "Pragmatic Automation"}
                  </span>
                </div>
              </div>
            )}
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
