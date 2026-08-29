"use client";

import React, { useEffect, useState } from "react";

interface SectionTick {
  id: string;
  label: string;
}

const SECTIONS: SectionTick[] = [
  { id: "top", label: "Top" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Insights" },
  { id: "architecture", label: "Architecture" },
  { id: "case-studies", label: "Case Studies" },
  { id: "contact", label: "Contact" },
];

export const CustomScrollRail: React.FC = () => {
  const [activeSection, setActiveSection] = useState("top");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id || "top";
            setActiveSection(id);
          }
        });
      },
      { root: null, rootMargin: "-25% 0px -35% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = id === "top" ? document.body : document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Section navigation"
      className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2.5 p-2 rounded-full bg-bg-surface/85 border border-border-subtle backdrop-blur-md shadow-lg transition-all duration-200"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredId === sec.id;

        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            onMouseEnter={() => setHoveredId(sec.id)}
            onMouseLeave={() => setHoveredId(null)}
            aria-label={`Scroll to ${sec.label}`}
            className="relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
          >
            {/* Dot indicator */}
            <span
              className={`block rounded-full transition-all duration-200 ${
                isActive
                  ? "w-2.5 h-2.5 bg-accent shadow-xs scale-110"
                  : "w-1.5 h-1.5 bg-border-base hover:bg-text-secondary hover:scale-125"
              }`}
            />

            {/* Individual Tooltip on Hover */}
            {isHovered && (
              <span className="absolute right-8 px-2.5 py-1 rounded-lg bg-bg-surface border border-border-subtle text-[11px] font-body font-medium text-text-primary whitespace-nowrap shadow-md pointer-events-none z-50 animate-in fade-in duration-150">
                {sec.label}
              </span>
            )}
          </button>
        );
      })}
    </aside>
  );
};
