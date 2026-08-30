"use client";

import React from "react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { Calendar, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";
import { ContactFunnelForm } from "@/src/components/contact/ContactFunnelForm";

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
  calUrl?: string;
  social: SocialLink[];
}

export const ContactSection: React.FC<{ contact: ContactData }> = ({ contact }) => {
  const { t } = useLanguage();
  const bookingUrl = contact.calUrl || "https://cal.com/rodrigo-martel/30min?overlayCalendar=true";

  return (
    <section id="contact" className="py-24 bg-bg-base border-t border-border-subtle">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Info Column */}
        <div className="lg:col-span-5">
          <FadeIn>
            <SectionLabel
              eyebrow={t.contact.eyebrow}
              heading={t.contact.heading}
              description={contact.description}
            />

            <div className="space-y-4 mt-6">
              {/* Direct 30-Min Discovery Call CTA */}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent text-white shadow-xs">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-text-primary group-hover:text-accent transition-colors">
                      {t.contact.scheduleCall}
                    </h4>
                    <p className="text-[11px] font-body text-text-muted">
                      {t.contact.scheduleCallSubtitle}
                    </p>
                  </div>
                </div>
                <ArrowUpRight size={15} className="text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="block text-sm font-body font-semibold text-accent hover:underline pt-2"
              >
                {contact.email}
              </a>
              <p className="text-xs font-body text-text-muted">{contact.location}</p>

              <div className="pt-2 flex flex-col gap-2.5">
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
