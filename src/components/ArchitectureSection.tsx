"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  }
];

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
        <div className="flex flex-col items-center text-center mb-20">
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
      </div>
    </section>
  );
};
