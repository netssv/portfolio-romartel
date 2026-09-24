"use client";

import React from "react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { ContactFunnelForm } from "@/src/components/ui/ContactFunnelForm";
import { Calendar, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

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

export const ContactSection: React.FC<{ contact: ContactData }> = ({ contact }) => {
  const { t, isSpanish } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-bg-base border-t border-border-subtle">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Info Column */}
        <div className="lg:col-span-5">
          <FadeIn>
            <SectionLabel
              index="06"
              eyebrow={t.contact.eyebrow}
              heading={t.contact.heading}
              description={contact.description}
            />

            <div className="space-y-4 mt-4">
              <a
                href={`mailto:${contact.email}`}
                className="block text-sm font-body font-semibold text-accent hover:underline"
              >
                {contact.email}
              </a>
              <p className="text-xs font-body text-text-muted">{contact.location}</p>

              {/* Instant Scheduling Option (Inspired by streamlined calendar scheduling) */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("open-clippo-schedule"));
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent/10 border border-accent/20 hover:border-accent text-accent text-xs font-body font-semibold transition-all cursor-pointer shadow-xs group"
                >
                  <Calendar size={13} className="shrink-0" />
                  <span>{isSpanish ? "Agendar Llamada con Asistente" : "Schedule Call via Clippo"}</span>
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              <div className="pt-4 flex flex-col gap-2.5">
                {contact.social.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs font-body text-text-secondary hover:text-text-primary transition-colors py-1"
                  >
                    <span>{link.name}</span>
                    <span className="text-text-muted text-[11px]">
                      {link.display} ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Interactive Funnel */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <FadeIn delay={100} className="h-full">
            <ContactFunnelForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
