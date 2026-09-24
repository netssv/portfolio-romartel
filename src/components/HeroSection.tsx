"use client";

import React, { useRef } from "react";
import { ArrowUpRight, ArrowDown, MessageSquare, Award, Globe } from "lucide-react";
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

const CREDENTIALS_ARCHIVE_URL =
  "https://1drv.ms/f/c/c9136ada8a51a610/IgAQplGK2moTIIDJJKsAAAAAAd9ni2_70w9-q00a4Majbqk?e=AdFVPs";

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
    <section id="top" className="relative pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden z-10">
      <div
        ref={heroRef}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 flex flex-col items-center z-10"
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
            className="w-full h-16 sm:h-24 lg:h-28 mb-4 sm:mb-6 flex items-center justify-center pointer-events-none select-none"
            variants={itemVariants}
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
            className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
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

          {/* Bottom Horizon Metadata Bar */}
          <motion.div
            className="w-full pt-6 border-t border-border-subtle/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-text-muted"
            variants={itemVariants}
          >
            <a
              href="#certifications"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-base bg-bg-surface/80 hover:border-accent text-text-primary text-[11px] font-mono tracking-wider uppercase transition-colors shadow-xs group"
              title={isSpanish ? "Ver sección de credenciales verificadas" : "View verified credentials section"}
            >
              <Award size={13} className="text-accent" />
              <span>{isSpanish ? "103 Credenciales Verificadas" : "103 Verified Credentials"}</span>
              <ArrowDown size={11} className="text-text-muted group-hover:text-accent group-hover:translate-y-0.5 transition-transform" />
            </a>

            <div className="flex items-center gap-2 text-text-secondary text-[11px] font-mono tracking-wider uppercase">
              <Globe size={13} className="text-accent" />
              <span>{isSpanish ? "San Salvador, El Salvador • Remoto Global" : "San Salvador, El Salvador • Working Globally"}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
