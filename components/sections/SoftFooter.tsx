'use client';

import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export const SoftFooter = () => {
  const navigation = {
    platform: [
      { name: 'Find Agencies', href: '/fostering-agencies-uk' },
      { name: 'Resources & Guides', href: '/resources' },
      { name: 'Success Stories', href: '/stories' },
      { name: 'Agency Login', href: '/agency-login' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Safety Tips', href: '/safety' },
      { name: 'FAQ', href: '/faq' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Mission', href: '/mission' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
  };

  return (
    <footer className="pt-16 pb-8 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-text-charcoal font-heading">FosterCare UK</span>
            </div>
            <p className="text-gray-600 mb-6 font-body max-w-md">
              Connecting children in need with loving families across the United Kingdom. 
              Building brighter futures, one family at a time.
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-text-charcoal mb-6 font-heading uppercase tracking-wide">Platform</h3>
            <ul className="space-y-4">
              {navigation.platform.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 hover:text-teal-600 transition-colors font-body text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-text-charcoal mb-6 font-heading uppercase tracking-wide">Support</h3>
            <ul className="space-y-4">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 hover:text-teal-600 transition-colors font-body text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold text-text-charcoal mb-6 font-heading uppercase tracking-wide">Company</h3>
            <ul className="space-y-4">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 hover:text-teal-600 transition-colors font-body text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-text-charcoal mb-4 font-heading">Contact Our Support Team</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 font-body">0800 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 font-body">support@fostercare.co.uk</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 font-body">London, United Kingdom</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-text-charcoal mb-4 font-heading">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600 mb-4 font-body text-sm">
                Get inspiring stories, expert advice, and updates on fostering opportunities.
              </p>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-body"
                />
                <button 
                  type="submit"
                  className="bg-teal-500 text-white px-5 py-3 rounded-lg hover:bg-teal-600 transition-colors font-body text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 font-body text-sm">
              © 2023 FosterCare UK. All rights reserved. Made with ❤️ for families across the United Kingdom.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-700 font-body text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-700 font-body text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-gray-700 font-body text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};