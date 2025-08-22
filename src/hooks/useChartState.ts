import { useState, useMemo } from "react";
import { AGENT_ACTIVITY_QUERIES } from "@/constants/reporting";
import { LEAD_SOURCE_QUERIES } from "@/constants/leadSources";

export const useChartState = (selectedQuery: string) => {
  const [timePeriod, setTimePeriod] = useState("monthly");
  const [compareToPrevious, setCompareToPrevious] = useState(false);
  
  // Get default metrics based on selected query
  const defaultMetrics = useMemo(() => {
    // Check if this is a lead source query
    if (LEAD_SOURCE_QUERIES.includes(selectedQuery as any)) {
      switch (selectedQuery) {
        case "Total lead count and total activity by source":
          return {
            selectedMetric: "New Leads",
            selectedSecondMetric: "Nothing"
          };
        case "How many leads have we not acted on by source":
          return {
            selectedMetric: "New Leads",
            selectedSecondMetric: "Nothing"
          };
        case "How quickly we follow up on leads per source":
          return {
            selectedMetric: "Calls",
            selectedSecondMetric: "Nothing"
          };
        case "How many times we try to contact each lead per source":
          return {
            selectedMetric: "Calls",
            selectedSecondMetric: "Nothing"
          };
        case "What source has the most lead responses":
          return {
            selectedMetric: "Calls",
            selectedSecondMetric: "Nothing"
          };
        case "Which source has the most closed deals":
          return {
            selectedMetric: "New Leads",
            selectedSecondMetric: "Nothing"
          };
        default:
          return {
            selectedMetric: "New Leads",
            selectedSecondMetric: "Nothing"
          };
      }
    }
    
    // Agent activity queries
    switch (selectedQuery) {
      case "what team member is getting the most leads to respond":
        return {
          selectedMetric: "New Leads",
          selectedSecondMetric: "% of Leads Responding"
        };
      case "How quickly we follow up on leads":
        return {
          selectedMetric: "New Leads",
          selectedSecondMetric: "Calls"
        };
      case "How many times we try to contact each lead":
        return {
          selectedMetric: "Initially Assigned Leads",
          selectedSecondMetric: "Calls"
        };
      case "which team member has the best response time":
        return {
          selectedMetric: "New Leads",
          selectedSecondMetric: "Emails"
        };
      case "Total lead count and total agent activity":
        return {
          selectedMetric: "New Leads",
          selectedSecondMetric: "Tasks Completed"
        };
      case "How many leads have we not acted on":
        return {
          selectedMetric: "New Leads",
          selectedSecondMetric: "Initially Assigned Leads"
        };
      default:
        return {
          selectedMetric: "New Leads",
          selectedSecondMetric: "% of Leads Responding"
        };
    }
  }, [selectedQuery]);

  // Use state for metrics so they can be changed manually
  const [selectedMetric, setSelectedMetric] = useState(defaultMetrics.selectedMetric);
  const [selectedSecondMetric, setSelectedSecondMetric] = useState(defaultMetrics.selectedSecondMetric);

  // Update metrics when query changes
  useMemo(() => {
    setSelectedMetric(defaultMetrics.selectedMetric);
    setSelectedSecondMetric(defaultMetrics.selectedSecondMetric);
  }, [defaultMetrics.selectedMetric, defaultMetrics.selectedSecondMetric]);

  return {
    timePeriod,
    setTimePeriod,
    compareToPrevious,
    setCompareToPrevious,
    selectedMetric,
    setSelectedMetric,
    selectedSecondMetric,
    setSelectedSecondMetric,
  };
};
