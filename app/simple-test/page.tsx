'use client';

import { useState, useEffect } from 'react';

export default function SimpleTestPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    // Add a timeout to catch hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
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
        
        console.log('Starting fetch request...');
        console.log('Debug info:', debug);
        
        // Using relative URL with timeout
        const response = await fetch('/api/foster-agency/england', {
          signal: controller.signal
        });
        
        console.log('Fetch completed, response:', response);
        console.log('Response status:', response.status);
        console.log('Response ok?', response.ok);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('JSON parsed, result:', result);
        setData(result);
      } catch (err) {
        console.error('Fetch error:', err);
        
        if (err.name === 'AbortError') {
          setError('Request timed out');
        } else {
          setError(err.message);
        }
        
        setDebugInfo(prev => ({
          ...prev,
          error: err.message,
          errorName: err.name,
          errorStack: err.stack
        }));
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchData();
    
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) return (
    <div>
      <h1>Simple Test - Loading...</h1>
      <div style={{background: '#efe', padding: '1rem', margin: '1rem 0'}}>
        <h3>Debug Info:</h3>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
    </div>
  );
  
  if (error) return (
    <div>
      <h1>Simple Test - Error</h1>
      <p>Error: {error}</p>
      <div style={{background: '#fee', padding: '1rem', margin: '1rem 0'}}>
        <h3>Debug Info:</h3>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
    </div>
  );
  
  if (!data) return <div>Simple Test - No data</div>;

  return (
    <div>
      <h1>Simple Test Results</h1>
      <p>Country: {data.title}</p>
      <p>Regions: {data.regions?.length || 0}</p>
      <p>Counties: {data.counties?.length || 0}</p>
      <p>Blocks: {data.blocks?.length || 0}</p>
      
      <div style={{background: '#efe', padding: '1rem', margin: '1rem 0'}}>
        <h3>Debug Info:</h3>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
    </div>
  );
}