"use client";

import React from "react";
import { motion, type MotionValue } from "framer-motion";

interface ShowcaseHeaderBarProps {
  index: string;
  total: string;
  title: string;
  style?: React.CSSProperties | { y?: MotionValue<string> | string };
  className?: string;
}

export const ShowcaseHeaderBar: React.FC<ShowcaseHeaderBarProps> = ({
  index,
  total,
  title,
  style,
  className = "",
}) => {
  return (
    <motion.div
      style={style}
      className={`w-full h-16 sm:h-20 px-6 sm:px-12 lg:px-16 border-t border-b border-white/20 flex items-center justify-between select-none ${className}`}
    >
      <div className="flex items-center gap-4">
        <span className="font-mono font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white">
          [{index}]
        </span>
        <span className="font-mono text-xs sm:text-sm text-blue-200/90 font-medium">
          {index} / {total}
        </span>
      </div>
      <h3
        style={{ color: "#FFFFFF" }}
        className="font-heading font-black text-lg sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wider text-right !text-white text-white drop-shadow-xs truncate max-w-[65%] sm:max-w-[75%]"
      >
        <span style={{ color: "#FFFFFF" }} className="!text-white text-white">
          {title}
        </span>
      </h3>
    </motion.div>
  );
};
