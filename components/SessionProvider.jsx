'use client';

import { SessionProvider } from 'next-auth/react';

// Provider that wraps children with next-auth SessionProvider
export default function AuthSessionProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}