"use client";

import React from "react";
import { Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  DEALS_TIME_PERIODS,
  DEALS_TIME_PERIOD_LABELS,
  DEALS_METRICS,
  DEALS_SECOND_METRICS,
  DEALS_SUMMARY_STATS,
} from "../../constants/deals";

interface DealsChartControlsProps {
  selectedMetric: string;
  selectedSecondMetric: string;
  timePeriod: string;
  onMetricChange: (metric: string) => void;
  onSecondMetricChange: (metric: string) => void;
  onTimePeriodChange: (period: string) => void;
}

export default function DealsChartControls({
  selectedMetric,
  selectedSecondMetric,
  timePeriod,
  onMetricChange,
  onSecondMetricChange,
  onTimePeriodChange,
}: DealsChartControlsProps) {
  // Menu items for the time period dropdown
  const timePeriodMenuItems: MenuProps["items"] = DEALS_TIME_PERIODS.map(
    (period: string) => ({
      key: period,
      label: DEALS_TIME_PERIOD_LABELS[period as keyof typeof DEALS_TIME_PERIOD_LABELS],
    })
  );

  // Menu items for the first metric dropdown
  const metricMenuItems: MenuProps["items"] = DEALS_METRICS.map((metric: (typeof DEALS_METRICS)[number]) => ({
    key: metric.name,
    label: (
      <div className="flex items-center gap-2">
        {metric.name === "Deals" && (
          <div className="w-3 h-3 bg-blue-500 rounded" />
        )}
        {metric.name === "Commission Total" && (
          <div className="w-3 h-3 bg-blue-500 rounded" />
        )}
        {metric.name === "Price Avg." && (
          <div className="w-3 h-3 bg-green-500 rounded" />
        )}
        {metric.name === "Commission Avg." && (
          <div className="w-3 h-3 bg-purple-500 rounded" />
        )}
        {metric.name}
      </div>
    ),
  }));

  // Menu items for the second metric dropdown
  const secondMetricMenuItems: MenuProps["items"] = DEALS_SECOND_METRICS.map(
    (metric: (typeof DEALS_SECOND_METRICS)[number]) => ({
      key: metric.name,
      label: (
        <div className="flex items-center gap-2">
          {metric.name === "Nothing" && (
            <div className="w-3 h-3 bg-gray-400 rounded" />
          )}
          {metric.name === "Price Total" && (
            <div className="w-3 h-3 bg-orange-500 rounded" />
          )}
          {metric.name === "Commission Total" && (
            <div className="w-3 h-3 bg-blue-500 rounded" />
          )}
          {metric.name === "Price Avg." && (
            <div className="w-3 h-3 bg-green-500 rounded" />
          )}
          {metric.name === "Commission Avg." && (
            <div className="w-3 h-3 bg-purple-500 rounded" />
          )}
          {metric.name}
        </div>
      ),
    })
  );

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
    <div className="flex items-center pl-7 pr-7 gap-8 w-full  bg-white border-gray-100">
      {/* Filter Controls - Left Side */}
      <div className="flex items-center gap-4">
        {/* Metric Selection */}
        <div className="flex items-center gap-3">
          <Dropdown
            menu={{
              items: metricMenuItems,
              onClick: handleMetricSelect,
            }}
            trigger={["click"]}
          >
            <Button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm">
              <Space>
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm">{selectedMetric}</span>
                <DownOutlined className="text-xs" />
              </Space>
            </Button>
          </Dropdown>
          
          <span className="text-sm text-gray-500 dark:text-gray-400">vs</span>
          
          <Dropdown
            menu={{
              items: secondMetricMenuItems,
              onClick: handleSecondMetricSelect,
            }}
            trigger={["click"]}
          >
            <Button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm">
              <Space>
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span className="text-sm">{selectedSecondMetric}</span>
                <DownOutlined className="text-xs" />
              </Space>
            </Button>
          </Dropdown>
        </div>

        {/* Time Period */}
        <Dropdown
          menu={{
            items: timePeriodMenuItems,
            onClick: handleTimePeriodSelect,
          }}
          trigger={["click"]}
        >
          <Button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm">
            <Space>
              <span className="text-sm">
                {DEALS_TIME_PERIOD_LABELS[timePeriod as keyof typeof DEALS_TIME_PERIOD_LABELS]}
              </span>
              <DownOutlined className="text-xs" />
            </Space>
          </Button>
        </Dropdown>
      </div>

      {/* Summary Cards - Right Side */}
      <div className="flex gap-10">
        {/* Closed Deals Card */}
        <div className="text-center">
          <div className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
            Closed Deals ({DEALS_SUMMARY_STATS.closedDeals.count})
          </div>
          <div className="text-teal-600 text-xs mb-1">
            {DEALS_SUMMARY_STATS.closedDeals.total} total (
            {DEALS_SUMMARY_STATS.closedDeals.avg} avg)
          </div>
          <div className="text-blue-500 text-xs">
            {DEALS_SUMMARY_STATS.closedDeals.commission} commission (
            {DEALS_SUMMARY_STATS.closedDeals.commissionAvg} avg)
          </div>
        </div>

        {/* Upcoming Deals Card */}
        <div className="text-center">
          <div className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
            Upcoming Deals ({DEALS_SUMMARY_STATS.upcomingDeals.count})
          </div>
          <div className="text-teal-600 text-xs mb-1">
            {DEALS_SUMMARY_STATS.upcomingDeals.total} total (
            {DEALS_SUMMARY_STATS.upcomingDeals.avg} avg)
          </div>
          <div className="text-blue-500 text-xs">
            {DEALS_SUMMARY_STATS.upcomingDeals.commission} commission (
            {DEALS_SUMMARY_STATS.upcomingDeals.commissionAvg} avg)
          </div>
        </div>
      </div>
    </div>
  );
}
