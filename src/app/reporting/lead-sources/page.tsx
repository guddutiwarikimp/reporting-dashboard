"use client";

import React from "react";
import {
  ReportingLayout,
  QuerySelector,
  RefreshSection,
  ChartControls,
  LeadSourceChart,
  LeadSourceMetricCards,
  LeadSourceTable,
} from "@/components/reporting";
import { useLeadSources, useChartState } from "@/hooks";
import { useTheme } from "@/hooks/useTheme";
import { LEAD_SOURCE_QUERIES, LEAD_SOURCE_METRICS, LEAD_SOURCE_SECOND_METRICS } from "@/constants/leadSources";

export default function LeadSourcesPage() {
  const {
    selectedQuery,
    isRefreshing,
    lastRefreshed,
    handleQueryChange,
    handleRefresh,
  } = useLeadSources();

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
          queries={LEAD_SOURCE_QUERIES}
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
          metrics={LEAD_SOURCE_METRICS}
          secondMetrics={LEAD_SOURCE_SECOND_METRICS}
          onMetricChange={setSelectedMetric}
          onSecondMetricChange={setSelectedSecondMetric}
          onTimePeriodChange={setTimePeriod}
          onComparisonToggle={setCompareToPrevious}
        />

        {/* Chart */}
        <LeadSourceChart
          selectedMetric={selectedMetric}
          selectedSecondMetric={selectedSecondMetric}
          timePeriod={timePeriod}
          compareToPrevious={compareToPrevious}
          theme={theme}
          selectedQuery={selectedQuery}
        />
      </div>
      {/* Metric Cards */}
      <LeadSourceMetricCards
        theme={theme}
        timePeriod={timePeriod}
        onMetricSelect={setSelectedMetric}
        selectedMetric={selectedMetric}
        selectedQuery={selectedQuery}
      />
      
      {/* Lead Source Table */}
      <LeadSourceTable
        selectedQuery={selectedQuery}
        theme={theme}
      />
    </ReportingLayout>
  );
}
