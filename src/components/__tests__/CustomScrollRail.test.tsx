import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CustomScrollRail } from "../layout/CustomScrollRail";
import { LanguageProvider } from "@/src/context/LanguageContext";

describe("CustomScrollRail Component", () => {
  beforeEach(() => {
    global.IntersectionObserver = vi.fn().mockImplementation(function () {
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    });

    global.MutationObserver = vi.fn().mockImplementation(function () {
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };
    });

    document.documentElement.className = "";
  });

  it("renders section navigation aside with accessible label", () => {
    render(
      <LanguageProvider>
        <CustomScrollRail />
      </LanguageProvider>
    );

    const aside = screen.getByLabelText("Section navigation");
    expect(aside).toBeInTheDocument();
  });

  it("renders all 7 navigation dot buttons", () => {
    render(
      <LanguageProvider>
        <CustomScrollRail />
      </LanguageProvider>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(7);
  });
});
