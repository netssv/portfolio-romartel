"use client";

import { useEffect } from "react";

export interface ViewportGridConfig {
  minBlockSize?: number;
  maxBlockSize?: number;
  maxColumns?: number;
}

/**
 * Dynamically computes and assigns mathematical CSS grid tokens (--grid-block-size, etc.)
 * matching the structural geometry system of vanlent.dev.
 */
export function useViewportGrid(config: ViewportGridConfig = {}) {
  const { minBlockSize = 54, maxBlockSize = 64, maxColumns = 24 } = config;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const doc = document.documentElement;

    const computeGrid = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (vw === 0 || vh === 0) return;

      // Target block size between min and max
      const targetBlock = Math.max(minBlockSize, Math.min(maxBlockSize, Math.round(vw / 20)));
      const cols = Math.min(maxColumns, Math.max(8, Math.floor(vw / targetBlock)));
      const blockSize = Math.floor(vw / cols);
      const rows = Math.ceil(vh / blockSize);
      const xOffset = vw % blockSize;

      doc.style.setProperty("--grid-block-size", `${blockSize}px`);
      doc.style.setProperty("--grid-columns", String(cols));
      doc.style.setProperty("--grid-rows", String(rows));
      doc.style.setProperty("--grid-x-offset", `${xOffset}px`);
    };

    computeGrid();
    window.addEventListener("resize", computeGrid, { passive: true });

    return () => {
      window.removeEventListener("resize", computeGrid);
    };
  }, [minBlockSize, maxBlockSize, maxColumns]);
}
