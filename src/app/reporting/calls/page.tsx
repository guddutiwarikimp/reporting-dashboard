'use client';

import { ReportingLayout } from '@/components/reporting';

export default function CallsPage() {
  return (
    <ReportingLayout>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Calls Report</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">1,847</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Calls</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">1,234</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Answered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">613</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Missed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">67%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Answer Rate</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Call Performance</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <div className="font-medium">Inbound Calls</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">892 calls • 78% answer rate</div>
            </div>
            <div className="text-sm text-green-600 font-medium">+15%</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <div className="font-medium">Outbound Calls</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">955 calls • 58% answer rate</div>
            </div>
            <div className="text-sm text-blue-600 font-medium">+8%</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <div className="font-medium">Average Call Duration</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">4 minutes 32 seconds</div>
            </div>
            <div className="text-sm text-green-600 font-medium">+12%</div>
          </div>
        </div>
      </div>
    </ReportingLayout>
  );
}
