"use client";

import { useEffect, useCallback } from "react";

export interface ShortcutAction {
  key: string;
  description: string;
  action: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutAction[], enabled = true) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Ignore when user is actively typing in form inputs or interactive editables
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.tagName === "SELECT" ||
          (activeElement as HTMLElement).isContentEditable)
      ) {
        return;
      }

      // Ignore if modifier keys are pressed to avoid overriding browser shortcuts (e.g. Ctrl+C, Cmd+R)
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      const pressedKey = event.key.toLowerCase();
      const matched = shortcuts.find(
        (s) => s.key.toLowerCase() === pressedKey
      );

      if (matched) {
        event.preventDefault();
        matched.action();
      }
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
