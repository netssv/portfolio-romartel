"use client";

import { useEffect } from "react";

// Extend Window to include gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

interface GA4TrackerProps {
  measurementId: string;
}

/**
 * Initialises the gtag command queue and sends the initial page_view.
 * The actual gtag.js script is loaded via <script> in layout.tsx.
 */
export function GA4Tracker({ measurementId }: GA4TrackerProps) {
  useEffect(() => {
    if (!measurementId) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    };

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: true,
    });
  }, [measurementId]);

  return null;
}
