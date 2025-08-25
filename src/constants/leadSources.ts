export const LEAD_SOURCE_QUERIES = [
  "Total lead count and total activity by source",
  "How many leads have we not acted on by source",
  "How quickly we follow up on leads per source",
  "How many times we try to contact each lead per source",
  "What source has the most lead responses",
  "Which source has the most closed deals",
] as const;

export const LEAD_SOURCE_CONFIG = {
  defaultQuery: "Total lead count and total activity by source",
  cacheMessage: "Reporting results may be cached for up to 10 minutes.",
  refreshButtonText: "Refresh results",
  refreshingText: "Refreshing...",
  lastRefreshedPrefix: "Last refreshed:",
  neverRefreshedText: "Never",
} as const;

export const LEAD_SOURCE_METRICS = [
  {
    name: "New Leads",
    tooltip: "Total number of new leads generated from this source",
  },
  {
    name: "Calls",
    tooltip: "Number of calls made to leads from this source",
  },
  {
    name: "Emails",
    tooltip: "Number of emails sent to leads from this source",
  },
  {
    name: "Texts",
    tooltip: "Number of text messages sent to leads from this source",
  },
  {
    name: "Notes",
    tooltip: "Number of notes added for leads from this source",
  },
  {
    name: "Tasks Completed",
    tooltip: "Number of tasks completed for leads from this source",
  },
  {
    name: "Appointments",
    tooltip: "Number of appointments scheduled with leads from this source",
  },
] as const;

export const LEAD_SOURCE_SECOND_METRICS = [
  {
    name: "Nothing",
    tooltip: "No activity recorded for leads from this source",
  },
  {
    name: "Calls",
    tooltip: "Number of calls made to leads from this source",
  },
  {
    name: "Emails",
    tooltip: "Number of emails sent to leads from this source",
  },
  {
    name: "Texts",
    tooltip: "Number of text messages sent to leads from this source",
  },
  {
    name: "Notes",
    tooltip: "Number of notes added for leads from this source",
  },
  {
    name: "Tasks Completed",
    tooltip: "Number of tasks completed for leads from this source",
  },
  {
    name: "Appointments",
    tooltip: "Number of appointments scheduled with leads from this source",
  },
] as const;

export const LEAD_SOURCE_METRIC_BASE_VALUES: Record<string, number> = {
  "New Leads": 1250,
  "Nothing": 0,
  "Calls": 890,
  "Emails": 567,
  "Texts": 234,
  "Notes": 456,
  "Tasks Completed": 123,
  "Appointments": 78,
};

export const LEAD_SOURCE_CHART_COLORS = {
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

// Lead sources
export const LEAD_SOURCES = [
  "Website",
  "Social Media",
  "Referrals",
  "Cold Outreach",
  "Google Ads",
  "Facebook Ads",
  "LinkedIn",
  "Email Marketing",
] as const;

// Query-specific table data
export const QUERY_LEAD_SOURCE_TABLE_DATA = {
  "Total lead count and total activity by source": {
    columns: ["Name", "New Leads", "Leads Not Acted On", "Leads Not Called", "Leads Not Emailed", "Leads Not Texted", "Actions"],
    sources: [
      { name: "Website", "New Leads": 456, "Leads Not Acted On": 23, "Leads Not Called": 234, "Leads Not Emailed": 45, "Leads Not Texted": 123, actions: "View Details" },
      { name: "Social Media", "New Leads": 234, "Leads Not Acted On": 45, "Leads Not Called": 156, "Leads Not Emailed": 67, "Leads Not Texted": 89, actions: "View Details" },
      { name: "Referrals", "New Leads": 189, "Leads Not Acted On": 12, "Leads Not Called": 89, "Leads Not Emailed": 23, "Leads Not Texted": 67, actions: "View Details" },
      { name: "Cold Outreach", "New Leads": 156, "Leads Not Acted On": 67, "Leads Not Called": 123, "Leads Not Emailed": 89, "Leads Not Texted": 145, actions: "View Details" },
      { name: "Google Ads", "New Leads": 89, "Leads Not Acted On": 15, "Leads Not Called": 67, "Leads Not Emailed": 34, "Leads Not Texted": 56, actions: "View Details" },
      { name: "Facebook Ads", "New Leads": 67, "Leads Not Acted On": 28, "Leads Not Called": 45, "Leads Not Emailed": 56, "Leads Not Texted": 78, actions: "View Details" },
      { name: "LinkedIn", "New Leads": 45, "Leads Not Acted On": 8, "Leads Not Called": 23, "Leads Not Emailed": 12, "Leads Not Texted": 34, actions: "View Details" },
      { name: "Email Marketing", "New Leads": 34, "Leads Not Acted On": 12, "Leads Not Called": 18, "Leads Not Emailed": 9, "Leads Not Texted": 23, actions: "View Details" },
    ],
  },
  "How many leads have we not acted on by source": {
    columns: ["Name", "New Leads", "Leads Not Acted On", "Leads Not Called", "Leads Not Emailed", "Leads Not Texted", "Actions"],
    sources: [
      { name: "Website", "New Leads": 456, "Leads Not Acted On": 23, "Leads Not Called": 234, "Leads Not Emailed": 45, "Leads Not Texted": 123, actions: "View Details" },
      { name: "Social Media", "New Leads": 234, "Leads Not Acted On": 45, "Leads Not Called": 156, "Leads Not Emailed": 67, "Leads Not Texted": 89, actions: "View Details" },
      { name: "Referrals", "New Leads": 189, "Leads Not Acted On": 12, "Leads Not Called": 89, "Leads Not Emailed": 23, "Leads Not Texted": 67, actions: "View Details" },
      { name: "Cold Outreach", "New Leads": 156, "Leads Not Acted On": 67, "Leads Not Called": 123, "Leads Not Emailed": 89, "Leads Not Texted": 145, actions: "View Details" },
      { name: "Google Ads", "New Leads": 89, "Leads Not Acted On": 15, "Leads Not Called": 67, "Leads Not Emailed": 34, "Leads Not Texted": 56, actions: "View Details" },
      { name: "Facebook Ads", "New Leads": 67, "Leads Not Acted On": 28, "Leads Not Called": 45, "Leads Not Emailed": 56, "Leads Not Texted": 78, actions: "View Details" },
      { name: "LinkedIn", "New Leads": 45, "Leads Not Acted On": 8, "Leads Not Called": 23, "Leads Not Emailed": 12, "Leads Not Texted": 34, actions: "View Details" },
      { name: "Email Marketing", "New Leads": 34, "Leads Not Acted On": 12, "Leads Not Called": 18, "Leads Not Emailed": 9, "Leads Not Texted": 23, actions: "View Details" },
    ],
  },
  "How quickly we follow up on leads per source": {
    columns: ["Name", "New Leads", "Leads Not Acted On", "Leads Not Called", "Leads Not Emailed", "Leads Not Texted", "Actions"],
    sources: [
      { name: "Website", "New Leads": 456, "Leads Not Acted On": 23, "Leads Not Called": 234, "Leads Not Emailed": 45, "Leads Not Texted": 123, actions: "View Details" },
      { name: "Social Media", "New Leads": 234, "Leads Not Acted On": 45, "Leads Not Called": 156, "Leads Not Emailed": 67, "Leads Not Texted": 89, actions: "View Details" },
      { name: "Referrals", "New Leads": 189, "Leads Not Acted On": 12, "Leads Not Called": 89, "Leads Not Emailed": 23, "Leads Not Texted": 67, actions: "View Details" },
      { name: "Cold Outreach", "New Leads": 156, "Leads Not Acted On": 67, "Leads Not Called": 123, "Leads Not Emailed": 89, "Leads Not Texted": 145, actions: "View Details" },
      { name: "Google Ads", "New Leads": 89, "Leads Not Acted On": 15, "Leads Not Called": 67, "Leads Not Emailed": 34, "Leads Not Texted": 56, actions: "View Details" },
      { name: "Facebook Ads", "New Leads": 67, "Leads Not Acted On": 28, "Leads Not Called": 45, "Leads Not Emailed": 56, "Leads Not Texted": 78, actions: "View Details" },
      { name: "LinkedIn", "New Leads": 45, "Leads Not Acted On": 8, "Leads Not Called": 23, "Leads Not Emailed": 12, "Leads Not Texted": 34, actions: "View Details" },
      { name: "Email Marketing", "New Leads": 34, "Leads Not Acted On": 12, "Leads Not Called": 18, "Leads Not Emailed": 9, "Leads Not Texted": 23, actions: "View Details" },
    ],
  },
  "How many times we try to contact each lead per source": {
    columns: ["Name", "New Leads", "Leads Not Acted On", "Leads Not Called", "Leads Not Emailed", "Leads Not Texted", "Actions"],
    sources: [
      { name: "Website", "New Leads": 456, "Leads Not Acted On": 23, "Leads Not Called": 234, "Leads Not Emailed": 45, "Leads Not Texted": 123, actions: "View Details" },
      { name: "Social Media", "New Leads": 234, "Leads Not Acted On": 45, "Leads Not Called": 156, "Leads Not Emailed": 67, "Leads Not Texted": 89, actions: "View Details" },
      { name: "Referrals", "New Leads": 189, "Leads Not Acted On": 12, "Leads Not Called": 89, "Leads Not Emailed": 23, "Leads Not Texted": 67, actions: "View Details" },
      { name: "Cold Outreach", "New Leads": 156, "Leads Not Acted On": 67, "Leads Not Called": 123, "Leads Not Emailed": 89, "Leads Not Texted": 145, actions: "View Details" },
      { name: "Google Ads", "New Leads": 89, "Leads Not Acted On": 15, "Leads Not Called": 67, "Leads Not Emailed": 34, "Leads Not Texted": 56, actions: "View Details" },
      { name: "Facebook Ads", "New Leads": 67, "Leads Not Acted On": 28, "Leads Not Called": 45, "Leads Not Emailed": 56, "Leads Not Texted": 78, actions: "View Details" },
      { name: "LinkedIn", "New Leads": 45, "Leads Not Acted On": 8, "Leads Not Called": 23, "Leads Not Emailed": 12, "Leads Not Texted": 34, actions: "View Details" },
      { name: "Email Marketing", "New Leads": 34, "Leads Not Acted On": 12, "Leads Not Called": 18, "Leads Not Emailed": 9, "Leads Not Texted": 23, actions: "View Details" },
    ],
  },
  "What source has the most lead responses": {
    columns: ["Name", "New Leads", "Leads Not Acted On", "Leads Not Called", "Leads Not Emailed", "Leads Not Texted", "Actions"],
    sources: [
      { name: "Referrals", "New Leads": 189, "Leads Not Acted On": 12, "Leads Not Called": 89, "Leads Not Emailed": 23, "Leads Not Texted": 67, actions: "View Details" },
      { name: "Website", "New Leads": 456, "Leads Not Acted On": 23, "Leads Not Called": 234, "Leads Not Emailed": 45, "Leads Not Texted": 123, actions: "View Details" },
      { name: "Google Ads", "New Leads": 89, "Leads Not Acted On": 15, "Leads Not Called": 67, "Leads Not Emailed": 34, "Leads Not Texted": 56, actions: "View Details" },
      { name: "Social Media", "New Leads": 234, "Leads Not Acted On": 45, "Leads Not Called": 156, "Leads Not Emailed": 67, "Leads Not Texted": 89, actions: "View Details" },
      { name: "LinkedIn", "New Leads": 45, "Leads Not Acted On": 8, "Leads Not Called": 23, "Leads Not Emailed": 12, "Leads Not Texted": 34, actions: "View Details" },
      { name: "Facebook Ads", "New Leads": 67, "Leads Not Acted On": 28, "Leads Not Called": 45, "Leads Not Emailed": 56, "Leads Not Texted": 78, actions: "View Details" },
      { name: "Cold Outreach", "New Leads": 156, "Leads Not Acted On": 67, "Leads Not Called": 123, "Leads Not Emailed": 89, "Leads Not Texted": 145, actions: "View Details" },
      { name: "Email Marketing", "New Leads": 34, "Leads Not Acted On": 12, "Leads Not Called": 18, "Leads Not Emailed": 9, "Leads Not Texted": 23, actions: "View Details" },
    ],
  },
  "Which source has the most closed deals": {
    columns: ["Name", "New Leads", "Leads Not Acted On", "Leads Not Called", "Leads Not Emailed", "Leads Not Texted", "Actions"],
    sources: [
      { name: "Referrals", "New Leads": 189, "Leads Not Acted On": 12, "Leads Not Called": 89, "Leads Not Emailed": 23, "Leads Not Texted": 67, actions: "View Details" },
      { name: "Website", "New Leads": 456, "Leads Not Acted On": 23, "Leads Not Called": 234, "Leads Not Emailed": 45, "Leads Not Texted": 123, actions: "View Details" },
      { name: "Google Ads", "New Leads": 89, "Leads Not Acted On": 15, "Leads Not Called": 67, "Leads Not Emailed": 34, "Leads Not Texted": 56, actions: "View Details" },
      { name: "Social Media", "New Leads": 234, "Leads Not Acted On": 45, "Leads Not Called": 156, "Leads Not Emailed": 67, "Leads Not Texted": 89, actions: "View Details" },
      { name: "LinkedIn", "New Leads": 45, "Leads Not Acted On": 8, "Leads Not Called": 23, "Leads Not Emailed": 12, "Leads Not Texted": 34, actions: "View Details" },
      { name: "Facebook Ads", "New Leads": 67, "Leads Not Acted On": 28, "Leads Not Called": 45, "Leads Not Emailed": 56, "Leads Not Texted": 78, actions: "View Details" },
      { name: "Cold Outreach", "New Leads": 156, "Leads Not Acted On": 67, "Leads Not Called": 123, "Leads Not Emailed": 89, "Leads Not Texted": 145, actions: "View Details" },
      { name: "Email Marketing", "New Leads": 34, "Leads Not Acted On": 12, "Leads Not Called": 18, "Leads Not Emailed": 9, "Leads Not Texted": 23, actions: "View Details" },
    ],
  },
};

export const getLeadSourceMetricTooltip = (metricName: string): string => {
  // Handle the specific column names used in the table
  const tooltips: Record<string, string> = {
    "Name": "Lead source name",
    "New Leads": "Total number of new leads generated from this source",
    "Leads Not Acted On": "Number of leads that haven't been contacted yet",
    "Leads Not Called": "Number of leads that haven't been called",
    "Leads Not Emailed": "Number of leads that haven't been emailed",
    "Leads Not Texted": "Number of leads that haven't been texted",
    "Actions": "Actions available for this lead source"
  };
  
  return tooltips[metricName] || "No description available for this metric.";
};

// Time periods for lead source reporting
export const LEAD_SOURCE_TIME_PERIODS = [
  "daily",
  "weekly", 
  "monthly",
  "yearly",
] as const;

export const LEAD_SOURCE_TIME_PERIOD_LABELS: Record<string, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
} as const;

export const LEAD_SOURCE_COMPARISON_PERIOD_LABELS: Record<string, string> = {
  daily: "Previous 8 months (May 2024 - Dec 2024)",
  weekly: "Previous 35 weeks (May 2024 - Dec 2024)",
  monthly: "Previous 8 months (May 2024 - Dec 2024)",
  yearly: "Previous 5 years (2020-2024)",
} as const;
