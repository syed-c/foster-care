import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-background-offwhite to-secondary-blue/10 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-green to-secondary-blue flex items-center justify-center">
                <Heart className="w-6 h-6 text-text-charcoal" fill="currentColor" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent">
                Foster Care UK
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4 font-inter">
              Connecting caring hearts with fostering opportunities across the UK.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-primary-green/10 flex items-center justify-center hover:bg-primary-green/20 transition-colors">
                <Facebook className="w-4 h-4 text-primary-green" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-secondary-blue/10 flex items-center justify-center hover:bg-secondary-blue/20 transition-colors">
                <Twitter className="w-4 h-4 text-secondary-blue" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-accent-peach/10 flex items-center justify-center hover:bg-accent-peach/20 transition-colors">
                <Instagram className="w-4 h-4 text-accent-peach" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text-charcoal mb-4 font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/agencies" className="text-sm text-gray-600 hover:text-primary-green transition-colors font-inter">
                  Browse Agencies
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-gray-600 hover:text-primary-green transition-colors font-inter">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary-green transition-colors font-inter">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary-green transition-colors font-inter">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Agencies */}
          <div>
            <h3 className="font-semibold text-text-charcoal mb-4 font-poppins">For Agencies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/signup" className="text-sm text-gray-600 hover:text-primary-green transition-colors font-inter">
                  Register Your Agency
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-600 hover:text-primary-green transition-colors font-inter">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-primary-green transition-colors font-inter">
                  Agency Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-text-charcoal mb-4 font-poppins">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-gray-600 font-inter">
                <Mail className="w-4 h-4 mt-0.5 text-primary-green" />
                <span>info@foster-care.co.uk</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-gray-600 font-inter">
                <Phone className="w-4 h-4 mt-0.5 text-secondary-blue" />
                <span>0800 123 4567</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-gray-600 font-inter">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-green" />
                <span>London, United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600 font-inter">
            © {new Date().getFullYear()} Foster Care Directory UK. All rights reserved. |{' '}
            <Link href="/privacy" className="hover:text-primary-green transition-colors font-inter">
              Privacy Policy
            </Link>
            {' | '}
            <Link href="/terms" className="hover:text-primary-green transition-colors font-inter">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}