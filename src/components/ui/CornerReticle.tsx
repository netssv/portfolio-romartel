"use client";

import React from "react";

interface CornerReticleProps {
  className?: string;
  size?: number; // length of corner ticks in px
  active?: boolean;
  color?: string; // CSS color string or Tailwind border color
}

/**
 * High-precision corner brackets and crosshair reticles
 * inspired by Swiss technical diagrams and vanlent.dev.
 */
export const CornerReticle: React.FC<CornerReticleProps> = ({
  className = "",
  size = 8,
  active = true,
  color = "currentColor",
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-10 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Top-Left */}
      <span
        className={`absolute top-0 left-0 transition-opacity duration-300 ${
          active ? "opacity-90" : "opacity-40"
        }`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderTop: `1px solid ${color}`,
          borderLeft: `1px solid ${color}`,
        }}
      />

      {/* Top-Right */}
      <span
        className={`absolute top-0 right-0 transition-opacity duration-300 ${
          active ? "opacity-90" : "opacity-40"
        }`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderTop: `1px solid ${color}`,
          borderRight: `1px solid ${color}`,
        }}
      />

      {/* Bottom-Left */}
      <span
        className={`absolute bottom-0 left-0 transition-opacity duration-300 ${
          active ? "opacity-90" : "opacity-40"
        }`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderBottom: `1px solid ${color}`,
          borderLeft: `1px solid ${color}`,
        }}
      />

      {/* Bottom-Right */}
      <span
        className={`absolute bottom-0 right-0 transition-opacity duration-300 ${
          active ? "opacity-90" : "opacity-40"
        }`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderBottom: `1px solid ${color}`,
          borderRight: `1px solid ${color}`,
        }}
      />
    </div>
  );
};
