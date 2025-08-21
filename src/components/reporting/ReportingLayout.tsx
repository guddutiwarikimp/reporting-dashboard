'use client';

import { ReactNode } from 'react';
import ReportingTabs from './ReportingTabs';
import { REPORTING_CONFIG } from '@/constants/reporting';

interface ReportingLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function ReportingLayout({ 
  children, 
  title = REPORTING_CONFIG.title,
  subtitle = REPORTING_CONFIG.subtitle 
}: ReportingLayoutProps) {
  return (
    <div className="font-sans min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Tab Navigation */}
      <ReportingTabs />

      {/* Content Area */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
