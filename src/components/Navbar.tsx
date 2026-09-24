"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { MessageCircle, Calendar, Menu, X } from "lucide-react";
import { useSmoothScroll } from "./layout/SmoothScrollProvider";
import { DesktopNav } from "./layout/DesktopNav";
import { MobileMenuDropdown } from "./layout/MobileMenuDropdown";
import { useLanguage } from "@/src/context/LanguageContext";
import { useHeroBrandScroll } from "@/src/lib/useHeroBrandScroll";

interface NavItem {
  name: string;
  path: string;
}

interface NavbarProps {
  navItems: NavItem[];
  authorName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ navItems, authorName }) => {
  const { t, isSpanish } = useLanguage();
  const { scrollY } = useScroll();
  const { getLenis } = useSmoothScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brandAnchorRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const nameParts = authorName.trim().split(" ");
  const firstName = nameParts[0] || authorName;
  const lastName = nameParts.slice(1).join(" ");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setScrolled(latest > 20);
    if (latest > previous && latest > 260 && !mobileMenuOpen) setHidden(true);
    else if (latest < previous) setHidden(false);
  });

  const scrollToPath = useCallback((path: string) => {
    setMobileMenuOpen(false);
    const targetId = path.startsWith("#") ? path.slice(1) : path;
    const lenis = getLenis();
    if (path === "/" || path === "#" || targetId === "top") {
      lenis ? lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetEl = document.getElementById(targetId) || document.querySelector(path);
    if (targetEl) {
      const offset = -70;
      lenis
        ? lenis.scrollTo(targetEl as HTMLElement, { offset, duration: 1.2 })
        : window.scrollTo({ top: (targetEl as HTMLElement).getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
    }
  }, [getLenis]);

  useEffect(() => {
    const sections = navItems.map((item) => item.path.substring(1) === "top" ? document.body : document.getElementById(item.path.substring(1)));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const match = navItems.find((item) => item.path === `#${entry.target.id || "top"}`);
          if (match) setActiveSection(match.name);
        }
      });
    }, { root: null, rootMargin: "-40% 0px -50% 0px", threshold: 0 });

    sections.forEach((section) => { if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("mobile-nav-toggle", { detail: { open: mobileMenuOpen } })
    );
  }, [mobileMenuOpen]);

  useHeroBrandScroll({
    brandLogoRef: logoRef,
    anchorWrapperRef: brandAnchorRef,
    getLenis,
    isMenuOpen: mobileMenuOpen,
  });

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={`fixed top-0 ${mobileMenuOpen ? "z-[60]" : "z-50"} w-full transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-bg-glass backdrop-blur-xl backdrop-saturate-150 border-b border-border-subtle shadow-xs"
          : "bg-bg-glass/50 backdrop-blur-md border-b border-transparent"
      }`}
    >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div ref={brandAnchorRef} className="w-44 sm:w-52 h-9 shrink-0 relative flex items-center" />

        <a
          ref={logoRef}
          href="#top"
          onClick={(e) => { e.preventDefault(); scrollToPath("#top"); }}
          aria-label="Home"
          className="fixed z-50 flex items-center justify-center select-none cursor-pointer will-change-[left,top,width,height] group"
        >
          <svg viewBox="0 0 1140 125" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
            <text x="50%" y="94" textAnchor="middle" className="fill-text-primary font-heading font-black tracking-[-0.04em] text-[106px] uppercase">
              {firstName} <tspan className="fill-accent font-mono font-light opacity-60">[</tspan>{lastName}<tspan className="fill-accent font-mono font-light opacity-60">]</tspan>
            </text>
          </svg>
        </a>

        <DesktopNav
          navItems={navItems}
          activeSection={activeSection}
          onNavigate={scrollToPath}
        />

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://api.whatsapp.com/send/?phone=50378748247&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hidden sm:inline-flex h-9 px-3.5 items-center gap-1.5 rounded-full text-xs font-body font-medium border border-border-subtle bg-bg-surface text-text-secondary hover:text-text-primary hover:border-accent transition-colors shadow-xs whitespace-nowrap shrink-0"
          >
            <MessageCircle size={14} className="text-signal-success shrink-0" />
            <span>{t.nav.whatsapp}</span>
          </a>

          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-clippo-schedule"));
            }}
            className="hidden sm:inline-flex h-9 px-3.5 xl:px-4 items-center gap-1.5 rounded-full text-xs font-body font-semibold text-white bg-accent hover:bg-accent-hover transition-colors shadow-xs cursor-pointer whitespace-nowrap shrink-0"
          >
            <Calendar size={13} className="shrink-0" />
            <span>{t.nav.scheduleCall}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="xl:hidden h-9 w-9 flex items-center justify-center rounded-xl border border-border-subtle bg-bg-surface text-text-primary hover:border-accent transition-colors cursor-pointer shadow-xs shrink-0"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenuDropdown
            navItems={navItems}
            activeSection={activeSection}
            onNavigate={scrollToPath}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};
