import { useState, useEffect } from "react";
import { CALLS_CONFIG } from "@/constants/calls";

export function useCalls() {
  const [selectedQuery, setSelectedQuery] = useState<string>(CALLS_CONFIG.defaultQuery);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  // Set initial date only on client side to prevent hydration mismatch
  useEffect(() => {
    setLastRefreshed(new Date());
  }, []);

  const handleQueryChange = (query: string) => {
    setSelectedQuery(query);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update last refreshed timestamp
    setLastRefreshed(new Date());
    setIsRefreshing(false);
  };

  // Mock call metric data - in a real app, this would come from an API
  const callMetrics = {
    callsMade: { total: 3550, people: 1904 },
    connected: { total: 1128, people: 612 },
    conversations: { total: 689, people: 319 },
    received: { total: 573, people: 230 },
    callsMissed: { total: 113, people: 47 },
    talkTime: { total: "5 days 1 hr" },
    answerTime: { total: "7 sec" }
  };

  return {
    selectedQuery,
    isRefreshing,
    lastRefreshed,
    handleQueryChange,
    handleRefresh,
    callMetrics,
  };
}
