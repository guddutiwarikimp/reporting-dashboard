"use client"

import React from "react";
import {
  ReportingLayout,
  DealsPipeline,
  DealsChart,
  DealsTable,
  DealsFilter,
  DealsChartControls,
} from "@/components/reporting";
import { DealsProvider, useDealsContext } from "../../../contexts/DealsContext";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function DealsPageContent() {
  const { state, actions } = useDealsContext();
  const { theme } = useTheme();

  return (
    <ReportingLayout>
      {/* Header Section with Title and Filters */}
      <div className="flex items-center flex-wrap gap-2 sm:justify-between justify-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deals Report</h1>
        <div className="flex items-center gap-2">
          <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 hover:bg-blue-700 border-blue-600">
            Add Deal
          </Button>
          <DealsFilter />
        </div>
      </div>

      {/* Deal Pipeline Section */}
      <DealsPipeline 
        pipelineStages={state.pipelineStages}
        selectedStages={state.selectedStages}
        onStageToggle={actions.toggleStage}
      />
      
      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow pt-4 pb-4 mb-6">
        {/* Chart Controls */}
        <DealsChartControls
          selectedMetric={state.selectedMetric}
          selectedSecondMetric={state.selectedSecondMetric}
          timePeriod={state.timePeriod}
          onMetricChange={actions.setSelectedMetric}
          onSecondMetricChange={actions.setSecondMetric}
          onTimePeriodChange={actions.setTimePeriod}
        />

        {/* Chart */}
        <DealsChart
          selectedStages={state.selectedStages}
          selectedMetric={state.selectedMetric}
          selectedSecondMetric={state.selectedSecondMetric}
          timePeriod={state.timePeriod}
          theme={theme}
        />
      </div>
      
      {/* Deals Table */}
      <DealsTable />
    </ReportingLayout>
  );
}

export default function DealsPage() {
  return (
    <DealsProvider>
      <DealsPageContent />
    </DealsProvider>
  );
}
