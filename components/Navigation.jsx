'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Heart, User, LogOut, Settings } from 'lucide-react';
import { Button } from './ui/button.jsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu.jsx';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/agencies', label: 'Browse Agencies' },
    { href: '/foster-agency', label: 'Locations' },
    { href: '/resources', label: 'Resources' },
    { href: '/contact', label: 'Contact' },
    // Developer links - only shown in development
    ...(process.env.NODE_ENV === 'development' ? [{ href: '/api-test', label: 'API Test' }] : []),
    ...(process.env.NODE_ENV === 'development' ? [{ href: '/google-maps-test', label: 'Maps Test' }] : []),
  ];

  return (
    <nav className="bg-brand-dark w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center transition-all duration-300 hover:scale-110">
              <Heart className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-white transition-all duration-300 hover:scale-105">
              Foster Care UK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-white hover:scale-105 ${
                  pathname === link.href ? 'text-white font-bold' : 'text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center transition-all duration-300 hover:scale-110">
                      {session.user.image ? (
                        <img src={session.user.image} alt={session.user.name} className="w-8 h-8 rounded-full transition-all duration-300 hover:scale-110" />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-white">{session.user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white rounded-xl shadow-lg border border-neutral-200">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer hover:bg-neutral-100 transition-colors">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer hover:bg-neutral-100 transition-colors">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {session.user.role === 'admin' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer hover:bg-neutral-100 transition-colors">
                          <Settings className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="cursor-pointer text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="bg-brand-accent text-white hover:bg-emerald-600 rounded-full px-4 py-2 font-medium transition-all duration-300 hover:scale-105"
              >
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            {isOpen ? <X className="w-6 h-6 text-white transition-all duration-300 hover:scale-110" /> : <Menu className="w-6 h-6 text-white transition-all duration-300 hover:scale-110" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-brand-dark rounded-b-xl">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-sm font-medium hover:bg-white/10 transition-colors rounded-lg px-2 ${
                  pathname === link.href ? 'text-white font-bold' : 'text-white/80'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors rounded-lg px-2"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {session.user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="block py-2 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors rounded-lg px-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                {/* Developer links - only shown in development */}
                {process.env.NODE_ENV === 'development' && (
                  <>
                    <Link
                      href="/api-test"
                      className="block py-2 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors rounded-lg px-2"
                      onClick={() => setIsOpen(false)}
                    >
                      API Test
                    </Link>
                    <Link
                      href="/google-maps-test"
                      className="block py-2 text-sm font-medium text-white/80 hover:bg-white/10 transition-colors rounded-lg px-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Maps Test
                    </Link>
                  </>
                )}
                <Button
                  variant="outline"
                  className="w-full mt-4 bg-white/10 text-white border-white/20 hover:bg-white/20 font-medium"
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setIsOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                className="w-full mt-4 bg-brand-accent text-white hover:bg-emerald-600 rounded-full font-medium"
                asChild
              >
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}