"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { useLanguage } from "@/src/context/LanguageContext";
import { BtcTrendTelemetryBar } from "@/src/components/BtcTrendTelemetryBar";

export const AboutMeSection: React.FC = () => {
  const { data, t } = useLanguage();
  const about = data.about;

  if (!about) return null;

  return (
    <section
      id="about"
      className="py-16 sm:py-24 relative overflow-hidden bg-bg-surface/50 border-t border-border-subtle"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
        {/* Architectural Section Index & Bracketed Heading */}
        <SectionLabel
          index="01"
          eyebrow={about.eyebrow}
          heading={about.heading}
        />

        {/* Editorial Narrative Paragraphs */}
        <div className="space-y-6 text-base sm:text-lg font-body text-text-secondary leading-relaxed">
          {about.paragraphs.map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.12 }}
              className="text-text-secondary font-normal leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* 1. Live Telemetry Bar (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-10 sm:mt-12 w-full flex justify-center"
        >
          <BtcTrendTelemetryBar />
        </motion.div>

        {/* 2. Action Pairing: Conversational Booking & WhatsApp (Always Centered) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-clippo-schedule"));
            }}
            className="h-11 px-7 flex items-center justify-center gap-2 rounded-full bg-accent text-white text-xs font-body font-semibold hover:bg-accent-hover transition-colors shadow-xs group cursor-pointer"
          >
            <Calendar size={14} />
            <span>{about.cta || t.nav.scheduleCall}</span>
            <ArrowUpRight
              size={13}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>

          <a
            href={data.metadata.socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-6 flex items-center justify-center gap-2 rounded-full border border-border-base bg-bg-surface text-xs font-body font-medium text-text-secondary hover:text-text-primary hover:border-accent transition-colors shadow-xs group"
          >
            <MessageCircle size={14} className="text-[#25D366]" />
            <span>{about.whatsappCta || t.nav.whatsapp}</span>
            <ArrowUpRight
              size={13}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
