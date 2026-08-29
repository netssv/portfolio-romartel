"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Locale, SiteData, UiTranslations, dictionaries } from "@/src/data/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  data: SiteData;
  t: UiTranslations;
  isSpanish: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio-locale";

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") {
      return saved;
    }

    const browserLang = (navigator.language || (navigator.languages && navigator.languages[0]) || "").toLowerCase();
    if (browserLang.startsWith("es")) {
      return "es";
    }
  } catch {
    // Fallback if localStorage or navigator is unavailable
  }

  return "en";
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initial = detectInitialLocale();
    setLocaleState(initial);
    setIsInitialized(true);
    document.documentElement.lang = initial;

    const handleLanguageEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ language?: string }>;
      const lang = customEvent.detail?.language;
      if (lang === "es" || lang === "en") {
        setLocale(lang);
      }
    };

    window.addEventListener("portfolio:set-language", handleLanguageEvent);
    return () => window.removeEventListener("portfolio:set-language", handleLanguageEvent);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore localStorage write failures in private browsing
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "es" : "en");
  };

  const value = useMemo(() => {
    const activeDict = dictionaries[locale] || dictionaries.en;
    return {
      locale,
      setLocale,
      toggleLocale,
      data: activeDict.data,
      t: activeDict.ui,
      isSpanish: locale === "es",
      isEnglish: locale === "en",
    };
  }, [locale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback for components rendered outside provider (or in isolated unit tests)
    const fallback = dictionaries.en;
    return {
      locale: "en",
      setLocale: () => {},
      toggleLocale: () => {},
      data: fallback.data,
      t: fallback.ui,
      isSpanish: false,
      isEnglish: true,
    };
  }
  return context;
}
