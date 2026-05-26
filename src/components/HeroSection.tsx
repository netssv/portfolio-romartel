"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring, useInView } from "framer-motion";
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
  const imgRef = React.useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: false, margin: "-10% 0px -10% 0px" });

  const heroRef = React.useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: false, margin: "0px 0px -20% 0px" });

  const [displayText, setDisplayText] = React.useState("");

  React.useEffect(() => {
    if (!heroInView) {
      setDisplayText(""); // Reset when out of view
      return;
    }

    let timeout: NodeJS.Timeout;

    if (name === "Rodrigo Martel") {
      const sequence = [
        "R", "Ro", "Rod", "Rodr", "Rodri", "Rodrig", "Rodrigp", "Rodrigp ", "Rodrigp", "Rodrig",
        "Rodrigo", "Rodrigo ", "Rodrigo M", "Rodrigo Ma", "Rodrigo Mar", "Rodrigo Mart", "Rodrigo Marte", "Rodrigo Martel"
      ];
      let i = 0;
      const nextTick = () => {
        if (i < sequence.length) {
          setDisplayText(sequence[i]);
          let delay = Math.random() * 60 + 40;
          if (i === 6) delay = 300;
          if (i === 7) delay = 500;
          if (i === 8 || i === 9) delay = 100;
          if (i === 10) delay = 300;
          i++;
          timeout = setTimeout(nextTick, delay);
        }
      };
      timeout = setTimeout(nextTick, 300);
    } else {
      let i = 0;
      const nextTick = () => {
        if (i <= name.length) {
          setDisplayText(name.substring(0, i));
          i++;
          timeout = setTimeout(nextTick, Math.random() * 60 + 40);
        }
      };
      timeout = setTimeout(nextTick, 300);
    }

    return () => clearTimeout(timeout);
  }, [heroInView, name]);
  // Stagger entry configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 800, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 800, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
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

      <div ref={heroRef} className="relative mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* ── Left: Text details with stagger animations ────────────────────── */}
        <motion.div
          className="lg:col-span-7 flex flex-col z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status pill badge — green blinking dot */}
          <motion.div className="inline-flex items-center gap-2 mb-6" variants={itemVariants}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-body font-semibold uppercase tracking-[0.16em] text-emerald-500">
              Available for strategic execution
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7.5xl font-heading font-extrabold text-text-primary tracking-[-0.04em] leading-[1.02] mb-6 flex flex-wrap items-center"
            variants={itemVariants}
          >
            {displayText.split("").map((char, index) => (
              <span
                key={index}
                className={char === " " ? "w-3 sm:w-4 lg:w-6 inline-block" : "inline-block hover:text-accent transition-colors duration-300"}
              >
                {char}
              </span>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="inline-block w-[4px] sm:w-[6px] lg:w-[8px] h-[0.9em] bg-accent ml-1 sm:ml-2 rounded-sm"
            />
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
        <div ref={imgRef} className="lg:col-span-5 flex justify-center lg:justify-end z-10" style={{ perspective: "1000px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={imgInView
              ? { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 18, delay: 0.15 } }
              : { opacity: 0, scale: 0.92, y: 20 }
            }
            className="relative z-10 flex flex-col items-center group cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            whileHover={{ scale: 1.15, transition: { type: "spring", stiffness: 400, damping: 25 } }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={avatar.src}
              alt={avatar.alt}
              className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-3xl filter contrast-[1.05] shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-shadow duration-300 group-hover:shadow-[0_30px_60px_rgba(255,149,0,0.25)]"
              loading="lazy"
              style={{ transform: "translateZ(30px)" }}
            />

            {/* Minimal Location tag */}
            <motion.div 
              className="mt-6 flex items-center gap-1.5 text-[10px] font-body font-semibold tracking-wider text-text-muted uppercase"
              style={{ transform: "translateZ(40px)" }}
            >
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span>{location}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
