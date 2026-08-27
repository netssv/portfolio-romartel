"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Keyboard } from "lucide-react";
import { KeyBadge } from "./ui/KeyBadge";
import { ScrambleText } from "./ui/ScrambleText";
import { ShortcutsModal } from "./ui/ShortcutsModal";
import { useKeyboardShortcuts, ShortcutAction } from "@/src/lib/useKeyboardShortcuts";

interface NavItem { name: string; path: string; }
interface NavbarProps { navItems: NavItem[]; authorName: string; }

export const Navbar: React.FC<NavbarProps> = ({ navItems, authorName }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setScrolled(latest > 32);

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  const getShortcutKey = (name: string): string => {
    const map: Record<string, string> = {
      Resume: "H",
      Home: "H",
      Projects: "P",
      Skills: "S",
      Experience: "E",
      Architecture: "A",
      Philosophy: "F",
      "Case Studies": "K",
      Contact: "C",
    };
    return map[name] || name.charAt(0).toUpperCase();
  };

  const scrollToPath = (path: string) => {
    if (path === "/" || path === "#" || path === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(path);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const shortcuts = useMemo<ShortcutAction[]>(() => {
    const actionMap = new Map<string, ShortcutAction>();

    navItems.forEach((item) => {
      const key = getShortcutKey(item.name);
      if (!actionMap.has(key)) {
        actionMap.set(key, {
          key,
          description: `Navigate to ${item.name}`,
          action: () => scrollToPath(item.path),
        });
      }
    });

    if (!actionMap.has("C")) {
      actionMap.set("C", {
        key: "C",
        description: "Navigate to Contact",
        action: () => scrollToPath("#contact"),
      });
    }

    if (!actionMap.has("?")) {
      actionMap.set("?", {
        key: "?",
        description: "Open shortcuts guide",
        action: () => setIsShortcutsOpen((prev) => !prev),
      });
    }

    return Array.from(actionMap.values());
  }, [navItems]);

  useKeyboardShortcuts(shortcuts);

  useEffect(() => {
    const sections = navItems.map((item) => {
      const id = item.path.substring(1);
      return id === "top" ? document.body : document.getElementById(id);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id || "top";
            const match = navItems.find((item) => item.path === `#${id}`);
            if (match) setActiveSection(match.name);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const initials = authorName.split(" ").map((w) => w[0]).join("");

  const modalShortcuts = shortcuts.map((s) => ({
    keyLabel: s.key,
    description: s.description,
  }));

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          scrolled
            ? "bg-bg-base/90 backdrop-blur-md border-b border-border-subtle"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <a href="#" aria-label="Home" className="flex items-center gap-2.5 group">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-black text-xs font-mono font-bold tracking-tight">
              {initials}
            </span>
            <span className="text-sm font-body font-medium text-text-primary hidden sm:block">
              {authorName}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.name;
              const keyBadge = getShortcutKey(item.name);
              return (
                <a
                  key={item.name}
                  href={item.path}
                  className={`group relative px-3 py-1.5 flex items-center gap-1.5 text-sm font-body transition-colors duration-200 ${
                    isActive ? "text-text-primary font-medium" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <KeyBadge
                    keyLabel={keyBadge}
                    variant={isActive ? "accent" : "subtle"}
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <ScrambleText text={item.name} />
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-t-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsShortcutsOpen(true)}
              aria-label="Keyboard Shortcuts"
              title="Keyboard shortcuts (?)"
              className="h-9 w-9 hidden sm:flex items-center justify-center rounded-md text-text-muted hover:text-text-primary border border-border-subtle hover:border-border-base transition-all"
            >
              <Keyboard className="w-4 h-4" />
            </button>

            <a
              href="#contact"
              className="h-9 px-3.5 flex items-center gap-2 rounded-md text-sm font-body font-medium text-text-primary border border-border-base hover:border-accent/50 hover:text-accent transition-all duration-200 group"
            >
              <ScrambleText text="Get in touch" />
              <KeyBadge keyLabel="C" variant="accent" className="hidden sm:inline-flex" />
            </a>
          </div>
        </div>
      </motion.header>

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        shortcuts={modalShortcuts}
      />
    </>
  );
};

