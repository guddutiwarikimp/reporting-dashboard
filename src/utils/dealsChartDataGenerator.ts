import { DEALS_PIPELINE_STAGES, DEALS_TIME_PERIODS } from "@/constants/deals";

export interface ChartDataPoint {
  label: string;
  value: number;
  date: Date;
}

export interface DealsChartData {
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

// Constants for deals data generation
const DEALS_STAGES = ["rejected-leads", "approved-leads", "backlog", "demo-booked", "demo-joined", "perch-profile-created", "perch-profile-completed", "pre-approved", "agent-assigned", "offer-approved", "mortgage-lawyer", "properties-closed", "final-formalities", "mortgage-only", "deal-completed", "failed-deals", "bad-leads-stop-communication", "nurture-further"] as const;
const MONTHS_2025 = ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025", "Sep 2025", "Oct 2025", "Nov 2025", "Dec 2025"] as const;
const CURRENT_MONTH = 7; // August (0-indexed)
const PERFORMANCE_VARIANCE = 0.2; // Random variance factor

// Generate data for different time periods
export const generateDataForPeriod = (
  metric: string,
  period: string,
  selectedStages: string[],
  isComparison = false
): ChartDataPoint[] => {
  const baseValue = getBaseValueForMetric(metric, selectedStages);
  const multiplier = isComparison ? 0.8 : 1;

  switch (period) {
    case "daily":
      // Generate daily data for current month only
      const currentMonth = CURRENT_MONTH;
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
      return MONTHS_2025.map((month, monthIndex) => ({
        label: month,
        value: Math.floor(
          baseValue * multiplier * (0.6 + Math.random() * 0.8)
        ),
        date: new Date(2025, monthIndex, 1)
      }));

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

// Helper function to get base values for different metrics
export const getBaseValueForMetric = (metric: string, selectedStages: string[]): number => {
  // Calculate multiplier based on selected stages
  const totalStages = DEALS_PIPELINE_STAGES.length;
  const selectedStagesCount = selectedStages.length;
  const stageMultiplier = selectedStagesCount / totalStages;

  // Map the metric names to appropriate base values
  const metricBaseValues: Record<string, number> = {
    "Deals": 1250,
    "Commission Total": 125000,
    "Price Avg.": 750000,
    "Commission Avg.": 75000,
    "Price Total": 15000000,
    "Nothing": 0,
  };
  
  const baseValue = metricBaseValues[metric] || 100;
  return Math.floor(baseValue * stageMultiplier);
};

// Generate complete chart data
export const generateDealsChartData = (
  selectedStages: string[],
  selectedMetric: string,
  selectedSecondMetric: string,
  timePeriod: string
): DealsChartData => {
  // Convert time period to the format expected by generateDataForPeriod
  let periodKey = "monthly"; // default
  switch (timePeriod) {
    case "this-month":
    case "last-month":
      periodKey = "daily";
      break;
    case "last-30-days":
      periodKey = "daily";
      break;
    case "last-90-days":
      periodKey = "weekly";
      break;
    case "last-year":
    case "year-to-date":
      periodKey = "monthly";
      break;
    case "all-time":
      periodKey = "yearly";
      break;
    default:
      periodKey = "monthly";
  }

  const firstMetricData = generateDataForPeriod(selectedMetric, periodKey, selectedStages);
  const secondMetricData =
    selectedSecondMetric === "Nothing"
      ? null
      : generateDataForPeriod(selectedSecondMetric, periodKey, selectedStages);

  return {
    labels: firstMetricData.map((d) => d.label),
    firstMetric: {
      name: selectedMetric,
      data: firstMetricData.map((d) => d.value),
      comparisonData: null,
    },
    secondMetric: secondMetricData
      ? {
          name: selectedSecondMetric,
          data: secondMetricData.map((d) => d.value),
          comparisonData: null,
        }
      : null,
    comparisonData: null,
  };
};
