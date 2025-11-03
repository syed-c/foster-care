"use client";

import { useEffect, useRef, useState } from "react";

export default function GoogleMap({
  center = { lat: 51.5074, lng: -0.1278 }, // Default: London
  zoom = 10,
  markers = [],
  height = "400px",
  className = "",
}) {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // If no API key, show error message
    if (!apiKey || apiKey === "") {
      setError({
        title: "API Key Missing",
        message: "Google Maps API key not configured",
        solution: "Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file",
      });
      setLoading(false);
      return;
    }

    // Create the map URL with markers if provided
    let mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=${zoom}&size=600x400&key=${apiKey}&scale=2`;

    // Add markers to the static map if provided
    if (markers && markers.length > 0) {
      const markerParams = markers
        .map(
          (marker) => `markers=color:red%7Clabel:%7C${marker.lat},${marker.lng}`
        )
        .join("&");
      mapUrl += `&${markerParams}`;
    }

    console.log("Generated Map URL:", mapUrl.substring(0, 100) + "...");

    // Set the image URL directly
    setImageUrl(mapUrl);
    setLoading(false);
  }, [center, zoom, markers]);

  // Handle image load error
  const handleImageError = (e) => {
    console.error("Failed to load map image:", e);
    setError({
      title: "Map Loading Failed",
      message: "Failed to load map image",
      solution: "Check your API key and ensure Static Maps API is enabled",
    });
    setLoading(false);
  };

  // Handle image load success
  const handleImageLoad = () => {
    console.log("Map image loaded successfully");
    setLoading(false);
  };

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center p-6 max-w-xs">
          <div className="text-red-500 font-medium mb-2">{error.title}</div>
          <p className="text-gray-600 text-sm mb-3">{error.message}</p>
          <div className="text-xs text-gray-500">
            <div className="font-medium mb-1">Solution:</div>
            <p>{error.solution}</p>
          </div>
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
        <div className="flex items-center">
          <div className="w-6 h-6 border-4 border-[#773344] border-t-transparent rounded-full animate-spin mr-3" />
          <span className="text-gray-600 text-sm">Loading map...</span>
        </div>
      </div>
    );
  }

  // Render the image directly
  if (imageUrl) {
    return (
      <div
        ref={mapRef}
        className={`rounded-lg ${className}`}
        style={{ height }}
      >
        <img
          src={imageUrl}
          alt="Google Map"
          className="w-full h-full object-cover rounded-lg"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </div>
    );
  }

  // Fallback
  return (
    <div
      ref={mapRef}
      className={`rounded-lg ${className}`}
      style={{ height }}
    />
  );
}
