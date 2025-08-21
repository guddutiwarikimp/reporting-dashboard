'use client';

import { usePathname } from 'next/navigation';
import { ReportingLayout } from '@/components/reporting';

export default function ReportingPage() {
  const pathname = usePathname();
  const isOverview = pathname === '/reporting';

  return (
    <ReportingLayout>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {isOverview ? 'Overview' : 'Reporting Dashboard'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Select a tab above to view specific reports and analytics for your organization.
        </p>
      </div>
    </ReportingLayout>
  );
}
