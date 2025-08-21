import React from "react";
import { ChartType } from "../../types/chart";
import { THEME_COLORS } from "../../constants/theme";

interface ChartSelectorProps {
  chartTypes: ChartType[];
  selectedType: string;
  onSelect: (key: string) => void;
  theme: "dark" | "light";
  className?: string;
}

const ChartSelector: React.FC<ChartSelectorProps> = ({
  chartTypes,
  selectedType,
  onSelect,
  theme,
  className = "",
}) => {
  const isDark = theme === "dark";
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <label htmlFor="chartTypeSelect" className="mr-2 font-medium text-base">
        Select Chart Type:
      </label>
      <select
        id="chartTypeSelect"
        value={selectedType}
        onChange={(e) => onSelect(e.target.value)}
        className={`px-4 py-2 rounded-lg font-medium border shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
          isDark
            ? "bg-[#232329] text-gray-200 border-[#232329] hover:bg-[#18181b]"
            : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
        }`}
        style={{ minWidth: 220, maxWidth: 320 }}
      >
        {chartTypes.map((type) => (
          <option
            key={type.key}
            value={type.key}
            className={
              isDark
                ? "bg-[#232329] text-gray-200"
                : "bg-gray-200 text-gray-800"
            }
          >
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChartSelector;
