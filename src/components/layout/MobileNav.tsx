import React from "react";
import { motion } from "framer-motion";

interface MobileNavProps {
  navItems: Array<{ name: string; path: string; icon: React.ElementType }>;
  activeSection: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ navItems, activeSection, onNavigate }) => {
  return (
    <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm h-14 bg-bg-glass backdrop-blur-lg border border-border-base rounded-2xl flex items-center justify-around px-4 shadow-[0_8px_32px_rgba(0,0,0,0.15)] z-40">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.name;

        return (
          <a
            key={item.name}
            href={item.path}
            onClick={(e) => onNavigate(e, item.path)}
            className="relative flex flex-col items-center justify-center w-12 h-12 rounded-xl"
            aria-label={item.name}
          >
            <Icon
              size={20}
              className={`transition-colors duration-200 ${
                isActive ? "text-text-accent" : "text-text-muted"
              }`}
            />
            {isActive && (
              <motion.span
                layoutId="mobileActiveDot"
                className="absolute bottom-1 w-1 h-1 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </a>
        );
      })}
    </nav>
  );
};
