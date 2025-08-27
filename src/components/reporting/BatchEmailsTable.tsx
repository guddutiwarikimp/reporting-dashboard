"use client";

import React from 'react';
import { Table, Select, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  MailOutlined, 
  SendOutlined, 
  EyeOutlined, 
  AimOutlined, 
  StopOutlined, 
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { BatchEmailData } from '../../constants/batchEmails';

interface BatchEmailsTableProps {
  filterValue: string;
  onFilterChange: (value: string) => void;
  theme?: string;
}

const { Option } = Select;

export default function BatchEmailsTable({ filterValue, onFilterChange, theme }: BatchEmailsTableProps) {
  // Import data from constants
  const { BATCH_EMAILS_DATA } = require('../../constants/batchEmails');
  
  // Filter data based on selected filter
  const filteredData = filterValue === 'everyone' 
    ? BATCH_EMAILS_DATA 
    : BATCH_EMAILS_DATA.filter((email: BatchEmailData) => {
        if (filterValue === 'ven') return email.createdBy === 'Ven Velnayagam';
        if (filterValue === 'albi') return email.createdBy === 'Albi Leka';
        return true;
      });

  const columns: ColumnsType<BatchEmailData> = [
    {
      title: (
        <Tooltip title="Email template name and the person who created it">
          <span className="text-sm cursor-help">Templates</span>
        </Tooltip>
      ),
      dataIndex: 'templateName',
      key: 'templateName',
      width: 300,
      fixed: 'left',
      render: (templateName: string, record: BatchEmailData) => (
        <Tooltip title={`Template: ${templateName}\nCreated by: ${record.createdBy}`}>
          <div className="flex flex-col items-start gap-1">
            <div className="font-medium text-xs">
              <span className="text-gray-900 dark:text-gray-100">Template First Name - </span>
              <Link href={`/reporting/batch-emails/${record.key}`} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                <span>{templateName}</span>
              </Link>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              From: {record.createdBy}
            </div>
          </div>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="When the batch email was created">
          <span className="text-sm cursor-help">Created</span>
        </Tooltip>
      ),
      dataIndex: 'created',
      key: 'created',
      width: 120,
      align: 'left' as const,
      render: (created: string) => (
        <Tooltip title={`Created: ${created}`}>
          <span className="font-medium text-gray-700 dark:text-gray-300 text-xs cursor-help">
            {created}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Current status of the email campaign">
          <span className="text-sm cursor-help">Status</span>
        </Tooltip>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 140,
      align: 'left' as const,
      render: (status: string, record: BatchEmailData) => (
        <div className="flex items-center gap-2">
          {status === 'finished' ? (
            <Tooltip title="Campaign completed successfully">
              <CheckCircleOutlined className="text-green-500 text-lg cursor-help" style={{ color: '#10b981' }} />
            </Tooltip>
          ) : (
            <Tooltip title="Campaign failed to complete">
              <ExclamationCircleOutlined className="text-orange-500 text-lg cursor-help" style={{ color: '#f59e0b' }} />
            </Tooltip>
          )}
          <span className="font-medium text-gray-700 dark:text-gray-300 text-xs">
            {status === 'finished' ? 'Finished' : 'Failure'}
          </span>
          <Tooltip title="Click to view detailed campaign information">
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs">
              (Details)
            </span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: (
        <Tooltip title="Total number of intended recipients for this campaign">
          <div className="flex items-center gap-2 cursor-help">
            <MailOutlined className="text-gray-400" />
            <span className="text-sm">Recipients</span>
          </div>
        </Tooltip>
      ),
      dataIndex: 'recipients',
      key: 'recipients',
      width: 120,
      align: 'left' as const,
      render: (recipients: number) => (
        <Tooltip title={`Total recipients: ${recipients.toLocaleString()}`}>
          <span className="font-medium text-gray-700 dark:text-gray-300 text-xs cursor-help">
            {recipients.toLocaleString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Number of emails successfully sent">
          <div className="flex items-center gap-2 cursor-help">
            <SendOutlined className="text-gray-400" />
            <span className="text-sm">Sent</span>
          </div>
        </Tooltip>
      ),
      dataIndex: 'sent',
      key: 'sent',
      width: 100,
      align: 'left' as const,
      render: (sent: number) => (
        <Tooltip title={`Emails sent: ${sent.toLocaleString()}`}>
          <span className="font-medium text-gray-700 dark:text-gray-300 text-xs cursor-help">
            {sent.toLocaleString()}
          </span>
        </Tooltip>
      ),
    },
    {
      title: (
        <Tooltip title="Number of emails opened by recipients">
          <div className="flex items-center gap-2 cursor-help">
            <EyeOutlined className="text-gray-400" />
            <span className="text-sm">Opens</span>
          </div>
        </Tooltip>
      ),
      dataIndex: 'opens',
      key: 'opens',
      width: 120,
      align: 'left' as const,
      render: (opens: number, record: BatchEmailData) => {
        const percentage = record.recipients > 0 ? ((opens / record.recipients) * 100).toFixed(1) : '0';
        return (
          <Tooltip title={`Opens: ${opens.toLocaleString()} (${percentage}% of recipients)`}>
            <span className="font-medium text-gray-700 dark:text-gray-300 text-xs cursor-help">
              {opens.toLocaleString()} ({percentage}%)
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: (
        <Tooltip title="Number of clicks on links within the emails">
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
      render: (clicks: number, record: BatchEmailData) => {
        const percentage = record.recipients > 0 ? ((clicks / record.recipients) * 100).toFixed(1) : '0';
        return (
          <Tooltip title={`Clicks: ${clicks.toLocaleString()} (${percentage}% of recipients)`}>
            <span className="font-medium text-gray-700 dark:text-gray-300 text-xs cursor-help">
              {clicks.toLocaleString()} ({percentage}%)
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: (
        <Tooltip title="Number of recipients who unsubscribed from future emails">
          <div className="flex items-center gap-2 cursor-help">
            <StopOutlined className="text-gray-400" />
            <span className="text-sm">Unsubscribes</span>
          </div>
        </Tooltip>
      ),
      dataIndex: 'unsubscribes',
      key: 'unsubscribes',
      width: 140,
      align: 'left' as const,
      render: (unsubscribes: number, record: BatchEmailData) => {
        const percentage = record.recipients > 0 ? ((unsubscribes / record.recipients) * 100).toFixed(1) : '0';
        return (
          <Tooltip title={`Unsubscribes: ${unsubscribes.toLocaleString()} (${percentage}% of recipients)`}>
            <span className="font-medium text-gray-700 dark:text-gray-300 text-xs cursor-help">
              {unsubscribes.toLocaleString()} ({percentage}%)
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: (
        <div className="flex items-center gap-1">
          <Tooltip title="Number of emails that were not delivered to recipients">
            <div className="flex items-center gap-2 cursor-help">
              <CloseCircleOutlined className="text-gray-400" />
              <span className="text-sm">Bounces</span>
            </div>
          </Tooltip>
          <Tooltip title="Emails that were not delivered to the recipient's inbox">
            <QuestionCircleOutlined className="text-gray-400 text-xs cursor-help" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'bounces',
      key: 'bounces',
      width: 120,
      align: 'left' as const,
      render: (bounces: number, record: BatchEmailData) => {
        const percentage = record.recipients > 0 ? ((bounces / record.recipients) * 100).toFixed(1) : '0';
        return (
          <Tooltip title={`Bounces: ${bounces.toLocaleString()} (${percentage}% of recipients)`}>
            <span className="font-medium text-gray-700 dark:text-gray-300 text-xs cursor-help">
              {bounces.toLocaleString()} ({percentage}%)
            </span>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Batch Email Performance Table
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Detailed performance metrics for each batch email campaign
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={filteredData}
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
