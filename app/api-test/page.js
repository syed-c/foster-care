'use client';

import { useState, useEffect } from 'react';

export default function ApiTest() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/agencies');
        if (response.ok) {
          const data = await response.json();
          setAgencies(data.agencies || []);
        } else {
          setError('Failed to fetch agencies');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgencies();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      {loading && <p>Loading agencies...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {agencies.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Agencies ({agencies.length})</h2>
          <ul>
            {agencies.map((agency) => (
              <li key={agency.id} className="border p-2 mb-2">
                <p><strong>Name:</strong> {agency.name}</p>
                <p><strong>Status:</strong> {agency.status}</p>
                <p><strong>Verified:</strong> {agency.verified ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {agencies.length === 0 && !loading && !error && (
        <p>No agencies found</p>
      )}
    </div>
  );
}