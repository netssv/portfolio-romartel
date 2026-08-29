"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

interface NavItem {
  name: string;
  path: string;
}

interface MobileMenuDropdownProps {
  navItems: NavItem[];
  activeSection: string;
  onNavigate: (path: string) => void;
}

export const MobileMenuDropdown: React.FC<MobileMenuDropdownProps> = ({
  navItems,
  activeSection,
  onNavigate,
}) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="lg:hidden border-b border-border-subtle bg-bg-surface/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-2 shadow-xl"
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
            className={`px-3 py-2.5 rounded-xl text-xs font-body font-medium transition-all ${
              isActive
                ? "text-white bg-accent font-semibold shadow-xs"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-raised"
            }`}
          >
            {item.name}
          </a>
        );
      })}
      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          onNavigate("#contact");
        }}
        className="sm:hidden mt-2 h-10 flex items-center justify-center gap-1.5 rounded-xl text-xs font-body font-semibold text-white bg-accent hover:bg-accent-hover transition-colors shadow-xs"
      >
        <span>{t.nav.contact}</span>
        <ArrowUpRight size={13} />
      </a>
    </motion.div>
  );
};
