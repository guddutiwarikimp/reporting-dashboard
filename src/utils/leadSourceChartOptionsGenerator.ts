import * as echarts from "echarts";
import { ChartData } from "./chartDataGenerator";
import { CHART_COLORS } from "../constants/agentActivity";

// Generates ECharts configuration options for the lead source dashboard
export const generateChartOptions = (
  chartData: ChartData,
  theme: string,
  selectedMetric: string,
  selectedSecondMetric: string,
  compareToPrevious: boolean,
  selectedQuery?: string,
  timePeriod?: string
): echarts.EChartsOption => {
  const series = generateChartSeries(chartData, selectedMetric, selectedSecondMetric, compareToPrevious);
  const yAxisConfig = generateYAxisConfig(selectedMetric, selectedSecondMetric, theme);
  const xAxisConfig = generateXAxisConfig(chartData, compareToPrevious, theme);
  const titleConfig = generateTitleConfig(selectedQuery, compareToPrevious, timePeriod, theme);
  const tooltipConfig = generateTooltipConfig(theme, compareToPrevious, chartData);

  return {
    title: titleConfig,
    tooltip: tooltipConfig,
    legend: generateLegendConfig(series, theme),
    grid: generateGridConfig(),
    xAxis: xAxisConfig,
    yAxis: yAxisConfig,
    series: series,
  };
};

// Generates chart series configuration for metrics and comparison data
const generateChartSeries = (
  chartData: ChartData,
  selectedMetric: string,
  selectedSecondMetric: string,
  compareToPrevious: boolean
): echarts.SeriesOption[] => {
  const series: echarts.SeriesOption[] = [];
  
  // First metric series
  const firstMetricSeries = createMetricSeries(
    selectedMetric,
    chartData.firstMetric.data,
    0,
    CHART_COLORS.primary,
    CHART_COLORS.primaryLight,
    CHART_COLORS.primaryLighter
  );
  
  // Handle comparison data for first metric
  if (compareToPrevious && chartData.firstMetric.comparisonData) {
    firstMetricSeries.data = chartData.firstMetric.comparisonData;
    firstMetricSeries.name = `${selectedMetric} (Previous Period)`;
    firstMetricSeries.lineStyle = { ...firstMetricSeries.lineStyle, type: "dashed", width: 2 };
    firstMetricSeries.symbolSize = 6;
    firstMetricSeries.areaStyle = undefined;
  }
  
  series.push(firstMetricSeries);

  // Second metric series (if selected)
  if (chartData.secondMetric) {
    const secondMetricSeries = createMetricSeries(
      selectedSecondMetric,
      chartData.secondMetric.data,
      1,
      CHART_COLORS.secondary
    );

    if (compareToPrevious && chartData.secondMetric.comparisonData) {
      secondMetricSeries.data = chartData.secondMetric.comparisonData;
      secondMetricSeries.name = `${selectedSecondMetric} (Previous Period)`;
      secondMetricSeries.lineStyle = { ...secondMetricSeries.lineStyle, type: "dashed", width: 2 };
      secondMetricSeries.symbolSize = 6;
    }

    series.push(secondMetricSeries);
  }

  return series;
};

// Create a metric series with standard configuration
const createMetricSeries = (
  name: string,
  data: number[],
  yAxisIndex: number,
  color: string,
  areaColorLight?: string,
  areaColorLighter?: string
): echarts.LineSeriesOption => {
  const series: echarts.LineSeriesOption = {
    name,
    type: "line",
    yAxisIndex,
    data,
    smooth: true,
    symbol: "circle",
    symbolSize: 8,
    lineStyle: { color, width: 3 },
    itemStyle: { color },
  };

  if (areaColorLight && areaColorLighter) {
    series.areaStyle = {
      color: {
        type: "linear",
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: areaColorLight },
          { offset: 1, color: areaColorLighter },
        ],
      },
    };
  }

  return series;
};

// Generate Y-axis configuration
const generateYAxisConfig = (selectedMetric: string, selectedSecondMetric: string, theme: string) => {
  const firstMetricConfig = {
    name: selectedMetric,
    position: "left" as const,
    type: "value" as const,
    axisLabel: {
      color: theme === "dark" ? "#ffffff" : "#374151",
      formatter: selectedMetric.includes("%") ? "{value}%" : "{value}",
    },
    axisLine: { lineStyle: { color: CHART_COLORS.primary } },
    splitLine: {
      lineStyle: { color: theme === "dark" ? "#4b5563" : "#e5e7eb" },
    },
  };

  if (!selectedSecondMetric || selectedSecondMetric === "Nothing") {
    return [firstMetricConfig];
  }

  const secondMetricConfig = {
    name: selectedSecondMetric,
    position: "right" as const,
    type: "value" as const,
    min: selectedSecondMetric.includes("%") ? 0 : undefined,
    max: selectedSecondMetric.includes("%") ? 100 : undefined,
    axisLabel: {
      color: theme === "dark" ? "#ffffff" : "#374151",
      formatter: selectedSecondMetric.includes("%") ? "{value}%" : "{value}",
    },
    axisLine: { lineStyle: { color: CHART_COLORS.secondary } },
    splitLine: { show: false },
  };

  return [firstMetricConfig, secondMetricConfig];
};

// Generate X-axis configuration
const generateXAxisConfig = (chartData: ChartData, compareToPrevious: boolean, theme: string) => {
  const xAxisData = compareToPrevious && chartData.comparisonData?.firstMetric
    ? chartData.comparisonData.firstMetric.map((d) => d.label)
    : chartData.labels;

  return {
    type: "category" as const,
    boundaryGap: false,
    data: xAxisData,
    axisLabel: {
      color: theme === "dark" ? "#ffffff" : "#374151",
      formatter: (value: string, index: number) => formatXAxisLabel(value, index, chartData.labels.length),
      interval: 0,
      rotate: chartData.labels.length > 8 ? 45 : 0,
      fontSize: 11
    },
    axisLine: {
      lineStyle: { color: theme === "dark" ? "#4b5563" : "#d1d5db" },
    },
  };
};

// Format X-axis labels for better readability
const formatXAxisLabel = (value: string, index: number, totalLabels: number): string => {
  // For daily data (YYYY-MM-DD format)
  if (value.includes("-") && value.length === 10) {
    if (index % 3 === 0) {
      const date = new Date(value);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return '';
  }
  
  // For monthly data
  if (value.includes("Jan") || value.includes("Feb") || value.includes("Mar") || 
      value.includes("Apr") || value.includes("May") || value.includes("Jun") || 
      value.includes("Jul") || value.includes("Aug")) {
    return value;
  }
  
  // For other time periods
  if (totalLabels <= 12) {
    return value;
  }
  
  return index % 3 === 0 ? value : '';
};

// Generate title configuration
const generateTitleConfig = (selectedQuery?: string, compareToPrevious?: boolean, timePeriod?: string, theme?: string) => {
  let titleText = "Lead Source Performance Dashboard";
  let subtitleText: string | undefined;

  if (selectedQuery === "Total lead count and total activity by source") {
    if (compareToPrevious) {
      titleText = "Previous Period Lead Source Performance";
      subtitleText = "Showing previous period data for comparison";
    } else if (timePeriod === "daily") {
      titleText = "Lead Source Performance - August 2025 (Daily View)";
      subtitleText = "Daily performance for August 2025 - hover to see lead source metrics";
    } else {
      titleText = "Lead Source Performance Over Time";
      subtitleText = "Shows monthly performance trends - hover to see lead source data";
    }
  } else if (selectedQuery === "How many leads have we not acted on by source") {
    titleText = "Unacted Leads by Source";
    subtitleText = "Tracking leads that haven't been contacted yet";
  } else if (selectedQuery === "How quickly we follow up on leads per source") {
    titleText = "Follow-up Speed by Source";
    subtitleText = "Response time and follow-up efficiency";
  } else if (selectedQuery === "How many times we try to contact each lead per source") {
    titleText = "Contact Attempts by Source";
    subtitleText = "Number of attempts to reach leads";
  } else if (selectedQuery === "What source has the most lead responses") {
    titleText = "Lead Response Rate by Source";
    subtitleText = "Which sources generate the most responses";
  } else if (selectedQuery === "Which source has the most closed deals") {
    titleText = "Deal Conversion by Source";
    subtitleText = "Which sources convert to closed deals";
  }

  return {
    text: titleText,
    left: "center" as const,
    textStyle: {
      color: theme === "dark" ? "#ffffff" : "#374151",
      fontSize: 16,
      fontWeight: "bold" as const,
    },
    subtext: subtitleText,
    subtextStyle: {
      color: theme === "dark" ? "#9ca3af" : "#6b7280",
      fontSize: 12,
    },
  };
};

// Generate tooltip configuration
const generateTooltipConfig = (theme: string, compareToPrevious: boolean, chartData: ChartData) => ({
  trigger: "axis" as const,
  axisPointer: { type: "cross" as const },
  formatter: function (params: any) {
    const period = params[0].axisValue;
    let tooltipContent = `<div style="padding: 8px;"><div style="font-weight: bold; margin-bottom: 8px;">${period}</div>`;
    
    // Add lead source context based on data type
    tooltipContent += generateLeadSourceContext(period);
    
    // If comparing to previous, show both current and previous period data
    if (compareToPrevious && chartData.comparisonData) {
      tooltipContent += generateComparisonTooltip(period, chartData);
    } else {
      // Add metric values for current data only
      params.forEach((param: any) => {
        if (param.value !== null && param.value !== undefined) {
          tooltipContent += formatMetricValue(param);
        }
      });
    }
    
    tooltipContent += "</div>";
    return tooltipContent;
  },
});

// Generate lead source context for tooltip (no top performer info)
const generateLeadSourceContext = (period: string): string => {
  // Monthly performance context
  if (period.includes("2025")) {
    return `<div style="margin-bottom: 8px; font-size: 11px; color: #6b7280;">Lead source performance for ${period}</div>`;
  }
  
  // Daily performance context
  if (period.includes("-") && period.length === 10) {
    const date = new Date(period);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    
    return `<div style="margin-bottom: 8px; font-size: 11px; color: #6b7280;">Lead source performance for ${dayOfWeek}, ${monthDay}</div>`;
  }
  
  return '';
};

// Get previous period label (e.g., "May 2024" for "May 2025")
const getPreviousPeriodLabel = (currentPeriodLabel: string): string => {
  if (currentPeriodLabel.includes("2025")) {
    return currentPeriodLabel.replace("2025", "2024");
  }
  return currentPeriodLabel;
};

// Format metric value for tooltip
const formatMetricValue = (param: any): string => {
  const color = param.color;
  const name = param.seriesName;
  const value = param.value;
  const isPercentage = name.includes("%");
  const displayValue = isPercentage ? `${value}%` : value.toLocaleString();
  
  return `
    <div style="display: flex; align-items: center; margin-bottom: 4px;">
      <span style="display: inline-block; width: 12px; height: 12px; background: ${color}; margin-right: 8px; border-radius: 2px;"></span>
      <span>${name}: <strong>${displayValue}</strong></span>
    </div>
  `;
};

// Generate comparison tooltip showing both current and previous period data
const generateComparisonTooltip = (period: string, chartData: ChartData): string => {
  let tooltipContent = '';
  
  // Find the current period data
  const currentPeriodIndex = chartData.labels.findIndex(label => label === period);
  if (currentPeriodIndex === -1) return '';
  
  // Get current period data
  const currentFirstMetricValue = chartData.firstMetric.data[currentPeriodIndex];
  const currentSecondMetricValue = chartData.secondMetric?.data[currentPeriodIndex];
  
  // Get previous period data (comparison data)
  const previousFirstMetricValue = chartData.firstMetric.comparisonData?.[currentPeriodIndex];
  const previousSecondMetricValue = chartData.secondMetric?.comparisonData?.[currentPeriodIndex];
  
  // Add current period data
  tooltipContent += `<div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #e5e7eb;">`;
  tooltipContent += `<div style="font-weight: bold; color: #374151; margin-bottom: 8px;">${period}</div>`;
  
  if (currentFirstMetricValue !== undefined) {
    const isPercentage = chartData.firstMetric.name.includes("%");
    const displayValue = isPercentage ? `${currentFirstMetricValue}%` : currentFirstMetricValue.toLocaleString();
    tooltipContent += `
      <div style="display: flex; align-items: center; margin-bottom: 4px;">
        <span style="display: inline-block; width: 12px; height: 12px; background: #3b82f6; margin-right: 8px; border-radius: 2px;"></span>
        <span>${chartData.firstMetric.name} (Current Period): <strong>${displayValue}</strong></span>
      </div>
    `;
  }
  
  if (currentSecondMetricValue !== undefined && chartData.secondMetric) {
    const isPercentage = chartData.secondMetric.name.includes("%");
    const displayValue = isPercentage ? `${currentSecondMetricValue}%` : currentSecondMetricValue.toLocaleString();
    tooltipContent += `
      <div style="display: flex; align-items: center; margin-bottom: 4px;">
        <span style="display: inline-block; width: 12px; height: 12px; background: #f59e0b; margin-right: 8px; border-radius: 2px;"></span>
        <span>${chartData.secondMetric.name} (Current Period): <strong>${displayValue}</strong></span>
      </div>
    `;
  }
  
  // Add previous period data
  tooltipContent += `<div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #e5e7eb;">`;
  tooltipContent += `<div style="font-weight: bold; color: #374151; margin-bottom: 8px;">${getPreviousPeriodLabel(period)}</div>`;
  
  if (previousFirstMetricValue !== undefined) {
    const isPercentage = chartData.firstMetric.name.includes("%");
    const displayValue = isPercentage ? `${previousFirstMetricValue}%` : previousFirstMetricValue.toLocaleString();
    tooltipContent += `
      <div style="display: flex; align-items: center; margin-bottom: 4px;">
        <span style="display: inline-block; width: 12px; height: 12px; background: #3b82f6; margin-right: 8px; border-radius: 2px; border: 2px dashed #3b82f6;"></span>
        <span>${chartData.firstMetric.name} (Previous Period): <strong>${displayValue}</strong></span>
      </div>
    `;
  }
  
  if (previousSecondMetricValue !== undefined && chartData.secondMetric) {
    const isPercentage = chartData.secondMetric.name.includes("%");
    const displayValue = isPercentage ? `${previousSecondMetricValue}%` : previousSecondMetricValue.toLocaleString();
    tooltipContent += `
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <span style="display: inline-block; width: 12px; height: 12px; background: #f59e0b; margin-right: 8px; border-radius: 2px; border: 2px dashed #f59e0b;"></span>
        <span>${chartData.secondMetric.name} (Previous Period): <strong>${displayValue}</strong></span>
      </div>
    `;
  }
  
  tooltipContent += '</div>';
  return tooltipContent;
};

// Generate legend configuration
const generateLegendConfig = (series: echarts.SeriesOption[], theme: string) => ({
  data: series.map((s) => (s as any).name),
  bottom: 10,
  textStyle: {
    color: theme === "dark" ? "#ffffff" : "#374151",
    fontSize: 12,
  },
});

// Generate grid configuration
const generateGridConfig = () => ({
  left: "3%",
  right: "4%",
  bottom: "15%",
  top: "15%",
  containLabel: true,
});
