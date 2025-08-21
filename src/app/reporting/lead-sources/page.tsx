'use client';

import { ReportingLayout } from '@/components/reporting';

export default function LeadSourcesPage() {
  return (
    <ReportingLayout>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lead Sources Report</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Leads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">89%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">234</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Qualified Leads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">$45.2K</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Revenue Generated</div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Lead Source Performance</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <div className="font-medium">Website</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">456 leads • 23% conversion</div>
            </div>
            <div className="text-sm text-green-600 font-medium">+18%</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <div className="font-medium">Social Media</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">234 leads • 19% conversion</div>
            </div>
            <div className="text-sm text-blue-600 font-medium">+12%</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <div className="font-medium">Referrals</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">189 leads • 31% conversion</div>
            </div>
            <div className="text-sm text-green-600 font-medium">+25%</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div>
              <div className="font-medium">Cold Outreach</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">156 leads • 8% conversion</div>
            </div>
            <div className="text-sm text-yellow-600 font-medium">-5%</div>
          </div>
        </div>
      </div>
    </ReportingLayout>
  );
}
