import { useState, useEffect, useCallback } from "react";
import { Theme } from "../types/chart";
import { detectSystemTheme, applyThemeToDocument } from "../utils/theme";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const systemTheme = detectSystemTheme();
    setTheme(systemTheme);
  }, []);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setThemeExplicitly = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  return {
    theme,
    toggleTheme,
    setTheme: setThemeExplicitly,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
};
