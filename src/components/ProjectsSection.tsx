"use client";

import React, { useState } from "react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { SectionLabel } from "@/src/components/ui/SectionLabel";
import { FlagshipProjectCard, FlagshipProjectProps } from "./FlagshipProjectCard";
import { ProjectCard, ProjectCardProps } from "./ProjectCard";
import { PinnedProjectsScrollytelling, PinnedProjectItem } from "./scrollytelling/PinnedProjectsScrollytelling";
import { LayoutGrid, Layers } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

interface ProjectsSectionProps {
  flagship: FlagshipProjectProps;
  projects: ProjectCardProps[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  flagship,
  projects,
}) => {
  const { t, isSpanish } = useLanguage();
  const [viewMode, setViewMode] = useState<"cinematic" | "grid">("cinematic");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const allLabel = isSpanish ? "Todos" : "All";
  const defaultStory = isSpanish
    ? "Arquitectura de simulación espacial 3D con automatización de QA continuo y 60 FPS estables."
    : "Architected 3D spatial simulation with continuous QA automation, responsive physics, and 60fps performance.";

  const pinnedItems: PinnedProjectItem[] = [
    {
      id: "metropolyca",
      title: flagship.title,
      subtitle: flagship.subtitle,
      eyebrow: isSpanish ? "Simulación Insignia" : "Flagship Simulation",
      category: flagship.category,
      description: flagship.description,
      story: defaultStory,
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
      story: p.valueProp || (isSpanish ? "Pipelines de automatización escalables con cobertura de pruebas y telemetría." : "Engineered scalable automation pipelines with high test coverage and real-time telemetry."),
      metrics: [
        { label: isSpanish ? "Arquitectura" : "Architecture", value: (p.tags && p.tags[0]) || "TypeScript" },
        { label: isSpanish ? "Despliegue" : "Deployment", value: isSpanish ? "Producción Activa" : "Production Active" },
      ],
      tags: p.tags || [],
      links: p.links,
      imageSrc: p.image,
      videoSrc: p.videoSrc,
      icon: p.icon || "Layers",
    })),
  ];

  const categories = [
    allLabel,
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filteredProjects =
    selectedCategory === allLabel || selectedCategory === "All" || selectedCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative border-b border-border-subtle">
      {/* Section Introduction */}
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <SectionLabel
              eyebrow={t.projects.eyebrow}
              heading={t.projects.heading}
              description={t.projects.description}
            />
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-bg-raised border border-border-subtle shrink-0 self-start md:self-auto shadow-xs">
              <button
                onClick={() => setViewMode("cinematic")}
                className={`px-3 py-1.5 rounded-lg text-xs font-body font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "cinematic"
                    ? "bg-accent text-white shadow-xs"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <Layers size={13} />
                <span>{isSpanish ? "Destacados" : "Showcase"}</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-lg text-xs font-body font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-accent text-white shadow-xs"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <LayoutGrid size={13} />
                <span>{isSpanish ? "Cuadrícula" : "Grid View"}</span>
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
          <div className="mb-12">
            <FlagshipProjectCard {...flagship} />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-4">
            <div className="flex flex-wrap items-center gap-2" role="tablist">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat || (cat === allLabel && (selectedCategory === "All" || selectedCategory === "Todos"));
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-body transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-accent text-white font-semibold shadow-xs"
                        : "bg-bg-surface border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-base"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-body text-text-muted">
              {isSpanish
                ? `Mostrando ${filteredProjects.length} proyecto${filteredProjects.length !== 1 ? "s" : ""}`
                : `Showing ${filteredProjects.length} project${filteredProjects.length !== 1 ? "s" : ""}`}
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
