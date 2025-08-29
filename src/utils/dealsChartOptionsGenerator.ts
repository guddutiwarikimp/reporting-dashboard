import type { Theme } from "@/types/chart";
import type { DealsChartData } from "./dealsChartDataGenerator";

export const generateDealsChartOptions = (
  chartData: DealsChartData,
  theme: "light" | "dark",
  selectedMetric: string,
  selectedSecondMetric: string,
  timePeriod: string
) => {
  const isDark = theme === "dark";
  const textColor = isDark ? "#ffffff" : "#000000";
  const axisLineColor = isDark ? "#374151" : "#d1d5db";
  const splitLineColor = isDark ? "#4b5563" : "#e5e7eb";

  const baseOptions = {
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    tooltip: {
      trigger: "axis" as const,
      axisPointer: {
        type: "cross" as const,
      },
    },
    legend: {
      show: false,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category" as const,
      boundaryGap: false,
      data: chartData.labels,
      axisLabel: {
        color: textColor,
        interval: 2,
        rotate: 0,
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: axisLineColor,
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: axisLineColor,
        },
      },
    },
    yAxis: [
      {
        type: "value" as const,
        name: selectedMetric,
        position: "left" as const,
        axisLabel: {
          color: textColor,
          fontSize: 11,
          formatter: (value: number) => {
            if (selectedMetric === "Deals") {
              return value % 2 === 0 ? value.toString() : "";
            } else if (selectedMetric.includes("Commission") || selectedMetric.includes("Price")) {
              if (value >= 1000000) {
                const millions = value / 1000000;
                return millions % 1 === 0 ? `$${millions}M` : "";
              } else if (value >= 1000) {
                const thousands = value / 1000;
                return thousands % 1 === 0 ? `$${thousands}K` : "";
              }
              return `$${value}`;
            }
            return value.toString();
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: splitLineColor,
            type: "solid" as const,
            opacity: 0.3,
          },
        },
      },
      ...(selectedSecondMetric !== "Nothing"
        ? [
            {
              type: "value" as const,
              name: selectedSecondMetric,
              position: "right" as const,
              axisLabel: {
                color: textColor,
                fontSize: 11,
                formatter: (value: number) => {
                  if (value >= 1000000) {
                    const millions = value / 1000000;
                    return millions % 1 === 0 ? `$${millions}M` : "";
                  } else if (value >= 1000) {
                    const thousands = value / 1000;
                    return thousands % 1 === 0 ? `$${thousands}K` : "";
                  }
                  return `$${value}`;
                },
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
            },
          ]
        : []),
    ],
    series: [
      {
        name: selectedMetric,
        type: "line" as const,
        yAxisIndex: 0,
        data: chartData.firstMetric.data,
        symbol: "circle",
        symbolSize: 6,
        itemStyle: {
          color: "#3b82f6",
        },
        lineStyle: {
          color: "#3b82f6",
          width: 2,
        },
        areaStyle: {
          color: {
            type: "linear" as const,
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(59, 130, 246, 0.3)" },
              { offset: 1, color: "rgba(59, 130, 246, 0.1)" },
            ],
          },
        },
      },
      ...(selectedSecondMetric !== "Nothing" && chartData.secondMetric
        ? [
            {
              name: selectedSecondMetric,
              type: "line" as const,
              yAxisIndex: 1,
              data: chartData.secondMetric.data,
              symbol: "circle",
              symbolSize: 6,
              itemStyle: {
                color: "#f97316",
              },
              lineStyle: {
                color: "#f97316",
                width: 2,
              },
            },
          ]
        : []),
    ],
  };

  return baseOptions;
};
