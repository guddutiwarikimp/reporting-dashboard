// Base metrics for different query types with tooltips
export const AGENT_ACTIVITY_METRICS = [
  {
    name: "New Leads",
    tooltip: "Total number of new leads created during the selected time frame"
  },
  {
    name: "Initially Assigned Leads",
    tooltip: "Leads created during the selected time frame and were initially assigned to everyone"
  },
  {
    name: "Currently Assigned Leads",
    tooltip: "Leads that are currently assigned to team members and actively being worked on"
  },
  {
    name: "Calls",
    tooltip: "Total number of phone calls made to leads during the selected time frame"
  },
  {
    name: "Emails",
    tooltip: "Total number of emails sent to leads during the selected time frame"
  },
  {
    name: "Texts",
    tooltip: "Total number of text messages sent to leads during the selected time frame"
  },
  {
    name: "Notes",
    tooltip: "Total number of notes added to lead records during the selected time frame"
  },
  {
    name: "Tasks Completed",
    tooltip: "Total number of tasks completed related to lead management"
  },
  {
    name: "Appointments Set",
    tooltip: "Total number of appointments scheduled with leads"
  },
  {
    name: "Appointments",
    tooltip: "Total number of appointments that actually occurred"
  },
] as const;

export const AGENT_ACTIVITY_SECOND_METRICS = [
  {
    name: "Nothing",
    tooltip: "No additional metric"
  },
  {
    name: "Initially Assigned Leads",
    tooltip: "Leads created during the selected time frame and were initially assigned to everyone"
  },
  {
    name: "Currently Assigned Leads",
    tooltip: "Leads that are currently assigned to team members and actively being worked on"
  },
  {
    name: "Calls",
    tooltip: "Total number of phone calls made to leads during the selected time frame"
  },
  {
    name: "Emails",
    tooltip: "Total number of emails sent to leads during the selected time frame"
  },
  {
    name: "Texts",
    tooltip: "Total number of text messages sent to leads during the selected time frame"
  },
  {
    name: "Notes",
    tooltip: "Total number of notes added to lead records during the selected time frame"
  },
  {
    name: "Tasks Completed",
    tooltip: "Total number of tasks completed related to lead management"
  },
  {
    name: "Appointments Set",
    tooltip: "Total number of appointments scheduled with leads"
  },
  {
    name: "Appointments",
    tooltip: "Total number of appointments that actually occurred"
  },
] as const;

// Time periods
export const TIME_PERIODS = [
  "daily",
  "weekly",
  "monthly",
  "yearly",
] as const;

export const TIME_PERIOD_LABELS = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
} as const;

// Chart colors
export const CHART_COLORS = {
  primary: "#3b82f6",
  secondary: "#f97316",
  primaryLight: "rgba(59, 130, 246, 0.3)",
  primaryLighter: "rgba(59, 130, 246, 0.05)",
} as const;

// Comparison period labels
export const COMPARISON_PERIOD_LABELS = {
  daily: "Previous 8 months (May 2024 - Dec 2024)",
  weekly: "Previous 35 weeks (May 2024 - Dec 2024)",
  monthly: "Previous 8 months (May 2024 - Dec 2024)",
  yearly: "Previous 5 years (2020-2024)",
} as const;

// Helper function to get tooltip for a metric
export const getMetricTooltip = (metricName: string): string => {
  const metric = AGENT_ACTIVITY_METRICS.find(m => m.name === metricName);
  if (metric) return metric.tooltip;

  const secondMetric = AGENT_ACTIVITY_SECOND_METRICS.find(m => m.name === metricName);
  if (secondMetric) return secondMetric.tooltip;

  // Additional metrics not in the main arrays
  const additionalTooltips: { [key: string]: string } = {
    "% of Leads Responding": "Percentage of leads who responded to any form of contact",
    "% of Leads Responding by Email": "Percentage of leads who responded specifically to emails",
    "% of Leads Responding by Phone": "Percentage of leads who responded specifically to phone calls",
    "% of Leads Responding by Text": "Percentage of leads who responded specifically to text messages",
    "Avg. Speed to Action": "Average time it takes to take the first action on a new lead",
    "Avg. Speed to First Call": "Average time it takes to make the first call to a new lead",
    "Avg. Speed to First Text Message": "Average time it takes to send the first text to a new lead",
    "Avg. Speed to First Email": "Average time it takes to send the first email to a new lead",
    "Leads Not Acted On": "Number of leads that haven't received any form of contact",
    "Leads Not Called": "Number of leads that haven't received a phone call",
    "Leads Not Emailed": "Number of leads that haven't received an email",
    "Leads Not Texted": "Number of leads that haven't received a text message",
    "Avg. Contact Attempts": "Average number of contact attempts made per lead",
    "Avg. Call Attempts": "Average number of phone call attempts made per lead",
    "Avg. Email Attempts": "Average number of email attempts made per lead",
    "Avg. Text Message Attempts": "Average number of text message attempts made per lead",
    "Deals Closed": "Number of deals successfully closed",
    "Deal Value": "Total monetary value of closed deals",
    "Deal Commission": "Total commission earned from closed deals",
    "Conversion Rate": "Percentage of leads converted to deals",
  };

  return additionalTooltips[metricName] || `Data for ${metricName}`;
};

// Base values for different metrics
export const METRIC_BASE_VALUES: Record<string, number> = {
  "New Leads": 6004,
  "Initially Assigned Leads": 6004,
  "Currently Assigned Leads": 6015,
  "Calls": 3310,
  "Emails": 19480,
  "Texts": 6829,
  "Notes": 700,
  "Tasks Completed": 66,
  "Appointments Set": 10,
  "Appointments": 936,
  "% of Leads Responding": 9.9,
  "% of Leads Responding by Email": 2.5,
  "% of Leads Responding by Phone": 2.0,
  "% of Leads Responding by Text": 8.4,
  "Avg. Speed to Action": 1,
  "Avg. Speed to First Call": 23,
  "Avg. Speed to First Text Message": 1,
  "Avg. Speed to First Email": 2,
  "Leads Not Acted On": 254,
  "Leads Not Called": 4642,
  "Leads Not Emailed": 267,
  "Leads Not Texted": 4799,
  "Avg. Contact Attempts": 2.37,
  "Avg. Call Attempts": 0.23,
  "Avg. Email Attempts": 1.44,
  "Avg. Text Message Attempts": 0.70,
  "Deals Closed": 1,
  "Deal Value": 1061000,
  "Deal Commission": 0,
  "Conversion Rate": 0.03,
} as const;

// Chart data for each query type
export const QUERY_CHART_DATA = {
  "what team member is getting the most leads to respond": {
    firstMetric: "New Leads",
    secondMetric: "% of Leads Responding",
    chartData: {
      labels: ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025"],
      firstMetricData: {
        name: "New Leads",
        data: [1488, 1400, 1300, 1200, 1100, 1000, 900, 744],
        comparisonData: [1190, 1120, 1040, 960, 880, 800, 720, 595],
      },
      secondMetricData: {
        name: "% of Leads Responding",
        data: [50.0, 52.0, 54.0, 56.0, 58.0, 60.0, 62.0, 64.0],
        comparisonData: [40.0, 41.6, 43.2, 44.8, 46.4, 48.0, 49.6, 51.2],
      },
    },
  },
  "How quickly we follow up on leads": {
    firstMetric: "New Leads",
    secondMetric: "Avg. Speed to Action",
    chartData: {
      labels: ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025"],
      firstMetricData: {
        name: "New Leads",
        data: [1488, 1400, 1300, 1200, 1100, 1000, 900, 744],
        comparisonData: [1190, 1120, 1040, 960, 880, 800, 720, 595],
      },
      secondMetricData: {
        name: "Avg. Speed to Action",
        data: [1, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4],
        comparisonData: [1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6],
      },
    },
  },
  "How many times we try to contact each lead": {
    firstMetric: "New Leads",
    secondMetric: "Avg. Contact Attempts",
    chartData: {
      labels: ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025"],
      firstMetricData: {
        name: "New Leads",
        data: [1488, 1400, 1300, 1200, 1100, 1000, 900, 744],
        comparisonData: [1190, 1120, 1040, 960, 880, 800, 720, 595],
      },
      secondMetricData: {
        name: "Avg. Contact Attempts",
        data: [5.00, 4.50, 4.00, 3.50, 3.00, 2.75, 2.50, 2.25],
        comparisonData: [6.25, 5.63, 5.00, 4.38, 3.75, 3.44, 3.13, 2.81],
      },
    },
  },
  "which team member has the best response time": {
    firstMetric: "New Leads",
    secondMetric: "Avg. Speed to First Call",
    chartData: {
      labels: ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025"],
      firstMetricData: {
        name: "New Leads",
        data: [1488, 1400, 1300, 1200, 1100, 1000, 900, 744],
        comparisonData: [1190, 1120, 1040, 960, 880, 800, 720, 595],
      },
      secondMetricData: {
        name: "Avg. Speed to First Call",
        data: [30, 28, 26, 24, 22, 20, 18, 16],
        comparisonData: [37.5, 35, 32.5, 30, 27.5, 25, 22.5, 20],
      },
    },
  },
  "Total lead count and total agent activity": {
    firstMetric: "New Leads",
    secondMetric: "Calls",
    chartData: {
      labels: ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025"],
      firstMetricData: {
        name: "New Leads",
        data: [1488, 1400, 1300, 1200, 1100, 1000, 900, 744],
        comparisonData: [1190, 1120, 1040, 960, 880, 800, 720, 595],
      },
      secondMetricData: {
        name: "Calls",
        data: [400, 450, 500, 550, 600, 650, 700, 750],
        comparisonData: [320, 360, 400, 440, 480, 520, 560, 600],
      },
    },
  },
  "How many leads have we not acted on": {
    firstMetric: "New Leads",
    secondMetric: "Leads Not Acted On",
    chartData: {
      labels: ["Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025"],
      firstMetricData: {
        name: "New Leads",
        data: [1488, 1400, 1300, 1200, 1100, 1000, 900, 744],
        comparisonData: [1190, 1120, 1040, 960, 880, 800, 720, 595],
      },
      secondMetricData: {
        name: "Leads Not Acted On",
        data: [744, 800, 850, 900, 950, 1000, 1050, 1100],
        comparisonData: [595, 640, 680, 720, 760, 800, 840, 880],
      },
    },
  },
} as const;

// Metric cards data for each query type
export const QUERY_METRIC_CARDS = {
  "what team member is getting the most leads to respond": [
    {
      title: "NEW LEADS",
      value: "6,004",
      trend: "down" as const,
      color: "#3b82f6",
      tooltip: getMetricTooltip("New Leads"),
      metricName: "New Leads",
    },
    {
      title: "% OF LEADS RESPONDING",
      value: "9.9%",
      trend: "flat" as const,
      color: "#f97316",
      tooltip: getMetricTooltip("% of Leads Responding"),
      metricName: "% of Leads Responding",
    },
    {
      title: "% OF LEADS RESPONDING BY EMAIL",
      value: "2.5%",
      trend: "flat" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("% of Leads Responding by Email"),
      metricName: "% of Leads Responding by Email",
    },
    {
      title: "% OF LEADS RESPONDING BY PHONE",
      value: "2.0%",
      trend: "flat" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("% of Leads Responding by Phone"),
      metricName: "% of Leads Responding by Phone",
    },
    {
      title: "% OF LEADS RESPONDING BY TEXT",
      value: "8.4%",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("% of Leads Responding by Text"),
      metricName: "% of Leads Responding by Text",
    },
  ],
  "How quickly we follow up on leads": [
    {
      title: "NEW LEADS",
      value: "6,004",
      trend: "down" as const,
      color: "#3b82f6",
      tooltip: getMetricTooltip("New Leads"),
      metricName: "New Leads",
    },
    {
      title: "AVG. SPEED TO ACTION",
      value: "a month",
      trend: "up" as const,
      color: "#f97316",
      tooltip: getMetricTooltip("Avg. Speed to Action"),
      metricName: "Avg. Speed to Action",
    },
    {
      title: "AVG. SPEED TO FIRST CALL",
      value: "23 days",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Avg. Speed to First Call"),
      metricName: "Avg. Speed to First Call",
    },
    {
      title: "AVG. SPEED TO FIRST TEXT MESSAGE",
      value: "a month",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Avg. Speed to First Text Message"),
      metricName: "Avg. Speed to First Text Message",
    },
    {
      title: "AVG. SPEED TO FIRST EMAIL",
      value: "2 months",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Avg. Speed to First Email"),
      metricName: "Avg. Speed to First Email",
    },
  ],
  "How many times we try to contact each lead": [
    {
      title: "NEW LEADS",
      value: "6,004",
      trend: "down" as const,
      color: "#3b82f6",
      tooltip: getMetricTooltip("New Leads"),
      metricName: "New Leads",
    },
    {
      title: "AVG. CONTACT ATTEMPTS",
      value: "2.37",
      trend: "down" as const,
      color: "#f97316",
      tooltip: getMetricTooltip("Avg. Contact Attempts"),
      metricName: "Avg. Contact Attempts",
    },
    {
      title: "AVG. CALL ATTEMPTS",
      value: "0.23",
      trend: "down" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Avg. Call Attempts"),
      metricName: "Avg. Call Attempts",
    },
    {
      title: "AVG. EMAIL ATTEMPTS",
      value: "1.44",
      trend: "down" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Avg. Email Attempts"),
      metricName: "Avg. Email Attempts",
    },
    {
      title: "AVG. TEXT MESSAGE ATTEMPTS",
      value: "0.70",
      trend: "down" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Avg. Text Message Attempts"),
      metricName: "Avg. Text Message Attempts",
    },
  ],
  "which team member has the best response time": [
    {
      title: "NEW LEADS",
      value: "6,004",
      trend: "down" as const,
      color: "#3b82f6",
      tooltip: getMetricTooltip("New Leads"),
      metricName: "New Leads",
    },
    {
      title: "DEALS CLOSED",
      value: "1",
      trend: "flat" as const,
      color: "#f97316",
      tooltip: getMetricTooltip("Deals Closed"),
      metricName: "Deals Closed",
    },
    {
      title: "DEAL VALUE",
      value: "$1,061,000",
      trend: "flat" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Deal Value"),
      metricName: "Deal Value",
    },
    {
      title: "DEAL COMMISSION",
      value: "$0",
      trend: "flat" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Deal Commission"),
      metricName: "Deal Commission",
    },
    {
      title: "CONVERSION RATE",
      value: "0.03%",
      trend: "flat" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Conversion Rate"),
      metricName: "Conversion Rate",
    },
  ],
  "Total lead count and total agent activity": [
    {
      title: "NEW LEADS",
      value: "6,004",
      trend: "up" as const,
      color: "#3b82f6",
      tooltip: getMetricTooltip("New Leads"),
      metricName: "New Leads",
    },
    {
      title: "INITIALLY ASSIGNED LEADS",
      value: "6,004",
      trend: "up" as const,
      color: "#3b82f6",
      tooltip: getMetricTooltip("Initially Assigned Leads"),
      metricName: "Initially Assigned Leads",
    },
    {
      title: "CURRENTLY ASSIGNED LEADS",
      value: "6,015",
      trend: "up" as const,
      color: "#3b82f6",
      tooltip: getMetricTooltip("Currently Assigned Leads"),
      metricName: "Currently Assigned Leads",
    },
    {
      title: "CALLS",
      value: "3,310",
      trend: "up" as const,
      color: "#f97316",
      tooltip: getMetricTooltip("Calls"),
      metricName: "Calls",
    },
    {
      title: "EMAILS",
      value: "19,480",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Emails"),
      metricName: "Emails",
    },
    {
      title: "TEXTS",
      value: "6,829",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Texts"),
      metricName: "Texts",
    },
    {
      title: "NOTES",
      value: "700",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Notes"),
      metricName: "Notes",
    },
    {
      title: "TASKS COMPLETED",
      value: "66",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Tasks Completed"),
      metricName: "Tasks Completed",
    },
    {
      title: "APPOINTMENTS SET",
      value: "10",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Appointments Set"),
      metricName: "Appointments Set",
    },
    {
      title: "APPOINTMENTS",
      value: "936",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Appointments"),
      metricName: "Appointments",
    },
  ],
  "How many leads have we not acted on": [
    {
      title: "NEW LEADS",
      value: "6,004",
      trend: "down" as const,
      color: "#3b82f6",
      tooltip: getMetricTooltip("New Leads"),
      metricName: "New Leads",
    },
    {
      title: "LEADS NOT ACTED ON",
      value: "254",
      trend: "up" as const,
      color: "#f97316",
      tooltip: getMetricTooltip("Leads Not Acted On"),
      metricName: "Leads Not Acted On",
    },
    {
      title: "LEADS NOT CALLED",
      value: "4,642",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Leads Not Called"),
      metricName: "Leads Not Called",
    },
    {
      title: "LEADS NOT EMAILED",
      value: "267",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Leads Not Emailed"),
      metricName: "Leads Not Emailed",
    },
    {
      title: "LEADS NOT TEXTED",
      value: "4,799",
      trend: "up" as const,
      color: "#6b7280",
      tooltip: getMetricTooltip("Leads Not Texted"),
      metricName: "Leads Not Texted",
    },
  ],
} as const;

// Agent table data for each query type (to be used later)
export const QUERY_AGENT_TABLE_DATA = {
  "what team member is getting the most leads to respond": {
    columns: ["Name", "New Leads", "% of Leads Responding", "% of Leads Responding by Email", "% of Leads Responding by Phone", "% of Leads Responding by Text"],
    agents: [
      {
        name: "Monisha Satkunarajah",
        initials: "MS",
        "New Leads": 2,
        "% of Leads Responding": 100.0,
        "% of Leads Responding by Email": 0.0,
        "% of Leads Responding by Phone": 100.0,
        "% of Leads Responding by Text": 100.0,
      },
      {
        name: "Kobu Sivarajah (Buy.ca)",
        initials: "KS",
        "New Leads": 9,
        "% of Leads Responding": 88.9,
        "% of Leads Responding by Email": 77.8,
        "% of Leads Responding by Phone": 66.7,
        "% of Leads Responding by Text": 88.9,
      },
      {
        name: "Jeneevan Theivandran",
        initials: "JT",
        "New Leads": 4,
        "% of Leads Responding": 50.0,
        "% of Leads Responding by Email": 50.0,
        "% of Leads Responding by Phone": 25.0,
        "% of Leads Responding by Text": 100.0,
      },
      {
        name: "Albi Leka",
        initials: "AL",
        "New Leads": 5989,
        "% of Leads Responding": 9.7,
        "% of Leads Responding by Email": 2.4,
        "% of Leads Responding by Phone": 1.8,
        "% of Leads Responding by Text": 8.2,
      },
    ],
  },
  "How quickly we follow up on leads": {
    columns: ["Name", "New Leads", "Avg. Speed to Action", "Avg. Speed to First Call", "Avg. Speed to First Text Message", "Avg. Speed to First Email"],
    agents: [
      {
        name: "Kobu Sivarajah (Buy.ca)",
        initials: "KS",
        "New Leads": 9,
        "Avg. Speed to Action": 1,
        "Avg. Speed to First Call": 1,
        "Avg. Speed to First Text Message": 1,
        "Avg. Speed to First Email": 1,
      },
      {
        name: "Monisha Satkunarajah",
        initials: "MS",
        "New Leads": 2,
        "Avg. Speed to Action": 1,
        "Avg. Speed to First Call": 1,
        "Avg. Speed to First Text Message": 2,
        "Avg. Speed to First Email": 2,
      },
      {
        name: "Albi Leka",
        initials: "AL",
        "New Leads": 5989,
        "Avg. Speed to Action": 2,
        "Avg. Speed to First Call": 5,
        "Avg. Speed to First Text Message": 6,
        "Avg. Speed to First Email": 2,
      },
      {
        name: "Jeneevan Theivandran",
        initials: "JT",
        "New Leads": 4,
        "Avg. Speed to Action": 2,
        "Avg. Speed to First Call": 7,
        "Avg. Speed to First Text Message": 3,
        "Avg. Speed to First Email": 3,
      },
    ],
  },
  "How many times we try to contact each lead": {
    columns: ["Name", "New Leads", "Avg. Contact Attempts", "Avg. Call Attempts", "Avg. Email Attempts", "Avg. Text Message Attempts"],
    agents: [
      {
        name: "Kobu Sivarajah (Buy.ca)",
        initials: "KS",
        "New Leads": 9,
        "Avg. Contact Attempts": 130.56,
        "Avg. Call Attempts": 9.56,
        "Avg. Email Attempts": 5.56,
        "Avg. Text Message Attempts": 115.44,
      },
      {
        name: "Monisha Satkunarajah",
        initials: "MS",
        "New Leads": 2,
        "Avg. Contact Attempts": 74.00,
        "Avg. Call Attempts": 1.50,
        "Avg. Email Attempts": 0.00,
        "Avg. Text Message Attempts": 72.50,
      },
      {
        name: "Jeneevan Theivandran",
        initials: "JT",
        "New Leads": 4,
        "Avg. Contact Attempts": 18.25,
        "Avg. Call Attempts": 0.00,
        "Avg. Email Attempts": 1.25,
        "Avg. Text Message Attempts": 17.00,
      },
      {
        name: "Albi Leka",
        initials: "AL",
        "New Leads": 5989,
        "Avg. Contact Attempts": 2.14,
        "Avg. Call Attempts": 0.22,
        "Avg. Email Attempts": 1.44,
        "Avg. Text Message Attempts": 0.49,
      },
    ],
  },
  "which team member has the best response time": {
    columns: ["Name", "New Leads", "Appointments", "Avg. Contact Attempts", "Deals Closed", "Deal Value", "Deal Commission", "Conversion Rate"],
    agents: [
      {
        name: "Albi Leka",
        initials: "AL",
        "New Leads": 5989,
        "Appointments": 515,
        "Avg. Contact Attempts": 2.14,
        "Deals Closed": 1,
        "Deal Value": 1061000,
        "Deal Commission": 0,
        "Conversion Rate": 0.02,
      },
      {
        name: "Senthu Velnyagam",
        initials: "SV",
        "New Leads": 0,
        "Appointments": 8,
        "Avg. Contact Attempts": 0.00,
        "Deals Closed": 1,
        "Deal Value": 1061000,
        "Deal Commission": 0,
        "Conversion Rate": null,
      },
      {
        name: "Aniya Wilson",
        initials: "AW",
        "New Leads": 0,
        "Appointments": 2,
        "Avg. Contact Attempts": 0.00,
        "Deals Closed": 0,
        "Deal Value": 0,
        "Deal Commission": 0,
        "Conversion Rate": null,
      },
      {
        name: "Ben Lotha",
        initials: "BL",
        "New Leads": 0,
        "Appointments": 18,
        "Avg. Contact Attempts": 0.00,
        "Deals Closed": 0,
        "Deal Value": 0,
        "Deal Commission": 0,
        "Conversion Rate": null,
      },
    ],
  },
  "Total lead count and total agent activity": {
    columns: ["Name", "New Leads", "Initially Assigned Leads", "Currently Assigned Leads", "Calls", "Emails", "Texts", "Notes", "Tasks Completed", "Appointments Set", "Appointments"],
    agents: [
      {
        name: "Albi Leka",
        initials: "AL",
        "New Leads": 5989,
        "Initially Assigned Leads": 6004,
        "Currently Assigned Leads": 5994,
        "Calls": 1763,
        "Emails": 10356,
        "Texts": 3360,
        "Notes": 569,
        "Tasks Completed": 45,
        "Appointments Set": 5,
        "Appointments": 515,
      },
      {
        name: "Kobu Sivarajah (Buy.ca)",
        initials: "KS",
        "New Leads": 9,
        "Initially Assigned Leads": 0,
        "Currently Assigned Leads": 11,
        "Calls": 232,
        "Emails": 1903,
        "Texts": 1759,
        "Notes": 4,
        "Tasks Completed": 2,
        "Appointments Set": 0,
        "Appointments": 2,
      },
      {
        name: "Ven Velnayagam",
        initials: "VV",
        "New Leads": 0,
        "Initially Assigned Leads": 0,
        "Currently Assigned Leads": 0,
        "Calls": 547,
        "Emails": 5126,
        "Texts": 75,
        "Notes": 40,
        "Tasks Completed": 0,
        "Appointments Set": 0,
        "Appointments": 381,
      },
    ],
  },
  "How many leads have we not acted on": {
    columns: ["Name", "New Leads", "Leads Not Acted On", "Leads Not Called", "Leads Not Emailed", "Leads Not Texted"],
    agents: [
      {
        name: "Albi Leka",
        initials: "AL",
        "New Leads": 5989,
        "Leads Not Acted On": 254,
        "Leads Not Called": 4641,
        "Leads Not Emailed": 267,
        "Leads Not Texted": 4799,
      },
      {
        name: "Jeneevan Theivandran",
        initials: "JT",
        "New Leads": 4,
        "Leads Not Acted On": 0,
        "Leads Not Called": 1,
        "Leads Not Emailed": 0,
        "Leads Not Texted": 0,
      },
      {
        name: "Kobu Sivarajah (Buy.ca)",
        initials: "KS",
        "New Leads": 9,
        "Leads Not Acted On": 0,
        "Leads Not Called": 0,
        "Leads Not Emailed": 0,
        "Leads Not Texted": 0,
      },
      {
        name: "Monisha Satkunarajah",
        initials: "MS",
        "New Leads": 2,
        "Leads Not Acted On": 0,
        "Leads Not Called": 0,
        "Leads Not Emailed": 0,
        "Leads Not Texted": 0,
      },
    ],
  },
} as const;

// Helper function to get data for a specific query
export const getQueryData = (query: string) => {
  return {
    chartData: QUERY_CHART_DATA[query as keyof typeof QUERY_CHART_DATA] || QUERY_CHART_DATA["what team member is getting the most leads to respond"],
    metricCards: QUERY_METRIC_CARDS[query as keyof typeof QUERY_METRIC_CARDS] || QUERY_METRIC_CARDS["what team member is getting the most leads to respond"],
    agentTable: QUERY_AGENT_TABLE_DATA[query as keyof typeof QUERY_AGENT_TABLE_DATA] || QUERY_AGENT_TABLE_DATA["what team member is getting the most leads to respond"],
  };
};
