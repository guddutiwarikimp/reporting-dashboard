"use client";

import React, { useState } from 'react';
import { Select } from 'antd';
import { ReportingLayout, BatchEmailsTable } from '@/components/reporting';

const { Option } = Select;

const page = () => {
  const [filterValue, setFilterValue] = useState('everyone');

  return (
    <ReportingLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Recent Batch Emails
          </h1>
          <Select
            value={filterValue}
            onChange={setFilterValue}
            style={{ width: 150 }}
            suffixIcon={<span className="text-gray-400">▼</span>}
          >
            <Option value="everyone">Everyone</Option>
            <Option value="ven">Ven Velnayagam</Option>
            <Option value="albi">Albi Leka</Option>
          </Select>
        </div>

        {/* Table Section */}
        <BatchEmailsTable 
          filterValue={filterValue}
          onFilterChange={setFilterValue}
        />
      </div>
    </ReportingLayout>
  );
};

export default page;