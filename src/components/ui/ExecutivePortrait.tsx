"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, Globe, ArrowUpRight } from "lucide-react";

interface ExecutivePortraitProps {
  src: string;
  alt: string;
}

const CREDENTIALS_ARCHIVE_URL =
  "https://1drv.ms/f/c/c9136ada8a51a610/IgAQplGK2moTIIDJJKsAAAAAAd9ni2_70w9-q00a4Majbqk?e=AdFVPs";

export const ExecutivePortrait: React.FC<ExecutivePortraitProps> = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isFallback, setIsFallback] = useState(false);

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Outer frame */}
      <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl aspect-[16/10] rounded-3xl p-1 bg-gradient-to-b from-border-base via-border-subtle to-transparent shadow-xl">
        <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-bg-surface border border-border-subtle group isolate [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
          {/* Portrait Image with Next.js optimization and bulletproof WebKit fallback */}
          <Image
            src={imgSrc}
            alt={alt}
            width={1024}
            height={637}
            priority
            unoptimized={isFallback}
            onError={() => {
              if (!isFallback) {
                setIsFallback(true);
                setImgSrc("/avatar.png");
              }
            }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 576px, 672px"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            suppressHydrationWarning
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/90 via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* HUD Status Pill */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-bg-surface/95 backdrop-blur-md border border-border-subtle shadow-sm text-xs font-body text-text-secondary z-20">
            <a
              href={CREDENTIALS_ARCHIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-accent transition-colors group/cred min-w-0"
              title="Verify Google & Microsoft Certifications"
            >
              <Award size={13} className="text-accent shrink-0" />
              <span className="font-semibold text-text-primary text-[11px] tracking-tight truncate group-hover/cred:text-accent transition-colors">
                Google &amp; Microsoft Certified
              </span>
              <ArrowUpRight size={11} className="text-text-muted group-hover/cred:text-accent transition-colors shrink-0" />
            </a>

            <div className="flex items-center gap-1 text-text-muted text-[11px] shrink-0 ml-2">
              <Globe size={11} className="text-accent" />
              <span>Remote</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
