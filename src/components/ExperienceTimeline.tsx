"use client";

import React from "react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { PinnedExperienceScrollytelling, ExperienceItem } from "./scrollytelling/PinnedExperienceScrollytelling";

export const ExperienceTimeline: React.FC<{ items: ExperienceItem[] }> = ({ items }) => {
  return (
    <section id="experience" className="relative border-b border-border-subtle">
      {/* Section Header */}
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-6">
        <FadeIn>
          <SectionLabel
            eyebrow="Career Timeline"
            heading="Operations &amp; Technical Leadership"
            description="A track record spanning web infrastructure, marketing technology, workflow automation, and cross-functional operations management."
          />
        </FadeIn>
      </div>

      {/* Pinned Scrollytelling Timeline Stage */}
      <PinnedExperienceScrollytelling items={items} />
    </section>
  );
};
