"use client";

import React, { useRef } from "react";
import { ArrowUpRight, ArrowDown, MapPin, MessageSquare } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { ExecutivePortrait } from "@/src/components/ui/ExecutivePortrait";

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
  location: string;
  avatar: { src: string; alt: string };
  email?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name,
  title,
  bio,
  location,
  avatar,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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
    <section id="top" className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden z-10">
      <div
        ref={heroRef}
        className="relative mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10"
      >
        <motion.div
          className="lg:col-span-7 flex flex-col z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow & Status Badge */}
          <motion.div className="inline-flex flex-wrap items-center gap-3 mb-6" variants={itemVariants}>
            <span className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-raised border border-border-subtle shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-success" />
              </span>
              <span className="text-xs font-body font-semibold text-text-primary">
                Available for Work
              </span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-surface border border-border-subtle text-xs font-body text-text-muted shadow-xs">
              <MapPin size={12} className="text-accent" />
              <span>{location}</span>
            </span>
          </motion.div>

          {/* Name Headline */}
          <motion.div className="mb-4" variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-text-primary tracking-tight leading-[1.08]">
              {name}
            </h1>
          </motion.div>

          {/* Subtitle / Role */}
          <motion.p
            className="text-lg sm:text-xl font-heading font-semibold text-accent mb-5 leading-snug"
            variants={itemVariants}
          >
            {title}
          </motion.p>

          {/* Bio */}
          <motion.p
            className="text-sm sm:text-base font-body text-text-secondary leading-[1.8] max-w-xl mb-9"
            variants={itemVariants}
          >
            {bio}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center"
            variants={itemVariants}
          >
            <a
              href="#projects"
              className="h-11 px-6 flex items-center justify-center gap-2 rounded-xl bg-accent text-white text-xs font-body font-semibold hover:bg-accent-hover transition-colors shadow-xs group"
            >
              <span>Explore Projects</span>
              <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
            </a>

            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-clippo-contact"));
              }}
              className="h-11 px-5 flex items-center justify-center gap-2 rounded-xl border border-border-base bg-bg-surface text-xs font-body font-medium text-text-secondary hover:text-text-primary hover:border-accent transition-colors shadow-xs group cursor-pointer"
            >
              <MessageSquare size={14} className="text-accent" />
              <span>Quick Message</span>
              <ArrowUpRight size={13} className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </button>
          </motion.div>
        </motion.div>

        {/* Portrait Image Column */}
        <div ref={imgRef} className="lg:col-span-5 flex justify-center lg:justify-end z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={
              imgInView
                ? { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } }
                : { opacity: 0, scale: 0.95, y: 16 }
            }
            className="relative z-10 flex flex-col items-center"
          >
            <ExecutivePortrait src={avatar.src} alt={avatar.alt} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
