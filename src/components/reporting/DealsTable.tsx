"use client";

import React from "react";
import { Table, Tag, Avatar, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DEALS_TABLE_DATA, DEALS_STATUS_COLORS } from "../../constants/deals";
import { useTheme } from "@/hooks/useTheme";
import { DownOutlined } from "@ant-design/icons";

interface DealsTableProps {
  theme?: string;
}

const DealsTable = ({ theme }: DealsTableProps) => {
  const columns = [
    {
      title: (
        <Tooltip title="Property name and location">
          <span className="text-sm cursor-help">Name</span>
        </Tooltip>
      ),
      dataIndex: "name",
      key: "name",
      width: 300,
      fixed: "left" as const,
      render: (text: string) => (
        <Tooltip title={`Property: ${text}`}>
          <span className="font-medium text-blue-600 dark:text-blue-400 cursor-pointer hover:underline text-xs">
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Current stage of the deal in the pipeline">
          <span className="text-sm cursor-help">Stage</span>
        </Tooltip>
      ),
      dataIndex: "stage",
      key: "stage",
      width: 150,
      align: "left" as const,
      render: (text: string) => (
        <Tooltip title={`Stage: ${text}`}>
          <span className="text-gray-700 dark:text-gray-300 text-xs cursor-help">
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Current status of the deal">
          <span className="text-sm cursor-help">Status</span>
        </Tooltip>
      ),
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "left" as const,
      render: (status: keyof typeof DEALS_STATUS_COLORS) => (
        <Tooltip title={`Status: ${status}`}>
          <Tag
            className={`${DEALS_STATUS_COLORS[status]} border-0 px-3 py-1 rounded-full text-xs font-medium`}
          >
            {status}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Date when the deal entered current stage">
          <span className="text-sm cursor-help">Entered Stage</span>
        </Tooltip>
      ),
      dataIndex: "enteredStage",
      key: "enteredStage",
      width: 130,
      align: "left" as const,
      render: (text: string) => (
        <Tooltip title={`Entered: ${text}`}>
          <span className="text-gray-700 dark:text-gray-300 text-xs cursor-help">
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Duration the deal has been in current stage">
          <span className="text-sm cursor-help">Time in Stage</span>
        </Tooltip>
      ),
      dataIndex: "timeInStage",
      key: "timeInStage",
      width: 130,
      align: "left" as const,
      render: (text: string) => (
        <Tooltip title={`Time in stage: ${text}`}>
          <span className="text-gray-700 dark:text-gray-300 text-xs cursor-help">
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Projected or actual close date">
          <div className="flex items-center gap-1 cursor-help">
            <span className="text-sm">Close Date</span>
            <DownOutlined className="text-gray-400 text-xs" />
          </div>
        </Tooltip>
      ),
      dataIndex: "closeDate",
      key: "closeDate",
      width: 130,
      align: "left" as const,
      render: (text: string) => (
        <Tooltip title={`Close date: ${text}`}>
          <span className="text-gray-700 dark:text-gray-300 text-xs cursor-help">
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Days remaining until close date">
          <span className="text-sm cursor-help">Time to Close</span>
        </Tooltip>
      ),
      dataIndex: "timeToClose",
      key: "timeToClose",
      width: 130,
      align: "left" as const,
      render: (text: string) => (
        <Tooltip title={`Time to close: ${text}`}>
          <span className="text-gray-700 dark:text-gray-300 text-xs cursor-help">
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Property price value">
          <span className="text-sm cursor-help">Price</span>
        </Tooltip>
      ),
      dataIndex: "price",
      key: "price",
      width: 100,
      align: "left" as const,
      render: (text: string) => (
        <Tooltip title={`Price: ${text}`}>
          <span className="font-semibold text-green-600 dark:text-green-400 text-xs cursor-help">
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Agent commission information">
          <span className="text-sm cursor-help">Agent Co</span>
        </Tooltip>
      ),
      dataIndex: "agentCo",
      key: "agentCo",
      width: 120,
      align: "left" as const,
      render: (text: string) => (
        <span className="text-gray-700 dark:text-gray-300 text-xs">
          {text || "-"}
        </span>
      ),
    },
    {
      title: (
        <Tooltip title="Commission amount for the deal">
          <span className="text-sm cursor-help">Commission</span>
        </Tooltip>
      ),
      dataIndex: "commission",
      key: "commission",
      width: 120,
      align: "left" as const,
      render: (text: string) => (
        <Tooltip title={`Commission: ${text}`}>
          <span className="font-medium text-gray-700 dark:text-gray-300 text-xs cursor-help">
            {text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Individual agent commission amount">
          <span className="text-sm cursor-help">Agent Commission</span>
        </Tooltip>
      ),
      dataIndex: "agentCommission",
      key: "agentCommission",
      width: 140,
      align: "left" as const,
      render: (text: string) => (
        <span className="text-gray-700 dark:text-gray-300 text-xs">
          {text || "-"}
        </span>
      ),
    },
    {
      title: (
        <Tooltip title="Team commission amount">
          <span className="text-sm cursor-help">Team Commission</span>
        </Tooltip>
      ),
      dataIndex: "teamCommission",
      key: "teamCommission",
      width: 140,
      align: "left" as const,
      render: (text: string) => (
        <span className="text-gray-700 dark:text-gray-300 text-xs">
          {text || "-"}
        </span>
      ),
    },
    {
      title: (
        <Tooltip title="People associated with the deal">
          <span className="text-sm cursor-help">People</span>
        </Tooltip>
      ),
      dataIndex: "people",
      key: "people",
      width: 100,
      align: "left" as const,
      render: (people: readonly string[]) => (
        <div className="flex gap-1">
          {people && people.length > 0 ? (
            people.map((person, index) => (
              <Avatar
                key={index}
                size="small"
                className="bg-orange-500 text-white text-xs font-medium"
              >
                {person}
              </Avatar>
            ))
          ) : (
            <span className="text-gray-400 text-xs">-</span>
          )}
        </div>
      ),
    },
    {
      title: (
        <Tooltip title="Team members assigned to the deal">
          <span className="text-sm cursor-help">Team</span>
        </Tooltip>
      ),
      dataIndex: "team",
      key: "team",
      width: 120,
      align: "left" as const,
      render: (team: readonly string[], record: any) => (
        <div className="flex gap-1">
          {team && team.length > 0 ? (
            team.map((member, index) => (
              <div key={index} className="flex items-center gap-1">
                <Avatar
                  size="small"
                  className={`${
                    index === 0 ? "bg-green-500" : "bg-orange-500"
                  } text-white text-xs font-medium`}
                >
                  {member}
                </Avatar>
                {index === 0 &&
                  team.length > 1 &&
                  parseInt(record.key) <= 6 && (
                    <img
                      src="/src/assets/img/man.webp"
                      alt="Team member"
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  )}
              </div>
            ))
          ) : (
            <span className="text-gray-400 text-xs">-</span>
          )}
        </div>
      ),
    },
    {
      title: (
        <Tooltip title="Source of the contact lead">
          <span className="text-sm cursor-help">Contact Lead Source</span>
        </Tooltip>
      ),
      dataIndex: "contactLeadSource",
      key: "contactLeadSource",
      width: 150,
      align: "left" as const,
      render: (text: string) => (
        <span className="text-gray-700 dark:text-gray-300 text-xs">
          {text || "-"}
        </span>
      ),
    },
    {
      title: (
        <Tooltip title="Marketing channel that generated the lead">
          <span className="text-sm cursor-help">Marketing Lead Source</span>
        </Tooltip>
      ),
      dataIndex: "marketingLeadSource",
      key: "marketingLeadSource",
      width: 160,
      align: "left" as const,
      render: (text: string) => (
        <span className="text-gray-700 dark:text-gray-300 text-xs">
          {text || "-"}
        </span>
      ),
    },
  ];

  return (
    <div className="px-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Deals Pipeline Table
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Comprehensive view of all deals with detailed metrics and status
          information
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={DEALS_TABLE_DATA}
          pagination={false}
          rowKey="key"
          size="middle"
          className="deals-table"
          scroll={{ x: "max-content" }}
          rowClassName="bg-white dark:bg-gray-800"
          components={{
            body: {
              row: ({ children, ...props }: any) => (
                <tr
                  {...props}
                  className="border-b border-gray-100 dark:border-gray-700"
                >
                  {children}
                </tr>
              ),
            },
          }}
        />
      </div>
    </div>
  );
};

export default DealsTable;
