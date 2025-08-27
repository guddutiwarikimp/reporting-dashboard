"use client";

import React from 'react';
import { Table, Avatar, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  EyeOutlined, 
  AimOutlined, 
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { RecipientData } from '../../constants/batchEmails';

interface RecipientsTableProps {
  theme?: string;
}

export default function RecipientsTable({ theme }: RecipientsTableProps) {
  // Import data from constants
  const { RECIPIENTS_DATA } = require('../../constants/batchEmails');

  const columns: ColumnsType<RecipientData> = [
    {
      title: (
        <Tooltip title="Name of the email recipient">
          <span className="text-sm cursor-help">Recipient</span>
        </Tooltip>
      ),
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
      render: (name: string, record: RecipientData) => (
        <div className="flex items-center gap-3">
          <Avatar 
            size={32}
            style={{ 
              backgroundColor: getInitialsColor(record.initials),
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            {record.initials}
          </Avatar>
          <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">
            {name}
          </div>
        </div>
      ),
    },
    {
      title: (
        <Tooltip title="Email address of the recipient">
          <span className="text-sm cursor-help">Email</span>
        </Tooltip>
      ),
      dataIndex: 'email',
      key: 'email',
      width: 250,
      render: (email: string) => (
        <span className="font-medium text-gray-700 dark:text-gray-300 text-xs">
          {email}
        </span>
      ),
    },
    {
      title: (
        <Tooltip title="Delivery status of the email">
          <span className="text-sm cursor-help">Status</span>
        </Tooltip>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (status: string, record: RecipientData) => (
        <div className="flex items-center gap-2">
          {status === 'delivered' ? (
            <CheckCircleOutlined className="text-green-500 text-base" style={{ color: '#10b981' }} />
          ) : (
            <ExclamationCircleOutlined className="text-orange-500 text-base" style={{ color: '#f59e0b' }} />
          )}
          <span className="font-medium text-gray-700 dark:text-gray-300 text-xs">
            {status === 'delivered' ? `Delivered ${record.deliveredAt}` : 'Bounced'}
          </span>
        </div>
      ),
    },
    {
      title: (
        <Tooltip title="Number of times the email was opened">
          <div className="flex items-center gap-2 cursor-help">
            <EyeOutlined className="text-gray-400" />
            <span className="text-sm">Opens</span>
          </div>
        </Tooltip>
      ),
      dataIndex: 'opens',
      key: 'opens',
      width: 150,
      align: 'left' as const,
      render: (opens: number, record: RecipientData) => (
        <Tooltip title={opens > 0 ? `Last opened: ${record.lastOpen}` : 'No opens yet'}>
          <span className="font-medium text-gray-700 dark:text-gray-300 text-xs cursor-help">
            {opens > 0 ? `${opens} (${record.lastOpen})` : opens.toString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Number of clicks on links within the email">
          <div className="flex items-center gap-2 cursor-help">
            <AimOutlined className="text-gray-400" />
            <span className="text-sm">Clicks</span>
          </div>
        </Tooltip>
      ),
      dataIndex: 'clicks',
      key: 'clicks',
      width: 120,
      align: 'left' as const,
      render: (clicks: number) => (
        <span className="font-medium text-gray-700 dark:text-gray-300 text-xs">
          {clicks}
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recipients
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          List of recipients for this email template
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={RECIPIENTS_DATA}
          rowKey="key"
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
