import React from "react";
import { Checkbox } from "antd";
import { type DealStage } from "../../constants/deals";

interface DealsPipelineProps {
  pipelineStages: DealStage[];
  selectedStages: string[];
  onStageToggle: (stageKey: string, checked: boolean) => void;
}

const DealsPipeline = ({ pipelineStages, selectedStages, onStageToggle }: DealsPipelineProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Deal Pipeline
        </h2>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
          {pipelineStages.map((stage) => (
            <div
              key={stage.key}
              className="flex-shrink-0 bg-white border border-gray-200 rounded-lg shadow-sm relative"
            >
              <div className={`h-2 ${stage.color} rounded-t-lg`} />
              <div className="p-4">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                    {stage.title} ({stage.count})
                  </h3>
                  <Checkbox
                    checked={selectedStages.includes(stage.key)}
                    onChange={(e) =>
                      onStageToggle(stage.key, e.target.checked)
                    }
                    className="ml-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-green-600">
                    {stage.total} total ({stage.avg} avg)
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {stage.commission} commission ({stage.commissionAvg} avg)
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsPipeline;
