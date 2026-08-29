import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { LanguageProvider, useLanguage } from "../LanguageContext";
import { LanguageToggle } from "@/src/components/ui/LanguageToggle";

const storageMock: Record<string, string> = {};
const mockLocalStorage = {
  getItem: vi.fn((key: string) => storageMock[key] || null),
  setItem: vi.fn((key: string, val: string) => {
    storageMock[key] = val;
  }),
  removeItem: vi.fn((key: string) => {
    delete storageMock[key];
  }),
  clear: vi.fn(() => {
    for (const key of Object.keys(storageMock)) {
      delete storageMock[key];
    }
  }),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
  writable: true,
});

const ConsumerComponent: React.FC = () => {
  const { locale, isSpanish, isEnglish, data, t } = useLanguage();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="is-spanish">{isSpanish ? "yes" : "no"}</span>
      <span data-testid="is-english">{isEnglish ? "yes" : "no"}</span>
      <span data-testid="heading">{data.profile.title}</span>
      <span data-testid="cta">{t.nav.contact}</span>
      <LanguageToggle />
    </div>
  );
};

describe("LanguageContext & LanguageToggle", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    document.documentElement.lang = "en";
  });

  it("defaults to English when no preference or English browser is detected", () => {
    render(
      <LanguageProvider>
        <ConsumerComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId("locale").textContent).toBe("en");
    expect(screen.getByTestId("is-english").textContent).toBe("yes");
    expect(screen.getByTestId("is-spanish").textContent).toBe("no");
    expect(screen.getByRole("button", { name: /switch to spanish/i })).toBeInTheDocument();
  });

  it("switches to Spanish on clicking LanguageToggle and persists in localStorage", async () => {
    render(
      <LanguageProvider>
        <ConsumerComponent />
      </LanguageProvider>
    );

    const toggleBtn = screen.getByRole("button", { name: /switch to spanish/i });
    expect(toggleBtn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(toggleBtn);
    });

    expect(screen.getByTestId("locale").textContent).toBe("es");
    expect(screen.getByTestId("is-spanish").textContent).toBe("yes");
    expect(screen.getByTestId("is-english").textContent).toBe("no");
    expect(screen.getByTestId("cta").textContent).toBe("Conectemos");
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("portfolio-locale", "es");
    expect(document.documentElement.lang).toBe("es");
  });

  it("updates locale when receiving portfolio:set-language custom event", () => {
    render(
      <LanguageProvider>
        <ConsumerComponent />
      </LanguageProvider>
    );

    act(() => {
      window.dispatchEvent(
        new CustomEvent("portfolio:set-language", { detail: { language: "es" } })
      );
    });

    expect(screen.getByTestId("locale").textContent).toBe("es");
    expect(screen.getByTestId("is-spanish").textContent).toBe("yes");
  });
});
