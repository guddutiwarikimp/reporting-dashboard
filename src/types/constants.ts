export interface MetricItem {
  name: string;
  tooltip: string;
}

export interface QueryItem {
  id: string;
  name: string;
  description: string;
  tooltip?: string;
}

export interface FilterOption {
  label: string;
  value: string;
  icon?: string;
}

export interface ChartColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
}

export interface TimePeriod {
  daily: string;
  weekly: string;
  monthly: string;
  yearly: string;
}

export interface ProfileCard {
  id: string;
  name: string;
  avatar: string;
  role: string;
  stats: {
    leads: number;
    calls: number;
    emails: number;
    texts: number;
  };
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  assignedTo: string;
  lastContact: string;
  value: number;
}
