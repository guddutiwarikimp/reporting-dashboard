"use client";

import React, { useState } from "react";
import * as echarts from "echarts";
import EChartsComponent from "@/components/charts/EChartsComponent";
import type { Theme } from "@/types/chart";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { AGENT_ACTIVITY_METRICS, METRIC_BASE_VALUES, getMetricTooltip, CHART_COLORS } from "../../constants/agentActivity";

interface MetricCardProps {
  title: string;
  value: string;
  chartOption: echarts.EChartsOption;
  theme: Theme | undefined;
  tooltip: string;
  isSelected: boolean;
  onSelect: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, chartOption, theme, tooltip, isSelected, onSelect }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const closeTooltip = () => {
    setShowTooltip(false);
  };

  // Close tooltip when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showTooltip && !(event.target as Element).closest('.tooltip-container')) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTooltip]);

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border transition-all duration-200 relative w-full cursor-pointer hover:shadow-md ${
        isSelected 
          ? 'border-blue-500 dark:border-blue-400 shadow-md ring-2 ring-blue-200 dark:ring-blue-800' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
      onClick={onSelect}
    >
      <div className="p-4">
        <div className="flex items-center justify-between gap-1 mb-2">
          <div className={`text-xs uppercase tracking-wide ${
            isSelected 
              ? 'text-blue-600 dark:text-blue-400 font-semibold' 
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {title}
          </div>
          <div className="relative tooltip-container">
            <QuestionCircleOutlined
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-help text-xs transition-colors duration-200"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={(e) => {
                e.stopPropagation();
                toggleTooltip();
              }}
            />
            <div 
              className={`absolute right-0 top-6 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl p-3 z-50 max-w-xs transform transition-all duration-200 ease-in-out ${
                showTooltip 
                  ? 'opacity-100 scale-100 pointer-events-auto' 
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
              style={{ 
                minWidth: '200px',
                right: '0',
                top: '24px',
                maxWidth: 'calc(100vw - 2rem)'
              }}
            >
              <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                {tooltip}
              </div>
              <div className="absolute -top-2 right-3 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white dark:border-b-gray-700"></div>
            </div>
          </div>
        </div>
        <div className={`text-base font-bold mb-4 ${
          isSelected 
            ? 'text-blue-700 dark:text-blue-300' 
            : 'text-gray-800 dark:text-gray-200'
        }`}>
          {value}
        </div>
        <div className="flex-1 -mx-2 -mb-2">
          <EChartsComponent
            option={chartOption}
            style={{ width: "100%"}}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

interface MetricCardsProps {
  theme: Theme | undefined;
  timePeriod: string;
  onMetricSelect: (metric: string) => void;
  selectedMetric: string;
  selectedQuery: string;
}

export default function MetricCards({ theme, timePeriod, onMetricSelect, selectedMetric, selectedQuery }: MetricCardsProps) {
  // Generate sample data for the trend charts
  const generateTrendData = (trend: "up" | "down" | "flat" | "spike") => {
    const data = [];
    const baseValue = Math.floor(Math.random() * 100) + 50;
    
    for (let i = 0; i < 12; i++) {
      let value = baseValue;
      
      switch (trend) {
        case "up":
          value = baseValue + (i * 2) + Math.random() * 5;
          break;
        case "down":
          value = baseValue - (i * 2) + Math.random() * 5;
          break;
        case "flat":
          value = baseValue + (Math.random() - 0.5) * 10;
          break;
        case "spike":
          if (i === 10) {
            value = baseValue + 30 + Math.random() * 10;
          } else {
            value = baseValue + (Math.random() - 0.5) * 5;
          }
          break;
      }
      
      data.push(Math.max(0, Math.round(value)));
    }
    
    return data;
  };

  // Generate metric cards for ALL AGENT_ACTIVITY_METRICS
  const metrics = AGENT_ACTIVITY_METRICS.map(metric => {
    const metricName = metric.name;
    const baseValue = METRIC_BASE_VALUES[metricName] || 0;
    const tooltip = metric.tooltip;
    
    // Determine trend based on metric type and value
    let trend: "up" | "down" | "flat" | "spike" = "flat";
    if (metricName.includes("Leads") && baseValue > 1000) trend = "up";
    else if (metricName.includes("Calls") || metricName.includes("Emails")) trend = "up";
    else if (metricName.includes("Speed")) trend = "down"; // Lower speed is better
    else if (metricName.includes("%")) trend = "flat";
    
    // Determine color based on metric type
    let color: string = CHART_COLORS.primary;
    if (metricName.includes("Leads")) color = CHART_COLORS.primary;
    else if (metricName.includes("Calls") || metricName.includes("Emails")) color = CHART_COLORS.secondary;
    else color = "#6b7280"; // Gray for other metrics
    
    return {
      title: metricName.toUpperCase().replace(/\s+/g, ' '),
      value: metricName.includes("%") ? `${baseValue}%` : 
             metricName.includes("Value") ? `$${baseValue.toLocaleString()}` :
             baseValue.toLocaleString(),
      trend,
      color,
      tooltip,
      metricName,
    };
  });

  const generateChartOption = (trend: "up" | "down" | "flat" | "spike", color: string): echarts.EChartsOption => {
    const data = generateTrendData(trend);
    const isDark = theme === "dark";
    
    return {
      grid: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
        containLabel: false
      },
      xAxis: {
        type: "category",
        show: false,
        data: Array.from({ length: 12 }, (_, i) => i)
      },
      yAxis: {
        type: "value",
        show: false
      },
      series: [
        {
          data: data,
          type: "line" as const,
          smooth: true,
          symbol: "none",
          lineStyle: {
            color: color,
            width: 2
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: color + "40" // 25% opacity
                },
                {
                  offset: 1,
                  color: color + "10" // 4% opacity
                }
              ]
            }
          }
        }
      ],
      tooltip: {
        show: false
      }
    };
  };

  const handleMetricSelect = (metricName: string) => {
    onMetricSelect(metricName);
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 auto-rows-fr">
        {metrics.map((metric: any, index: number) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            chartOption={generateChartOption(metric.trend, metric.color)}
            theme={theme}
            tooltip={metric.tooltip}
            isSelected={selectedMetric === metric.metricName}
            onSelect={() => handleMetricSelect(metric.metricName)}
          />
        ))}
      </div>
    </div>
  );
}
