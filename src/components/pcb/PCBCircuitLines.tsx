"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Node {
  id: string;
  angle: number;
  label: string;
  sublabel?: string;
}

export const NODES: Node[] = [
  { id: "exp1", angle: 25,  label: "HostPapa",      sublabel: "CX Specialist" },
  { id: "exp2", angle: 80,  label: "Roma Chemical", sublabel: "Data Analyst" },
  { id: "exp3", angle: 140, label: "HP",             sublabel: "Tech Supervisor" },
  { id: "m1",   angle: 170, label: "70%",            sublabel: "Reporting ↓" },
  { id: "m2",   angle: 205, label: "40+",            sublabel: "Incidents" },
  { id: "m3",   angle: 240, label: "3",              sublabel: "Projects" },
  { id: "m4",   angle: 275, label: "12%",            sublabel: "SLA ↑" },
  { id: "s1",   angle: 310, label: "Python",         sublabel: "Automation" },
  { id: "s2",   angle: 345, label: "Power BI",       sublabel: "Analytics" },
];

export function polarToXY(cx: number, cy: number, angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

function buildTrace(cx: number, cy: number, angleDeg: number, radius: number): string {
  const end = polarToXY(cx, cy, angleDeg, radius);
  const innerR = radius * 0.42;
  const mid = polarToXY(cx, cy, angleDeg, innerR);
  const turnX = angleDeg < 180 ? mid.x + radius * 0.15 : mid.x - radius * 0.15;
  return `M ${cx} ${cy} L ${mid.x} ${mid.y} L ${turnX} ${mid.y} L ${turnX} ${end.y} L ${end.x} ${end.y}`;
}

interface PCBCircuitLinesProps {
  width: number;
  height: number;
  radius: number;
}

export const PCBCircuitLines: React.FC<PCBCircuitLinesProps> = ({ width, height, radius }) => {
  const cx = width / 2;
  const cy = height / 2;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <filter id="pcb-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {NODES.map((node) => {
          const end = polarToXY(cx, cy, node.angle, radius);
          return (
            <linearGradient key={`g-${node.id}`} id={`grad-${node.id}`}
              gradientUnits="userSpaceOnUse" x1={cx} y1={cy} x2={end.x} y2={end.y}
            >
              <stop offset="0%"   stopColor="#00ff41" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00ff41" stopOpacity="0.85" />
            </linearGradient>
          );
        })}
      </defs>

      {/* Grid dots */}
      {Array.from({ length: Math.ceil(width / 32) }).map((_, xi) =>
        Array.from({ length: Math.ceil(height / 32) }).map((_, yi) => (
          <circle key={`d-${xi}-${yi}`} cx={xi * 32 + 16} cy={yi * 32 + 16}
            r="0.7" fill="#00ff41" opacity="0.1" />
        ))
      )}

      {/* Circuit traces with animated draw */}
      {NODES.map((node, i) => {
        const d = buildTrace(cx, cy, node.angle, radius);
        const pathLen = 600;
        return (
          <g key={node.id}>
            {/* Base gradient trace */}
            <motion.path
              d={d}
              stroke={`url(#grad-${node.id})`}
              strokeWidth="1.5"
              fill="none"
              filter="url(#pcb-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
            />
            {/* Travelling signal dot */}
            <path d={d} stroke="#00ff41" strokeWidth="1.5" fill="none"
              opacity="0.35" strokeDasharray={`5 ${pathLen}`} strokeDashoffset="0"
            >
              <animate attributeName="stroke-dashoffset"
                from={`${pathLen}`} to={`-${pathLen}`}
                dur={`${2.5 + i * 0.35}s`} repeatCount="indefinite" />
            </path>
            {/* End connection dot */}
            <motion.circle
              cx={polarToXY(cx, cy, node.angle, radius).x}
              cy={polarToXY(cx, cy, node.angle, radius).y}
              r="3.5" fill="#0a1628" stroke="#00ff41" strokeWidth="1.5"
              filter="url(#pcb-glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
            >
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" repeatCount="indefinite" />
            </motion.circle>
          </g>
        );
      })}

      {/* Rotating center rings */}
      <circle cx={cx} cy={cy} r={radius * 0.28} fill="none" stroke="#00ff41"
        strokeWidth="0.5" opacity="0.25" strokeDasharray="3 8">
        <animateTransform attributeName="transform" type="rotate"
          from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="40s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={radius * 0.32} fill="none" stroke="#00ff41"
        strokeWidth="0.3" opacity="0.15" strokeDasharray="2 12">
        <animateTransform attributeName="transform" type="rotate"
          from={`360 ${cx} ${cy}`} to={`0 ${cx} ${cy}`} dur="65s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};
