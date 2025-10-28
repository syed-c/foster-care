import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#F5E9E2] via-white to-[#F5E9E2]/30 border-t border-gray-100 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#773344] to-[#E3B5A4] flex items-center justify-center glass-strong">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#773344] to-[#E3B5A4] bg-clip-text text-transparent">
                Foster Care UK
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Connecting caring hearts with fostering opportunities across the UK.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/50 transition-colors">
                <Facebook className="w-5 h-5 text-[#773344]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/50 transition-colors">
                <Twitter className="w-5 h-5 text-[#E3B5A4]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/50 transition-colors">
                <Instagram className="w-5 h-5 text-[#773344]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[#2C2C2C] mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/agencies" className="text-sm text-gray-600 hover:text-[#773344] transition-colors hover:underline">
                  Browse Agencies
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-gray-600 hover:text-[#773344] transition-colors hover:underline">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-[#773344] transition-colors hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-[#773344] transition-colors hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Agencies */}
          <div>
            <h3 className="font-semibold text-[#2C2C2C] mb-4 text-lg">For Agencies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/signup" className="text-sm text-gray-600 hover:text-[#773344] transition-colors hover:underline">
                  Register Your Agency
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-600 hover:text-[#773344] transition-colors hover:underline">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-[#773344] transition-colors hover:underline">
                  Agency Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-[#2C2C2C] mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-gray-600">
                <Mail className="w-5 h-5 mt-0.5 text-[#773344]" />
                <span>info@foster-care.co.uk</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-gray-600">
                <Phone className="w-5 h-5 mt-0.5 text-[#E3B5A4]" />
                <span>0800 123 4567</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-gray-600">
                <MapPin className="w-5 h-5 mt-0.5 text-[#773344]" />
                <span>London, United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Foster Care Directory UK. All rights reserved. |{' '}
            <Link href="/privacy" className="hover:text-[#773344] transition-colors hover:underline">
              Privacy Policy
            </Link>
            {' | '}
            <Link href="/terms" className="hover:text-[#773344] transition-colors hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}