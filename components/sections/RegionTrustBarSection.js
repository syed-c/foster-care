'use client';

// RegionTrustBarSection.js
import { Shield, Award } from 'lucide-react';

export default function RegionTrustBarSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || `Regulated & Trusted by UK Authorities`;
  const authorityName = data?.authorityName || "Ofsted";
  const authorityUrl = data?.authorityUrl || "#";
  const ofstedNote = data?.ofstedNote || "All agencies meet strict regulatory standards";
  const safeguardingNote = data?.safeguardingNote || "Comprehensive safeguarding policies in place";

  return (
    <section className="py-8 bg-gray-50 border-t border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center mr-4">
              <Shield className="w-6 h-6 text-primary-green" />
            </div>
            <div>
              <h3 className="font-bold text-text-charcoal">{title}</h3>
              <p className="text-sm text-gray-600">
                {ofstedNote}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-primary-green mr-2" />
              <span className="text-sm">
                Regulated by <a href={authorityUrl} className="text-primary-green font-medium hover:underline">{authorityName}</a>
              </span>
            </div>
            {safeguardingNote && (
              <div className="hidden md:block w-px h-8 bg-gray-300"></div>
            )}
            {safeguardingNote && (
              <div className="text-sm text-gray-600">
                {safeguardingNote}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}