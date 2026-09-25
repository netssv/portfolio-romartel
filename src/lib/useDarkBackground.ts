"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook to dynamically detect if a given vertical viewport Y coordinate
 * is currently floating over a dark background section (e.g. #projects, #experience)
 * or if the global theme is dark.
 */
export function useDarkBackground(getY: () => number = () => 40): boolean {
  const [isDarkBg, setIsDarkBg] = useState(false);

  const checkContrast = useCallback(() => {
    if (typeof window === "undefined") return;

    // 1. If dark theme is globally enabled, everything is dark
    const isThemeDark =
      document.documentElement.classList.contains("theme-dark") ||
      document.body.classList.contains("theme-dark");

    if (isThemeDark) {
      setIsDarkBg(true);
      return;
    }

    const targetY = getY();
    const darkSections = ["projects", "experience"];
    let overDark = false;

    // 2. Check bounding rectangles of dark-canvas sections
    for (const id of darkSections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= targetY && rect.bottom >= targetY) {
          overDark = true;
          break;
        }
      }
    }

    // 3. Proximity fallback via DOM point sampling
    if (!overDark && typeof document.elementFromPoint === "function") {
      const sampleX = Math.min(120, Math.max(20, window.innerWidth - 60));
      const elAtPoint = document.elementFromPoint(sampleX, targetY);
      if (elAtPoint?.closest('#projects, #experience, [data-theme="dark"]')) {
        overDark = true;
      }
    }

    setIsDarkBg(overDark);
  }, [getY]);

  useEffect(() => {
    checkContrast();

    let rAFId: number | null = null;
    const onScrollOrResize = () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      rAFId = requestAnimationFrame(checkContrast);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    const observer = new MutationObserver(checkContrast);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      if (rAFId) cancelAnimationFrame(rAFId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      observer.disconnect();
    };
  }, [checkContrast]);

  return isDarkBg;
}
