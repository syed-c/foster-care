import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-main w-full">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-white">
                Foster Care UK
              </span>
            </div>
            <p className="text-sm text-white/80 mb-4">
              Connecting caring hearts with fostering opportunities across the UK.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300">
                <Instagram className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-white/80 hover:text-white transition-all duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/80 hover:text-white transition-all duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-white/80 hover:text-white transition-all duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white/80 hover:text-white transition-all duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/agencies" className="text-sm text-white/80 hover:text-white transition-all duration-300">
                  Browse Agencies
                </Link>
              </li>
              <li>
                <Link href="/foster-agency" className="text-sm text-white/80 hover:text-white transition-all duration-300">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-white/80 hover:text-white transition-all duration-300">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-white/80 hover:text-white transition-all duration-300">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-sm text-white/80 hover:text-white transition-all duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources/faqs" className="text-sm text-white/80 hover:text-white transition-all duration-300">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/resources/guides" className="text-sm text-white/80 hover:text-white transition-all duration-300">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/80 hover:text-white transition-all duration-300">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} Foster Care Directory UK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}