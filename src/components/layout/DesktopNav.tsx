"use client";

import React from "react";

interface NavItem {
  name: string;
  path: string;
}

interface DesktopNavProps {
  navItems: NavItem[];
  activeSection: string;
  onNavigate: (path: string) => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  navItems,
  activeSection,
  onNavigate,
}) => {
  return (
    <nav
      className="hidden lg:flex items-center gap-1 bg-[#EEF0F4] dark:bg-bg-raised/80 p-1 rounded-full border border-black/[0.04] dark:border-white/[0.08] shadow-xs"
      aria-label="Main navigation"
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.name;
        return (
          <a
            key={item.name}
            href={item.path}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.path);
            }}
            className={`relative px-4 py-1.5 rounded-full text-xs font-body transition-all duration-150 ${
              isActive
                ? "bg-white dark:bg-bg-surface text-text-primary font-semibold shadow-xs border border-black/[0.03] dark:border-white/[0.06]"
                : "text-text-secondary hover:text-text-primary font-medium hover:bg-black/[0.02] dark:hover:bg-white/[0.04]"
            }`}
          >
            {item.name}
          </a>
        );
      })}
    </nav>
  );
};
