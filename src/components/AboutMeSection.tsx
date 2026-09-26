"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MessageCircle, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { useLanguage } from "@/src/context/LanguageContext";
import { BtcTrendTelemetryBar } from "@/src/components/BtcTrendTelemetryBar";
import { ScrollIlluminatedParagraph } from "@/src/components/ui/ScrollIlluminatedParagraph";

export const AboutMeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, t } = useLanguage();
  const about = data.about;

  // Pinned scroll-driven narrative progression
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Staggered sequential illumination ranges for the 4 narrative paragraphs
  const paragraphCount = about?.paragraphs?.length || 1;
  const paragraphRanges: [number, number][] = useMemo(() => {
    const start = 0.06;
    const end = 0.82;
    const span = (end - start) / Math.max(1, paragraphCount);
    return (about?.paragraphs || []).map((_, i) => {
      const pStart = start + i * span;
      const pEnd = Math.min(0.85, pStart + span * 1.2);
      return [pStart, pEnd] as [number, number];
    });
  }, [paragraphCount, about?.paragraphs]);

  // Telemetry bar and contact actions smoothly reach full clarity alongside the final paragraph
  const footerOpacity = useTransform(scrollYProgress, (s) => {
    if (s < 0.58) return 0.35;
    if (s >= 0.80) return 1.0;
    return 0.35 + ((s - 0.58) / 0.22) * 0.65;
  });

  if (!about) return null;

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative h-[220vh] w-full bg-bg-surface/50 border-t border-border-subtle"
    >
      {/* Pinned Viewport Container: stays centered while scroll illuminates each paragraph */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-center items-center overflow-y-auto sm:overflow-hidden px-4 sm:px-6 py-6 sm:py-8">
        <div className="mx-auto max-w-4xl w-full relative z-10 flex flex-col my-auto">
          {/* Architectural Section Index & Bracketed Heading */}
          <SectionLabel
            index="01"
            eyebrow={about.eyebrow}
            heading={about.heading}
          />

          {/* Editorial Narrative Paragraphs with Sequential Scroll-Scrubbed Illumination */}
          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base md:text-lg font-body leading-relaxed mt-2 sm:mt-4">
            {about.paragraphs.map((paragraph, idx) => (
              <ScrollIlluminatedParagraph
                key={idx}
                text={paragraph}
                index={idx}
                scrollYProgress={scrollYProgress}
                range={paragraphRanges[idx] || [0.1, 0.9]}
              />
            ))}
          </div>

          {/* 1. Live Telemetry Bar (Centered, Borderless) */}
          <motion.div
            style={{ opacity: footerOpacity }}
            className="mt-6 sm:mt-8 w-full flex justify-center shrink-0"
          >
            <BtcTrendTelemetryBar />
          </motion.div>

          {/* 2. Action Pairing: Conversational Booking & WhatsApp (Always Centered) */}
          <motion.div
            style={{ opacity: footerOpacity }}
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3.5 shrink-0"
          >
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-clippo-schedule"));
              }}
              className="h-10 sm:h-11 px-6 sm:px-7 flex items-center justify-center gap-2 rounded-full bg-accent text-white text-xs font-body font-semibold hover:bg-accent-hover transition-colors shadow-xs group cursor-pointer"
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
              className="h-10 sm:h-11 px-5 sm:px-6 flex items-center justify-center gap-2 rounded-full border border-border-base bg-bg-surface text-xs font-body font-medium text-text-secondary hover:text-text-primary hover:border-accent transition-colors shadow-xs group"
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
      </div>
    </section>
  );
};
