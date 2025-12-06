'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const SoftFooter = () => {
  const footerLinks = {
    directory: [
      { name: 'Find Agencies', href: '/fostering-agencies-uk' },
      { name: 'Compare Agencies', href: '/compare-agencies' },
      { name: 'Success Stories', href: '/stories' },
      { name: 'Resources', href: '/resources' },
    ],
    about: [
      { name: 'Our Mission', href: '/about' },
      { name: 'Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Safeguarding', href: '/safeguarding' },
    ],
  };

  return (
    <footer className="bg-brand-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-heading text-brand-cream mb-4">Foster Care Directory</h2>
              <p className="text-gray-300 font-body text-base mb-6 max-w-md">
                Connecting compassionate families with verified fostering agencies across the UK to create life-changing opportunities for children.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-cream hover:bg-brand-blue transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-cream hover:bg-brand-blue transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-cream hover:bg-brand-blue transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-cream hover:bg-brand-blue transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Directory Links */}
          <div>
            <h3 className="text-lg font-bold font-heading text-brand-cream mb-4">Directory</h3>
            <ul className="space-y-3">
              {footerLinks.directory.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-brand-cream font-body text-base transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* About Links */}
          <div>
            <h3 className="text-lg font-bold font-heading text-brand-cream mb-4">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-brand-cream font-body text-base transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold font-heading text-brand-cream mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-brand-cream font-body text-base transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-cream">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-300 font-body text-sm">123 Care Street</p>
                <p className="text-gray-300 font-body text-sm">London, SW1A 1AA</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-cream">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-300 font-body text-sm">Helpline: 0800 123 4567</p>
                <p className="text-gray-300 font-body text-sm">Mon-Sun: 8am-8pm</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-cream">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-gray-300 font-body text-sm">support@fostercare.co.uk</p>
                <p className="text-gray-300 font-body text-sm">help@fostercare.co.uk</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-400 font-body text-sm">
            © {new Date().getFullYear()} Foster Care Directory UK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};