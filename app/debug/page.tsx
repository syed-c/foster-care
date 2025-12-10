'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use window.location for client-side URL construction
        const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'http://localhost:3000';
        
        // Ensure the URL is properly formatted
        const apiUrl = `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}api/foster-agency/england`;
        
        console.log('Fetching from:', apiUrl);
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Debug fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Debug Information</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}