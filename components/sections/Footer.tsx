'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Find Agencies', href: '/fostering-agencies-uk' },
      { name: 'Become a Foster Parent', href: '/become-a-foster-parent' },
      { name: 'Support Services', href: '/support-services' },
      { name: 'Training Programs', href: '/training-programs' },
    ],
    resources: [
      { name: 'Fostering Guides', href: '/resources/fostering-guides' },
      { name: 'Legal Framework', href: '/resources/legal-framework' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Blog', href: '/blog' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
    ],
  };

  return (
    <footer className="bg-brand-blue text-white pt-16 pb-8">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold font-heading mb-4">Foster Care Directory</div>
            <p className="text-white/90 font-body mb-6 max-w-md">
              Connecting children in need with caring families across the UK. Our platform provides 
              comprehensive resources and support for aspiring foster parents.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-white/90 hover:text-white font-body transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-white/90 hover:text-white font-body transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-white/90 hover:text-white font-body transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold font-heading mb-1">Call Us</div>
                <div className="text-white/90 font-body">0800-FOSTER-KIDS</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold font-heading mb-1">Email Us</div>
                <div className="text-white/90 font-body">info@fostercare.co.uk</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold font-heading mb-1">Visit Us</div>
                <div className="text-white/90 font-body">123 Care Street, London, SW1A 1AA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
                  
        <div className="text-center text-white/70 font-body text-sm pt-8 border-t border-white/10 mt-8">
          <p>© {currentYear} Foster Care Directory UK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};