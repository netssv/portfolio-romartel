"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/src/components/ui/MagneticButton";
import { ParticleField } from "@/src/components/animations/ParticleField";

interface HeroProps {
  name: string;
  title: string;
  bio: string;
  location: string;
  avatar: { src: string; alt: string };
  email: string;
}

export const HeroSection: React.FC<HeroProps> = ({
  name,
  title,
  bio,
  location,
  avatar,
  email,
}) => {
  // Stagger entry configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <section id="top" className="relative py-20 lg:py-32 border-b border-border-subtle overflow-hidden">
      {/* Background ambient glow pulse */}
      <div 
        className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 rounded-full blur-[140px] opacity-[0.08]"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 80%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* ── Left: Text details with stagger animations ────────────────────── */}
        <motion.div
          className="lg:col-span-7 flex flex-col z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status pill badge */}
          <motion.div className="inline-flex items-center gap-2 mb-6" variants={itemVariants}>
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-body font-semibold uppercase tracking-[0.16em] text-accent">
              Available for strategic execution
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7.5xl font-heading font-extrabold text-text-primary tracking-[-0.04em] leading-[1.02] mb-6"
            variants={itemVariants}
          >
            {name}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl font-body font-medium text-text-primary/90 mb-6 leading-relaxed"
            variants={itemVariants}
          >
            {title}
          </motion.p>

          <motion.p
            className="text-sm sm:text-base text-text-secondary leading-[1.8] max-w-xl mb-10"
            variants={itemVariants}
          >
            {bio}
          </motion.p>

          {/* Staggered CTAs */}
          <motion.div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center" variants={itemVariants}>
            <MagneticButton
              href="#projects"
              className="h-12 px-8 flex items-center justify-center rounded-xl bg-accent text-black text-xs font-body font-bold shadow-[0_4px_20px_rgba(255,149,0,0.25)] hover:shadow-[0_4px_30px_rgba(255,149,0,0.4)] transition-all duration-200"
            >
              Explore Projects
            </MagneticButton>

            <a
              href={`mailto:${email}`}
              className="group h-12 px-6 flex items-center justify-center gap-2 rounded-xl border border-border-base text-xs font-body font-semibold text-text-secondary hover:text-text-primary hover:border-border-subtle transition-all duration-200"
            >
              <span>{email}</span>
              <ArrowUpRight
                size={14}
                className="text-text-muted group-hover:text-accent transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
              />
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: Premium Editorial Composition ──────────────────────────── */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
            className="relative p-6 bg-bg-raised border border-border-base rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Embedded grid overlay background */}
            <div 
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />

            {/* Embedded floating canvas particles */}
            <ParticleField />

            {/* Ambient orange glow container */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,149,0,0.1),transparent_70%)] animate-pulse" />

            {/* Content holder (Portrait + Details) */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative p-2 bg-bg-surface border border-border-base rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar.src}
                  alt={avatar.alt}
                  className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl filter contrast-[1.05]"
                  loading="lazy"
                />
              </div>

              {/* Minimal Location tag */}
              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-body font-semibold tracking-wider text-text-muted uppercase">
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span>{location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
