"use client";

import React from "react";
import { Table, Avatar, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { QUERY_AGENT_TABLE_DATA, getMetricTooltip } from "../../constants/agentActivity";

interface AgentTableProps {
  selectedQuery: string;
  theme?: string;
}

interface AgentData {
  name: string;
  initials: string;
  [key: string]: any;
}

export default function AgentTable({ selectedQuery, theme }: AgentTableProps) {
  // Get table data for the selected query
  const tableData = QUERY_AGENT_TABLE_DATA[selectedQuery as keyof typeof QUERY_AGENT_TABLE_DATA] || 
                   QUERY_AGENT_TABLE_DATA["what team member is getting the most leads to respond"];

   // Sort agents by performance (top performer first)
  const sortedAgents = [...tableData.agents].sort((a, b) => {
    // Get the first metric column (excluding Name column)
    const firstMetricColumn = tableData.columns[1];
    if (firstMetricColumn) {
      const aValue = a[firstMetricColumn];
      const bValue = b[firstMetricColumn];
      
      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      
      // Sort numerically (higher values first for top performance)
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return bValue - aValue; // Descending order (top performer first)
      }
      
      // Fallback to string comparison
      return String(bValue).localeCompare(String(aValue));
    }
    return 0;
  });
  
  // Generate columns dynamically based on the selected query
  const generateColumns = (): ColumnsType<AgentData> => {
    const columns: ColumnsType<AgentData> = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",   
        width: 200,
        fixed: "left",
        render: (name: string, record: AgentData) => (
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
    ];

    // Add dynamic columns based on the selected query
    tableData.columns.slice(1).forEach((columnName) => {
      const description = getMetricTooltip(columnName);
      
      columns.push({
        title: (
          <Tooltip title={description} placement="top">
            <span className="cursor-help hover:underline">{columnName}</span>
          </Tooltip>
        ),
        dataIndex: columnName,
        key: columnName,
        width: 120,
        align: "left" as const,
        render: (value: any) => {
          if (value === null || value === undefined) {
            return <span className="text-gray-400">-</span>;
          }
          
          // Format values consistently - all numerical data in gray
          if (typeof value === 'number') {
            if (columnName.includes("%")) {
              return (
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {value.toFixed(1)}%
                </span>
              );
            } else if (columnName.includes("Value")) {
              return (
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  ${value.toLocaleString()}
                </span>
              );
            } else {
              return (
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {value.toLocaleString()}
                </span>
              );
            }
          } else {
            return (
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {value}
              </span>
            );
          }
        },
      });
    });

    return columns;
  };

  // Generate color for initials avatar
  const getInitialsColor = (initials: string): string => {
    const colors = [
      '#f97316', '#10b981', '#8b5cf6', '#ef4444', 
      '#06b6d4', '#f59e0b', '#84cc16', '#3b82f6'
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const columns = generateColumns();

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Agent Performance Table
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Detailed performance metrics for each team member
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

