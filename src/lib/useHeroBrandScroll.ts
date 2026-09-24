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
      const scrollY = window.scrollY;
      const heroTarget = document.getElementById("hero-name-target");

      const navRect = navbarAnchor.getBoundingClientRect();
      const heroTargetRect = heroTarget?.getBoundingClientRect();

      const heroWidth = Math.min(window.innerWidth * 0.88, 920);
      const heroHeight = window.innerWidth < 640 ? 64 : 100;
      const heroLeft = (window.innerWidth - heroWidth) / 2;
      const heroTop = heroTargetRect
        ? heroTargetRect.top + (heroTargetRect.height - heroHeight) / 2
        : (window.innerWidth < 640 ? 140 : 170) - scrollY;

      const navLeft = navRect.left;
      const navTop = navRect.top;
      const navWidth = navRect.width || 190;
      const navHeight = navRect.height || 36;

      const progress = Math.min(1, Math.max(0, scrollY / 280));
      const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      if (progress >= 1) {
        brandEl.style.position = "fixed";
        brandEl.style.left = `${navLeft}px`;
        brandEl.style.top = `${navTop}px`;
        brandEl.style.width = `${navWidth}px`;
        brandEl.style.height = `${navHeight}px`;
        return;
      }

      const curLeft = (1 - ease) * heroLeft + ease * navLeft;
      const curTop = (1 - ease) * heroTop + ease * navTop;
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
