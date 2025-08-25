import { LEAD_SOURCE_METRIC_BASE_VALUES } from "../constants/leadSources";
import { LEAD_SOURCE_QUERIES } from "@/constants/leadSources";

// Constants for lead source data generation
const LEAD_SOURCES = ["Website", "Social Media", "Referrals", "Cold Outreach", "Google Ads", "Facebook Ads", "LinkedIn", "Email Marketing"] as const;
const MONTHS_2025 = ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025"] as const;
const CURRENT_MONTH = 7; // August (0-indexed)
const PERFORMANCE_VARIANCE = 0.2; // Random variance factor

export interface ChartDataPoint {
  label: string;
  value: number;
  date: Date;
}

export interface ChartData {
  labels: string[];
  firstMetric: {
    name: string;
    data: number[];
    comparisonData: number[] | null;
  };
  secondMetric: {
    name: string;
    data: number[];
    comparisonData: number[] | null;
  } | null;
  comparisonData: {
    firstMetric: ChartDataPoint[] | null;
    secondMetric: ChartDataPoint[] | null;
  } | null;
}

// Generates query-specific chart data based on the selected query and time period
export const generateQuerySpecificData = (
  query: string,
  timePeriod: string,
  isComparison = false
): { firstMetric: ChartDataPoint[], secondMetric: ChartDataPoint[] | null } => {
  const multiplier = isComparison ? 0.8 : 1;
  
  switch (query) {
    case "Total lead count and total activity by source":
      return {
        firstMetric: generateLeadSourceData("Total Leads", timePeriod, multiplier),
        secondMetric: generateLeadSourceData("Total Activity", timePeriod, multiplier)
      };
    
    case "How many leads have we not acted on by source":
      return {
        firstMetric: generateLeadSourceData("Total Leads", timePeriod, multiplier),
        secondMetric: generateLeadSourceData("Unacted Leads", timePeriod, multiplier)
      };
    
    case "How quickly we follow up on leads per source":
      return {
        firstMetric: generateLeadSourceData("Avg Follow-up Time", timePeriod, multiplier),
        secondMetric: generateLeadSourceData("Response Rate", timePeriod, multiplier)
      };
    
    case "How many times we try to contact each lead per source":
      return {
        firstMetric: generateLeadSourceData("Avg Contact Attempts", timePeriod, multiplier),
        secondMetric: generateLeadSourceData("Contact Success Rate", timePeriod, multiplier)
      };
    
    case "What source has the most lead responses":
      return {
        firstMetric: generateLeadSourceData("Total Responses", timePeriod, multiplier),
        secondMetric: generateLeadSourceData("Response Rate", timePeriod, multiplier)
      };
    
    case "Which source has the most closed deals":
      return {
        firstMetric: generateLeadSourceData("Closed Deals", timePeriod, multiplier),
        secondMetric: generateLeadSourceData("Conversion Rate", timePeriod, multiplier)
      };
    
    default:
      return {
        firstMetric: generateDataForPeriod("Total Leads", timePeriod, isComparison),
        secondMetric: generateDataForPeriod("Response Rate", timePeriod, isComparison)
      };
  }
};

// Generates lead source performance data
const generateLeadSourceData = (metric: string, timePeriod: string, multiplier: number): ChartDataPoint[] => {
  const baseValue = getBaseValueForMetric(metric);
  
  if (timePeriod === "monthly") {
    return generateMonthlyLeadSourcePerformance(baseValue, multiplier);
  } else if (timePeriod === "daily") {
    return generateDailyLeadSourcePerformance(baseValue, multiplier);
  }
  
  return generateDataForPeriod(metric, timePeriod, multiplier !== 1);
};

// Generate monthly lead source performance data
const generateMonthlyLeadSourcePerformance = (baseValue: number, multiplier: number): ChartDataPoint[] => {
  const monthlyPerformanceMultipliers = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8];
  
  return MONTHS_2025.map((month, monthIndex) => {
    const performanceMultiplier = monthlyPerformanceMultipliers[monthIndex];
    
    return {
      label: month,
      value: Math.floor(baseValue * multiplier * performanceMultiplier * (0.9 + Math.random() * PERFORMANCE_VARIANCE)),
      date: new Date(2025, monthIndex, 1)
    };
  });
};

// Generate daily lead source performance data for current month
const generateDailyLeadSourcePerformance = (baseValue: number, multiplier: number): ChartDataPoint[] => {
  const daysInMonth = new Date(2025, CURRENT_MONTH + 1, 0).getDate();
  
  return Array.from({ length: daysInMonth }, (_, dayIndex) => {
    const currentDate = new Date(2025, CURRENT_MONTH, dayIndex + 1);
    const dayOfWeek = currentDate.getDay();
    const performanceMultiplier = getDailyPerformanceMultiplier(dayOfWeek);
    
    return {
      label: currentDate.toISOString().split('T')[0], // YYYY-MM-DD format
      value: Math.floor(baseValue * multiplier * performanceMultiplier * (0.9 + Math.random() * PERFORMANCE_VARIANCE)),
      date: currentDate
    };
  });
};

// Get performance multiplier based on day of week
const getDailyPerformanceMultiplier = (dayOfWeek: number): number => {
  const performanceMap: Record<number, number> = {
    0: 0.7, // Sunday - weekend
    1: 1.2, // Monday - Website performs best
    2: 1.3, // Tuesday - Social Media performs best
    3: 1.4, // Wednesday - Referrals perform best
    4: 1.5, // Thursday - Google Ads perform best
    5: 1.6, // Friday - Facebook Ads perform best
    6: 0.8  // Saturday - weekend
  };
  
  return performanceMap[dayOfWeek] || 1.0;
};

// Helper function to get base values for different metrics
export const getBaseValueForMetric = (metric: string): number => {
  // Map the new metric names to appropriate base values
  const metricBaseValues: Record<string, number> = {
    "Total Leads": 1250,
    "Total Activity": 890,
    "Unacted Leads": 234,
    "Avg Follow-up Time": 3.2,
    "Response Rate": 28.5,
    "Avg Contact Attempts": 4.1,
    "Contact Success Rate": 72.3,
    "Total Responses": 356,
    "Closed Deals": 45,
    "Conversion Rate": 12.8,
    "Website Visits": 890,
    "Page Views": 2340,
    // Add base values for the new metrics
    "New Leads": 1250,
    "Nothing": 0,
    "Calls": 890,
    "Emails": 567,
    "Texts": 234,
    "Notes": 456,
    "Tasks Completed": 123,
    "Appointments": 78,
  };
  
  return metricBaseValues[metric] || LEAD_SOURCE_METRIC_BASE_VALUES[metric] || 100;
};

// Generate data for different time periods
export const generateDataForPeriod = (
  metric: string,
  period: string,
  isComparison = false
): ChartDataPoint[] => {
  const baseValue = getBaseValueForMetric(metric);
  const multiplier = isComparison ? 0.8 : 1; // Comparison data is typically lower

  switch (period) {
    case "daily":
      // Generate daily data for current month only (August 2025)
      const currentMonth = 7; // August (0-indexed)
      const daysInMonth = new Date(2025, currentMonth + 1, 0).getDate();
      
      return Array.from({ length: daysInMonth }, (_, i) => {
        const currentDate = new Date(2025, currentMonth, i + 1);
        return {
          label: currentDate.toISOString().split('T')[0], // YYYY-MM-DD format
          value: Math.floor(
            baseValue * multiplier * (0.8 + Math.random() * 0.4)
          ),
          date: currentDate
        };
      });

    case "weekly":
      // Generate weekly data for Jan 2025 to Aug 2025
      const weeklyData: ChartDataPoint[] = [];
      const weekStart = new Date(2025, 0, 1);
      for (let i = 0; i < 35; i++) { // Approximately 35 weeks
        const weekDate = new Date(weekStart);
        weekDate.setDate(weekStart.getDate() + (i * 7));
        if (weekDate.getFullYear() === 2025 && weekDate.getMonth() <= 7) {
          weeklyData.push({
            label: `Week ${i + 1}`,
            value: Math.floor(
              baseValue * multiplier * (0.7 + Math.random() * 0.6)
            ),
            date: weekDate
          });
        }
      }
      return weeklyData;

    case "monthly":
      return [
        {
          label: "Jan 2025",
          value: Math.floor(
            baseValue * multiplier * (0.6 + Math.random() * 0.8)
          ),
          date: new Date(2025, 0, 1)
        },
        {
          label: "Feb 2025",
          value: Math.floor(
            baseValue * multiplier * (0.7 + Math.random() * 0.6)
          ),
          date: new Date(2025, 1, 1)
        },
        {
          label: "Mar 2025",
          value: Math.floor(
            baseValue * multiplier * (0.8 + Math.random() * 0.4)
          ),
          date: new Date(2025, 2, 1)
        },
        {
          label: "Apr 2025",
          value: Math.floor(
            baseValue * multiplier * (0.9 + Math.random() * 0.2)
          ),
          date: new Date(2025, 3, 1)
        },
        {
          label: "May 2025",
          value: Math.floor(
            baseValue * multiplier * (0.85 + Math.random() * 0.3)
          ),
          date: new Date(2025, 4, 1)
        },
        {
          label: "Jun 2025",
          value: Math.floor(
            baseValue * multiplier * (0.9 + Math.random() * 0.2)
          ),
          date: new Date(2025, 5, 1)
        },
        {
          label: "Jul 2025",
          value: Math.floor(
            baseValue * multiplier * (0.95 + Math.random() * 0.1)
          ),
          date: new Date(2025, 6, 1)
        },
        {
          label: "Aug 2025",
          value: Math.floor(
            baseValue * multiplier * (1.0 + Math.random() * 0.1)
          ),
          date: new Date(2025, 7, 1)
        },
      ];

    case "yearly":
      return Array.from({ length: 5 }, (_, i) => ({
        label: `${2020 + i}`,
        value: Math.floor(
          baseValue * multiplier * (0.5 + Math.random() * 1.0)
        ),
        date: new Date(2020 + i, 0, 1)
      }));

    default:
      return [];
  }
};

// Generate complete chart data
export const generateChartData = (
  selectedMetric: string,
  selectedSecondMetric: string,
  timePeriod: string,
  compareToPrevious: boolean,
  selectedQuery?: string
): ChartData => {
  // Use query-specific data if available
  if (selectedQuery) {
    const queryData = generateQuerySpecificData(selectedQuery, timePeriod);
    const comparisonData = compareToPrevious 
      ? generateQuerySpecificData(selectedQuery, timePeriod, true)
      : null;

    return {
      labels: queryData.firstMetric.map((d) => d.label),
      firstMetric: {
        name: selectedMetric,
        data: queryData.firstMetric.map((d) => d.value),
        comparisonData: comparisonData?.firstMetric?.map((d) => d.value) || null,
      },
      secondMetric: queryData.secondMetric && selectedSecondMetric && selectedSecondMetric !== "Nothing"
        ? {
            name: selectedSecondMetric,
            data: queryData.secondMetric.map((d) => d.value),
            comparisonData: comparisonData?.secondMetric?.map((d) => d.value) || null,
          }
        : null,
      comparisonData: comparisonData,
    };
  }

  // Fallback to original logic
  const firstMetricData = generateDataForPeriod(selectedMetric, timePeriod);
  const secondMetricData =
    selectedSecondMetric === "Nothing"
      ? null
      : generateDataForPeriod(selectedSecondMetric, timePeriod);

  let comparisonData = null;
  if (compareToPrevious) {
    comparisonData = {
      firstMetric: generateDataForPeriod(selectedMetric, timePeriod, true),
      secondMetric:
        selectedSecondMetric === "Nothing"
          ? null
          : generateDataForPeriod(selectedSecondMetric, timePeriod, true),
    };
  }

  return {
    labels: firstMetricData.map((d) => d.label),
    firstMetric: {
      name: selectedMetric,
      data: firstMetricData.map((d) => d.value),
      comparisonData:
        comparisonData?.firstMetric?.map((d) => d.value) || null,
    },
    secondMetric: secondMetricData
      ? {
          name: selectedSecondMetric,
          data: secondMetricData.map((d) => d.value),
          comparisonData:
            comparisonData?.secondMetric?.map((d) => d.value) || null,
        }
      : null,
    comparisonData,
  };
};
