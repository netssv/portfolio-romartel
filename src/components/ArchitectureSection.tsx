"use client";

import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { Cpu, Split, Search, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

const featureIcons = [Cpu, Split, Search, ShieldCheck, Zap, BarChart3];

export const ArchitectureSection: React.FC = () => {
  const { t } = useLanguage();
  const { eyebrow, heading, description, features } = t.architecture;

  return (
    <section id="architecture" className="py-24 relative overflow-hidden bg-bg-surface border-t border-b border-border-subtle">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <FadeIn>
          <SectionLabel
            eyebrow={eyebrow}
            heading={heading}
            description={description}
          />
        </FadeIn>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = featureIcons[idx] || Cpu;
            return (
              <FadeIn key={feature.title} delay={idx * 80}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="group relative p-6 rounded-2xl bg-bg-raised/40 border border-border-base hover:border-accent hover:bg-bg-surface transition-all duration-200 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-heading font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs font-body text-text-secondary leading-relaxed">
                      {feature.desc}
                    </p>
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
