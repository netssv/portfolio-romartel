"use client";

import React from "react";
import Image from "next/image";
import { Award, Globe, ArrowUpRight } from "lucide-react";

interface ExecutivePortraitProps {
  src: string;
  alt: string;
}

const CREDENTIALS_ARCHIVE_URL =
  "https://1drv.ms/f/c/c9136ada8a51a610/IgAQplGK2moTIIDJJKsAAAAAAd9ni2_70w9-q00a4Majbqk?e=AdFVPs";

export const ExecutivePortrait: React.FC<ExecutivePortraitProps> = ({ src, alt }) => {
  return (
    <div className="flex flex-col items-center select-none">
      {/* Outer frame */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl p-1 bg-gradient-to-b from-border-base via-border-subtle to-transparent shadow-xl">
        <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-bg-surface border border-border-subtle group">
          {/* Portrait Image with Next.js optimization */}
          <Image
            src={src}
            alt={alt}
            width={384}
            height={384}
            priority
            sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
            className="w-full h-full object-cover filter contrast-[1.04] brightness-100 transition-transform duration-500 group-hover:scale-105"
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

      {/* Verifiable Credentials Chips (Two Rows matching reference design) */}
      <div className="mt-3.5 flex flex-col items-center gap-2 w-full max-w-sm">
        <div className="flex flex-wrap justify-center gap-2">
          <a
            href={CREDENTIALS_ARCHIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-bg-surface border border-border-subtle hover:border-accent text-xs font-body text-text-secondary hover:text-text-primary transition-all shadow-xs group"
            title="Google Data Analytics Professional Certificate"
          >
            <span>Google Data Analytics</span>
            <ArrowUpRight size={11} className="text-text-muted group-hover:text-accent shrink-0" />
          </a>
          <a
            href={CREDENTIALS_ARCHIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-bg-surface border border-border-subtle hover:border-accent text-xs font-body text-text-secondary hover:text-text-primary transition-all shadow-xs group"
            title="Microsoft Power BI Data Analyst"
          >
            <span>Microsoft Power BI</span>
            <ArrowUpRight size={11} className="text-text-muted group-hover:text-accent shrink-0" />
          </a>
        </div>
        <div className="flex justify-center">
          <a
            href={CREDENTIALS_ARCHIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-bg-surface border border-border-subtle hover:border-accent text-xs font-body text-text-secondary hover:text-text-primary transition-all shadow-xs group"
            title="HubSpot Inbound Marketing"
          >
            <span>HubSpot Inbound</span>
            <ArrowUpRight size={11} className="text-text-muted group-hover:text-accent shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
};
