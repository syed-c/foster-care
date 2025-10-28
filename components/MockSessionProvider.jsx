'use client';

import React, { createContext, useContext, useState } from 'react';

// Create a mock session context
const SessionContext = createContext({
  data: null,
  status: 'unauthenticated',
  update: () => {}
});

// Mock useSession hook that can be imported by components
export const useSession = () => {
  return useContext(SessionContext);
};

// Mock signOut function
export const signOut = () => {
  window.location.href = '/';
  return Promise.resolve();
};

// Mock signIn function
export const signIn = () => {
  window.location.href = '/auth/signin';
  return Promise.resolve();
};

// Mock SessionProvider component
export default function MockSessionProvider({ children }) {
  const [session, setSession] = useState(null);
  
  const value = {
    data: session,
    status: session ? 'authenticated' : 'unauthenticated',
    update: setSession
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}