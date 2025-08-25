"use client";

import React, { useState } from "react";

interface CallMetricCardProps {
  title: string;
  primaryValue: string;
  secondaryValue: string;
  isHighlighted?: boolean;
  onSelect: () => void;
}

const CallMetricCard: React.FC<CallMetricCardProps> = ({
  title,
  primaryValue,
  secondaryValue,
  isHighlighted = false,
  onSelect,
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border transition-all duration-200 relative w-full cursor-pointer hover:shadow-md ${
        isHighlighted
          ? "border-blue-500 dark:border-blue-400 shadow-md ring-2 ring-blue-200 dark:ring-blue-800"
          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
      }`}
      onClick={onSelect}
    >
      <div className="p-4">
        <div
          className={`text-xs uppercase tracking-wide mb-2 ${
            isHighlighted
              ? "text-blue-600 dark:text-blue-400 font-semibold"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {title}
        </div>
        <div
          className={`text-base font-bold mb-2 ${
            isHighlighted 
              ? "text-blue-700 dark:text-blue-300" 
              : "text-gray-800 dark:text-gray-200"
          }`}
        >
          {primaryValue}
        </div>
        {secondaryValue && (
          <div
            className={`text-xs ${
              isHighlighted
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {secondaryValue}
          </div>
        )}
      </div>
    </div>
  );
};

interface CallMetricCardsProps {
  callData: {
    callsMade: { total: number; people: number };
    connected: { total: number; people: number };
    conversations: { total: number; people: number };
    received: { total: number; people: number };
    callsMissed: { total: number; people: number };
    talkTime: { total: string; people?: number };
    answerTime: { total: string; people?: number };
  };
}

export default function CallMetricCards({ callData }: CallMetricCardsProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const handleMetricSelect = (metricName: string) => {
    setSelectedMetric(selectedMetric === metricName ? null : metricName);
  };

  const metrics = [
    {
      title: "CALLS MADE",
      primaryValue: callData.callsMade.total.toLocaleString(),
      secondaryValue: `${callData.callsMade.people.toLocaleString()} people`,
      metricName: "callsMade",
    },
    {
      title: "CONNECTED",
      primaryValue: callData.connected.total.toLocaleString(),
      secondaryValue: `${callData.connected.people.toLocaleString()} people`,
      metricName: "connected",
    },
    {
      title: "CONVERSATIONS",
      primaryValue: callData.conversations.total.toLocaleString(),
      secondaryValue: `${callData.conversations.people.toLocaleString()} people`,
      metricName: "conversations",
    },
    {
      title: "RECEIVED",
      primaryValue: callData.received.total.toLocaleString(),
      secondaryValue: `${callData.received.people.toLocaleString()} people`,
      metricName: "received",
    },
    {
      title: "CALLS MISSED",
      primaryValue: callData.callsMissed.total.toLocaleString(),
      secondaryValue: `${callData.callsMissed.people.toLocaleString()} people`,
      metricName: "callsMissed",
    },
    {
      title: "TALK TIME",
      primaryValue: callData.talkTime.total,
      secondaryValue: "",
      metricName: "talkTime",
    },
    {
      title: "ANSWER TIME",
      primaryValue: callData.answerTime.total,
      secondaryValue: "",
      metricName: "answerTime",
    },
  ];

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 auto-rows-fr">
        {metrics.map((metric, index) => (
          <CallMetricCard
            key={index}
            title={metric.title}
            primaryValue={metric.primaryValue}
            secondaryValue={metric.secondaryValue}
            isHighlighted={selectedMetric === metric.metricName}
            onSelect={() => handleMetricSelect(metric.metricName)}
          />
        ))}
      </div>
    </div>
  );
}
