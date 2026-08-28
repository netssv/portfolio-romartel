"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDragControls, motion, AnimatePresence, useMotionValue } from "framer-motion";
import { TerminalThemeSwitcher } from "./TerminalThemeSwitcher";
import { ChevronDown, ChevronUp, Terminal } from "lucide-react";

interface Section {
  id: string;
  label: string;
  cmd: string;
}

const sections: Section[] = [
  { id: "top",          label: "Home",         cmd: "cd ~"              },
  { id: "projects",     label: "Projects",     cmd: "ls ./projects"     },
  { id: "experience",   label: "Experience",   cmd: "cat ./experience"  },
  { id: "skills",       label: "Insights",     cmd: "sh ./insights"     },
  { id: "architecture", label: "Architecture", cmd: "node telemetry.js" },
  { id: "case-studies", label: "Case Studies", cmd: "grep -r 'impact'"  },
  { id: "contact",      label: "Contact",      cmd: "ping -c 1 contact" },
];

const Cursor: React.FC = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="inline-block w-[5px] h-[10px] bg-accent ml-0.5 align-middle"
  />
);

const TerminalBody: React.FC<{ activeSection: string; onNavigate: () => void }> = ({ activeSection, onNavigate }) => (
  <div className="flex flex-col gap-2">
    {sections.map((sec) => {
      const isActive = activeSection === sec.id;
      return (
        <a key={sec.id} href={`#${sec.id}`} onClick={onNavigate} className="group flex flex-col transition-all duration-200">
          {isActive ? (
            <span className="text-accent font-bold leading-relaxed">
              <span className="opacity-50">romartel@portfolio:~$</span>{" "}
              <span className="text-text-primary underline decoration-accent/40 decoration-2">{sec.cmd}</span>
              <Cursor />
            </span>
          ) : (
            <span className="text-text-muted group-hover:text-text-primary transition-colors duration-150">$ {sec.cmd}</span>
          )}
        </a>
      );
    })}
  </div>
);

export const ScrollIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("top");
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dragControls = useDragControls();
  const desktopConstraintsRef = useRef<HTMLDivElement>(null);

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
      { root: null, rootMargin: "-30% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = id === "top" ? document.body : document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCollapse = () => {
    setIsCollapsed(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  };

  const startAutoHideTimer = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setIsCollapsed(true);
    }, 6000);
  };

  const activeCmd = sections.find((s) => s.id === activeSection)?.cmd || "top";

  return (
    <>
      <div ref={desktopConstraintsRef} className="fixed inset-4 pointer-events-none z-50 overflow-hidden" />

      <motion.div
        drag={!isCollapsed}
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={desktopConstraintsRef}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onClick={() => {
          if (isCollapsed) {
            setIsCollapsed(false);
            startAutoHideTimer();
          }
        }}
        onMouseEnter={() => !isCollapsed && startAutoHideTimer()}
        className={`fixed left-5 bottom-6 z-50 flex flex-col font-mono text-xs select-none origin-bottom-left
          bg-bg-surface/95 border border-border-subtle rounded-2xl shadow-2xl backdrop-blur-md
          transition-all duration-200 ${isCollapsed ? "w-auto hover:border-border-base hover:shadow-accent/20" : "w-[230px] p-4"}
          ${isDragging ? "shadow-accent/30 border-accent/60" : ""}`}
      >
        <div
          onPointerDown={(e) => {
            if (!isCollapsed) {
              dragControls.start(e);
            }
          }}
          className={`flex items-center justify-between ${
            isCollapsed ? "px-3.5 py-2.5 gap-3" : "border-b border-border-subtle pb-2 mb-2 cursor-grab active:cursor-grabbing"
          }`}
        >
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={handleCollapse}
              title="Collapse to Bottom-Left"
              className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"
            />
            <button
              type="button"
              onClick={() => (isCollapsed ? setIsCollapsed(false) : handleCollapse())}
              title="Toggle"
              className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer"
            />
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              title="Expand"
              className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer"
            />
          </div>

          {isCollapsed ? (
            <div className="flex items-center gap-2 text-text-primary font-semibold">
              <Terminal size={12} className="text-accent" />
              <span className="truncate max-w-[130px] text-[11px]">$ {activeCmd}</span>
              <ChevronUp size={12} className="text-text-muted" />
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">bash · drag</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCollapse();
                }}
                className="text-text-muted hover:text-text-primary p-0.5 rounded cursor-pointer"
                title="Collapse"
              >
                <ChevronDown size={12} />
              </button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
              <TerminalBody activeSection={activeSection} onNavigate={() => handleCollapse()} />
              <TerminalThemeSwitcher />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
