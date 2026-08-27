"use client";

import React, { useState } from "react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { FlagshipProjectCard, FlagshipProjectProps } from "./FlagshipProjectCard";
import { ProjectCard, ProjectCardProps } from "./ProjectCard";

interface ProjectsSectionProps {
  flagship: FlagshipProjectProps;
  projects: ProjectCardProps[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  flagship,
  projects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Machine Learning & Data",
    "Web Infrastructure & Security",
    "Developer Tooling & CLI",
    "Systems & Automation",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 border-b border-border-subtle relative">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <SectionLabel
            index="01"
            eyebrow="Explore Projects"
            heading="Featured Projects & Open-Source Work"
            description="From interactive 3D games and machine learning tools to practical developer utilities. Built with careful craftsmanship, clean architecture, and reliable performance."
          />
        </FadeIn>

        {/* ── 1. Flagship Hero Project (Metropolyca) ── */}
        <FadeIn delay={100}>
          <FlagshipProjectCard {...flagship} />
        </FadeIn>

        {/* ── Category Filter Tabs ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-4">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Project category filters">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus:outline-none ${
                    isActive
                      ? "bg-accent text-black font-bold shadow-md shadow-accent/20"
                      : "bg-bg-surface border border-border-base text-text-muted hover:text-text-primary hover:border-border-subtle"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-text-secondary font-medium">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── 2. Specialized Projects Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 80}>
              <ProjectCard {...project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
