import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MobileMenuDropdown } from "../layout/MobileMenuDropdown";

const NAV_ITEMS = [
  { name: "Home", path: "#top" },
  { name: "Projects", path: "#projects" },
  { name: "Experience", path: "#experience" },
  { name: "Insights", path: "#skills" },
  { name: "Architecture", path: "#architecture" },
  { name: "Case Studies", path: "#case-studies" },
];

describe("MobileMenuDropdown Component", () => {
  it("renders all navigation items and handles click routing", () => {
    const handleNavigate = vi.fn();
    render(
      <MobileMenuDropdown
        navItems={NAV_ITEMS}
        activeSection="Home"
        onNavigate={handleNavigate}
      />
    );

    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Architecture")).toBeInTheDocument();

    const projectsLink = screen.getByText("Projects");
    fireEvent.click(projectsLink);

    expect(handleNavigate).toHaveBeenCalledWith("#projects");
  });

  it("handles Connect CTA button click", () => {
    const handleNavigate = vi.fn();
    render(
      <MobileMenuDropdown
        navItems={NAV_ITEMS}
        activeSection="Home"
        onNavigate={handleNavigate}
      />
    );

    const connectButton = screen.getByText("Let's Connect");
    fireEvent.click(connectButton);

    expect(handleNavigate).toHaveBeenCalledWith("#contact");
  });
});
