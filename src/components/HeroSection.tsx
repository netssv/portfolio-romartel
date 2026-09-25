"use client";

import React, { useRef } from "react";
import { ArrowUpRight, ArrowDown, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { ExecutivePortrait } from "@/src/components/ui/ExecutivePortrait";
import { useLanguage } from "@/src/context/LanguageContext";

interface HeroSectionProps {
  name: string;
  title: string;
  tagline?: string;
  bio?: string;
  location?: string;
  avatar: { src: string; alt: string };
  email?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  title,
  tagline,
  bio,
  avatar,
}) => {
  const { t, isSpanish } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <section id="top" className="relative pt-20 sm:pt-24 lg:pt-28 pb-12 lg:pb-16 overflow-hidden z-10">
      <div
        ref={heroRef}
        className="relative mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col items-center z-10"
      >
        <motion.div
          className="w-full flex flex-col items-center z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Monumental Name Hero Target Anchor */}
          <motion.div
            id="hero-name-target"
            className="w-full h-16 sm:h-24 md:h-32 lg:h-40 xl:h-48 mb-8 sm:mb-12 lg:mb-16 flex items-center justify-start pointer-events-none select-none"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.1 } },
            }}
          >
            <h1 className="sr-only">{name}</h1>
          </motion.div>

          {/* Centered Executive Portrait */}
          <motion.div className="w-full relative mb-8 flex justify-center z-10" variants={itemVariants}>
            <ExecutivePortrait src={avatar.src} alt={avatar.alt} />
          </motion.div>

          {/* Subtitle & Role Tag */}
          <motion.div className="inline-flex items-center gap-2 mb-3" variants={itemVariants}>
            <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold">
              [00]
            </span>
            <span className="text-base sm:text-lg font-heading font-semibold text-text-primary text-center">
              {title}
            </span>
          </motion.div>

          {/* Tagline / Subtitle */}
          <motion.p
            className="text-sm sm:text-base font-body text-text-secondary leading-relaxed max-w-2xl text-center mb-8"
            variants={itemVariants}
          >
            {tagline || bio}
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3.5"
            variants={itemVariants}
          >
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-clippo-contact"));
              }}
              className="h-11 px-6 flex items-center justify-center gap-2 rounded-full bg-accent text-white text-xs font-body font-semibold hover:bg-accent-hover transition-colors shadow-xs group cursor-pointer"
            >
              <MessageSquare size={13} />
              <span>{isSpanish ? "Mensaje Rápido" : "Quick Message"}</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <a
              href="#projects"
              className="h-11 px-6 flex items-center justify-center gap-2 rounded-full border border-border-base bg-bg-surface text-xs font-body font-medium text-text-secondary hover:text-text-primary hover:border-accent transition-colors shadow-xs group"
            >
              <span>{t.hero.viewProjects}</span>
              <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
