"use client";

import React, { useMemo } from "react";
import EChartsComponent from "@/components/charts/EChartsComponent";
import { generateChartData } from "@/utils/leadSourceChartDataGenerator";
import { generateChartOptions } from "@/utils/leadSourceChartOptionsGenerator";
import type { Theme } from "@/types/chart";

interface LeadSourceChartProps {
  selectedMetric: string;
  selectedSecondMetric: string;
  timePeriod: string;
  compareToPrevious: boolean;
  theme: Theme | undefined;
  selectedQuery: string;
}

export default function LeadSourceChart({
  selectedMetric,
  selectedSecondMetric,
  timePeriod,
  compareToPrevious,
  theme,
  selectedQuery,
}: LeadSourceChartProps) {
  // Generate chart data based on selected states
  const chartData = useMemo(() => {
    return generateChartData(
      selectedMetric,
      selectedSecondMetric,
      timePeriod,
      compareToPrevious,
      selectedQuery
    );
  }, [
    selectedMetric,
    selectedSecondMetric,
    timePeriod,
    compareToPrevious,
    selectedQuery,
  ]);

  // Generate chart options
  const chartOption = useMemo(() => {
    return generateChartOptions(
      chartData,
      theme === "dark" ? "dark" : "light",
      selectedMetric,
      selectedSecondMetric,
      compareToPrevious,
      selectedQuery,
      timePeriod
    );
  }, [
    chartData,
    theme,
    selectedMetric,
    selectedSecondMetric,
    compareToPrevious,
    selectedQuery,
    timePeriod,
  ]);

  return (
    <div className="w-full">
      <EChartsComponent
        option={chartOption}
        style={{ minHeight: "300px", width: "100%" }}
        theme={theme}
      />
    </div>
  );
}
