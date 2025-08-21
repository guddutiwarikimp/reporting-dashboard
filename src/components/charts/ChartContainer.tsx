import React from "react";
import { Theme } from "../../types/chart";
import { THEME_COLORS } from "../../constants/theme";
import EChartsComponent from "./EChartsComponent";

interface ChartContainerProps {
  option: any;
  theme: Theme;
  className?: string;
  style?: React.CSSProperties;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  option,
  theme,
  className = "",
  style = {},
}) => {
  const isDark = theme === "dark";
  
  return (
    <div 
      className={`w-full max-w-2xl h-[350px] sm:h-[400px] rounded-xl shadow-lg flex items-center justify-center p-2 sm:p-4 border ${
        isDark 
          ? "bg-[#18181b] border-[#232329]" 
          : "bg-white border-gray-200"
      } ${className}`}
      style={style}
    >
      <EChartsComponent
        option={option}
        style={{ width: "100%", height: "100%" }}
        theme={theme}
      />
    </div>
  );
};

export default ChartContainer;
