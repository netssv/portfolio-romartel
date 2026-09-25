"use client";

import { useEffect, RefObject } from "react";
import Lenis from "lenis";

interface UseHeroBrandScrollOptions {
  brandLogoRef: RefObject<HTMLElement | null>;
  anchorWrapperRef: RefObject<HTMLElement | null>;
  getLenis: () => Lenis | null;
  isMenuOpen?: boolean;
  isSpanish?: boolean;
}

export function useHeroBrandScroll({
  brandLogoRef,
  anchorWrapperRef,
  getLenis,
  isMenuOpen = false,
  isSpanish = false,
}: UseHeroBrandScrollOptions) {
  useEffect(() => {
    const brandEl = brandLogoRef.current;
    const navbarAnchor = anchorWrapperRef.current;
    if (!brandEl || !navbarAnchor) return;

    let rafId: number | null = null;
    let calibrateRafId: number | null = null;
    let lenisUnsub: (() => void) | null = null;
    let currentProgress = 0;
    let targetProgress = 0;
    let isTicking = false;

    const render = (p: number) => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1280;

      const heroTarget = document.getElementById("hero-name-target");
      const heroTargetRect = heroTarget?.getBoundingClientRect();
      const navRect = navbarAnchor.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset || 0;

      const navLeft = navRect.left;
      const navWidth = navRect.width || (isMobile ? 150 : 210);
      const navHeight = navRect.height || 36;
      const dockedTop = Math.max(0, (64 - navHeight) / 2);

      // Rule 1: Always cover the full wide width of the screen from the left margin
      const fullAvailableWidth = Math.max(navWidth, window.innerWidth - navLeft * 2);
      const heroWidth = fullAvailableWidth;
      // Proportional height matching the 1040x105 SVG aspect ratio (~9.9)
      const heroHeight = Math.round(heroWidth / 9.9);

      // Rule 2: Always fixed to the left side (curLeft = navLeft, zero horizontal drift)
      const curLeft = navLeft;

      const heroDocTop = heroTargetRect && heroTargetRect.height > 0
        ? heroTargetRect.top + scrollY + Math.max(0, (heroTargetRect.height - heroHeight) / 2)
        : (isMobile ? 80 : isTablet ? 100 : 120);

      const ease = p * (2 - p);

      if (isMenuOpen || p >= 0.999) {
        brandEl.style.position = "fixed";
        brandEl.style.transform = `translate3d(${navLeft}px, ${dockedTop}px, 0)`;
        brandEl.style.left = "0px";
        brandEl.style.top = "0px";
        brandEl.style.width = `${navWidth}px`;
        brandEl.style.height = `${navHeight}px`;
        brandEl.setAttribute("data-back-to-top-active", "true");
        brandEl.setAttribute("aria-label", isSpanish ? "Volver al inicio" : "Back to top");
        return;
      }

      brandEl.removeAttribute("data-back-to-top-active");
      brandEl.setAttribute("aria-label", "Home");

      // Rule 3: Shrinks in place on the left while smoothly approaching the top menu
      const curTop = (1 - ease) * heroDocTop + ease * dockedTop;
      const curWidth = (1 - ease) * heroWidth + ease * navWidth;
      const curHeight = (1 - ease) * heroHeight + ease * navHeight;

      brandEl.style.position = "fixed";
      brandEl.style.transform = `translate3d(${curLeft.toFixed(1)}px, ${curTop.toFixed(1)}px, 0)`;
      brandEl.style.left = "0px";
      brandEl.style.top = "0px";
      brandEl.style.width = `${curWidth.toFixed(1)}px`;
      brandEl.style.height = `${curHeight.toFixed(1)}px`;
    };

    // Inertial smoothing tick (GSAP scrub: 1 equivalent physics)
    const tick = () => {
      const delta = targetProgress - currentProgress;
      if (Math.abs(delta) > 0.0005) {
        currentProgress += delta * 0.14;
        render(currentProgress);
        rafId = requestAnimationFrame(tick);
      } else {
        currentProgress = targetProgress;
        render(currentProgress);
        isTicking = false;
      }
    };

    const scheduleUpdate = (immediate = false) => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const heroSection = document.getElementById("top");
      const isMobile = window.innerWidth < 640;
      const defaultThreshold = isMobile ? 180 : 260;
      const scrollThreshold = heroSection
        ? Math.min(320, Math.max(160, heroSection.offsetHeight * 0.32))
        : defaultThreshold;

      targetProgress = Math.min(1, Math.max(0, scrollY / scrollThreshold));

      if (immediate) {
        currentProgress = targetProgress;
        render(currentProgress);
        return;
      }

      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    // Initial measurement
    scheduleUpdate(true);

    // Calibration settling loop: track initial layout, image loading, and spring settling for 600ms
    const startCalibrateTime = performance.now();
    const calibrate = (now: number) => {
      scheduleUpdate(true);
      if (now - startCalibrateTime < 600) {
        calibrateRafId = requestAnimationFrame(calibrate);
      }
    };
    calibrateRafId = requestAnimationFrame(calibrate);

    const onScrollOrResize = () => scheduleUpdate(false);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    window.addEventListener("load", () => scheduleUpdate(true));

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => scheduleUpdate(true));
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => scheduleUpdate(true));
      const heroTarget = document.getElementById("hero-name-target");
      if (heroTarget) resizeObserver.observe(heroTarget);
      if (navbarAnchor) resizeObserver.observe(navbarAnchor);
      if (document.body) resizeObserver.observe(document.body);
    }

    const attachLenis = () => {
      const lenis = getLenis();
      if (lenis && !lenisUnsub) {
        lenis.on("scroll", onScrollOrResize);
        lenisUnsub = () => lenis.off("scroll", onScrollOrResize);
      }
    };
    attachLenis();
    const lenisTimer1 = setTimeout(attachLenis, 150);
    const lenisTimer2 = setTimeout(attachLenis, 500);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (calibrateRafId) cancelAnimationFrame(calibrateRafId);
      clearTimeout(lenisTimer1);
      clearTimeout(lenisTimer2);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("load", () => scheduleUpdate(true));
      if (resizeObserver) resizeObserver.disconnect();
      if (lenisUnsub) lenisUnsub();
    };
  }, [brandLogoRef, anchorWrapperRef, getLenis, isMenuOpen, isSpanish]);
}
