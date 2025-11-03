'use client';

import { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Users, Star, MapPinIcon, X } from 'lucide-react';
import InteractiveMap from '@/components/InteractiveMap';
import Link from 'next/link';

export default function MapSection({ countries = [] }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [nearbyRegions, setNearbyRegions] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [loadingAgencies, setLoadingAgencies] = useState(false);
  
  // Get default coordinates for UK countries
  const getCountryCoordinates = (slug) => {
    const coordinates = {
      'england': { lat: 52.3555, lng: -1.1743 },
      'scotland': { lat: 56.4907, lng: -4.2026 },
      'wales': { lat: 52.1307, lng: -3.7837 },
      'northern-ireland': { lat: 54.7855, lng: -6.4923 }
    };
    return coordinates[slug] || null;
  };

  // Add lat/lng to countries for map markers if not already present
  const countriesWithCoords = countries.map(country => ({
    ...country,
    lat: country.lat || country.latitude || getCountryCoordinates(country.slug)?.lat || 54.5,
    lng: country.lng || country.longitude || getCountryCoordinates(country.slug)?.lng || -3.5
  }));

  // Mock agencies data - in a real app, this would come from an API
  const getAgenciesForRegion = (regionSlug) => {
    // This would be replaced with an actual API call
    const mockAgencies = {
      'england': [
        {
          id: 1,
          name: "Bright Futures Fostering",
          location: { city: "London" },
          description: "Specialist in caring for teenagers and sibling groups.",
          rating: 4.8,
          reviewCount: 42,
          type: "Private",
          featured: true
        },
        {
          id: 2,
          name: "London Family Care",
          location: { city: "London" },
          description: "Providing compassionate care for children across London.",
          rating: 4.6,
          reviewCount: 38,
          type: "Local Authority",
          featured: false
        }
      ],
      'scotland': [
        {
          id: 3,
          name: "Scottish Family Care",
          location: { city: "Edinburgh" },
          description: "Providing compassionate care for children across Scotland.",
          rating: 4.9,
          reviewCount: 38,
          type: "Local Authority",
          featured: true
        }
      ],
      'wales': [
        {
          id: 4,
          name: "Welsh Hearts Together",
          location: { city: "Cardiff" },
          description: "Welsh-speaking fostering service with specialized support.",
          rating: 4.7,
          reviewCount: 29,
          type: "Independent",
          featured: true
        }
      ],
      'northern-ireland': [
        {
          id: 5,
          name: "Northern Ireland Foster Care",
          location: { city: "Belfast" },
          description: "Dedicated to providing exceptional foster care services.",
          rating: 4.5,
          reviewCount: 24,
          type: "Private",
          featured: false
        }
      ]
    };
    
    return mockAgencies[regionSlug] || [];
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    
    // Find nearby regions based on selected region
    if (region && region.lat && region.lng) {
      const nearby = findNearbyRegions(region.lat, region.lng, countriesWithCoords);
      setNearbyRegions(nearby);
    }
    
    // Load agencies for the selected region
    if (region && region.slug) {
      setLoadingAgencies(true);
      // Simulate API call delay
      setTimeout(() => {
        const regionAgencies = getAgenciesForRegion(region.slug);
        setAgencies(regionAgencies);
        setLoadingAgencies(false);
      }, 500);
    }
  };
  
  // Find nearby regions based on distance
  const findNearbyRegions = (lat, lng, allRegions) => {
    if (!allRegions || allRegions.length === 0) return [];
    
    // Calculate distance between two points
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the earth in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const d = R * c; // Distance in km
      return d;
    };
    
    // Calculate distance for each region and sort by distance
    const regionsWithDistance = allRegions
      .filter(region => region.lat && region.lng)
      .map(region => ({
        ...region,
        distance: calculateDistance(lat, lng, region.lat, region.lng)
      }))
      .sort((a, b) => a.distance - b.distance);
    
    // Return top 5 nearest regions
    return regionsWithDistance.slice(0, 5);
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
        <div className="p-0 md:p-0">
          <InteractiveMap 
            center={{ lat: 54.5, lng: -3.5 }} 
            zoom={6} 
            height="400px" 
            className="rounded-lg"
            countries={countriesWithCoords}
            onRegionSelect={handleRegionSelect}
          />
        </div>
        <div className="p-0 md:p-0">
          <h3 className="text-xl md:text-2xl font-bold text-text-charcoal mb-3 md:mb-4 font-poppins">Find Agencies by Region</h3>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base font-inter">
            Our interactive map helps you locate fostering agencies across the UK. 
            Click on any region to explore available opportunities in that area.
          </p>
          <div className="grid grid-cols-1 gap-2 md:gap-3">
            {(nearbyRegions.length > 0 ? nearbyRegions : countriesWithCoords).map((country) => (
              <button 
                key={country.slug || country.name} 
                onClick={() => handleRegionSelect(country)}
                className="flex items-center gap-3 p-3 rounded-lg glass hover:bg-primary-green/10 transition-colors text-left w-full"
              >
                <div className="w-8 h-8 rounded-full bg-primary-green/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary-green" />
                </div>
                <span className="font-inter font-medium text-sm md:text-base">{country.name}</span>
                <ArrowRight className="w-4 h-4 text-primary-green ml-auto" />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Agencies Section - only visible when a region is selected */}
      {selectedRegion && (
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-text-charcoal font-poppins">
              Agencies in {selectedRegion.name}
            </h3>
            <button 
              onClick={() => setSelectedRegion(null)}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
            >
              <X className="w-4 h-4" />
              Clear Selection
            </button>
          </div>
          
          {loadingAgencies ? (
            <div className="flex justify-center items-center py-8">
              <div className="w-6 h-6 border-4 border-[#773344] border-t-transparent rounded-full animate-spin mr-3" />
              <span className="text-gray-600">Loading agencies...</span>
            </div>
          ) : agencies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {agencies.map((agency) => (
                <div key={agency.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-base md:text-lg font-poppins">{agency.name}</h4>
                    {agency.featured && (
                      <span className="bg-primary-green text-white text-xs px-2 py-1 rounded">Featured</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <MapPinIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-xs md:text-sm text-gray-600">{agency.location.city}</span>
                  </div>
                  
                  <p className="text-gray-600 text-xs md:text-sm mb-3 font-inter line-clamp-2">
                    {agency.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 md:w-4 md:h-4 ${
                              i < Math.floor(agency.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs md:text-sm text-gray-600 ml-2">
                        {agency.rating} ({agency.reviewCount})
                      </span>
                    </div>
                    
                    <Link 
                      href={`/agency/${agency.id}`}
                      className="text-primary-green text-xs md:text-sm font-medium hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 md:py-8">
              <Users className="w-10 h-10 md:w-12 md:h-12 text-gray-300 mx-auto mb-3 md:mb-4" />
              <p className="text-gray-600 text-sm md:text-base">No agencies found in {selectedRegion.name}</p>
              <p className="text-gray-500 text-xs md:text-sm mt-1">
                Be the first to list your agency in this region
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}