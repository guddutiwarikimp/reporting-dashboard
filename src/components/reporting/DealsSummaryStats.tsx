import React from 'react';
import { DEALS_SUMMARY_STATS } from '@/constants/deals';

const DealsSummaryStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Closed Deals */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Closed Deals ({DEALS_SUMMARY_STATS.closedDeals.count})
                </h3>
                <div className="space-y-3">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {DEALS_SUMMARY_STATS.closedDeals.total} total ({DEALS_SUMMARY_STATS.closedDeals.avg} avg)
                    </div>
                    <div className="text-lg text-blue-500 dark:text-blue-400">
                        {DEALS_SUMMARY_STATS.closedDeals.commission} commission ({DEALS_SUMMARY_STATS.closedDeals.commissionAvg} avg)
                    </div>
                </div>
            </div>

            {/* Upcoming Deals */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Upcoming Deals ({DEALS_SUMMARY_STATS.upcomingDeals.count})
                </h3>
                <div className="space-y-3">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {DEALS_SUMMARY_STATS.upcomingDeals.total} total ({DEALS_SUMMARY_STATS.upcomingDeals.avg} avg)
                    </div>
                    <div className="text-lg text-blue-500 dark:text-blue-400">
                        {DEALS_SUMMARY_STATS.upcomingDeals.commission} commission ({DEALS_SUMMARY_STATS.upcomingDeals.commissionAvg} avg)
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealsSummaryStats;
