'use client';

import Navigation from '@/components/Navigation.jsx';
import Footer from '@/components/Footer.jsx';

export default function SiteShell({ children }) {
  return (
    <div className="min-h-screen bg-brand-light flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <div className="max-w-[1200px] mx-auto rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm my-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}