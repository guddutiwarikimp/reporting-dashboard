"use client";

import React from "react";
import {
  ReportingLayout,
  QuerySelector,
  RefreshSection,
  ChartControls,
  AgentActivityChart,
  MetricCards,
  AgentTable,
} from "@/components/reporting";
import { useAgentActivity, useChartState } from "@/hooks";
import { useTheme } from "@/hooks/useTheme";

export default function AgentActivityPage() {
  const {
    selectedQuery,
    isRefreshing,
    lastRefreshed,
    handleQueryChange,
    handleRefresh,
  } = useAgentActivity();

  const { theme } = useTheme();
  const {
    timePeriod,
    setTimePeriod,
    compareToPrevious,
    setCompareToPrevious,
    selectedMetric,
    setSelectedMetric,
    selectedSecondMetric,
    setSelectedSecondMetric,
  } = useChartState(selectedQuery);

  return (
    <ReportingLayout>
      <div className="mb-2">
        <QuerySelector
          selectedQuery={selectedQuery}
          onQueryChange={handleQueryChange}
        />
        <RefreshSection
          isRefreshing={isRefreshing}
          lastRefreshed={lastRefreshed}
          onRefresh={handleRefresh}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        {/* Chart Controls */}
        <ChartControls
          selectedMetric={selectedMetric}
          selectedSecondMetric={selectedSecondMetric}
          timePeriod={timePeriod}
          compareToPrevious={compareToPrevious}
          onMetricChange={setSelectedMetric}
          onSecondMetricChange={setSelectedSecondMetric}
          onTimePeriodChange={setTimePeriod}
          onComparisonToggle={setCompareToPrevious}
        />

        {/* Chart */}
        <AgentActivityChart
          selectedMetric={selectedMetric}
          selectedSecondMetric={selectedSecondMetric}
          timePeriod={timePeriod}
          compareToPrevious={compareToPrevious}
          theme={theme}
          selectedQuery={selectedQuery}
        />
      </div>
      {/* Metric Cards */}
      <MetricCards
        theme={theme}
        timePeriod={timePeriod}
        onMetricSelect={setSelectedMetric}
        selectedMetric={selectedMetric}
        selectedQuery={selectedQuery}
      />
      
      {/* Agent Table */}
      <AgentTable
        selectedQuery={selectedQuery}
        theme={theme}
      />
    </ReportingLayout>
  );
}
