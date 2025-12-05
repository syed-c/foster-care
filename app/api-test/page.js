"use client";

import { useState, useEffect } from "react";
import GoogleMap from "@/components/GoogleMap";
import InteractiveMap from "@/components/InteractiveMap";

export default function ApiTestPage() {
  const [envData, setEnvData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/test-env")
      .then(res => res.json())
      .then(data => {
        setEnvData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch env data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">API Test Page</h1>
      
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Environment Variables</h2>
        {loading ? (
          <p>Loading...</p>
        ) : envData ? (
          <div className="space-y-2">
            <p><strong>Has API Key:</strong> {envData.hasApiKey ? "Yes" : "No"}</p>
            <p><strong>Is Placeholder:</strong> {envData.isPlaceholder ? "Yes" : "No"}</p>
            <p><strong>Is Empty:</strong> {envData.isEmpty ? "Yes" : "No"}</p>
            {envData.keyLength > 0 && (
              <p><strong>Key Length:</strong> {envData.keyLength}</p>
            )}
            {envData.keyStart && (
              <p><strong>Key Start:</strong> {envData.keyStart}...</p>
            )}
            {envData.setupInstructions && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="font-medium text-yellow-800">Setup Instructions:</p>
                <p className="text-yellow-700">{envData.setupInstructions}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Failed to load environment data</p>
        )}
      </div>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Static Map Test</h2>
        <div className="h-64">
          <GoogleMap 
            center={{ lat: 51.5074, lng: -0.1278 }}
            zoom={10}
            height="100%"
          />
        </div>
      </div>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Interactive Map Test</h2>
        <div className="h-96">
          <InteractiveMap 
            center={{ lat: 54.5, lng: -3.5 }}
            zoom={6}
            height="100%"
            countries={[
              { name: "England", lat: 52.3555, lng: -1.1743, agencies: 120 },
              { name: "Scotland", lat: 56.4907, lng: -4.2026, agencies: 85 },
              { name: "Wales", lat: 52.1307, lng: -3.7837, agencies: 65 },
              { name: "Northern Ireland", lat: 54.7877, lng: -6.4903, agencies: 40 }
            ]}
          />
        </div>
      </div>
    </div>
  );
}