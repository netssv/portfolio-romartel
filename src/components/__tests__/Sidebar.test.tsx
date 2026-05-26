import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Sidebar } from "../layout/Sidebar";

describe("Sidebar Component", () => {
  beforeEach(() => {
    // 1. Mock browser IntersectionObserver before rendering
    global.IntersectionObserver = vi.fn().mockImplementation(function() {
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    });

    // Mock localStorage
    const store: Record<string, string> = {};
    global.localStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
      length: 0,
      key: () => null,
    };

    // Mock window.scrollTo
    global.window.scrollTo = vi.fn();

    // Clean up html classlist
    document.documentElement.className = "";
  });

  it("renders the author name and navigation list items", () => {
    render(<Sidebar authorName="Rodrigo Martel" />);
    
    expect(screen.getByText("Rodrigo Martel")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("allows the user to toggle the day/night theme manually on click", async () => {
    render(<Sidebar authorName="Rodrigo Martel" />);
    
    // Tapping the desktop theme switch triggers state swap and sets localStorage
    const toggleButton = screen.getByText("Night Light Theme");
    expect(toggleButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(toggleButton);
    });

    // Class list on document element should now carry Dark Mode
    expect(document.documentElement.classList.contains("theme-dark")).toBe(true);
    expect(localStorage.getItem("theme-override")).toBe("night");

    // Button label swaps dynamically to prompt light theme return
    expect(screen.getByText("Day Light Theme")).toBeInTheDocument();
  });
});
