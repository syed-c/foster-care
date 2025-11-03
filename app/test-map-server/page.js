export default function TestMapServerPage() {
  // Server-side environment variable check
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  const hasApiKey = !!apiKey && apiKey !== 'your-google-maps-api-key' && apiKey !== '';
  
  return (
    <div className="min-h-screen bg-background-offwhite p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-charcoal mb-6">Google Maps API Server Test</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variable Check</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">API Key Present:</h3>
              <p className={hasApiKey ? "text-green-600" : "text-red-600"}>
                {hasApiKey ? 'Yes' : 'No'}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">API Key Value:</h3>
              <p className="font-mono text-sm break-all">
                {apiKey ? 
                  (apiKey.length > 20 ? `${apiKey.substring(0, 20)}...` : apiKey) : 
                  'Not found'}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Expected Variable Name:</h3>
              <p className="font-mono text-sm">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</p>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>If API key is missing, add it to your .env.local file</li>
                <li>If API key exists but map still fails, check Google Cloud Console:
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li>Ensure Static Maps API is enabled</li>
                    <li>Check API key restrictions</li>
                    <li>Verify billing is enabled for your project</li>
                  </ul>
                </li>
                <li>Restart your development server after .env.local changes</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}