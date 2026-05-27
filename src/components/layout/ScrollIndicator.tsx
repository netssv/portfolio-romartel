"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "top", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Insights" },
  { id: "contact", label: "Contact" },
];

export const ScrollIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("top");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id || "top";
          setActiveSection(id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = section.id === "top" ? document.body : document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={`Scroll to ${section.label}`}
            className="group relative flex items-center justify-center w-6 h-6"
          >
            {/* Tooltip for desktop */}
            <span className="absolute left-8 px-2 py-1 bg-bg-surface text-text-primary text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 hidden sm:block whitespace-nowrap border border-border-subtle">
              {section.label}
            </span>

            {/* Line / Dot */}
            <motion.div
              className={`w-[2px] transition-all duration-300 ${
                isActive ? "bg-accent h-8" : "bg-border-base h-3 group-hover:bg-text-secondary group-hover:h-5"
              }`}
              layout
            />
          </a>
        );
      })}
    </div>
  );
};
