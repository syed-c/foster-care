'use client';

import { useState } from 'react';

export default function TestSignupPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const testSignup = async () => {
    setLoading(true);
    setResult(null);
    
    // Generate a unique email for testing
    const testEmail = email || `test-${Date.now()}@example.com`;
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: testEmail,
          password: 'password123',
          role: 'user'
        }),
      });

      const data = await response.json();
      setResult({ status: response.status, data });
    } catch (error) {
      setResult({ status: 'error', error: error.message, stack: error.stack });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Test Signup</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Email (optional, will generate unique if empty):</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full max-w-md"
          placeholder="test@example.com"
        />
      </div>
      
      <button 
        onClick={testSignup}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {loading ? 'Testing...' : 'Test Signup'}
      </button>
      
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-bold">Result:</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-yellow-100 rounded">
        <h2 className="font-bold mb-2">Next Steps:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Check the server console for detailed error messages</li>
          <li>Update your Supabase credentials in <code>.env.local</code></li>
          <li>Visit <a href="/api/test-supabase" className="text-blue-600 underline">/api/test-supabase</a> to test the connection</li>
        </ol>
      </div>
    </div>
  );
}