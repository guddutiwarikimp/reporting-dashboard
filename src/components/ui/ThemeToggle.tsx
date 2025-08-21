import React from "react";
import { Theme } from "../../types/chart";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = "",
}) => {
  const isDark = theme === "dark";
  
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-lg font-medium border shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
        isDark
          ? "bg-[#232329] text-gray-200 border-[#232329] hover:bg-[#18181b]"
          : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
      } ${className}`}
      style={{ minWidth: 120 }}
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;
