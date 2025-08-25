'use client';

import React from "react";
import { ReportingLayout, QuerySelector, RefreshSection, CallMetricCards, CallsAgentTable } from "@/components/reporting";
import { useCalls } from "@/hooks";
import { CALLS_QUERIES } from "@/constants";

export default function CallsPage() {
  const {
    selectedQuery,
    isRefreshing,
    lastRefreshed,
    handleQueryChange,
    handleRefresh,
    callMetrics,
  } = useCalls();

  return (
    <ReportingLayout>
      <div className="mb-2">
        <QuerySelector
          selectedQuery={selectedQuery}
          onQueryChange={handleQueryChange}
          queries={CALLS_QUERIES}
        />
        <RefreshSection
          isRefreshing={isRefreshing}
          lastRefreshed={lastRefreshed}
          onRefresh={handleRefresh}
        />
      </div>
      
      {/* Metric Cards */}
      <CallMetricCards callData={callMetrics} />
      
      {/* Agent Table */}
      <CallsAgentTable />
      
    </ReportingLayout>
  );
}
