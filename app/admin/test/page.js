'use client';

import { useSession } from 'next-auth/react';

export default function TestPage() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <div>No session</div>;
  }
  
  return (
    <div>
      <h1>Session Test</h1>
      <p>User: {session.user.name}</p>
      <p>Role: {session.user.role}</p>
      <p>Status: {status}</p>
    </div>
  );
}