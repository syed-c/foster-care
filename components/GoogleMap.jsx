'use client';

import { useEffect, useRef, useState } from 'react';

export default function GoogleMap({ 
  center = { lat: 51.5074, lng: -0.1278 }, // Default: London
  zoom = 10,
  markers = [],
  height = '400px',
  className = '',
}) {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Render a static map image for immediate results
  useEffect(() => {
    // Use a hardcoded API key for immediate testing
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyCO8bDPapaTUp2dkafnY5GrBLNf24sbmFA';
    console.log('Using API key:', apiKey);
    
    // Create the map URL with markers if provided
    let mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=${zoom}&size=800x600&key=${apiKey}`;
    
    // Add markers to the static map if provided
    if (markers && markers.length > 0) {
      markers.forEach(marker => {
        mapUrl += `&markers=color:red|${marker.lat},${marker.lng}`;
      });
    }
    
    if (mapRef.current) {
      const img = document.createElement('img');
      img.src = mapUrl;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = 'inherit';
      img.alt = 'Google Map';
      
      img.onload = () => {
        setLoading(false);
      };
      
      img.onerror = (e) => {
        console.error('Failed to load map image:', e);
        setLoading(false);
      };
      
      // Clear any existing content
      while (mapRef.current.firstChild) {
        mapRef.current.removeChild(mapRef.current.firstChild);
      }
      
      mapRef.current.appendChild(img);
    }
    
    return () => {
      // Clean up
      if (mapRef.current) {
        while (mapRef.current.firstChild) {
          mapRef.current.removeChild(mapRef.current.firstChild);
        }
      }
    };
  }, [center, zoom, markers]);

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