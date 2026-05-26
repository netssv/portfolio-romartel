"use client";

import React from "react";

interface Node {
  id: string;
  angle: number;
  radius: number;
  label: string;
  sublabel?: string;
}

const NODES: Node[] = [
  { id: "exp1", angle: 20,  radius: 340, label: "HostPapa", sublabel: "CX Specialist" },
  { id: "exp2", angle: 75,  radius: 360, label: "Roma Chemical", sublabel: "Data Analyst" },
  { id: "exp3", angle: 135, radius: 340, label: "HP", sublabel: "Tech Supervisor" },
  { id: "m1",   angle: 165, radius: 280, label: "70%", sublabel: "Reporting ↓" },
  { id: "m2",   angle: 200, radius: 310, label: "40+", sublabel: "Incidents" },
  { id: "m3",   angle: 235, radius: 280, label: "3", sublabel: "Extensions" },
  { id: "m4",   angle: 270, radius: 300, label: "12%", sublabel: "SLA ↑" },
  { id: "s1",   angle: 305, radius: 350, label: "Python", sublabel: "Automation" },
  { id: "s2",   angle: 340, radius: 330, label: "Power BI", sublabel: "Analytics" },
];

function polarToXY(cx: number, cy: number, angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}

function buildTrace(cx: number, cy: number, node: Node): string {
  const end = polarToXY(cx, cy, node.angle, node.radius);
  const mid1 = polarToXY(cx, cy, node.angle, node.radius * 0.45);
  const turnX = node.angle < 180 ? mid1.x + 60 : mid1.x - 60;
  return `M ${cx} ${cy} L ${mid1.x} ${mid1.y} L ${turnX} ${mid1.y} L ${turnX} ${end.y} L ${end.x} ${end.y}`;
}

export const PCBCircuitLines: React.FC<{ width: number; height: number }> = ({ width, height }) => {
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
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {NODES.map((node) => (
          <linearGradient key={`g-${node.id}`} id={`grad-${node.id}`} gradientUnits="userSpaceOnUse"
            x1={cx} y1={cy}
            x2={polarToXY(cx, cy, node.angle, node.radius).x}
            y2={polarToXY(cx, cy, node.angle, node.radius).y}
          >
            <stop offset="0%" stopColor="#00ff41" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00ff41" stopOpacity="0.9" />
          </linearGradient>
        ))}
      </defs>

      {/* Grid dots */}
      {Array.from({ length: Math.ceil(width / 32) }).map((_, xi) =>
        Array.from({ length: Math.ceil(height / 32) }).map((_, yi) => (
          <circle key={`d-${xi}-${yi}`} cx={xi * 32 + 16} cy={yi * 32 + 16} r="0.8" fill="#00ff41" opacity="0.12" />
        ))
      )}

      {/* Circuit traces */}
      {NODES.map((node) => (
        <g key={node.id} filter="url(#glow)">
          <path d={buildTrace(cx, cy, node)} stroke={`url(#grad-${node.id})`} strokeWidth="1.5" fill="none" />
          <path d={buildTrace(cx, cy, node)} stroke="#00ff41" strokeWidth="1.5" fill="none" opacity="0.3"
            strokeDasharray="6 200" strokeDashoffset="0">
            <animate attributeName="stroke-dashoffset" from="400" to="-400"
              dur={`${2.2 + NODES.indexOf(node) * 0.4}s`} repeatCount="indefinite" />
          </path>
          {/* End node dot */}
          <circle cx={polarToXY(cx, cy, node.angle, node.radius).x}
                  cy={polarToXY(cx, cy, node.angle, node.radius).y}
                  r="4" fill="#0a1628" stroke="#00ff41" strokeWidth="1.5" filter="url(#glow)">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Center ring */}
      <circle cx={cx} cy={cy} r="92" fill="none" stroke="#00ff41" strokeWidth="0.6" opacity="0.3" strokeDasharray="4 8">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="40s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r="100" fill="none" stroke="#00ff41" strokeWidth="0.3" opacity="0.2" strokeDasharray="2 12">
        <animateTransform attributeName="transform" type="rotate" from={`360 ${cx} ${cy}`} to={`0 ${cx} ${cy}`} dur="60s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export { NODES, polarToXY };
