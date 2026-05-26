"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  impact?: string[];
  operations?: string[];
  isSecondary?: boolean;
}

const BulletList: React.FC<{ items: string[]; label: string }> = ({ items, label }) => (
  <div className="flex-1">
    <p className="text-[10px] font-body font-bold uppercase tracking-wider text-text-muted mb-4">
      {label}
    </p>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm font-body text-text-secondary leading-relaxed">
          <span className="mt-2 h-1 w-1 rounded-full bg-accent shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const ExperienceTimeline: React.FC<{ items: ExperienceItem[] }> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experience" className="py-24 border-b border-border-subtle relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 relative">
        <FadeIn>
          <SectionLabel
            eyebrow="Employment History"
            heading="Work Experience"
            description="High-impact technical roles leading automation operations, relational database architectures, and systems supervisor teams."
          />
        </FadeIn>
        
        <div className="mt-16 sm:mt-24">
          {/* Interactive Timeline Navigation */}
          <div className="relative mb-16 px-2 sm:px-12 overflow-x-auto overflow-y-hidden hide-scrollbar pb-4">
            <div className="min-w-max">
              {/* The continuous background line */}
              <div className="absolute left-8 right-8 sm:left-16 sm:right-16 top-[40px] h-[2px] bg-border-base z-0" />
              
              <div className="relative z-10 flex justify-between items-center gap-2">
                {items.map((job, idx) => {
                  const isActive = idx === activeIndex;
                  const isPast = idx < activeIndex;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`relative group focus:outline-none h-[110px] shrink-0 ${job.isSecondary ? 'w-[70px] sm:w-[90px]' : 'w-[100px] sm:w-[130px]'}`}
                    >
                      {/* Active/Past line segment (overlays the background line) */}
                      {idx > 0 && (
                        <div 
                          className={`absolute right-[50%] top-[40px] w-[200%] sm:w-[250%] h-[2px] origin-right transition-all duration-500 z-[-1]
                          ${isActive || isPast ? "bg-accent shadow-[0_0_8px_rgba(255,149,0,0.5)]" : "bg-transparent"}`} 
                        />
                      )}

                      {job.isSecondary ? (
                        <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
                          {/* Secondary Branch Vertical Line */}
                          <div className={`absolute top-[41px] w-[2px] h-[15px] transition-colors duration-500 ${isActive || isPast ? 'bg-accent/60 shadow-[0_0_8px_rgba(255,149,0,0.4)]' : 'bg-border-base'}`} />
                          
                          {/* Secondary Dot */}
                          <div className={`absolute top-[51px] w-2.5 h-2.5 rounded-full border-2 flex items-center justify-center bg-bg-base transition-all duration-300 
                            ${isActive ? 'border-accent scale-150 shadow-[0_0_8px_rgba(255,149,0,0.6)]' : isPast ? 'border-accent/80' : 'border-border-subtle group-hover:border-accent/50'}`}
                          >
                            {(isActive || isPast) && <div className="w-1 h-1 bg-accent rounded-full" />}
                          </div>

                          {/* Secondary Text */}
                          <span className={`absolute top-[68px] text-[8px] sm:text-[9px] font-body uppercase tracking-widest text-center transition-colors duration-300 w-[120%] leading-tight ${isActive ? 'text-accent' : 'text-text-muted/40 group-hover:text-text-muted'}`}>
                            {job.period.split(" - ")[0]}<br/>{job.company}
                          </span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
                          {/* Primary Year */}
                          <span className={`absolute top-[12px] text-xs sm:text-sm font-body font-bold transition-colors duration-300 ${isActive ? 'text-text-primary' : 'text-text-muted group-hover:text-text-secondary'}`}>
                            {job.period.split(" - ")[0]}
                            {idx === 0 && " - Present"}
                          </span>
                          
                          {/* Primary Dot */}
                          <div className={`absolute top-[33px] w-4 h-4 rounded-full border-2 flex items-center justify-center bg-bg-base transition-all duration-300 
                            ${isActive ? 'border-accent scale-125 shadow-[0_0_12px_rgba(255,149,0,0.6)]' : isPast ? 'border-accent' : 'border-border-subtle group-hover:border-accent/50'}`}
                          >
                            {(isActive || isPast) && <div className="w-1.5 h-1.5 bg-accent rounded-full" />}
                          </div>

                          {/* Primary Company */}
                          <span className={`absolute top-[58px] text-[9px] sm:text-[10px] font-body uppercase tracking-widest text-center transition-colors duration-300 w-[120%] leading-tight ${isActive ? 'text-accent' : 'text-text-muted/40 group-hover:text-text-muted'}`}>
                            {job.company}
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Content Area */}
          <div className="relative min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-bg-raised border border-border-subtle p-6 sm:p-10 rounded-3xl relative overflow-hidden group"
              >
                {/* Subtle spotlight background */}
                <div className="absolute inset-0 opacity-50 pointer-events-none"
                     style={{ background: "radial-gradient(circle at 100% 0%, rgba(255, 149, 0, 0.05), transparent 50%)" }} />
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-text-primary tracking-tight">{items[activeIndex].role}</h3>
                      <p className="text-sm font-body font-bold text-accent mt-1">{items[activeIndex].company}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm font-body font-semibold text-text-primary">{items[activeIndex].period}</p>
                      <p className="text-xs font-body text-text-muted mt-0.5">{items[activeIndex].location}</p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-body text-text-secondary leading-relaxed italic mb-10 pb-10 border-b border-border-subtle/50">
                    "{items[activeIndex].description}"
                  </p>

                  <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                    <BulletList items={items[activeIndex].impact || []} label="Impact & Automation Achievements" />
                    <div className="hidden lg:block w-[1px] bg-border-subtle/50 self-stretch" />
                    <BulletList items={items[activeIndex].operations || []} label="Business Core & Operations" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

