"use client";

import { useEffect, RefObject } from "react";
import Lenis from "lenis";

interface UseHeroBrandScrollOptions {
  brandLogoRef: RefObject<HTMLElement | null>;
  anchorWrapperRef: RefObject<HTMLElement | null>;
  getLenis: () => Lenis | null;
}

export function useHeroBrandScroll({
  brandLogoRef,
  anchorWrapperRef,
  getLenis,
}: UseHeroBrandScrollOptions) {
  useEffect(() => {
    const brandEl = brandLogoRef.current;
    const navbarAnchor = anchorWrapperRef.current;
    if (!brandEl || !navbarAnchor) return;

    let rafId: number | null = null;

    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const heroTarget = document.getElementById("hero-name-target");

      const navRect = navbarAnchor.getBoundingClientRect();
      const heroTargetRect = heroTarget?.getBoundingClientRect();

      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

      const heroWidth = isMobile
        ? Math.min(window.innerWidth * 0.90, 400)
        : isTablet
        ? Math.min(window.innerWidth * 0.85, 680)
        : Math.min(window.innerWidth * 0.88, 920);

      const heroHeight = isMobile ? 48 : isTablet ? 72 : 100;
      const heroLeft = (window.innerWidth - heroWidth) / 2;

      // Absolute document top coordinate of the hero target anchor
      const heroDocTop = heroTargetRect
        ? heroTargetRect.top + scrollY + (heroTargetRect.height - heroHeight) / 2
        : (isMobile ? 110 : isTablet ? 140 : 170);

      // Hero target's true viewport position at the current scroll offset
      const heroViewportTop = heroDocTop - scrollY;

      const navLeft = navRect.left;
      const navWidth = navRect.width || (isMobile ? 150 : 190);
      const navHeight = navRect.height || 36;
      // In-header vertical center offset (header is h-16 = 64px, navbar anchor is 36px)
      const dockedTop = Math.max(0, (64 - navHeight) / 2);

      const scrollThreshold = isMobile ? 220 : 280;
      const progress = Math.min(1, Math.max(0, scrollY / scrollThreshold));
      const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      // Clamp navTop during interpolation so negative translation does not corrupt position
      const navTop = navRect.top <= 0 || progress >= 1 ? dockedTop : navRect.top;

      if (progress >= 1) {
        brandEl.style.position = "fixed";
        brandEl.style.left = `${navLeft}px`;
        brandEl.style.top = `${dockedTop}px`;
        brandEl.style.width = `${navWidth}px`;
        brandEl.style.height = `${navHeight}px`;
        return;
      }

      const curLeft = (1 - ease) * heroLeft + ease * navLeft;
      const curTop = (1 - ease) * heroViewportTop + ease * navTop;
      const curWidth = (1 - ease) * heroWidth + ease * navWidth;
      const curHeight = (1 - ease) * heroHeight + ease * navHeight;

      brandEl.style.position = "fixed";
      brandEl.style.left = `${curLeft.toFixed(1)}px`;
      brandEl.style.top = `${curTop.toFixed(1)}px`;
      brandEl.style.width = `${curWidth.toFixed(1)}px`;
      brandEl.style.height = `${curHeight.toFixed(1)}px`;
    };

    const scheduleUpdate = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    const lenis = getLenis();
    if (lenis) lenis.on("scroll", scheduleUpdate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (lenis) lenis.off("scroll", scheduleUpdate);
    };
  }, [brandLogoRef, anchorWrapperRef, getLenis]);
}
