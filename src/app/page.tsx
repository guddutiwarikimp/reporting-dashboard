import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="max-w-4xl mx-auto p-6 text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Dashboard</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Access your reports and analytics through the navigation menu above.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              href="/reporting"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View Reports
            </Link>
            <Link 
              href="/reporting/agent-activity"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Agent Activity
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
