'use client';

import { X } from 'lucide-react';

export default function CloseButton({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full hover:bg-neutral-100 transition-colors ${className}`}
      aria-label="Close"
    >
      <X className="w-6 h-6 text-neutral-600" />
    </button>
  );
}