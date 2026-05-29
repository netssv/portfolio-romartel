"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";

const features = [
  {
    id: "01",
    title: "Next.js & Server Components",
    desc: "Built on Next.js App Router for optimal Server-Side Rendering (SSR) and seamless client-side hydration, achieving perfect Core Web Vitals.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
    )
  },
  {
    id: "02",
    title: "Native A/B Testing & CRO",
    desc: "Features a custom-built, zero-latency A/B testing engine stored in localStorage to optimize CTA conversion rates without third-party bloat.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6"/><path d="M6 20V10"/><path d="M18 20V4"/></svg>
    )
  },
  {
    id: "03",
    title: "UTM Personalization",
    desc: "Reads query parameters to deliver a highly tailored experience, greeting visitors by industry or referral source (e.g., ?source=linkedin).",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    )
  },
  {
    id: "04",
    title: "Technical SEO & JSON-LD",
    desc: "Implements dynamic sitemaps, robots.txt, and strict Schema.org JSON-LD to ensure optimal crawler indexing and rich search results.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    )
  },
  {
    id: "05",
    title: "Serverless APIs & Email",
    desc: "Leverages Next.js App Router API Routes to securely process form submissions and send transactional emails via Resend's SDK without exposing credentials.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    )
  },
  {
    id: "06",
    title: "Google Analytics 4",
    desc: "GA4 measures every user interaction — page views, scroll depth, CTA clicks — feeding the Measurement Protocol with real-time behavioural data to continuously refine content strategy.",
    isAnalytics: true,
    analyticsType: "ga4" as const,
    icon: null
  },
  {
    id: "07",
    title: "Microsoft Clarity",
    desc: "Session recordings and heatmaps reveal exactly where visitors engage or drop off, enabling data-driven UX decisions without sampling or session limits.",
    isAnalytics: true,
    analyticsType: "clarity" as const,
    icon: null
  },
];

// Animated GA4 signal bars widget
const GA4Widget: React.FC = () => {
  const bars = [40, 65, 30, 80, 55, 90, 45, 70, 35, 88];
  return (
    <div className="flex items-end gap-[3px] h-10 px-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm bg-[#E37400]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: [0.3, 1, 0.6, 0.9, 0.4, 1] }}
          transition={{
            duration: 2.8,
            delay: i * 0.18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{ height: `${h}%`, transformOrigin: "bottom", opacity: 0.85 }}
        />
      ))}
    </div>
  );
};

// Animated Clarity heatmap grid widget
const ClarityWidget: React.FC = () => {
  const cells = Array.from({ length: 20 }, (_, i) => i);
  const intensities = [0.9,0.4,0.7,0.2,0.8,0.5,0.3,0.95,0.6,0.1,0.75,0.4,0.85,0.3,0.6,0.2,0.9,0.5,0.7,0.3];
  return (
    <div className="grid grid-cols-5 gap-[3px] w-20 h-10">
      {cells.map((i) => (
        <motion.div
          key={i}
          className="rounded-[2px]"
          animate={{ opacity: [intensities[i], intensities[(i + 7) % 20], intensities[i]] }}
          transition={{
            duration: 2 + (i % 3) * 0.6,
            delay: i * 0.08,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ background: `rgba(0, 120, 212, ${intensities[i]})` }}
        />
      ))}
    </div>
  );
};

const TechHeaderBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
      {/* Circuit lines connecting dynamically */}
      <svg className="absolute w-full h-full opacity-[0.25]" viewBox="0 0 800 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Animated tracing circuit paths */}
        <motion.path
          d="M 50 100 L 250 100 L 300 150 L 500 150 L 550 100 L 750 100"
          fill="none"
          stroke="url(#circLineGrad)"
          strokeWidth="1.25"
          strokeDasharray="300"
          animate={{ strokeDashoffset: [600, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
        />
        <motion.path
          d="M 100 300 L 300 300 L 350 250 L 450 250 L 500 300 L 700 300"
          fill="none"
          stroke="url(#circLineGrad)"
          strokeWidth="1.25"
          strokeDasharray="300"
          animate={{ strokeDashoffset: [-600, 0] }}
          transition={{ repeat: Infinity, duration: 11, ease: "linear" }}
        />
      </svg>
      {/* Dynamic Pulsing Target Reticles on corners */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-accent/40" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-accent/40" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-accent/40" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-accent/40" />

      {/* Floating digital signal particles */}
      {[...Array(6)].map((_, i) => {
        const delays = [0, 0.8, 1.6, 2.4, 3.2, 4.0];
        const lefts = [12, 85, 20, 78, 48, 52];
        const tops = [25, 35, 75, 65, 15, 80];
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              left: `${lefts[i]}%`,
              top: `${tops[i]}%`,
              background: "var(--accent)",
              boxShadow: "0 0 10px var(--accent)",
            }}
            animate={{
              opacity: [0.1, 0.7, 0.1],
              scale: [0.7, 1.2, 0.7],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delays[i],
            }}
          />
        );
      })}
    </div>
  );
};

export const ArchitectureSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="architecture" className="py-32 relative overflow-hidden bg-bg-base border-t border-b border-border-subtle">
      {/* Dynamic Background Glow */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px] pointer-events-none"
      />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="relative flex flex-col items-center text-center mb-20 px-8 py-10 sm:py-12 rounded-3xl border border-border-subtle bg-bg-surface/40 backdrop-blur-xs max-w-3xl mx-auto overflow-hidden shadow-xs">
          <TechHeaderBackground />
          <FadeIn>
            <SectionLabel
              eyebrow="Under The Hood"
              heading="Architecture & Strategy"
              description="This portfolio isn't just a static resume—it's a live demonstration of modern web strategy, performance optimization, and interactive UX design."
            />
          </FadeIn>
        </div>

        {/* First 4 cards — 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {features.slice(0, 4).map((feature, idx) => (
            <FadeIn key={feature.id} delay={idx * 150}>
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative p-8 rounded-3xl bg-bg-surface border border-border-subtle hover:border-accent/40 transition-all duration-500 overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-start gap-6">
                  <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-bg-raised border border-border-base text-text-secondary group-hover:text-accent group-hover:border-accent/30 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
                    <p className="text-sm font-body leading-relaxed text-text-muted">{feature.desc}</p>
                  </div>
                </div>
                <div className="absolute top-6 right-8 font-heading font-extrabold text-7xl text-bg-raised/50 group-hover:text-accent/5 transition-colors duration-500 pointer-events-none select-none">{feature.id}</div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* 5th card — full-width featured */}
        <FadeIn delay={600}>
          <motion.div
            whileHover={{ y: -4, scale: 1.005 }}
            className="group relative p-8 md:p-10 rounded-3xl bg-bg-surface border border-border-subtle hover:border-accent/50 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-bg-raised border border-border-base text-text-secondary group-hover:text-accent group-hover:border-accent/30 transition-all duration-300">
                {features[4].icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                  <h3 className="text-xl font-heading font-semibold text-text-primary group-hover:text-accent transition-colors duration-300">{features[4].title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-accent/10 text-accent border border-accent/20 md:ml-3 w-fit">Live in production</span>
                </div>
                <p className="text-sm font-body leading-relaxed text-text-muted">{features[4].desc}</p>
              </div>
              <div className="hidden md:block font-heading font-extrabold text-7xl text-bg-raised/50 group-hover:text-accent/5 transition-colors duration-500 pointer-events-none select-none">{features[4].id}</div>
            </div>
          </motion.div>
        </FadeIn>

        {/* Analytics row — GA4 + Clarity with live animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-8 lg:mt-12">
          {[features[5], features[6]].map((feature, idx) => {
            const isGA4 = feature.analyticsType === "ga4";
            const accentColor = isGA4 ? "#E37400" : "#0078D4";
            const accentRgb  = isGA4 ? "227,116,0"   : "0,120,212";
            return (
              <FadeIn key={feature.id} delay={750 + idx * 150}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="group relative p-8 rounded-3xl bg-bg-surface border border-border-subtle transition-all duration-500 overflow-hidden h-full"
                  style={{
                    ['--card-accent' as string]: accentColor,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(${accentRgb},0.12), transparent 70%)` }}
                  />
                  {/* Animated data stream lines in background */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-px"
                        style={{
                          background: `linear-gradient(90deg, transparent, rgba(${accentRgb},0.4), transparent)`,
                          top: `${25 + i * 25}%`,
                          left: 0,
                          right: 0,
                        }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 3 + i * 0.8,
                          delay: i * 0.6,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="flex items-start gap-4">
                        {/* Logo chip */}
                        <div
                          className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border font-heading font-black text-sm"
                          style={{
                            background: `rgba(${accentRgb},0.1)`,
                            borderColor: `rgba(${accentRgb},0.35)`,
                            color: accentColor,
                          }}
                        >
                          {isGA4 ? "GA4" : "CL"}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-heading font-semibold text-text-primary transition-colors duration-300"
                              style={{ ['--tw-text-opacity' as string]: 1 }}
                            >
                              {feature.title}
                            </h3>
                            {/* Live pulse badge */}
                            <span
                              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border"
                              style={{
                                background: `rgba(${accentRgb},0.1)`,
                                borderColor: `rgba(${accentRgb},0.3)`,
                                color: accentColor,
                              }}
                            >
                              <motion.span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: accentColor }}
                                animate={{ opacity: [1, 0.2, 1] }}
                                transition={{ duration: 1.4, repeat: Infinity }}
                              />
                              Live
                            </span>
                          </div>
                          <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                            {isGA4 ? "Behavioural Analytics" : "Session Intelligence"}
                          </p>
                        </div>
                      </div>
                      <div className="font-heading font-extrabold text-6xl text-bg-raised/40 group-hover:text-[color:var(--card-accent)]/5 transition-colors duration-500 pointer-events-none select-none">
                        {feature.id}
                      </div>
                    </div>

                    {/* Live widget */}
                    <div
                      className="mb-5 p-3 rounded-xl border"
                      style={{
                        background: `rgba(${accentRgb},0.05)`,
                        borderColor: `rgba(${accentRgb},0.2)`,
                      }}
                    >
                      <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                        {isGA4 ? "// sessions · last 7 days" : "// heatmap intensity"}
                      </p>
                      {isGA4 ? <GA4Widget /> : <ClarityWidget />}
                    </div>

                    <p className="text-sm font-body leading-relaxed text-text-muted">{feature.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

