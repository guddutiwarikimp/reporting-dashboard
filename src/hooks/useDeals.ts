import { useState, useEffect, useCallback, useMemo } from "react";
import { dealsDataStore, type DealStage, type DealMetric, type DealTableRow } from "../constants/deals";

type DealsMetric = string;
type DealsSecondMetric = string;
type DealsTimePeriod = string;

export interface DealsState {
  // Pipeline stages
  pipelineStages: DealStage[];
  selectedStages: string[];
  
  // Chart data
  chartData: ReturnType<typeof dealsDataStore.getChartData>;
  selectedMetric: DealsMetric;
  selectedSecondMetric: DealsSecondMetric;
  timePeriod: DealsTimePeriod;
  
  // Table data
  tableData: DealTableRow[];
  filteredTableData: DealTableRow[];
  
  // UI state
  isRefreshing: boolean;
  lastRefreshed: Date | null;
  compareToPrevious: boolean;
}

export interface DealsActions {
  // Stage management
  handleStageToggle: (stageKey: string, checked: boolean) => void;
  selectAllStages: () => void;
  deselectAllStages: () => void;
  
  // Chart controls
  setSelectedMetric: (metric: DealsMetric) => void;
  setSelectedSecondMetric: (metric: DealsSecondMetric) => void;
  setTimePeriod: (period: DealsTimePeriod) => void;
  setCompareToPrevious: (compare: boolean) => void;
  
  // Data refresh
  handleRefresh: () => Promise<void>;
  
  // Filtering
  filterTableByStages: (stages: string[]) => DealTableRow[];
}

export function useDeals(): DealsState & DealsActions {
  // Initialize state from data store
  const [pipelineStages, setPipelineStages] = useState<DealStage[]>(() => 
    dealsDataStore.getPipelineStages()
  );
  
  const [selectedStages, setSelectedStages] = useState<string[]>(() =>
    pipelineStages.filter((stage) => stage.isSelected).map((stage) => stage.key)
  );
  
  const [chartData, setChartData] = useState(() => dealsDataStore.getChartData());
  const [tableData, setTableData] = useState(() => dealsDataStore.getTableData());
  
  // Chart state management
  const [selectedMetric, setSelectedMetric] = useState<DealsMetric>(
    dealsDataStore.getMetrics()[0].name
  );
  const [selectedSecondMetric, setSelectedSecondMetric] = useState<DealsSecondMetric>(
    dealsDataStore.getSecondMetrics()[0].name
  );
  const [timePeriod, setTimePeriod] = useState<DealsTimePeriod>(
    dealsDataStore.getTimePeriods()[0]
  );
  
  // UI state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [compareToPrevious, setCompareToPrevious] = useState(false);

  // Set initial date only on client side to prevent hydration mismatch
  useEffect(() => {
    setLastRefreshed(new Date());
  }, []);

  // Computed filtered table data based on selected stages
  const filteredTableData = useMemo(() => {
    if (selectedStages.length === 0) return tableData;
    return tableData.filter(deal => selectedStages.includes(deal.stage.toLowerCase().replace(/\s+/g, '-')));
  }, [tableData, selectedStages]);

  // Stage management
  const handleStageToggle = useCallback((stageKey: string, checked: boolean) => {
    if (checked) {
      setSelectedStages((prev) => [...prev, stageKey]);
    } else {
      setSelectedStages((prev) => prev.filter((key) => key !== stageKey));
    }
  }, []);

  const selectAllStages = useCallback(() => {
    setSelectedStages(pipelineStages.map(stage => stage.key));
  }, [pipelineStages]);

  const deselectAllStages = useCallback(() => {
    setSelectedStages([]);
  }, []);

  // Data refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    
    try {
      // Refresh data from store (in future, this will call API)
      await dealsDataStore.refreshData();
      
      // Update local state with fresh data
      setPipelineStages(dealsDataStore.getPipelineStages());
      setChartData(dealsDataStore.getChartData());
      setTableData(dealsDataStore.getTableData());
      
      // Update last refreshed timestamp
      setLastRefreshed(new Date());
    } catch (error) {
      console.error('Failed to refresh deals data:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Filtering
  const filterTableByStages = useCallback((stages: string[]) => {
    if (stages.length === 0) return tableData;
    return tableData.filter(deal => 
      stages.some(stage => 
        deal.stage.toLowerCase().replace(/\s+/g, '-') === stage
      )
    );
  }, [tableData]);

  return {
    // State
    pipelineStages,
    selectedStages,
    chartData,
    selectedMetric,
    selectedSecondMetric,
    timePeriod,
    tableData,
    filteredTableData,
    isRefreshing,
    lastRefreshed,
    compareToPrevious,
    
    // Actions
    handleStageToggle,
    selectAllStages,
    deselectAllStages,
    setSelectedMetric,
    setSelectedSecondMetric,
    setTimePeriod,
    setCompareToPrevious,
    handleRefresh,
    filterTableByStages,
  };
}
