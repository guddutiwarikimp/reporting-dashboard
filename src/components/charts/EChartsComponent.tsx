"use client";
import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import { Theme } from "../../types/chart";

interface EChartsProps {
  option: echarts.EChartsOption;
  style?: React.CSSProperties;
  theme?: Theme;
}

const EChartsComponent: React.FC<EChartsProps> = ({
  option,
  style,
  theme = "light",
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Dispose previous instance if exists
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
      chartInstance.current = echarts.init(chartRef.current, theme);
      chartInstance.current.setOption(option);
    }
    return () => {
      chartInstance.current?.dispose();
    };
  }, [option, theme]);

  return <div ref={chartRef} style={{minHeight: "50px", ...style }} />;
};

export default EChartsComponent;
