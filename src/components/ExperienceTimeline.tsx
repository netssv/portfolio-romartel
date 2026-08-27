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
            index="04"
            eyebrow="Employment History"
            heading="Work Experience & Technical Leadership"
            description="Scroll continuously through the chronological timeline ribbon to trace career milestones, server infrastructure operations, and marketing automation systems across the years."
          />
        </FadeIn>
      </div>

      {/* Pinned Scrollytelling Timeline Stage */}
      <PinnedExperienceScrollytelling items={items} />
    </section>
  );
};
