"use client";

import React from "react";
export interface FlagshipProjectProps {
  id: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  description: string;
  orchestrationStory: string;
  status: string;
  category: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  links: { demo: string; github: string };
  videoSrc?: string;
}

export interface ProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  valueProp?: string;
  category: string;
  status: string;
  icon?: string;
  image?: string;
  videoSrc?: string;
  tags?: string[];
  links: { github: string; demo: string };
}

import { PinnedProjectsScrollytelling, PinnedProjectItem } from "./scrollytelling/PinnedProjectsScrollytelling";
import { useLanguage } from "@/src/context/LanguageContext";
import { SloganSection } from "./SloganSection";

interface ProjectsSectionProps {
  flagship: FlagshipProjectProps;
  projects: ProjectCardProps[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  flagship,
  projects,
}) => {
  const { isSpanish } = useLanguage();

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
      story:
        p.valueProp ||
        (isSpanish
          ? "Pipelines de automatización escalables con cobertura de pruebas y telemetría."
          : "Engineered scalable automation pipelines with high test coverage and real-time telemetry."),
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

  return (
    <section id="projects" className="relative bg-[#21426E] dark:bg-[#162C4E] text-white">
      {/* Slogan Transition Header & Projects Title */}
      <SloganSection />

      {/* Main Scrollytelling Pinned Stage */}
      <PinnedProjectsScrollytelling items={pinnedItems} />
    </section>
  );
};
