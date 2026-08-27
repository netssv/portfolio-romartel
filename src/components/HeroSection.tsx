"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Clarity from "@microsoft/clarity";
import { MagneticButton } from "@/src/components/ui/MagneticButton";
import { KeyBadge } from "@/src/components/ui/KeyBadge";
import { ScrambleText } from "@/src/components/ui/ScrambleText";
import { CornerReticle } from "@/src/components/ui/CornerReticle";
import { KineticTextReveal } from "@/src/components/ui/KineticTextReveal";
import { InteractivePuzzleAvatar } from "@/src/components/ui/InteractivePuzzleAvatar";

interface HeroSectionProps {
  name: string;
  title: string;
  bio: string;
  location: string;
  avatar: { src: string; alt: string };
  email: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name, title, bio, location, avatar, email,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: true, margin: "-50px" });

  const [personalization, setPersonalization] = useState<{ source?: string; industry?: string } | null>(null);
  const [ctaVariant, setCtaVariant] = useState<"A" | "B">("A");

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get("utm_source") || params.get("source");
        const utmIndustry = params.get("utm_industry") || params.get("industry");
        if (utmSource || utmIndustry) {
          setPersonalization({ source: utmSource || undefined, industry: utmIndustry || undefined });
        }
        const storedVariant = localStorage.getItem("ab_hero_cta_variant") as "A" | "B" | null;
        if (storedVariant) {
          setCtaVariant(storedVariant);
        } else {
          const assignedVariant = Math.random() < 0.5 ? "A" : "B";
          localStorage.setItem("ab_hero_cta_variant", assignedVariant);
          setCtaVariant(assignedVariant);
        }
      }
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  return (
    <section id="top" className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden z-10">
      <div ref={heroRef} className="relative mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        <motion.div className="lg:col-span-7 flex flex-col z-10" variants={containerVariants} initial="hidden" animate="visible">
          {personalization ? (
            <motion.div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20" variants={itemVariants}>
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono font-semibold tracking-wide text-accent">
                {personalization.source?.toLowerCase() === "linkedin"
                  ? "Hello LinkedIn Connection"
                  : personalization.source ? `Welcome from ${personalization.source}` : `Tailored solutions for ${personalization.industry}`}
              </span>
            </motion.div>
          ) : (
            <motion.div className="inline-flex flex-wrap items-center gap-2.5 mb-6" variants={itemVariants}>
              <span className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
                <CornerReticle size={5} color="rgba(16, 185, 129, 0.4)" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-emerald-400">
                  Available for strategic execution
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono font-medium text-zinc-300">
                <MapPin size={11} className="text-accent" />
                <span>{location}</span>
              </span>
            </motion.div>
          )}

          <motion.div className="mb-6 flex flex-wrap items-center" variants={itemVariants}>
            <KineticTextReveal
              text={name}
              as="h1"
              className="text-5xl sm:text-6xl lg:text-7.5xl font-heading font-extrabold text-white tracking-[-0.04em] leading-[1.02] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
              stagger={0.02}
            />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="inline-block w-[4px] sm:w-[6px] lg:w-[8px] h-[0.9em] bg-accent ml-1 sm:ml-2 rounded-sm shadow-[0_0_12px_rgba(255,149,0,0.8)]" />
          </motion.div>

          <motion.p className="text-lg sm:text-xl font-body font-semibold text-zinc-200 mb-6 leading-relaxed" variants={itemVariants}>
            {title}
          </motion.p>
          <motion.p className="text-sm sm:text-base text-zinc-300 leading-[1.8] max-w-xl mb-10" variants={itemVariants}>
            {bio}
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center" variants={itemVariants}>
            <MagneticButton
              href={ctaVariant === "A" ? "#projects" : "#experience"}
              onClick={() => {
                try { Clarity.event(`clicked_hero_cta_variant_${ctaVariant}`); } catch { /* Ignore */ }
              }}
              className="relative h-12 px-7 flex items-center justify-center gap-2 rounded-xl bg-accent text-black text-xs font-body font-bold shadow-[0_4px_25px_rgba(255,149,0,0.4)] hover:shadow-[0_4px_35px_rgba(255,149,0,0.6)] transition-all duration-200 group overflow-hidden"
            >
              <CornerReticle size={6} color="rgba(0, 0, 0, 0.4)" />
              <ScrambleText text={ctaVariant === "A" ? "Explore Projects" : "View Experience"} />
              <KeyBadge keyLabel={ctaVariant === "A" ? "P" : "E"} variant="accent" className="bg-black/15 border-black/25 text-black font-extrabold" />
            </MagneticButton>

            <a
              href={`mailto:${email}`}
              className="relative group h-12 px-6 flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/70 backdrop-blur-md text-xs font-body font-semibold text-zinc-200 hover:text-white hover:border-accent/40 transition-all duration-200 shadow-md"
            >
              <CornerReticle size={5} color="rgba(255, 255, 255, 0.2)" />
              <span>{email}</span>
              <ArrowUpRight size={14} className="text-zinc-400 group-hover:text-accent transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </a>
          </motion.div>
        </motion.div>

        <div ref={imgRef} className="lg:col-span-5 flex justify-center lg:justify-end z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={imgInView ? { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 18, delay: 0.15 } } : { opacity: 0, scale: 0.92, y: 20 }}
            className="relative z-10 flex flex-col items-center"
          >
            <InteractivePuzzleAvatar src={avatar.src} alt={avatar.alt} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
