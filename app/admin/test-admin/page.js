'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function AdminTestPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== 'loading') {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background-offwhite">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Test Page</h1>
        
        {status === 'authenticated' ? (
          <div>
            <p className="mb-4">Status: <span className="font-semibold text-green-600">Authenticated</span></p>
            <p className="mb-4">Role: <span className="font-semibold">{session.user.role}</span></p>
            {session.user.role === 'admin' ? (
              <p className="mb-4 text-green-600 font-semibold">You have admin access!</p>
            ) : (
              <p className="mb-4 text-red-600 font-semibold">You do not have admin access.</p>
            )}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">Session Data:</h2>
              <pre className="text-sm overflow-x-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-4">Status: <span className="font-semibold text-red-600">Not Authenticated</span></p>
            <p>Please sign in to test the admin access.</p>
          </div>
        )}
      </div>
    </div>
  );
}