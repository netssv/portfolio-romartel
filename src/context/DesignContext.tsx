"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type DesignTheme = "editorial" | "pcb";

interface DesignContextValue {
  design: DesignTheme;
  setDesign: (d: DesignTheme) => void;
}

const DesignContext = createContext<DesignContextValue>({
  design: "editorial",
  setDesign: () => {},
});

export const DesignProvider = ({ children }: { children: ReactNode }) => {
  const [design, setDesignState] = useState<DesignTheme>(() => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("design-theme");
      if (saved === "editorial" || saved === "pcb") {
        return saved as DesignTheme;
      }
    }
    return "editorial";
  });

  const setDesign = (d: DesignTheme) => {
    setDesignState(d);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("design-theme", d);
    }
  };

  return (
    <DesignContext.Provider value={{ design, setDesign }}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => useContext(DesignContext);
