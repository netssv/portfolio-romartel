"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSmoothScroll } from "@/src/components/layout/SmoothScrollProvider";

/**
 * Traps wheel/scroll events within an element so that scrolling over it
 * scrolls the container itself rather than the background window/page.
 */
export function useContainerScrollTrap<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T | null>(null);
  const { getLenis } = useSmoothScroll();

  const handleMouseEnter = useCallback(() => {
    try {
      getLenis()?.stop();
    } catch {}
  }, [getLenis]);

  const handleMouseLeave = useCallback(() => {
    try {
      getLenis()?.start();
    } catch {}
  }, [getLenis]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isScrollable = scrollHeight > clientHeight;

      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      try {
        getLenis()?.start();
      } catch {}
    };
  }, [getLenis]);

  return {
    containerRef,
    scrollTrapProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      "data-lenis-prevent": "true",
    },
  };
}
