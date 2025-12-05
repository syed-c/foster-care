'use client';

import Link from 'next/link';
import { MapPin, Users } from 'lucide-react';

interface RegionData {
  name: string;
  agencies: number;
  families: number;
  description: string;
  slug: string;
}

export const RegionsMap = () => {
  const regions: RegionData[] = [
    {
      name: "London",
      agencies: 87,
      families: 1240,
      description: "Diverse communities with specialized urban fostering programs",
      slug: "london"
    },
    {
      name: "Manchester",
      agencies: 42,
      families: 680,
      description: "Northern warmth with strong community support networks",
      slug: "manchester"
    },
    {
      name: "Birmingham",
      agencies: 38,
      families: 590,
      description: "Midlands fostering excellence with innovative approaches",
      slug: "birmingham"
    },
    {
      name: "Edinburgh",
      agencies: 26,
      families: 320,
      description: "Scottish compassion with heritage-based care models",
      slug: "edinburgh"
    },
    {
      name: "Bristol",
      agencies: 31,
      families: 480,
      description: "Creative communities with progressive fostering initiatives",
      slug: "bristol"
    },
    {
      name: "Liverpool",
      agencies: 29,
      families: 410,
      description: "Coastal caring with maritime community traditions",
      slug: "liverpool"
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-text-charcoal mb-2 font-heading">
            Fostering Opportunities Across the UK
          </h2>
          
          <p className="text-sm text-gray-600 max-w-xl mx-auto font-body">
            Discover how communities across Britain are opening their hearts to children in need.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {regions.map((region, index) => (
            <Link 
              key={index} 
              href={`/fostering-agencies-uk/england/${region.slug}`}
              className="group block"
            >
              <div className="p-3 rounded-md border border-gray-100 hover:border-teal-200 transition-all duration-300 bg-gray-50">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-semibold text-text-charcoal font-heading">{region.name}</h3>
                  <MapPin className="w-3 h-3 text-teal-500 flex-shrink-0" />
                </div>
                
                <p className="text-gray-600 text-xs mb-2 font-body">{region.description}</p>
                
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Users className="w-3 h-3" />
                    <span className="font-body">{region.agencies} agencies</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Heart className="w-3 h-3" />
                    <span className="font-body">{region.families} families</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Adding missing Heart icon
const Heart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);