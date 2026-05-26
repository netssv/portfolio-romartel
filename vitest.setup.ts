/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "font-inter" }),
  Space_Grotesk: () => ({ variable: "font-space-grotesk" }),
  Geist_Mono: () => ({ variable: "font-geist" }),
}));

// Mock next/script
vi.mock("next/script", () => ({
  default: ({ children, dangerouslySetInnerHTML, ...props }: any) => {
    if (dangerouslySetInnerHTML) {
      return React.createElement("script", {
        ...props,
        dangerouslySetInnerHTML,
      });
    }
    return React.createElement("script", props, children);
  },
}));

// Mock framer-motion to prevent animation delays in tests or layout errors
vi.mock("framer-motion", async () => {
  const actual = (await vi.importActual("framer-motion")) as any;
  return {
    ...actual,
    motion: {
      ...actual.motion,
      span: ({ children, ...props }: any) => React.createElement("span", props, children),
      div: ({ children, ...props }: any) => React.createElement("div", props, children),
    },
  };
});
