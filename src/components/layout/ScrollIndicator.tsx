"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useDragControls } from "framer-motion";

interface Section {
  id: string;
  label: string;
  cmd: string;
}

const sections: Section[] = [
  { id: "top", label: "Home", cmd: "cd ~" },
  { id: "projects", label: "Projects", cmd: "ls ./projects" },
  { id: "experience", label: "Experience", cmd: "cat ./experience" },
  { id: "skills", label: "Insights", cmd: "sh ./insights" },
  { id: "case-studies", label: "Case Studies", cmd: "grep -r 'impact'" },
  { id: "contact", label: "Contact", cmd: "ping -c 1 contact" },
];

export const ScrollIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("top");
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = constraintsRef.current;
    if (!el) return;
    // Set the constraints div to fill the full viewport
    el.style.position = "fixed";
    el.style.inset = "0";
    el.style.pointerEvents = "none";
    el.style.zIndex = "0";
    document.body.appendChild(el);
    return () => {
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = (entry.target as HTMLElement).dataset.scrollSection ?? "top";
          setActiveSection(id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element =
        section.id === "top"
          ? document.body
          : document.getElementById(section.id);
      if (element) {
        (element as HTMLElement).dataset.scrollSection = section.id;
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 🖥️ Draggable Desktop Terminal (lg and up) */}
      <div ref={constraintsRef} className="hidden lg:block" />
      <motion.div
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0.08}
        dragConstraints={constraintsRef}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        initial={{ x: 0, y: 0 }}
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2.5 font-mono text-[9px]
          bg-bg-surface/90 border border-border-subtle p-3.5 rounded-2xl shadow-xl backdrop-blur-md
          max-w-[200px] select-none
          ${isDragging ? "shadow-2xl shadow-accent/10 border-accent/30 scale-[1.02]" : ""}
          transition-shadow transition-border-color duration-200`}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* Terminal Header — drag handle */}
        <div
          className="flex items-center justify-between border-b border-border-subtle pb-2 mb-1.5 cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[7px] text-text-muted uppercase tracking-widest font-bold">
            bash · drag me
          </span>
        </div>

        {/* Bash Prompts */}
        <div className="flex flex-col gap-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group flex flex-col transition-all duration-200"
                onClick={(e) => {
                  // Prevent nav if user just dragged
                  if (isDragging) e.preventDefault();
                }}
              >
                {isActive ? (
                  <span className="text-accent font-bold leading-relaxed">
                    <span className="opacity-60">romartel@portfolio:~$</span>{" "}
                    <span className="text-text-primary underline decoration-accent/35 decoration-2">
                      {section.cmd}
                    </span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block w-1.5 h-[11px] bg-accent ml-0.5 align-middle"
                    />
                  </span>
                ) : (
                  <span className="text-text-muted group-hover:text-text-primary transition-colors duration-150">
                    $ {section.cmd}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* 📱 Mobile Dots Indicator (under lg) */}
      <div className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex lg:hidden flex-col items-center gap-1">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-label={`Scroll to ${section.label}`}
              className="group flex items-center justify-center w-9 h-9 relative"
            >
              <div className="absolute inset-0 rounded-full bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
              <motion.div
                className={`w-[2.5px] rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-accent h-6 shadow-[0_0_8px_var(--accent)]"
                    : "bg-border-base h-2 group-hover:bg-text-secondary group-hover:h-4"
                }`}
                layout
              />
            </a>
          );
        })}
      </div>
    </>
  );
};
