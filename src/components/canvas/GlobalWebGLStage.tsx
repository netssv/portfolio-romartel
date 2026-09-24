"use client";

import React from "react";

/**
 * Architectural grid background providing subtle geometric structure
 * without the heavy WebGL / Three.js main thread overhead.
 */
export const GlobalWebGLStage: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Restrained architectural grid overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 20%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 20%, #000 40%, transparent 100%)",
        }}
      />
    </div>
  );
};
