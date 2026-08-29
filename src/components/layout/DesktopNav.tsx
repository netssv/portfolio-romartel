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
      className="hidden lg:flex items-center gap-1 bg-bg-raised/70 p-1 rounded-xl border border-border-subtle"
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
            className={`relative px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all duration-150 ${
              isActive
                ? "text-white bg-accent font-semibold shadow-xs"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-surface/80"
            }`}
          >
            {item.name}
          </a>
        );
      })}
    </nav>
  );
};
