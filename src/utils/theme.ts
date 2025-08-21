import { Theme } from "../types/chart";
import { THEME_COLORS } from "../constants/theme";

export const detectSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  
  return window.matchMedia && 
         window.matchMedia("(prefers-color-scheme: dark)").matches 
    ? "dark" 
    : "light";
};

export const applyThemeToDocument = (theme: Theme): void => {
  if (typeof document === "undefined") return;
  
  document.documentElement.setAttribute("data-theme", theme);
  document.body.style.background = THEME_COLORS[theme].background;
  document.body.style.color = THEME_COLORS[theme].text;
};

export const getChartThemeColors = (theme: Theme) => {
  return {
    backgroundColor: THEME_COLORS[theme].surface,
    textColor: THEME_COLORS[theme].text,
    axisLineColor: THEME_COLORS[theme].text,
    axisLabelColor: THEME_COLORS[theme].text,
  };
};
