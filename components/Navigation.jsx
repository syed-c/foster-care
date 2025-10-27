'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/agencies', label: 'Browse Agencies' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7CE2A7] to-[#7DC3EB] flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#7CE2A7] to-[#7DC3EB] bg-clip-text text-transparent">
              Foster Care UK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#7CE2A7] ${
                  pathname === link.href ? 'text-[#7CE2A7]' : 'text-[#2C2C2C]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              className="bg-gradient-to-r from-[#7CE2A7] to-[#7DC3EB] text-white hover:opacity-90"
              asChild
            >
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-sm font-medium ${
                  pathname === link.href ? 'text-[#7CE2A7]' : 'text-[#2C2C2C]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              className="w-full mt-4 bg-gradient-to-r from-[#7CE2A7] to-[#7DC3EB] text-white"
              asChild
            >
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}