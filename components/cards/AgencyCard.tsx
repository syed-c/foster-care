import React from 'react';
import Link from 'next/link';
import { MapPin, Star, Heart } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';

interface Agency {
  id: string;
  name: string;
  slug: string;
  location: {
    city: string;
    region: string;
  };
  description: string;
  rating: number;
  reviewCount: number;
  type: string;
  featured: boolean;
  logoUrl: string | null;
  country: string;
  recruiting?: boolean;
}

interface AgencyCardProps {
  agency: Agency;
}

export const AgencyCard: React.FC<AgencyCardProps> = ({ agency }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <GlassCard className="group hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer rounded-xxl">
      <Link href={`/fostering-agencies-uk/${agency.country}/${agency.location.region.toLowerCase().replace(/\s+/g, '-')}/${agency.location.city.toLowerCase().replace(/\s+/g, '-')}/${agency.slug}`}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-mint/20 to-primary-sky/20 flex items-center justify-center">
              {agency.logoUrl ? (
                <img src={agency.logoUrl} alt={agency.name} width={48} height={48} className="rounded" />
              ) : (
                <Heart className="w-8 h-8 text-primary-mint" />
              )}
            </div>
            {agency.featured && (
              <span className="bg-accent-peach text-text-charcoal text-xs font-bold px-2 py-1 rounded-full font-body">
                Featured
              </span>
            )}
          </div>
          
          <h3 className="text-xl group-hover:text-primary-mint transition-colors font-heading mb-2">
            {agency.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-3">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600 text-sm font-body">
              {agency.location.city}{agency.location.region && `, ${agency.location.region}`}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 font-body">
            {agency.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              {renderStars(agency.rating || 0)}
              <span className="text-sm text-gray-600 ml-2 font-body">
                ({agency.reviewCount || 0})
              </span>
            </div>
            <span className="text-xs border border-gray-300 px-2 py-1 rounded-full font-body">
              {agency.type}
            </span>
          </div>
          
          {agency.recruiting && (
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full mb-4 font-body">
              Currently Recruiting
            </span>
          )}
          
          <GradientButton variant="outline" className="w-full group-hover:bg-primary-mint/10 group-hover:text-primary-mint font-body">
            View Profile
          </GradientButton>
        </div>
      </Link>
    </GlassCard>
  );
};