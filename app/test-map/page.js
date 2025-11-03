'use client';

import { useEffect, useState } from 'react';

export default function TestMapPage() {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === 'your-google-maps-api-key' || apiKey === '') {
      setTestResult({
        success: false,
        message: 'API key not found or invalid in environment variables'
      });
      setLoading(false);
      return;
    }

    // Test URL for a simple static map
    const testUrl = `https://maps.googleapis.com/maps/api/staticmap?center=51.5074,-0.1278&zoom=10&size=200x200&key=${apiKey}`;
    
    console.log('Testing with URL:', testUrl);
    
    // Try to fetch the image
    fetch(testUrl)
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);
        
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP ${response.status}: ${text}`);
          });
        }
        
        return response.blob();
      })
      .then(blob => {
        const imageUrl = URL.createObjectURL(blob);
        setTestResult({
          success: true,
          message: 'API key is working correctly',
          imageUrl: imageUrl
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Test failed:', error);
        setTestResult({
          success: false,
          message: `API test failed: ${error.message}`,
          error: error
        });
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background-offwhite p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-charcoal mb-6">Google Maps API Test</h1>
        
        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="w-8 h-8 border-4 border-[#773344] border-t-transparent rounded-full animate-spin mr-4" />
            <span className="text-gray-600">Testing Google Maps API key...</span>
          </div>
        )}
        
        {testResult && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Test Result: {testResult.success ? 'Success' : 'Failed'}
            </h2>
            
            <p className="mb-4">{testResult.message}</p>
            
            {testResult.success && testResult.imageUrl && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Test Map:</h3>
                <img 
                  src={testResult.imageUrl} 
                  alt="Test map" 
                  className="rounded-lg border"
                />
              </div>
            )}
            
            {!testResult.success && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Troubleshooting Steps:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Verify your API key at Google Cloud Console</li>
                  <li>Ensure Static Maps API is enabled for your project</li>
                  <li>Check that your API key has proper restrictions (if any)</li>
                  <li>Verify the API key is correctly set in .env.local</li>
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}