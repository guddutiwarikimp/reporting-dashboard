export interface ReportingTab {
  name: string;
  href: string;
  description?: string;
}

export const REPORTING_TABS: ReportingTab[] = [
  {
    name: "Overview",
    href: "/reporting",
    description: "General reporting overview",
  },
  {
    name: "Agent Activity",
    href: "/reporting/agent-activity",
    description: "Agent performance and activity metrics",
  },
  {
    name: "Properties",
    href: "/reporting/properties",
    description: "Property listings and performance data",
  },
  {
    name: "Lead Sources",
    href: "/reporting/lead-sources",
    description: "Lead generation and conversion analytics",
  },
  {
    name: "Calls",
    href: "/reporting/calls",
    description: "Call tracking and analytics",
  },
  {
    name: "Texts",
    href: "/reporting/texts",
    description: "Text message campaign performance",
  },
  {
    name: "Batch Emails",
    href: "/reporting/batch-emails",
    description: "Email campaign analytics",
  },
  {
    name: "Marketing",
    href: "/reporting/marketing",
    description: "Marketing campaign performance",
  },
  {
    name: "Deals",
    href: "/reporting/deals",
    description: "Deal pipeline and conversion metrics",
  },
  {
    name: "Appointments",
    href: "/reporting/appointments",
    description: "Appointment scheduling analytics",
  },
  {
    name: "Leaderboard",
    href: "/reporting/leaderboard",
    description: "Agent performance rankings",
  },
  {
    name: "Agent Goals",
    href: "/reporting/agent-goals",
    description: "Goal setting and achievement tracking",
  },
];

export const REPORTING_CONFIG = {
  title: "Reporting Dashboard",
  subtitle:
    "Select a tab above to view specific reports and analytics for your organization.",
  helpButton: {
    text: "How Reporting works",
    icon: "info",
  },
} as const;

// Agent Activity specific constants
export const AGENT_ACTIVITY_QUERIES = [
  "what team member is getting the most leads to respond",
  "How quickly we follow up on leads",
  "How many times we try to contact each lead",
  "which team member has the best response time",
  "Total lead count and total agent activity",
  "How many leads have we not acted on",
] as const;

export const AGENT_ACTIVITY_CONFIG = {
  defaultQuery: "what team member is getting the most leads to respond",
  cacheMessage: "Reporting results may be cached for up to 10 minutes.",
  refreshButtonText: "Refresh results",
  refreshingText: "Refreshing...",
  lastRefreshedPrefix: "Last refreshed:",
  neverRefreshedText: "Never",
} as const;
