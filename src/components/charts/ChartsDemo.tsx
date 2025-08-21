"use client";

import React, { useState, useMemo, useCallback } from "react";
import { CHART_TYPES, DEFAULT_CHART_TYPE } from "../../constants/chartTypes";
import { useTheme } from "../../hooks/useTheme";
import { useChartData } from "../../hooks/useChartData";
import { getChartThemeColors } from "../../utils/theme";
import ChartSelector from "../ui/ChartSelector";
import ThemeToggle from "../ui/ThemeToggle";
import ChartContainer from "./ChartContainer";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorMessage from "../ui/ErrorMessage";

const ChartsDemo: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { chartData, loading, error, refetch } = useChartData();
  const [selectedType, setSelectedType] = useState<string>(DEFAULT_CHART_TYPE);

  const handleSelect = useCallback((key: string) => {
    setSelectedType(key);
  }, []);

  // Memoize chart option for performance
  const chartOption = useMemo(() => {
    const selectedData = chartData[selectedType] || {};
    const themeColors = getChartThemeColors(theme);
    
    return {
      ...selectedData,
      backgroundColor: themeColors.backgroundColor,
      textStyle: {
        color: themeColors.textColor,
        ...(selectedData.textStyle || {}),
      },
      xAxis: selectedData.xAxis
        ? Array.isArray(selectedData.xAxis)
          ? selectedData.xAxis.map((x: any) => ({
              ...x,
              axisLine: {
                ...(x.axisLine || {}),
                lineStyle: {
                  color: themeColors.axisLineColor,
                },
              },
              axisLabel: {
                ...(x.axisLabel || {}),
                color: themeColors.axisLabelColor,
              },
            }))
          : {
              ...selectedData.xAxis,
              axisLine: {
                ...(selectedData.xAxis.axisLine || {}),
                lineStyle: {
                  color: themeColors.axisLineColor,
                },
              },
              axisLabel: {
                ...(selectedData.xAxis.axisLabel || {}),
                color: themeColors.axisLabelColor,
              },
            }
        : undefined,
      yAxis: selectedData.yAxis
        ? Array.isArray(selectedData.yAxis)
          ? selectedData.yAxis.map((y: any) => ({
              ...y,
              axisLine: {
                ...(y.axisLine || {}),
                lineStyle: {
                  color: themeColors.axisLineColor,
                },
              },
              axisLabel: {
                ...(y.axisLabel || {}),
                color: themeColors.axisLabelColor,
              },
            }))
          : {
              ...selectedData.yAxis,
              axisLine: {
                ...(selectedData.yAxis.axisLine || {}),
                lineStyle: {
                  color: themeColors.axisLineColor,
                },
              },
              axisLabel: {
                ...(selectedData.yAxis.axisLabel || {}),
                color: themeColors.axisLabelColor,
              },
            }
        : undefined,
      legend: selectedData.legend
        ? {
            ...selectedData.legend,
            textStyle: {
              color: themeColors.textColor,
              ...(selectedData.legend.textStyle || {}),
            },
          }
        : undefined,
    };
  }, [chartData, selectedType, theme]);

  if (loading) {
    return <LoadingSpinner message="Loading chart data..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8">
      <div className="flex flex-wrap gap-3 w-full justify-center sm:justify-start items-center mb-2">
        <ChartSelector
          chartTypes={CHART_TYPES}
          selectedType={selectedType}
          onSelect={handleSelect}
          theme={theme}
        />
        <ThemeToggle
          theme={theme}
          onToggle={toggleTheme}
          className="ml-auto"
        />
      </div>
      
      <div className="w-full flex justify-center items-center">
        <ChartContainer
          option={chartOption}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default ChartsDemo;
