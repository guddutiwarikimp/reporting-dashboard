'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              Dashboard
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link
              href="/reporting"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/reporting') 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Reporting
            </Link>
            <Link
              href="/reporting/agent-activity"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/reporting/agent-activity') 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Agent Activity
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 