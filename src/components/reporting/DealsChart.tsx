import React, { useMemo } from "react";
import { DEALS_SUMMARY_STATS } from "../../constants/deals";
import { generateDealsChartData } from "@/utils/dealsChartDataGenerator";
import { generateDealsChartOptions } from "@/utils/dealsChartOptionsGenerator";
import dynamic from "next/dynamic";
import type { Theme } from "@/types/chart";

// Dynamically import ECharts to avoid SSR issues
const EChartsComponent = dynamic(
  () => import("@/components/charts/EChartsComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
    ),
  }
);

interface DealsChartProps {
  selectedStages: string[];
  selectedMetric: string;
  selectedSecondMetric: string;
  timePeriod: string;
  theme: Theme | undefined;
}

const DealsChart = ({
  selectedStages,
  selectedMetric,
  selectedSecondMetric,
  timePeriod,
  theme,
}: DealsChartProps) => {
  // Generate dynamic chart data based on selected pipeline stages and metrics
  const chartData = useMemo(() => {
    return generateDealsChartData(
      selectedStages,
      selectedMetric,
      selectedSecondMetric,
      timePeriod
    );
  }, [selectedStages, selectedMetric, selectedSecondMetric, timePeriod]);

  // Generate chart options
  const chartOptions = useMemo(() => {
    return generateDealsChartOptions(
      chartData,
      theme === "dark" ? "dark" : "light",
      selectedMetric,
      selectedSecondMetric,
      timePeriod
    );
  }, [chartData, theme, selectedMetric, selectedSecondMetric, timePeriod]);

  return (
      <EChartsComponent
        option={chartOptions}
        style={{ minHeight: "300px", width: "100%" }}
        theme={theme}
      />
  );
};

export default DealsChart;
