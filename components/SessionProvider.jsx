'use client';

// Simple provider that just renders children without next-auth dependency
export default function AuthSessionProvider({ children }) {
  return <>{children}</>;
}
