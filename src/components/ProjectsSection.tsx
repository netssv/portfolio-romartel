"use client";

import React, { useState } from "react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { FlagshipProjectCard, FlagshipProjectProps } from "./FlagshipProjectCard";
import { ProjectCard, ProjectCardProps } from "./ProjectCard";
import { PinnedProjectsScrollytelling, PinnedProjectItem } from "./scrollytelling/PinnedProjectsScrollytelling";
import { LayoutGrid, Film } from "lucide-react";

interface ProjectsSectionProps {
  flagship: FlagshipProjectProps;
  projects: ProjectCardProps[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  flagship,
  projects,
}) => {
  const [viewMode, setViewMode] = useState<"cinematic" | "grid">("cinematic");
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

  // Include ALL 6 projects (Flagship + All Production Side Projects)
  const pinnedItems: PinnedProjectItem[] = [
    {
      id: "metropolyca",
      title: flagship.title,
      subtitle: flagship.subtitle,
      eyebrow: "Flagship Simulation",
      category: "Interactive 3D & QA Automation",
      description: flagship.description,
      story: "Architected 3D spatial simulation with continuous QA automation, responsive physics, and 60fps performance.",
      metrics: flagship.metrics.map((m) => ({ label: m.label, value: m.value })),
      tags: flagship.tags,
      links: flagship.links,
      videoSrc: flagship.videoSrc || "/metro.mp4",
      icon: "Film",
    },
    ...projects.map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      eyebrow: p.category.split("&")[0].trim(),
      category: p.category,
      description: p.description,
      story: p.valueProp || "Engineered scalable automation pipelines with high test coverage and real-time telemetry.",
      metrics: [
        { label: "Architecture", value: p.tags[0] || "TypeScript" },
        { label: "Deployment", value: "Production Active" },
      ],
      tags: p.tags,
      links: p.links,
      imageSrc: p.image,
      icon: p.icon || "Terminal",
    })),
  ];

  return (
    <section id="projects" className="relative border-b border-border-subtle">
      {/* Section Introduction */}
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <SectionLabel
              index="01"
              eyebrow="Explore Projects"
              heading="Interactive Systems & Software Architecture"
              description="Scroll continuously through the pinned showcase to inspect live simulations, machine learning tools, and production pipelines without losing focus."
            />
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0 self-start md:self-auto">
              <button
                onClick={() => setViewMode("cinematic")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "cinematic"
                    ? "bg-accent text-black shadow-md shadow-accent/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Film size={13} />
                <span>Cinematic</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-accent text-black shadow-md shadow-accent/20"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <LayoutGrid size={13} />
                <span>Grid View</span>
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Main Scrollytelling Pinned Stage OR Grid View */}
      {viewMode === "cinematic" ? (
        <PinnedProjectsScrollytelling items={pinnedItems} />
      ) : (
        <div className="mx-auto max-w-6xl px-6 pb-24">
          {/* Flagship Hero Card in Grid View */}
          <div className="mb-12">
            <FlagshipProjectCard {...flagship} />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-4">
            <div className="flex flex-wrap items-center gap-2" role="tablist">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-accent text-black font-bold shadow-md shadow-accent/20"
                        : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-mono text-zinc-400 font-medium">
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 80}>
                <ProjectCard {...project} />
              </FadeIn>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
