"use client";

import React from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";

interface SloganBackgroundLinesProps {
  scrollYProgress: MotionValue<number>;
}

export const SloganBackgroundLines: React.FC<SloganBackgroundLinesProps> = ({
  scrollYProgress,
}) => {
  // Horizontal line parallax translations
  const line1X = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const line2X = useTransform(scrollYProgress, [0, 1], ["25%", "-15%"]);
  const line3X = useTransform(scrollYProgress, [0, 1], ["-15%", "25%"]);
  const line4X = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  // Vertical line parallax translations
  const vert1Y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const vert2Y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  // Dynamic diagonal beam glide
  const slashX = useTransform(scrollYProgress, [0, 1], ["-35%", "15%"]);
  const slashY = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);
  const slashScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.95]);
  const slashOpacity = useTransform(scrollYProgress, [0, 0.25, 0.92, 1], [0.35, 0.75, 0.70, 0.2]);

  // Subtle coordinate marker opacity
  const markerOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.92, 0.98], [0, 0.85, 0.85, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* Background Flood Layer */}
      <div className="absolute inset-0 bg-[#21426E] dark:bg-[#162C4E]" />

      {/* Diagonal Architectural Beam */}
      <motion.div
        style={{
          x: slashX,
          y: slashY,
          scale: slashScale,
          opacity: slashOpacity,
          rotate: -34,
        }}
        className="absolute -top-40 -left-40 sm:-left-20 w-60 sm:w-80 md:w-96 h-[170%] bg-[#1A3557] dark:bg-[#1D3B68] rounded-full shadow-2xl blur-[1px]"
      />

      {/* Horizontal Coordinate Lines (Moving Left/Right on Scroll) */}
      <div className="absolute inset-0 flex flex-col justify-between py-12 sm:py-20 opacity-40">
        {/* Line 1: Upper Latitude */}
        <motion.div style={{ x: line1X }} className="w-[150%] -left-[25%] relative border-t border-white/20 flex items-center justify-around">
          <span className="font-mono text-[10px] text-blue-200/60 uppercase tracking-widest px-4 bg-[#21426E] dark:bg-[#162C4E]">
            [LAT 13.69°N // SYS_ORIGIN]
          </span>
          <span className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
          <span className="font-mono text-[10px] text-blue-200/60 uppercase tracking-widest px-4 bg-[#21426E] dark:bg-[#162C4E]">
            +01_COORD
          </span>
        </motion.div>

        {/* Line 2: Mid-Upper Dashed Rule */}
        <motion.div style={{ x: line2X }} className="w-[150%] -left-[25%] relative border-t border-dashed border-white/15 flex items-center justify-between px-16">
          <span className="font-mono text-[9px] text-blue-100/50 uppercase tracking-widest">
            GRID_STREAM_48K
          </span>
          <span className="w-2 h-0.5 bg-white/40" />
        </motion.div>

        {/* Line 3: Mid-Lower Latitude */}
        <motion.div style={{ x: line3X }} className="w-[150%] -left-[25%] relative border-t border-white/20 flex items-center justify-around">
          <span className="font-mono text-[10px] text-blue-200/60 uppercase tracking-widest px-4 bg-[#21426E] dark:bg-[#162C4E]">
            [LNG 89.24°W // TELEMETRY_FEED]
          </span>
          <span className="w-1.5 h-1.5 bg-blue-300 rounded-full" />
          <span className="font-mono text-[10px] text-blue-200/60 uppercase tracking-widest px-4 bg-[#21426E] dark:bg-[#162C4E]">
            +02_PIPELINE
          </span>
        </motion.div>

        {/* Line 4: Lower Dashed Rule */}
        <motion.div style={{ x: line4X }} className="w-[150%] -left-[25%] relative border-t border-dashed border-white/15 flex items-center justify-between px-24">
          <span className="font-mono text-[9px] text-blue-100/50 uppercase tracking-widest">
            AUTO_CADENCE_60FPS
          </span>
          <span className="w-2 h-0.5 bg-white/40" />
        </motion.div>
      </div>

      {/* Vertical Track Lines (Moving Up/Down on Scroll) */}
      <motion.div
        style={{ y: vert1Y }}
        className="absolute top-[-20%] bottom-[-20%] left-[8%] sm:left-[12%] w-px border-l border-white/15 flex flex-col justify-around py-8"
      >
        <span className="w-1 h-3 -ml-[1.5px] bg-blue-300/80" />
        <span className="w-1 h-3 -ml-[1.5px] bg-white/40" />
      </motion.div>

      <motion.div
        style={{ y: vert2Y }}
        className="absolute top-[-20%] bottom-[-20%] right-[8%] sm:right-[12%] w-px border-r border-white/15 flex flex-col justify-around py-8"
      >
        <span className="w-1 h-3 -mr-[1.5px] bg-blue-300/80" />
        <span className="w-1 h-3 -mr-[1.5px] bg-white/40" />
      </motion.div>

      {/* Floating Monospace Crosshair Anchors */}
      <motion.div style={{ opacity: markerOpacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] left-[16%] font-mono text-[10px] text-blue-200/70 font-semibold tracking-widest">
          + [ALIGN_X]
        </div>
        <div className="absolute bottom-[20%] right-[16%] font-mono text-[10px] text-blue-200/70 font-semibold tracking-widest">
          + [ALIGN_Y]
        </div>
      </motion.div>
    </div>
  );
};
