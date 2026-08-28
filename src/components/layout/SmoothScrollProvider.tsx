"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

interface ScrollContextValue {
  getLenis: () => Lenis | null;
  progress: number;
  velocity: number;
}

const ScrollContext = createContext<ScrollContextValue>({
  getLenis: () => null,
  progress: 0,
  velocity: 0,
});

export const useSmoothScroll = () => useContext(ScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollState, setScrollState] = useState({ progress: 0, velocity: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    const onScroll = (e: { progress: number; velocity: number }) => {
      setScrollState({ progress: e.progress, velocity: e.velocity });
    };

    lenis.on("scroll", onScroll);

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        getLenis: () => lenisRef.current,
        progress: scrollState.progress,
        velocity: scrollState.velocity,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
