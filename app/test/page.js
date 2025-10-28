'use client';

import { Button } from '@/components/ui/button';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] to-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-[#2C2C2C] mb-4">Test Page</h1>
        <p className="text-lg text-gray-600 mb-8">This is a test page to check if the app is working properly.</p>
        <Button className="bg-gradient-to-r from-[#773344] to-[#E3B5A4]">
          Test Button
        </Button>
      </div>
    </div>
  );
}