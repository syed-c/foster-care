'use client';

import { useState, useEffect } from 'react';

export default function TestSupabasePage() {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testSupabase = async () => {
      try {
        console.log('Testing Supabase connection...');
        const response = await fetch('/api/test-supabase');
        const result = await response.json();
        console.log('Supabase test result:', result);
        setTestResult(result);
      } catch (error) {
        console.error('Error testing Supabase:', error);
        setTestResult({
          success: false,
          error: 'Network error',
          message: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    testSupabase();
  }, []);

  return (
    <div className="min-h-screen bg-background-offwhite p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-charcoal mb-6">Supabase Connection Test</h1>
        
        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="w-8 h-8 border-4 border-[#773344] border-t-transparent rounded-full animate-spin mr-4" />
            <span className="text-gray-600">Testing Supabase connection...</span>
          </div>
        )}
        
        {testResult && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Test Result: {testResult.success ? 'Success' : 'Failed'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Message:</h3>
                <p className={testResult.success ? "text-green-600" : "text-red-600"}>
                  {testResult.message}
                </p>
              </div>
              
              {testResult.error && (
                <div>
                  <h3 className="font-medium">Error:</h3>
                  <p className="text-red-600">{testResult.error}</p>
                </div>
              )}
              
              {testResult.data && (
                <div>
                  <h3 className="font-medium">Data:</h3>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(testResult.data, null, 2)}
                  </pre>
                </div>
              )}
              
              {!testResult.success && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Troubleshooting Steps:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Verify your Supabase credentials in .env.local</li>
                    <li>Check that your Supabase project URL is correct</li>
                    <li>Ensure your Supabase anon key and service role key are valid</li>
                    <li>Verify that the countries table exists in your database</li>
                    <li>Check Supabase project settings and network restrictions</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}