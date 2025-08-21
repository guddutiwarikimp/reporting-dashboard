"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { REPORTING_TABS, REPORTING_CONFIG } from "@/constants/reporting";

export default function ReportingTabs() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/reporting") {
      return pathname === "/reporting";
    }
    return pathname === href;
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {REPORTING_TABS.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive(tab.href)
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                title={tab.description}
              >
                {tab.name}
              </Link>
            ))}
          </div>

          {/* How Reporting Works Button with Tooltip */}
          <div className="flex-shrink-0 ml-4 relative group">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {REPORTING_CONFIG.helpButton.text}
            </button>

            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-64">
              <div className="text-xs leading-relaxed">
                <p className="font-semibold mb-2">📊 How Reporting Works</p>
                <p className="mb-2">
                  This dashboard provides comprehensive analytics and insights
                  for your real estate business:
                </p>
              </div>

              {/* Tooltip arrow */}
              <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
