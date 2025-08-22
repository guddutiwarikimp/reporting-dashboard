"use client";

import React from "react";
import { Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  TIME_PERIODS,
  TIME_PERIOD_LABELS,
  COMPARISON_PERIOD_LABELS,
} from "@/constants/agentActivity";

interface ChartControlsProps {
  selectedMetric: string;
  selectedSecondMetric: string;
  timePeriod: string;
  compareToPrevious: boolean;
  metrics: ReadonlyArray<{ readonly name: string; readonly tooltip: string }>;
  secondMetrics: ReadonlyArray<{ readonly name: string; readonly tooltip: string }>;
  onMetricChange: (metric: string) => void;
  onSecondMetricChange: (metric: string) => void;
  onTimePeriodChange: (period: string) => void;
  onComparisonToggle: (enabled: boolean) => void;
}

export default function ChartControls({
  selectedMetric,
  selectedSecondMetric,
  timePeriod,
  compareToPrevious,
  metrics,
  secondMetrics,
  onMetricChange,
  onSecondMetricChange,
  onTimePeriodChange,
  onComparisonToggle,
}: ChartControlsProps) {
  // Menu items for the time period dropdown
  const timePeriodMenuItems: MenuProps["items"] = TIME_PERIODS.map((period) => ({
    key: period,
    label: TIME_PERIOD_LABELS[period as keyof typeof TIME_PERIOD_LABELS],
  }));

  // Menu items for the first metric dropdown
  const metricMenuItems: MenuProps["items"] = metrics.map((metric) => ({
    key: metric.name,
    label: metric.name,
  }));

  // Menu items for the second metric dropdown
  const secondMetricMenuItems: MenuProps["items"] = secondMetrics.map((metric) => ({
    key: metric.name,
    label: metric.name,
  }));

  const handleMetricSelect: MenuProps["onClick"] = ({ key }) => {
    onMetricChange(key);
  };

  const handleSecondMetricSelect: MenuProps["onClick"] = ({ key }) => {
    onSecondMetricChange(key);
  };

  const handleTimePeriodSelect: MenuProps["onClick"] = ({ key }) => {
    onTimePeriodChange(key);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      {/* Metric Selection */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Dropdown
            menu={{
              items: metricMenuItems,
              onClick: handleMetricSelect,
            }}
            trigger={["click"]}
          >
            <Button className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs hover:bg-gray-50 dark:hover:bg-gray-700">
              <Space>
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-xs">{selectedMetric}</span>
                <DownOutlined className="text-xs" />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">vs</span>
        <div className="flex items-center gap-2">
          <Dropdown
            menu={{
              items: secondMetricMenuItems,
              onClick: handleSecondMetricSelect,
            }}
            trigger={["click"]}
          >
            <Button className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs hover:bg-gray-50 dark:hover:bg-gray-700">
              <Space>
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span className="text-xs">{selectedSecondMetric}</span>
                <DownOutlined className="text-xs" />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Time Period */}
      <div className="flex items-center gap-2">
        <Dropdown
          menu={{
            items: timePeriodMenuItems,
            onClick: handleTimePeriodSelect,
          }}
          trigger={["click"]}
        >
          <Button className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs hover:bg-gray-50 dark:hover:bg-gray-700">
            <Space>
              <span className="text-xs">
                {TIME_PERIOD_LABELS[timePeriod as keyof typeof TIME_PERIOD_LABELS]}
              </span>
              <DownOutlined className="text-xs" />
            </Space>
          </Button>
        </Dropdown>
      </div>

      {/* Comparison Toggle */}
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={compareToPrevious}
            onChange={(e) => onComparisonToggle(e.target.checked)}
            className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="text-xs">Compare to previous period:</span>
        </label>
        {compareToPrevious && (
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {COMPARISON_PERIOD_LABELS[timePeriod as keyof typeof COMPARISON_PERIOD_LABELS]}
          </span>
        )}
      </div>
    </div>
  );
}
