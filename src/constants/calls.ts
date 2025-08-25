export const CALLS_QUERIES = [
  "Call report",
  "Call logs"
] as const;

export const CALLS_CONFIG = {
  defaultQuery: "Call report",
  cacheMessage: "Reporting results may be cached for up to 10 minutes.",
  refreshButtonText: "Refresh results",
  refreshingText: "Refreshing...",
  lastRefreshedPrefix: "Last refreshed:",
  neverRefreshedText: "Never",
} as const;

export const CALLS_METRICS = [
  {
    name: "Total Calls",
    tooltip: "Total number of calls made and received",
  },
  {
    name: "Answered",
    tooltip: "Number of calls that were answered",
  },
  {
    name: "Missed",
    tooltip: "Number of calls that were missed",
  },
  {
    name: "Answer Rate",
    tooltip: "Percentage of calls that were answered",
  },
] as const;

export const CALLS_SECOND_METRICS = [
  {
    name: "Inbound Calls",
    tooltip: "Number of incoming calls",
  },
  {
    name: "Outbound Calls",
    tooltip: "Number of outgoing calls",
  },
  {
    name: "Average Duration",
    tooltip: "Average call duration",
  },
] as const;

export const CALLS_METRIC_BASE_VALUES: Record<string, number> = {
  "Total Calls": 1847,
  "Answered": 1234,
  "Missed": 613,
  "Answer Rate": 67,
  "Inbound Calls": 892,
  "Outbound Calls": 955,
  "Average Duration": 272, // in seconds
};

export const CALLS_CHART_COLORS = {
  primary: "#3b82f6",
  secondary: "#10b981",
  accent: "#8b5cf6",
  warning: "#f59e0b",
  danger: "#ef4444",
  success: "#22c55e",
  info: "#06b6d4",
  primaryLight: "rgba(59, 130, 246, 0.3)",
  primaryLighter: "rgba(59, 130, 246, 0.05)",
};

// Call types
export const CALL_TYPES = [
  "Inbound",
  "Outbound",
  "Missed",
  "Voicemail",
] as const;

// Query-specific table data
export const QUERY_CALLS_TABLE_DATA = {
  "Call report": {
    columns: ["Call Type", "Count", "Answer Rate", "Average Duration", "Actions"],
    calls: [
      { type: "Inbound", count: 892, answerRate: "78%", avgDuration: "4m 32s", actions: "View Details" },
      { type: "Outbound", count: 955, answerRate: "58%", avgDuration: "3m 45s", actions: "View Details" },
      { type: "Missed", count: 613, answerRate: "0%", avgDuration: "0s", actions: "View Details" },
      { type: "Voicemail", count: 234, answerRate: "100%", avgDuration: "0s", actions: "View Details" },
    ],
  },
};

export const getCallsMetricTooltip = (metricName: string): string => {
  const tooltips: Record<string, string> = {
    "Call Type": "Type of call (inbound, outbound, missed, voicemail)",
    "Count": "Number of calls of this type",
    "Answer Rate": "Percentage of calls that were answered",
    "Average Duration": "Average duration of calls of this type",
    "Actions": "Actions available for this call type"
  };
  
  return tooltips[metricName] || "No description available for this metric.";
};

// Time periods for calls reporting
export const CALLS_TIME_PERIODS = [
  "daily",
  "weekly", 
  "monthly",
  "yearly",
] as const;

export const CALLS_TIME_PERIOD_LABELS: Record<string, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
} as const;

export const CALLS_COMPARISON_PERIOD_LABELS: Record<string, string> = {
  daily: "Previous 8 months (May 2024 - Dec 2024)",
  weekly: "Previous 35 weeks (May 2024 - Dec 2024)",
  monthly: "Previous 8 months (May 2024 - Dec 2024)",
  yearly: "Previous 5 years (2020-2024)",
} as const;

// Agent table data for calls reporting
export const CALLS_AGENT_TABLE_DATA = {
  columns: [
    "Name",
    "Calls Made",
    "Connected", 
    "Conversations",
    "Received",
    "Calls Missed",
    "Total Talk Time",
    "Answer Time"
  ],
  agents: [
    {
      name: "Albi Leka",
      initials: "AL",
      "Calls Made": { total: 2327, people: 1514 },
      "Connected": { total: 611, people: 443 },
      "Conversations": { total: 379, people: 274 },
      "Received": { total: 261, people: 166 },
      "Calls Missed": { total: 4, people: 4 },
      "Total Talk Time": "2 days 20 hrs",
      "Answer Time": "1 sec"
    },
    {
      name: "Aniya Wilson",
      initials: "AW", 
      "Calls Made": { total: 3, people: 1 },
      "Connected": { total: 1, people: 1 },
      "Conversations": { total: 1, people: 1 },
      "Received": { total: 2, people: 1 },
      "Calls Missed": { total: 0, people: 0 },
      "Total Talk Time": "5 min 55 sec",
      "Answer Time": "-"
    },
    {
      name: "Ben Lotha",
      initials: "BL",
      "Calls Made": { total: 455, people: 265 },
      "Connected": { total: 19, people: 18 },
      "Conversations": { total: 3, people: 3 },
      "Received": { total: 39, people: 26 },
      "Calls Missed": { total: 38, people: 26 },
      "Total Talk Time": "1 hr 26 min",
      "Answer Time": "12 sec"
    },
    {
      name: "Ida Srnic",
      initials: "IS",
      "Calls Made": { total: 33, people: 3 },
      "Connected": { total: 23, people: 2 },
      "Conversations": { total: 18, people: 2 },
      "Received": { total: 29, people: 2 },
      "Calls Missed": { total: 21, people: 1 },
      "Total Talk Time": "2 hrs 58 min",
      "Answer Time": "-"
    }
  ]
} as const;

// Tooltips for call metrics
export const getCallMetricTooltip = (metricName: string): string => {
  const tooltips: Record<string, string> = {
    "Calls Made": "How many calls they have made",
    "Connected": "Call lasting 1 minute or more",
    "Conversations": "Calls lasting 2 minutes or more", 
    "Received": "Number of incoming calls received",
    "Calls Missed": "Number of calls that were missed",
    "Total Talk Time": "Total time spent on calls",
    "Answer Time": "Average time to answering incoming calls on desktop"
  };
  
  return tooltips[metricName] || "No description available for this metric.";
};
