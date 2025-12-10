'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use NEXT_PUBLIC_BASE_URL if available, otherwise fallback to localhost:3000
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        
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
        console.error('Fetch error:', err);
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}