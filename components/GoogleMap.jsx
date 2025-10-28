'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function GoogleMap({ 
  center = { lat: 51.5074, lng: -0.1278 }, // Default: London
  zoom = 10,
  markers = [],
  height = '400px',
  className = '',
}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === 'your-google-maps-api-key') {
      setError('Google Maps API key not configured');
      setLoading(false);
      return;
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
    });

    loader
      .load()
      .then((google) => {
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
            ],
          });

          setMap(mapInstance);

          // Add markers
          markers.forEach((marker) => {
            new google.maps.Marker({
              position: { lat: marker.lat, lng: marker.lng },
              map: mapInstance,
              title: marker.title,
            });
          });

          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Google Maps loading error:', err);
        setError('Failed to load Google Maps');
        setLoading(false);
      });
  }, [center, zoom, markers]);

  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center p-8">
          <p className="text-gray-600 mb-2">{error}</p>
          <p className="text-sm text-gray-500">
            Add your Google Maps API key to enable maps
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="w-8 h-8 border-4 border-[#773344] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className={`rounded-lg ${className}`}
      style={{ height }}
    />
  );
}
