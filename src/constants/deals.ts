// Types for deals data structure
export interface DealStage {
  key: string;
  title: string;
  count: number;
  total: string;
  avg: string;
  commission: string;
  commissionAvg: string;
  color: string;
  isSelected: boolean;
}

export interface DealTableRow {
  key: string;
  name: string;
  stage: string;
  status: string;
  enteredStage: string;
  timeInStage: string;
  closeDate: string;
  timeToClose: string;
  price: string;
  commission: string;
  agentCommission: string;
  teamCommission: string;
  people: string[];
  team: string[];
  contactLeadSource: string;
  marketingLeadSource: string;
}

export interface DealChartData {
  timeLabels: string[];
  deals: number[];
  priceTotal: number[];
  commissionTotal: number[];
  priceAvg: number[];
  commissionAvg: number[];
}

export interface DealSummaryStats {
  closedDeals: {
    count: number;
    total: string;
    avg: string;
    commission: string;
    commissionAvg: string;
  };
  upcomingDeals: {
    count: number;
    total: string;
    avg: string;
    commission: string;
    commissionAvg: string;
  };
}

export interface DealMetric {
  name: string;
  tooltip: string;
}

export interface DealFilterOption {
  label: string;
  value?: string;
}

// Centralized deals data store
export class DealsDataStore {
  private static instance: DealsDataStore;
  
  // Pipeline stages data
  private pipelineStages: DealStage[] = [
    {
        key: 'rejected-leads',
        title: 'Rejected Leads',
        count: 3301,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-orange-500',
        isSelected: true
    },
    {
        key: 'approved-leads',
        title: 'Approved Leads',
        count: 465,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-teal-500',
        isSelected: true
    },
    {
        key: 'backlog',
        title: 'Backlog',
        count: 2885,
        total: '$210K',
        avg: '$210K',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-blue-500',
        isSelected: true
    },
    {
        key: 'demo-booked', 
        title: 'Demo Booked',
        count: 662,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-purple-500',
        isSelected: true
    },
    {
        key: 'demo-joined',
        title: 'Demo Joined',
        count: 287,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-teal-500',
        isSelected: true
    },
    {
        key: 'perch-profile-created',
        title: 'Perch Profile Created',
        count: 231,
        total: '$2.1M',
        avg: '$703K',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-teal-500',
        isSelected: true
    },
    {
        key: 'perch-profile-completed',
        title: 'Perch Profile Completed',
        count: 156,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-red-500',
        isSelected: true
    },
    {
        key: 'pre-approved',
        title: 'Pre Approved',
        count: 89,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-green-500',
        isSelected: true
    },
    {
        key: 'agent-assigned',
        title: 'Agent Assigned',
        count: 134,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-indigo-500',
        isSelected: true
    },
    {
        key: 'offer-approved',
        title: 'Offer Approved',
        count: 67,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-yellow-500',
        isSelected: true
    },
    {
        key: 'mortgage-lawyer',
        title: 'Mortgage & Lawyer',
        count: 45,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-pink-500',
        isSelected: true
    },
    {
        key: 'properties-closed',
        title: 'Properties Closed',
        count: 23,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-emerald-500',
        isSelected: true
    },
    {
        key: 'final-formalities',
        title: 'Final Formalities',
        count: 12,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-violet-500',
        isSelected: true
    },
    {
        key: 'mortgage-only',
        title: 'Mortgage Only',
        count: 8,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-cyan-500',
        isSelected: true
    },
    {
        key: 'deal-completed',
        title: 'Deal Completed',
        count: 15,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-lime-500',
        isSelected: true
    },
    {
        key: 'failed-deals',
        title: 'Failed Deals',
        count: 34,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-rose-500',
        isSelected: true
    },
    {
        key: 'bad-leads-stop-communication',
        title: 'Bad Leads - Stop Communication',
        count: 156,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-gray-500',
        isSelected: true
    },
    {
        key: 'nurture-further',
        title: 'Nurture Further',
        count: 89,
        total: '$0',
        avg: '$0',
        commission: '$0',
        commissionAvg: '$0',
        color: 'bg-amber-500',
        isSelected: true
    }
  ];

  // Chart data
  private chartData: DealChartData = {
    timeLabels: ['Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026'],
    deals: [2, 3, 2, 1, 2, 3, 4, 3, 2, 1, 2, 3, 4],
    priceTotal: [1200000, 1800000, 1200000, 800000, 1600000, 2400000, 3200000, 2400000, 1600000, 800000, 1600000, 2400000, 3200000],
    commissionTotal: [120000, 180000, 120000, 80000, 160000, 240000, 320000, 240000, 160000, 80000, 160000, 240000, 320000],
    priceAvg: [600000, 600000, 600000, 800000, 800000, 800000, 800000, 800000, 800000, 800000, 800000, 800000, 800000],
    commissionAvg: [60000, 60000, 60000, 80000, 80000, 80000, 80000, 80000, 80000, 80000, 80000, 80000, 80000]
  };

// Summary statistics
  private summaryStats: DealSummaryStats = {
    closedDeals: {
        count: 10,
        total: '$7.6M',
        avg: '$763.1K',
        commission: '$0',
        commissionAvg: '$0'
    },
    upcomingDeals: {
        count: 7,
        total: '$5.8M',
        avg: '$831.4K',
        commission: '$0',
        commissionAvg: '$0'
    }
  };

  // Table data
  private tableData: DealTableRow[] = [
    {
        key: '1',
        name: 'T2 Suite 1801 - The East Mall, Etobicoke, ON',
        stage: 'Deal Completed',
        status: 'Active',
        enteredStage: 'Jul 17 2025',
        timeInStage: '39 days',
        closeDate: 'Apr 14 2028',
        timeToClose: '1002 days',
        price: '$800K',
        commission: '$0',
        agentCommission: '',
        teamCommission: '',
        people: [],
        team: ['S', 'AL'],
        contactLeadSource: '',
        marketingLeadSource: '',
    },
    {
        key: '2',
        name: '201 NW Tower Pickering City Centre',
        stage: 'Deal Completed',
        status: 'Active',
        enteredStage: 'Jul 17 2025',
        timeInStage: '39 days',
        closeDate: 'Apr 14 2028',
        timeToClose: '1002 days',
        price: '$550K',
        commission: '$0',
        agentCommission: '',
        teamCommission: '',
        people: [],
        team: ['S', 'AL'],
        contactLeadSource: '',
      marketingLeadSource: ''
    },
    {
      key: '3',
        name: 'T2 Suite 2106 - The East Mall, Etobicoke, ON',
        stage: 'Deal Completed',
        status: 'Active',
        enteredStage: 'Jul 17 2025',
        timeInStage: '39 days',
        closeDate: 'Oct 14 2027',
        timeToClose: '819 days',
        price: '$1.1M',
        commission: '$0',
        agentCommission: '',
        teamCommission: '',
        people: [],
        team: ['S', 'AL'],
        contactLeadSource: '',
      marketingLeadSource: ''
    },
    {
      key: '4',
        name: 'T2 Suite 2002 - The East Mall, Etobicoke, ON',
        stage: 'Deal Completed',
        status: 'Active',
        enteredStage: 'Jul 17 2025',
        timeInStage: '39 days',
        closeDate: 'Apr 14 2027',
        timeToClose: '636 days',
        price: '$950K',
        commission: '$0',
        agentCommission: '',
        teamCommission: '',
        people: [],
        team: ['S', 'AL'],
        contactLeadSource: '',
      marketingLeadSource: ''
    },
    {
      key: '5',
        name: 'T2 Suite 2105 - The East Mall, Etobicoke, ON',
        stage: 'Deal Completed',
        status: 'Active',
        enteredStage: 'Jul 17 2025',
        timeInStage: '39 days',
        closeDate: 'Oct 24 2026',
        timeToClose: '464 days',
        price: '$1M',
      commission: '$0',
      agentCommission: '',
      teamCommission: '',
      people: [],
      team: ['S', 'AL'],
      contactLeadSource: '',
      marketingLeadSource: ''
    },
    {
        key: '6',
        name: 'T2 Suite 1806 - The East Mall, Etobicoke, ON',
        stage: 'Deal Completed',
        status: 'Active',
        enteredStage: 'Jul 17 2025',
        timeInStage: '39 days',
        closeDate: 'Apr 14 2028',
        timeToClose: '1002 days',
        price: '$800K',
      commission: '$0',
      agentCommission: '',
      teamCommission: '',
      people: ['BO'],
      team: ['S', 'AL'],
      contactLeadSource: 'buy.ca',
      marketingLeadSource: 'Facebook Ads'
    },
    {
        key: '7',
        name: 'T2 Suite 1807 - The East Mall, Etobicoke, ON',
        stage: 'Deal Completed',
        status: 'Active',
        enteredStage: 'Jul 17 2025',
        timeInStage: '39 days',
        closeDate: 'Apr 14 2028',
        timeToClose: '1002 days',
        price: '$750K',
      commission: '$0',
      agentCommission: '',
      teamCommission: '',
      people: ['AD'],
      team: ['S', 'AL'],
      contactLeadSource: 'buy.ca',
      marketingLeadSource: 'Google'
    }
  ];

  // Filter options
  private dropdownFilters: DealFilterOption[] = [
    { label: "Buyers" },
    { label: "All deals" },
    { label: "All Sources" },
    { label: "Everyone" }
  ];

  private mobileFilters: Array<{ key: number; name: string }> = [
    { key: 1, name: "Buyers" },
    { key: 2, name: "All deals" },
    { key: 3, name: "All Sources" },
    { key: 4, name: "Everyone" }
  ];

  private filterDrawerOptions: string[] = [
    "Buyers",
    "Sellers",
    "Investors",
    "First-time buyers",
    "All deals",
    "Active deals",
    "Closed deals",
    "All Sources",
    "Website",
    "Referral",
    "Social Media",
    "Everyone",
    "My team",
    "All agents"
  ];

  // Metrics
  private metrics: DealMetric[] = [
    {
        name: "Deals",
        tooltip: "Total number of deals in the pipeline"
    },
    {
        name: "Commission Total",
        tooltip: "Total commission value of all deals"
    },
    {
        name: "Price Avg.",
        tooltip: "Average price value of deals"
    },
    {
        name: "Commission Avg.",
        tooltip: "Average commission value of deals"
    }
  ];

  private secondMetrics: DealMetric[] = [
    {
        name: "Nothing",
        tooltip: "No secondary metric selected"
    },
    {
        name: "Price Total",
        tooltip: "Total price value of all deals"
    },
    {
        name: "Commission Total",
        tooltip: "Total commission value of all deals"
    },
    {
        name: "Price Avg.",
        tooltip: "Average price value of deals"
    },
    {
        name: "Commission Avg.",
        tooltip: "Average commission value of deals"
    }
  ];

  // Time periods
  private timePeriods: string[] = [
    "all-time",
    "this-month",
    "last-month",
    "last-30-days",
    "last-90-days",
    "last-year",
    "year-to-date"
  ];

  private timePeriodLabels: Record<string, string> = {
    "all-time": "All time",
    "this-month": "This month",
    "last-month": "Last month",
    "last-30-days": "Last 30 days",
    "last-90-days": "Last 90 days",
    "last-year": "Last year",
    "year-to-date": "Year to date"
  };

  // Status colors
  private statusColors: Record<string, string> = {
    'Active': 'bg-blue-100 text-blue-800',
    'Under Contract': 'bg-yellow-100 text-yellow-800',
    'Closed': 'bg-green-100 text-green-800',
    'Pending': 'bg-gray-100 text-gray-800'
  };

  // Singleton pattern
  public static getInstance(): DealsDataStore {
    if (!DealsDataStore.instance) {
      DealsDataStore.instance = new DealsDataStore();
    }
    return DealsDataStore.instance;
  }

  // Getters for all data
  public getPipelineStages(): DealStage[] {
    return [...this.pipelineStages];
  }

  public getChartData(): DealChartData {
    return { ...this.chartData };
  }

  public getSummaryStats(): DealSummaryStats {
    return { ...this.summaryStats };
  }

  public getTableData(): DealTableRow[] {
    return [...this.tableData];
  }

  public getDropdownFilters(): DealFilterOption[] {
    return [...this.dropdownFilters];
  }

  public getMobileFilters(): Array<{ key: number; name: string }> {
    return [...this.mobileFilters];
  }

  public getFilterDrawerOptions(): string[] {
    return [...this.filterDrawerOptions];
  }

  public getMetrics(): DealMetric[] {
    return [...this.metrics];
  }

  public getSecondMetrics(): DealMetric[] {
    return [...this.secondMetrics];
  }

  public getTimePeriods(): string[] {
    return [...this.timePeriods];
  }

  public getTimePeriodLabels(): Record<string, string> {
    return { ...this.timePeriodLabels };
  }

  public getStatusColors(): Record<string, string> {
    return { ...this.statusColors };
  }

  // Methods to update data (for future API integration)
  public async refreshData(): Promise<void> {
    // This method will be used to fetch fresh data from API
    // For now, it's a placeholder
    console.log('Refreshing deals data...');
  }

  public async updatePipelineStages(stages: DealStage[]): Promise<void> {
    this.pipelineStages = stages;
  }

  public async updateChartData(data: DealChartData): Promise<void> {
    this.chartData = data;
  }

  public async updateTableData(data: DealTableRow[]): Promise<void> {
    this.tableData = data;
  }

  public async updateSummaryStats(stats: DealSummaryStats): Promise<void> {
    this.summaryStats = stats;
  }
}

// Export the singleton instance
export const dealsDataStore = DealsDataStore.getInstance();

// Legacy exports for backward compatibility (deprecated - use dealsDataStore instead)
export const DEALS_DROPDOWN_FILTERS = dealsDataStore.getDropdownFilters();
export const DEALS_MOBILE_FILTERS = dealsDataStore.getMobileFilters();
export const DEALS_FILTER_DRAWER_OPTIONS = dealsDataStore.getFilterDrawerOptions();
export const DEALS_PIPELINE_STAGES = dealsDataStore.getPipelineStages();
export const DEALS_CHART_DATA = dealsDataStore.getChartData();
export const DEALS_SUMMARY_STATS = dealsDataStore.getSummaryStats();
export const DEALS_TABLE_DATA = dealsDataStore.getTableData();
export const DEALS_STATUS_COLORS = dealsDataStore.getStatusColors();
export const DEALS_METRICS = dealsDataStore.getMetrics();
export const DEALS_SECOND_METRICS = dealsDataStore.getSecondMetrics();
export const DEALS_TIME_PERIODS = dealsDataStore.getTimePeriods();
export const DEALS_TIME_PERIOD_LABELS = dealsDataStore.getTimePeriodLabels();
