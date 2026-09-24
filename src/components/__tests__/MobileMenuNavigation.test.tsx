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

  it("handles Schedule Call CTA and renders WhatsApp link", () => {
    const handleNavigate = vi.fn();
    const eventSpy = vi.spyOn(window, "dispatchEvent");
    render(
      <MobileMenuDropdown
        navItems={NAV_ITEMS}
        activeSection="Home"
        onNavigate={handleNavigate}
      />
    );

    const scheduleButton = screen.getByText("Schedule Call");
    fireEvent.click(scheduleButton);

    expect(handleNavigate).toHaveBeenCalledWith("");
    expect(eventSpy).toHaveBeenCalledWith(expect.objectContaining({ type: "open-clippo-schedule" }));

    const whatsappLink = screen.getByText("WhatsApp");
    expect(whatsappLink.closest("a")).toHaveAttribute(
      "href",
      "https://api.whatsapp.com/send/?phone=50378748247&text&type=phone_number&app_absent=0"
    );
    eventSpy.mockRestore();
  });
});
