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
  isDarkBg?: boolean;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  navItems,
  activeSection,
  onNavigate,
  isDarkBg = false,
}) => {
  return (
    <nav
      className={`hidden xl:flex items-center gap-0.5 2xl:gap-1 p-1 rounded-full shadow-xs shrink-0 transition-all duration-300 ${
        isDarkBg
          ? "bg-black/30 dark:bg-bg-raised/80 border border-white/15 backdrop-blur-md"
          : "bg-[#EEF0F4] dark:bg-bg-raised/80 border border-black/[0.04] dark:border-white/[0.08]"
      }`}
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
            className={`relative px-2.5 xl:px-3 2xl:px-3.5 py-1.5 rounded-full text-xs font-body whitespace-nowrap transition-all duration-200 ${
              isActive
                ? isDarkBg
                  ? "bg-white/20 text-white font-semibold shadow-xs border border-white/25 backdrop-blur-xs"
                  : "bg-white dark:bg-bg-surface text-text-primary font-semibold shadow-xs border border-black/[0.03] dark:border-white/[0.06]"
                : isDarkBg
                ? "text-white/75 hover:text-white font-medium hover:bg-white/10"
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
