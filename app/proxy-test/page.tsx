'use client';

import { useState, useEffect } from 'react';

export default function ProxyTestPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Log debug info
        const debug = {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          location: typeof window !== 'undefined' ? window.location.href : 'server'
        };
        setDebugInfo(debug);
        
        console.log('Starting proxy fetch request...');
        console.log('Debug info:', debug);
        
        // Using our proxy endpoint
        const response = await fetch('/api/test-proxy');
        
        console.log('Proxy fetch completed, response:', response);
        console.log('Response status:', response.status);
        console.log('Response ok?', response.ok);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('JSON parsed, result:', result);
        
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        console.error('Proxy fetch error:', err);
        setError(err.message);
        setDebugInfo(prev => ({
          ...prev,
          error: err.message,
          errorStack: err.stack
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div>
      <h1>Proxy Test - Loading...</h1>
      <div style={{background: '#efe', padding: '1rem', margin: '1rem 0'}}>
        <h3>Debug Info:</h3>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
    </div>
  );
  
  if (error) return (
    <div>
      <h1>Proxy Test - Error</h1>
      <p>Error: {error}</p>
      <div style={{background: '#fee', padding: '1rem', margin: '1rem 0'}}>
        <h3>Debug Info:</h3>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
    </div>
  );
  
  if (!data) return <div>Proxy Test - No data</div>;

  return (
    <div>
      <h1>Proxy Test Results</h1>
      <p>Country: {data.title}</p>
      <p>Regions: {data.regions?.length || 0}</p>
      <p>Counties: {data.counties?.length || 0}</p>
      <p>Blocks: {data.blocks?.length || 0}</p>
      
      <div style={{background: '#efe', padding: '1rem', margin: '1rem 0'}}>
        <h3>Debug Info:</h3>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
      
      <div style={{background: '#eee', padding: '1rem', margin: '1rem 0'}}>
        <h3>Raw Data:</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}