import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { LanguageProvider, useLanguage } from "@/src/context/LanguageContext";
import { ChatBot } from "../ChatBot";

const mockScrollIntoView = vi.fn();
window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;

vi.mock("@/src/lib/useActiveSection", () => ({
  useActiveSection: () => "top",
}));

vi.mock("../ClippoAvatar", () => ({
  ClippoAvatar: ({ size }: { size?: number }) => (
    <div data-testid="mock-clippo-avatar" style={{ width: size, height: size }}>
      Clippo Avatar
    </div>
  ),
}));

const LanguageSwitcherTestHelper: React.FC = () => {
  const { toggleLocale, isSpanish } = useLanguage();
  return (
    <div>
      <button data-testid="test-lang-btn" onClick={toggleLocale}>
        {isSpanish ? "To EN" : "To ES"}
      </button>
      <ChatBot />
    </div>
  );
};

describe("Smart Clippo Language Switcher Detection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates floating speech bubble to smart detection phrase when language switches to Spanish", async () => {
    render(
      <LanguageProvider>
        <LanguageSwitcherTestHelper />
      </LanguageProvider>
    );

    const switchBtn = screen.getByTestId("test-lang-btn");

    await act(async () => {
      fireEvent.click(switchBtn);
    });

    expect(
      screen.getByText(/Veo que cambiaste al español. ¿Te gustaría seguir así o cambiamos al inglés\?/i)
    ).toBeInTheDocument();
  });

  it("updates floating speech bubble when switching back to English", async () => {
    render(
      <LanguageProvider>
        <LanguageSwitcherTestHelper />
      </LanguageProvider>
    );

    const switchBtn = screen.getByTestId("test-lang-btn");

    // Switch to ES
    await act(async () => {
      fireEvent.click(switchBtn);
    });

    // Switch back to EN
    await act(async () => {
      fireEvent.click(switchBtn);
    });

    expect(
      screen.getByText(/I noticed you switched to English! Would you like to continue in English or switch to Spanish\?/i)
    ).toBeInTheDocument();
  });
});
