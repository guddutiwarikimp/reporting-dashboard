import { useState, useEffect } from "react";
import { ChartData } from "../types/chart";

export const useChartData = () => {
  const [chartData, setChartData] = useState<ChartData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/chartData.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch chart data: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setChartData(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch chart data");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    chartData,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      setError(null);
      // Trigger refetch by changing dependency
      setChartData({});
    },
  };
};
