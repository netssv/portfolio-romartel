"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { MessageCircle, Calendar, Menu, X } from "lucide-react";
import { useSmoothScroll } from "./layout/SmoothScrollProvider";
import { DesktopNav } from "./layout/DesktopNav";
import { MobileMenuDropdown } from "./layout/MobileMenuDropdown";
import { useLanguage } from "@/src/context/LanguageContext";
import { useHeroBrandScroll } from "@/src/lib/useHeroBrandScroll";
import { useDarkBackground } from "@/src/lib/useDarkBackground";

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
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDarkBg = useDarkBackground(() => 36);

  const brandAnchorRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const nameParts = authorName.trim().split(" ");
  const firstName = nameParts[0] || authorName;
  const lastName = nameParts.slice(1).join(" ");

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 20));

  const scrollToPath = useCallback((path: string) => {
    setMobileMenuOpen(false);
    const targetId = path.startsWith("#") ? path.slice(1) : path;
    const lenis = getLenis();
    const quarticEasing = (t: number) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);

    if (path === "/" || path === "#" || targetId === "top") {
      lenis ? lenis.scrollTo(0, { duration: 1.2, easing: quarticEasing }) : window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetEl = document.getElementById(targetId) || document.querySelector(path);
    if (targetEl) {
      const offset = -70;
      lenis
        ? lenis.scrollTo(targetEl as HTMLElement, { offset, duration: 1.2, easing: quarticEasing })
        : window.scrollTo({ top: (targetEl as HTMLElement).getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
    }
  }, [getLenis]);

  useEffect(() => {
    const sections = navItems.map((item) => (item.path.substring(1) === "top" ? document.body : document.getElementById(item.path.substring(1))));
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
    window.dispatchEvent(new CustomEvent("mobile-nav-toggle", { detail: { open: mobileMenuOpen } }));
  }, [mobileMenuOpen]);

  useHeroBrandScroll({
    brandLogoRef: logoRef,
    anchorWrapperRef: brandAnchorRef,
    getLenis,
    isMenuOpen: mobileMenuOpen,
    isSpanish,
  });

  return (
    <header className={`fixed top-0 ${mobileMenuOpen ? "z-[60]" : "z-50"} w-full bg-transparent`}>
      <div
        className={`absolute inset-x-0 top-0 h-20 sm:h-24 pointer-events-none transition-opacity duration-500 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_100%)] ${
          scrolled || mobileMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 h-16 flex items-center justify-between gap-4">
        <div ref={brandAnchorRef} className="w-52 sm:w-60 h-9 shrink-0 relative flex items-center" />

        <a
          ref={logoRef}
          href="#top"
          onClick={(e) => { e.preventDefault(); scrollToPath("#top"); }}
          aria-label="Home"
          className="fixed z-50 flex items-center justify-start select-none cursor-pointer will-change-[transform,width,height] group [transform-origin:0_0] left-4 sm:left-6 lg:left-8 xl:left-12 top-[94px] sm:top-[114px] md:top-[124px] lg:top-[144px] xl:top-[140px] w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] lg:w-[calc(100vw-4rem)] xl:w-[calc(100vw-6rem)] aspect-[1040/105]"
        >
          <svg viewBox="0 0 1040 105" width="100%" height="100%" fill="none" preserveAspectRatio="xMinYMid meet" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
            <text
              x="0"
              y="86"
              textAnchor="start"
              className={`${
                isDarkBg ? "fill-white" : "fill-text-primary"
              } font-heading font-black tracking-[-0.035em] text-[100px] uppercase select-none transition-colors duration-300`}
            >
              {firstName}{" "}
              <tspan className={`${isDarkBg ? "fill-blue-300" : "fill-accent"} font-mono font-light opacity-60 transition-colors duration-300`}>[</tspan>
              {lastName}
              <tspan className={`${isDarkBg ? "fill-blue-300" : "fill-accent"} font-mono font-light opacity-60 transition-colors duration-300`}>]</tspan>
            </text>
          </svg>
        </a>

        <DesktopNav navItems={navItems} activeSection={activeSection} onNavigate={scrollToPath} isDarkBg={isDarkBg} />

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://api.whatsapp.com/send/?phone=50378748247&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={`hidden sm:inline-flex h-9 px-3.5 items-center gap-1.5 rounded-full text-xs font-body font-medium transition-all shadow-xs whitespace-nowrap shrink-0 ${
              isDarkBg
                ? "border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/30"
                : "border border-border-subtle bg-bg-surface text-text-secondary hover:text-text-primary hover:border-accent"
            }`}
          >
            <MessageCircle size={14} className="text-signal-success shrink-0" />
            <span>{t.nav.whatsapp}</span>
          </a>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-clippo-schedule"))}
            className={`hidden sm:inline-flex h-9 px-3.5 xl:px-4 items-center gap-1.5 rounded-full text-xs font-body font-semibold transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0 ${
              isDarkBg
                ? "bg-white text-[#21426E] hover:bg-blue-50 font-bold shadow-md"
                : "text-white bg-accent hover:bg-accent-hover"
            }`}
          >
            <Calendar size={13} className="shrink-0" />
            <span>{t.nav.scheduleCall}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className={`xl:hidden h-9 w-9 flex items-center justify-center rounded-xl transition-all cursor-pointer shadow-xs shrink-0 ${
              isDarkBg
                ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border border-border-subtle bg-bg-surface text-text-primary hover:border-accent"
            }`}
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
    </header>
  );
};
