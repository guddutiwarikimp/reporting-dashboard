'use client';

import { ReportingLayout } from '@/components/reporting';

export default function PropertiesPage() {
  return (
    <ReportingLayout>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Properties Report</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Properties</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">89</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Active Listings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">23</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Under Contract</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">44</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Sold This Month</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Property Performance</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <div className="font-medium">Downtown Condos</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Average Days on Market: 15</div>
            </div>
            <div className="text-sm text-green-600 font-medium">+12%</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <div className="font-medium">Suburban Homes</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Average Days on Market: 28</div>
            </div>
            <div className="text-sm text-blue-600 font-medium">+5%</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <div className="font-medium">Luxury Properties</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Average Days on Market: 45</div>
            </div>
            <div className="text-sm text-yellow-600 font-medium">-3%</div>
          </div>
        </div>
      </div>
    </ReportingLayout>
  );
}
