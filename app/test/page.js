'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function TestPage() {
  const { data: session, status } = useSession();
  const [serverSession, setServerSession] = useState(null);

  useEffect(() => {
    fetch('/api/session-test')
      .then(res => res.json())
      .then(data => setServerSession(data.session));
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Session Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Client Session:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Server Session:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(serverSession, null, 2)}
        </pre>
      </div>
    </div>
  );
}