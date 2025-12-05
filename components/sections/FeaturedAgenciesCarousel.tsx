'use client';

import Link from 'next/link';
import { Star, MapPin, Users } from 'lucide-react';

interface Agency {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  specialties: string[];
  imageUrl: string;
  slug: string;
}

export const FeaturedAgenciesCarousel = () => {
  const agencies: Agency[] = [
    {
      id: 1,
      name: "Bright Futures Fostering",
      location: "London, England",
      rating: 4.9,
      reviews: 128,
      description: "Specializing in therapeutic fostering for children with complex needs.",
      specialties: ["Therapeutic", "Teenagers"],
      imageUrl: "https://images.unsplash.com/photo-1582268616942-6a684b4741d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      slug: "bright-futures-london"
    },
    {
      id: 2,
      name: "Northern Lights Care",
      location: "Manchester, England",
      rating: 4.8,
      reviews: 96,
      description: "Community-focused fostering with strong Northern values.",
      specialties: ["Emergency", "Short-term"],
      imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      slug: "northern-lights-manchester"
    },
    {
      id: 3,
      name: "Harbour Family Services",
      location: "Birmingham, England",
      rating: 4.9,
      reviews: 142,
      description: "Innovative fostering solutions with a focus on cultural sensitivity.",
      specialties: ["Cultural", "Long-term"],
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      slug: "harbour-family-birmingham"
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-text-charcoal mb-2 font-heading">
            Agencies Changing Lives Daily
          </h2>
          
          <p className="text-sm text-gray-600 max-w-xl mx-auto font-body">
            These carefully selected organizations represent the gold standard in UK fostering care.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {agencies.map((agency) => (
            <Link 
              key={agency.id} 
              href={`/fostering-agencies-uk/england/london/${agency.slug}`}
              className="group block"
            >
              <div className="bg-gray-50 rounded-md overflow-hidden h-full border border-gray-100 hover:border-teal-200 transition-all duration-300">
                <div className="relative">
                  <div className="h-24 overflow-hidden">
                    <img 
                      src={agency.imageUrl} 
                      alt={agency.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-2 right-2 bg-white rounded-full px-1 py-0.5 flex items-center gap-1 shadow-sm">
                    <Star className="w-2.5 h-2.5 text-amber-500 fill-current" />
                    <span className="text-xs font-semibold text-text-charcoal">{agency.rating}</span>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm font-semibold text-text-charcoal font-heading group-hover:text-teal-600 transition-colors">
                      {agency.name}
                    </h3>
                    <MapPin className="w-2.5 h-2.5 text-gray-400 flex-shrink-0 ml-1" />
                  </div>
                  
                  <p className="text-gray-600 text-xs mb-1 font-body flex items-center gap-1">
                    <MapPin className="w-2 h-2" />
                    {agency.location}
                  </p>
                  
                  <p className="text-gray-700 text-xs mb-2 font-body line-clamp-2">
                    {agency.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {agency.specialties.slice(0, 2).map((specialty, idx) => (
                      <span 
                        key={idx} 
                        className="px-1.5 py-0.5 bg-teal-50 text-teal-700 rounded text-xs font-body"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="w-2.5 h-2.5" />
                    <span className="font-body">{agency.reviews} reviews</span>
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