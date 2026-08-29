"use client";

import React from "react";
import { ShieldCheck, MapPin } from "lucide-react";

interface ExecutivePortraitProps {
  src: string;
  alt: string;
}

export const ExecutivePortrait: React.FC<ExecutivePortraitProps> = ({ src, alt }) => {
  return (
    <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex flex-col items-center select-none">
      {/* Outer frame */}
      <div className="relative w-full h-full rounded-3xl p-1 bg-gradient-to-b from-border-base via-border-subtle to-transparent shadow-xl">
        <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-bg-surface border border-border-subtle group">
          {/* Portrait Image */}
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover filter contrast-[1.04] brightness-100 transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/90 via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* HUD Pill */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-bg-surface/90 backdrop-blur-md border border-border-subtle shadow-md text-xs font-body text-text-secondary z-20">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-accent" />
              <span className="font-semibold text-text-primary text-[11px] tracking-wide">
                103 Verified Credentials
              </span>
            </div>

            <div className="flex items-center gap-1 text-text-muted text-[11px]">
              <MapPin size={11} className="text-accent" />
              <span>Remote</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
