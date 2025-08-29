'use client';

import { useState } from 'react';
import { trpc } from '@/trpc/react';

interface TestResult {
  endpoint: string;
  result?: any;
  error?: string;
  timestamp: string;
}

export default function APITestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Test email log creation
  const createEmailLog = trpc.emailLog.create.useMutation();
  const testCreateEmailLog = async () => {
    setIsLoading(true);
    try {
      const result = await createEmailLog.mutateAsync({
        templateId: 'test-template-123',
        email: 'test@example.com',
        subject: 'Test Email Subject',
        status: 'sent',
        metadata: { test: true }
      });
      
      setTestResults(prev => [...prev, {
        endpoint: 'emailLog.create',
        result: result,
        timestamp: new Date().toISOString()
      }]);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setTestResults(prev => [...prev, {
        endpoint: 'emailLog.create',
        error: errorMessage,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Test getting email logs
  const getEmailLogs = trpc.emailLog.getLogs.useQuery(
    { limit: 5 },
    { enabled: false }
  );
  const testGetEmailLogs = async () => {
    setIsLoading(true);
    try {
      const result = await getEmailLogs.refetch();
      setTestResults(prev => [...prev, {
        endpoint: 'emailLog.getLogs',
        result: result.data,
        timestamp: new Date().toISOString()
      }]);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setTestResults(prev => [...prev, {
        endpoint: 'emailLog.getLogs',
        error: errorMessage,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Test getting template analytics
  const getTemplateAnalytics = trpc.emailTemplateLog.getTemplateAnalytics.useQuery(
    { templateId: 'test-template-123' },
    { enabled: false }
  );
  const testGetTemplateAnalytics = async () => {
    setIsLoading(true);
    try {
      const result = await getTemplateAnalytics.refetch();
      setTestResults(prev => [...prev, {
        endpoint: 'emailTemplateLog.getTemplateAnalytics',
        result: result.data,
        timestamp: new Date().toISOString()
      }]);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setTestResults(prev => [...prev, {
        endpoint: 'emailTemplateLog.getTemplateAnalytics',
        error: errorMessage,
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">API Testing Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={testCreateEmailLog}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors"
        >
          Test Create Email Log
        </button>
        
        <button
          onClick={testGetEmailLogs}
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors"
        >
          Test Get Email Logs
        </button>
        
        <button
          onClick={testGetTemplateAnalytics}
          disabled={isLoading}
          className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-2 rounded transition-colors"
        >
          Test Template Analytics
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Test Results</h2>
        <button
          onClick={clearResults}
          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          Clear Results
        </button>
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2">Testing API endpoints...</p>
        </div>
      )}

      <div className="space-y-4">
        {testResults.map((result, index) => (
          <div key={index} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-blue-600">{result.endpoint}</h3>
              <span className="text-sm text-gray-500">{result.timestamp}</span>
            </div>
            
            {result.error ? (
              <div className="text-red-600 bg-red-50 p-3 rounded">
                <strong>Error:</strong> {result.error}
              </div>
            ) : (
              <div className="bg-white p-3 rounded border">
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(result.result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {testResults.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          <p>No test results yet. Click the buttons above to test your API endpoints.</p>
        </div>
      )}
    </div>
  );
}
