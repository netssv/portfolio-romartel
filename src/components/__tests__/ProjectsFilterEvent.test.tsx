import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ProjectsSection } from "../ProjectsSection";
import { LanguageProvider } from "@/src/context/LanguageContext";

vi.mock("../FlagshipProjectCard", () => ({
  FlagshipProjectCard: ({ title }: { title: string }) => (
    <div data-testid="mock-flagship">{title}</div>
  ),
}));

vi.mock("../ProjectCard", () => ({
  ProjectCard: ({ title }: { title: string }) => (
    <div data-testid="mock-project-card">{title}</div>
  ),
}));

const mockFlagship = {
  id: "metropolyca",
  title: "Metropolyca",
  subtitle: "3D City Simulation",
  eyebrow: "Flagship Simulation",
  description: "Physics simulation",
  orchestrationStory: "Continuous QA automation",
  status: "Production",
  category: "Core Software & Web Tools",
  metrics: [{ label: "Architecture", value: "TypeScript" }],
  tags: ["TypeScript", "Three.js"],
  links: { demo: "https://metropolyca.app", github: "https://github.com/netssv/metropolyca" },
};

const mockProjects = [
  {
    id: "hodl-watcher",
    title: "HODL Watcher",
    subtitle: "Bitcoin Watchdog",
    category: "Automation & Data Systems",
    description: "Mempool fee monitor",
    status: "Production Active",
    tags: ["Python", "FastAPI", "Make.com"],
    links: { demo: "https://render.com", github: "https://github.com/netssv/hodl-watcher" },
  },
  {
    id: "caniarun",
    title: "caniarun",
    subtitle: "CLI Hardware Profiler",
    category: "Core Software & Web Tools",
    description: "Hardware profiler",
    status: "Active",
    tags: ["Python", "PyPI"],
    links: { demo: "https://pypi.org", github: "https://github.com/netssv/caniarun" },
  },
];

describe("ProjectsSection in-page event filtering", () => {
  beforeEach(() => {
    global.IntersectionObserver = vi.fn().mockImplementation(function () {
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    });

    window.HTMLMediaElement.prototype.play = vi.fn().mockReturnValue(Promise.resolve());
    window.HTMLMediaElement.prototype.pause = vi.fn();
  });

  it("switches to grid view and filters by category on portfolio:filter-projects event", () => {
    render(
      <LanguageProvider>
        <ProjectsSection flagship={mockFlagship} projects={mockProjects} />
      </LanguageProvider>
    );

    // Trigger filter event
    act(() => {
      window.dispatchEvent(
        new CustomEvent("portfolio:filter-projects", {
          detail: { category: "Automation & Data Systems" },
        })
      );
    });

    // Should switch to grid view and render matching project
    expect(screen.getByText("HODL Watcher")).toBeInTheDocument();
  });
});
