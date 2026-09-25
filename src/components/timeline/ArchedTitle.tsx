"use client";

import React, { useId } from "react";

interface ArchedTitleProps {
  text: string;
  className?: string;
}

export const ArchedTitle: React.FC<ArchedTitleProps> = ({ text, className = "" }) => {
  const pathId = useId();

  return (
    <div className={`relative flex justify-center items-center select-none ${className}`}>
      <svg
        viewBox="0 0 500 120"
        className="w-72 sm:w-96 md:w-[460px] h-auto overflow-visible pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <path
            id={pathId}
            d="M 50,110 A 280,140 0 0,1 450,110"
            fill="transparent"
          />
        </defs>
        <text
          className="fill-white font-heading font-black text-[20px] sm:text-[22px] uppercase"
          style={{ letterSpacing: "0.22em" }}
        >
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};
