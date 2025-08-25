"use client";

import React from "react";
import { Table, Avatar, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CALLS_AGENT_TABLE_DATA, getCallMetricTooltip } from "../../constants/calls";
import { UserOutlined } from "@ant-design/icons";

interface CallsAgentData {
  name: string;
  initials: string;
  "Calls Made": { total: number; people: number };
  "Connected": { total: number; people: number };
  "Conversations": { total: number; people: number };
  "Received": { total: number; people: number };
  "Calls Missed": { total: number; people: number };
  "Total Talk Time": string;
  "Answer Time": string;
}

export default function CallsAgentTable() {
  // Sort agents by calls made (top performer first)
  const sortedAgents = [...CALLS_AGENT_TABLE_DATA.agents].sort((a, b) => {
    return b["Calls Made"].total - a["Calls Made"].total;
  });

  const columns: ColumnsType<CallsAgentData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",   
      width: 180,
      fixed: "left",
      render: (name: string, record: CallsAgentData) => (
        <div className="flex items-center gap-3">
          <Avatar 
            size={40}
            style={{ 
              backgroundColor: getInitialsColor(record.initials),
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            {record.initials}
          </Avatar>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {name}
          </div>
        </div>
      ),
    },
    {
      title: (
        <Tooltip title={getCallMetricTooltip("Calls Made")} placement="top">
          <span className="cursor-help hover:underline">Calls Made</span>
        </Tooltip>
      ),
      dataIndex: "Calls Made",
      key: "Calls Made",
      width: 110,
      align: "left" as const,
      render: (value: { total: number; people: number }) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {value.total.toLocaleString()}
          </span>
          <span className="text-xs text-blue-500 flex items-center gap-1">
            <UserOutlined className="text-xs" />
            {value.people.toLocaleString()} people
          </span>
        </div>
      ),
    },
    {
      title: (
        <Tooltip title={getCallMetricTooltip("Connected")} placement="top">
          <span className="cursor-help hover:underline">Connected</span>
        </Tooltip>
      ),
      dataIndex: "Connected",
      key: "Connected",
      width: 110,
      align: "left" as const,
      render: (value: { total: number; people: number }) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {value.total.toLocaleString()}
          </span>
          <span className="text-xs text-blue-500 flex items-center gap-1">
            <UserOutlined className="text-xs" />
            {value.people.toLocaleString()} people
          </span>
        </div>
      ),
    },
    {
      title: (
        <Tooltip title={getCallMetricTooltip("Conversations")} placement="top">
          <span className="cursor-help hover:underline">Conversations</span>
        </Tooltip>
      ),
      dataIndex: "Conversations",
      key: "Conversations",
      width: 110,
      align: "left" as const,
      render: (value: { total: number; people: number }) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {value.total.toLocaleString()}
          </span>
          <span className="text-xs text-blue-500 flex items-center gap-1">
            <UserOutlined className="text-xs" />
            {value.people.toLocaleString()} people
          </span>
        </div>
      ),
    },
    {
      title: (
        <Tooltip title={getCallMetricTooltip("Received")} placement="top">
          <span className="cursor-help hover:underline">Received</span>
        </Tooltip>
      ),
      dataIndex: "Received",
      key: "Received",
      width: 110,
      align: "left" as const,
      render: (value: { total: number; people: number }) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {value.total.toLocaleString()}
          </span>
          <span className="text-xs text-blue-500 flex items-center gap-1">
            <UserOutlined className="text-xs" />
            {value.people.toLocaleString()} people
          </span>
        </div>
      ),
    },
    {
      title: (
        <Tooltip title={getCallMetricTooltip("Calls Missed")} placement="top">
          <span className="cursor-help hover:underline">Calls Missed</span>
        </Tooltip>
      ),
      dataIndex: "Calls Missed",
      key: "Calls Missed",
      width: 110,
      align: "left" as const,
      render: (value: { total: number; people: number }) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {value.total.toLocaleString()}
          </span>
          {value.people > 0 && (
            <span className="text-xs text-blue-500 flex items-center gap-1">
              <UserOutlined className="text-xs" />
              {value.people.toLocaleString()} people
            </span>
          )}
        </div>
      ),
    },
    {
      title: (
        <Tooltip title={getCallMetricTooltip("Total Talk Time")} placement="top">
          <span className="cursor-help hover:underline">Total Talk Time</span>
        </Tooltip>
      ),
      dataIndex: "Total Talk Time",
      key: "Total Talk Time",
      width: 110,
      align: "left" as const,
      render: (value: string) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {value}
        </span>
      ),
    },
    {
      title: (
        <Tooltip title={getCallMetricTooltip("Answer Time")} placement="top">
          <span className="cursor-help hover:underline">Answer Time</span>
        </Tooltip>
      ),
      dataIndex: "Answer Time",
      key: "Answer Time",
      width: 110,
      align: "left" as const,
      render: (value: string) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {value === "-" ? "-" : value}
        </span>
      ),
    },
  ];

  // Generate color for initials avatar
  const getInitialsColor = (initials: string): string => {
    const colors = [
      '#f97316', '#10b981', '#8b5cf6', '#ef4444', 
      '#06b6d4', '#f59e0b', '#84cc16', '#3b82f6'
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Agent Call Performance
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Detailed call metrics for each team member
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={sortedAgents}
          rowKey="name"
          pagination={false}
          size="middle"
          className="agent-table"
          scroll={{ x: 'max-content' }}
          rowClassName="bg-white dark:bg-gray-800"
          components={{
            body: {
              row: ({ children, ...props }: any) => (
                <tr {...props} className="border-b border-gray-100 dark:border-gray-700">
                  {children}
                </tr>
              ),
            },
          }}
        />
      </div>
    </div>
  );
}
