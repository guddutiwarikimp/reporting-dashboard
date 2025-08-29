import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { dealsDataStore, type DealStage, type DealTableRow, type DealChartData, type DealSummaryStats } from '../constants/deals';

// Types
export interface DealsState {
  // Pipeline stages
  pipelineStages: DealStage[];
  selectedStages: string[];
  
  // Chart data
  chartData: DealChartData;
  selectedMetric: string;
  selectedSecondMetric: string;
  timePeriod: string;
  
  // Table data
  tableData: DealTableRow[];
  filteredTableData: DealTableRow[];
  
  // UI state
  isRefreshing: boolean;
  lastRefreshed: Date | null;
  compareToPrevious: boolean;
  
  // Filters
  activeFilters: {
    dealType: string;
    leadSource: string;
    agent: string;
    status: string;
  };
}

export type DealsAction =
  | { type: 'SET_PIPELINE_STAGES'; payload: DealStage[] }
  | { type: 'TOGGLE_STAGE'; payload: { stageKey: string; checked: boolean } }
  | { type: 'SELECT_ALL_STAGES' }
  | { type: 'DESELECT_ALL_STAGES' }
  | { type: 'SET_SELECTED_METRIC'; payload: string }
  | { type: 'SET_SECOND_METRIC'; payload: string }
  | { type: 'SET_TIME_PERIOD'; payload: string }
  | { type: 'SET_COMPARE_TO_PREVIOUS'; payload: boolean }
  | { type: 'SET_TABLE_DATA'; payload: DealTableRow[] }
  | { type: 'SET_CHART_DATA'; payload: DealChartData }
  | { type: 'SET_SUMMARY_STATS'; payload: DealSummaryStats }
  | { type: 'SET_REFRESHING'; payload: boolean }
  | { type: 'SET_LAST_REFRESHED'; payload: Date }
  | { type: 'SET_FILTER'; payload: { key: keyof DealsState['activeFilters']; value: string } }
  | { type: 'REFRESH_DATA' };

// Initial state
const initialState: DealsState = {
  pipelineStages: dealsDataStore.getPipelineStages(),
  selectedStages: dealsDataStore.getPipelineStages().filter(stage => stage.isSelected).map(stage => stage.key),
  chartData: dealsDataStore.getChartData(),
  selectedMetric: dealsDataStore.getMetrics()[0].name,
  selectedSecondMetric: dealsDataStore.getSecondMetrics()[0].name,
  timePeriod: dealsDataStore.getTimePeriods()[0],
  tableData: dealsDataStore.getTableData(),
  filteredTableData: dealsDataStore.getTableData(),
  isRefreshing: false,
  lastRefreshed: new Date(),
  compareToPrevious: false,
  activeFilters: {
    dealType: '',
    leadSource: '',
    agent: '',
    status: ''
  }
};

// Reducer
function dealsReducer(state: DealsState, action: DealsAction): DealsState {
  switch (action.type) {
    case 'SET_PIPELINE_STAGES':
      return {
        ...state,
        pipelineStages: action.payload,
        selectedStages: action.payload.filter(stage => stage.isSelected).map(stage => stage.key)
      };
    
    case 'TOGGLE_STAGE': {
      const { stageKey, checked } = action.payload;
      const newSelectedStages = checked
        ? [...state.selectedStages, stageKey]
        : state.selectedStages.filter(key => key !== stageKey);
      
      // Update filtered table data based on selected stages
      const newFilteredTableData = newSelectedStages.length === 0
        ? state.tableData
        : state.tableData.filter(deal => 
            newSelectedStages.some(stage => 
              deal.stage.toLowerCase().replace(/\s+/g, '-') === stage
            )
          );
      
      return {
        ...state,
        selectedStages: newSelectedStages,
        filteredTableData: newFilteredTableData
      };
    }
    
    case 'SELECT_ALL_STAGES': {
      const allStageKeys = state.pipelineStages.map(stage => stage.key);
      return {
        ...state,
        selectedStages: allStageKeys,
        filteredTableData: state.tableData
      };
    }
    
    case 'DESELECT_ALL_STAGES':
      return {
        ...state,
        selectedStages: [],
        filteredTableData: []
      };
    
    case 'SET_SELECTED_METRIC':
      return { ...state, selectedMetric: action.payload };
    
    case 'SET_SECOND_METRIC':
      return { ...state, selectedSecondMetric: action.payload };
    
    case 'SET_TIME_PERIOD':
      return { ...state, timePeriod: action.payload };
    
    case 'SET_COMPARE_TO_PREVIOUS':
      return { ...state, compareToPrevious: action.payload };
    
    case 'SET_TABLE_DATA':
      return { ...state, tableData: action.payload };
    
    case 'SET_CHART_DATA':
      return { ...state, chartData: action.payload };
    
    case 'SET_SUMMARY_STATS':
      return { ...state };
    
    case 'SET_REFRESHING':
      return { ...state, isRefreshing: action.payload };
    
    case 'SET_LAST_REFRESHED':
      return { ...state, lastRefreshed: action.payload };
    
    case 'SET_FILTER':
      return {
        ...state,
        activeFilters: {
          ...state.activeFilters,
          [action.payload.key]: action.payload.value
        }
      };
    
    case 'REFRESH_DATA':
      return { ...state };
    
    default:
      return state;
  }
}

// Context
interface DealsContextType {
  state: DealsState;
  dispatch: React.Dispatch<DealsAction>;
  actions: {
    toggleStage: (stageKey: string, checked: boolean) => void;
    selectAllStages: () => void;
    deselectAllStages: () => void;
    setSelectedMetric: (metric: string) => void;
    setSecondMetric: (metric: string) => void;
    setTimePeriod: (period: string) => void;
    setCompareToPrevious: (compare: boolean) => void;
    setFilter: (key: keyof DealsState['activeFilters'], value: string) => void;
    refreshData: () => Promise<void>;
  };
}

const DealsContext = createContext<DealsContextType | undefined>(undefined);

// Provider
interface DealsProviderProps {
  children: ReactNode;
}

export function DealsProvider({ children }: DealsProviderProps) {
  const [state, dispatch] = useReducer(dealsReducer, initialState);

  // Actions
  const toggleStage = useCallback((stageKey: string, checked: boolean) => {
    dispatch({ type: 'TOGGLE_STAGE', payload: { stageKey, checked } });
  }, []);

  const selectAllStages = useCallback(() => {
    dispatch({ type: 'SELECT_ALL_STAGES' });
  }, []);

  const deselectAllStages = useCallback(() => {
    dispatch({ type: 'DESELECT_ALL_STAGES' });
  }, []);

  const setSelectedMetric = useCallback((metric: string) => {
    dispatch({ type: 'SET_SELECTED_METRIC', payload: metric });
  }, []);

  const setSecondMetric = useCallback((metric: string) => {
    dispatch({ type: 'SET_SECOND_METRIC', payload: metric });
  }, []);

  const setTimePeriod = useCallback((period: string) => {
    dispatch({ type: 'SET_TIME_PERIOD', payload: period });
  }, []);

  const setCompareToPrevious = useCallback((compare: boolean) => {
    dispatch({ type: 'SET_COMPARE_TO_PREVIOUS', payload: compare });
  }, []);

  const setFilter = useCallback((key: keyof DealsState['activeFilters'], value: string) => {
    dispatch({ type: 'SET_FILTER', payload: { key, value } });
  }, []);

  const refreshData = useCallback(async () => {
    dispatch({ type: 'SET_REFRESHING', payload: true });
    
    try {
      // In the future, this will call the API
      await dealsDataStore.refreshData();
      
      // Update state with fresh data
      dispatch({ type: 'SET_PIPELINE_STAGES', payload: dealsDataStore.getPipelineStages() });
      dispatch({ type: 'SET_CHART_DATA', payload: dealsDataStore.getChartData() });
      dispatch({ type: 'SET_TABLE_DATA', payload: dealsDataStore.getTableData() });
      dispatch({ type: 'SET_LAST_REFRESHED', payload: new Date() });
    } catch (error) {
      console.error('Failed to refresh deals data:', error);
    } finally {
      dispatch({ type: 'SET_REFRESHING', payload: false });
    }
  }, []);

  const value: DealsContextType = {
    state,
    dispatch,
    actions: {
      toggleStage,
      selectAllStages,
      deselectAllStages,
      setSelectedMetric,
      setSecondMetric,
      setTimePeriod,
      setCompareToPrevious,
      setFilter,
      refreshData
    }
  };

  return (
    <DealsContext.Provider value={value}>
      {children}
    </DealsContext.Provider>
  );
}

// Hook
export function useDealsContext() {
  const context = useContext(DealsContext);
  if (context === undefined) {
    throw new Error('useDealsContext must be used within a DealsProvider');
  }
  return context;
}
