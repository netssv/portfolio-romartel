"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MessageCircle } from "lucide-react";
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
      className="xl:hidden border-b border-border-subtle bg-bg-base/95 dark:bg-bg-base/95 backdrop-blur-2xl px-6 py-4 flex flex-col gap-2 shadow-2xl max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain"
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
      <div className="sm:hidden mt-2 pt-2 border-t border-border-subtle flex flex-col gap-2">
        <button
          type="button"
          onClick={() => {
            onNavigate("");
            window.dispatchEvent(new CustomEvent("open-clippo-schedule"));
          }}
          className="h-10 flex items-center justify-center gap-1.5 rounded-xl text-xs font-body font-semibold text-white bg-accent hover:bg-accent-hover transition-colors shadow-xs cursor-pointer"
        >
          <Calendar size={13} className="shrink-0" />
          <span>{t.nav.scheduleCall}</span>
        </button>

        <a
          href="https://api.whatsapp.com/send/?phone=50378748247&text&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 flex items-center justify-center gap-1.5 rounded-xl text-xs font-body font-medium border border-border-subtle bg-bg-surface text-text-primary hover:border-accent transition-colors shadow-xs"
        >
          <MessageCircle size={14} className="text-signal-success shrink-0" />
          <span>{t.nav.whatsapp}</span>
        </a>
      </div>
    </motion.div>
  );
};
