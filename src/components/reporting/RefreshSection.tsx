import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { AGENT_ACTIVITY_CONFIG } from "@/constants/reporting";

interface RefreshSectionProps {
  isRefreshing: boolean;
  lastRefreshed: Date | null;
  onRefresh: () => void;
}

export function RefreshSection({ isRefreshing, lastRefreshed, onRefresh }: RefreshSectionProps) {
  const formatLastRefreshed = (date: Date | null) => {
    if (!date) return AGENT_ACTIVITY_CONFIG.neverRefreshedText;
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
      <div>
        {AGENT_ACTIVITY_CONFIG.cacheMessage}{" "}
        <span className="text-gray-400 dark:text-gray-500">
          {AGENT_ACTIVITY_CONFIG.lastRefreshedPrefix} {formatLastRefreshed(lastRefreshed)}
        </span>
      </div>
      <Button
        type="text"
        icon={<ReloadOutlined spin={isRefreshing} />}
        onClick={onRefresh}
        disabled={isRefreshing}
        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        size="small"
      >
        {isRefreshing ? AGENT_ACTIVITY_CONFIG.refreshingText : AGENT_ACTIVITY_CONFIG.refreshButtonText}
      </Button>
    </div>
  );
}
