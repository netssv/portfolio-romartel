import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RootLayout from "../layout";

// Mock global elements that layout utilizes
vi.mock("@/src/components/animations/NoiseOverlay", () => ({
  NoiseOverlay: () => <div data-testid="noise-overlay" />,
}));

vi.mock("@/src/components/animations/SpotlightCursor", () => ({
  SpotlightCursor: () => <div data-testid="spotlight-cursor" />,
}));

describe("RootLayout Component", () => {
  it("renders children, NoiseOverlay, and SpotlightCursor layers", () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Main Content Block</div>
      </RootLayout>
    );

    // Verify elements are properly mounted
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByTestId("noise-overlay")).toBeInTheDocument();
    expect(screen.getByTestId("spotlight-cursor")).toBeInTheDocument();
  });

  it("injects the time-based theme resolver script into document head", () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    // Assert head script is present containing initial theme loader
    const headScript = document.querySelector("script");
    expect(headScript).not.toBeNull();
    expect(headScript?.innerHTML).toContain("theme-override");
    expect(headScript?.innerHTML).toContain("Date().getHours()");
  });
});
