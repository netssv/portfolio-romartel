"use client";

import React, { useState } from "react";
import { ArrowUpRight, Trophy, LineChart, Cpu, Bluetooth, Gamepad2, Layers, Smartphone, Search, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";

const ICON_MAP: Record<string, LucideIcon> = {
  Trophy,
  LineChart,
  Cpu,
  Bluetooth,
  Gamepad2,
  Layers,
  Smartphone,
  Search,
};

const GithubIcon = ({ size = 13 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2.25" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

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

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  description,
  valueProp,
  category,
  status,
  icon,
  image,
  tags = [],
  links,
}) => {
  const { isSpanish } = useLanguage();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isVertical, setIsVertical] = useState(false);
  const IconComponent = icon && ICON_MAP[icon] ? ICON_MAP[icon] : Layers;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <motion.article
      className="group relative flex flex-col justify-between rounded-2xl border border-border-base bg-bg-surface overflow-hidden transition-all duration-200 hover:border-accent hover:shadow-lg"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(30, 75, 143, 0.04), transparent 80%), var(--bg-surface)`,
      }}
    >
      {/* Screenshot / Media Header */}
      {image && (
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-bg-raised border-b border-border-subtle flex items-center justify-center">
          {isVertical && (
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-125 pointer-events-none"
            />
          )}
          <motion.img
            src={image}
            alt={`${title} Preview`}
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalHeight > img.naturalWidth) setIsVertical(true);
            }}
            className={
              isVertical
                ? "relative z-10 h-full w-auto max-w-full object-contain py-1 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                : "w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            }
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/90 via-transparent to-transparent opacity-60 pointer-events-none" />

          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-body font-semibold bg-bg-surface/95 backdrop-blur-md border border-border-subtle text-text-primary shadow-xs">
              <IconComponent className="w-3.5 h-3.5 text-accent" />
              <span>{category}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-body font-semibold border bg-bg-surface/95 text-text-secondary border-border-subtle shadow-xs">
              {status}
            </span>
          </div>
        </div>
      )}

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col">
        {!image && (
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="flex items-center gap-1.5 text-[11px] font-body font-bold uppercase tracking-wider text-accent">
              <IconComponent className="w-3.5 h-3.5 text-accent" />
              <span>{category}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-body font-semibold border bg-bg-raised text-text-secondary border-border-subtle">
              {status}
            </span>
          </div>
        )}

        <h3 className="text-base sm:text-lg font-heading font-bold text-text-primary group-hover:text-accent transition-colors duration-150">
          {title}
        </h3>
        <p className="text-xs font-body text-accent mt-0.5 mb-2 font-medium">
          {subtitle}
        </p>
        <p className="text-xs font-body text-text-secondary leading-relaxed mb-3 line-clamp-2">
          {description}
        </p>

        {valueProp && (
          <div className="mb-3 text-xs font-body text-text-secondary border-l-2 border-accent pl-2.5 py-1 bg-bg-raised/60 rounded-r">
            <strong className="text-text-primary font-semibold">
              {isSpanish ? "Impacto: " : "Outcome: "}
            </strong>
            {valueProp}
          </div>
        )}

        {/* Technology Pills */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-2">
            {tags.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono text-text-secondary bg-bg-raised border border-border-subtle">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border-subtle bg-bg-raised/30 font-body text-xs font-semibold">
        <a href={links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
          <GithubIcon size={13} />
          <span>{isSpanish ? "Código" : "Source"}</span>
        </a>

        {links.demo && (
          <a href={links.demo} target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center gap-1 text-accent hover:text-accent-hover transition-colors">
            <span>{isSpanish ? "Ver Proyecto" : "Live Project"}</span>
            <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </motion.article>
  );
};
