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
    <nav className="bg-background.DEFAULT/80 backdrop-blur-md border-b border-background.soft/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary.start to-primary.end flex items-center justify-center glow-primary transition-all duration-300 hover:scale-110 card-3d">
              <Heart className="w-6 h-6 text-text.dark" fill="currentColor" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary.start to-primary.end bg-clip-text text-transparent font-poppins transition-all duration-300 hover:scale-105">
              Foster Care UK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary.start hover:scale-105 font-inter card-3d ${
                  pathname === link.href ? 'text-primary.start font-bold' : 'text-text.dark'
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
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-card.DEFAULT/50 transition-all duration-300 hover:scale-105 card-3d">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary.start to-primary.end flex items-center justify-center glow-primary transition-all duration-300 hover:scale-110">
                      {session.user.image ? (
                        <img src={session.user.image} alt={session.user.name} className="w-8 h-8 rounded-full transition-all duration-300 hover:scale-110" />
                      ) : (
                        <User className="w-4 h-4 text-text.dark" />
                      )}
                    </div>
                    <span className="text-sm font-medium font-inter">{session.user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 glass-card rounded-modern card-3d">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer font-inter hover:bg-card.DEFAULT/50 transition-colors">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer font-inter hover:bg-card.DEFAULT/50 transition-colors">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {session.user.role === 'admin' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer font-inter hover:bg-card.DEFAULT/50 transition-colors">
                          <Settings className="w-4 h-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="cursor-pointer text-red-600 font-inter hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="bg-gradient-to-r from-primary.start to-primary.end text-text.dark hover:opacity-90 font-inter btn-3d transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-background.soft transition-all duration-300 hover:scale-105 card-3d"
          >
            {isOpen ? <X className="w-6 h-6 transition-all duration-300 hover:scale-110" /> : <Menu className="w-6 h-6 transition-all duration-300 hover:scale-110" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-background.soft glass-card rounded-b-modern card-3d">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-sm font-medium font-inter hover:bg-card.DEFAULT/30 transition-colors rounded-lg px-2 ${
                  pathname === link.href ? 'text-primary.start font-bold' : 'text-text.dark'
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
                  className="block py-2 text-sm font-medium text-text.dark font-inter hover:bg-card.DEFAULT/30 transition-colors rounded-lg px-2"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {session.user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="block py-2 text-sm font-medium text-text.dark font-inter hover:bg-card.DEFAULT/30 transition-colors rounded-lg px-2"
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
                      className="block py-2 text-sm font-medium text-text.dark font-inter hover:bg-card.DEFAULT/30 transition-colors rounded-lg px-2"
                      onClick={() => setIsOpen(false)}
                    >
                      API Test
                    </Link>
                    <Link
                      href="/google-maps-test"
                      className="block py-2 text-sm font-medium text-text.dark font-inter hover:bg-card.DEFAULT/30 transition-colors rounded-lg px-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Maps Test
                    </Link>
                  </>
                )}
                <Button
                  variant="outline"
                  className="w-full mt-4 font-inter btn-3d transition-all duration-300 hover:scale-105"
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
                className="w-full mt-4 bg-gradient-to-r from-primary.start to-primary.end text-text.dark font-inter btn-3d transition-all duration-300 hover:scale-105"
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