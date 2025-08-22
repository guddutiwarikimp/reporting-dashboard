import { useState, useEffect } from "react";
import { LEAD_SOURCE_CONFIG } from "@/constants/leadSources";

export function useLeadSources() {
  const [selectedQuery, setSelectedQuery] = useState<string>(LEAD_SOURCE_CONFIG.defaultQuery);
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

  return {
    selectedQuery,
    isRefreshing,
    lastRefreshed,
    handleQueryChange,
    handleRefresh,
  };
}
