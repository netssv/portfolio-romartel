"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ThemeMode = "day" | "night";

interface DesignContextValue {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
}

const DesignContext = createContext<DesignContextValue>({
  theme: "night",
  setTheme: () => {},
});

export const DesignProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("theme-override");
      if (saved === "day" || saved === "night") {
        return saved as ThemeMode;
      }
    }
    return "night";
  });

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme-override", t);
      if (t === "night") {
        document.documentElement.classList.add("theme-dark");
      } else {
        document.documentElement.classList.remove("theme-dark");
      }
    }
  };

  return (
    <DesignContext.Provider value={{ theme, setTheme }}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => useContext(DesignContext);
