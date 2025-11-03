"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Loader2 } from "lucide-react";

export default function InteractiveMap({
  center = { lat: 54.5, lng: -3.5 }, // UK center
  zoom = 6,
  height = "400px",
  className = "",
  countries = [],
  onRegionSelect,
}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyRegions, setNearbyRegions] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Load Google Maps API
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey || apiKey === "your-google-maps-api-key" || apiKey === "") {
      setError({
        title: "API Key Missing",
        message: "Google Maps API key not configured",
        solution: "Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file",
      });
      setLoading(false);
      return;
    }

    // Check if Google Maps is already loaded
    if (typeof window.google !== "undefined" && window.google.maps) {
      initMap();
      return;
    }

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    script.onerror = () => {
      setError({
        title: "Map Loading Failed",
        message: "Failed to load Google Maps",
        solution: "Check your API key and internet connection",
      });
      setLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Initialize the map
  const initMap = () => {
    if (!mapRef.current) return;

    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: "administrative",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      setMap(mapInstance);
      setLoading(false);

      // Add markers for countries if available
      if (countries && countries.length > 0) {
        addCountryMarkers(mapInstance);
      }

      // Add click listener for region selection
      mapInstance.addListener("click", (event) => {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();

        // Get region from clicked location using reverse geocoding
        getRegionFromClick(mapInstance, clickedLat, clickedLng, (region) => {
          if (region && onRegionSelect) {
            // Clear any previous selection
            setSelectedRegion(region);

            // Pass the selected region to parent component
            onRegionSelect(region);
          }
        });
      });
    } catch (err) {
      console.error("Map initialization error:", err);
      setError({
        title: "Map Initialization Error",
        message: "Failed to initialize map",
        solution: "Please refresh the page",
      });
      setLoading(false);
    }
  };

  // Get region from clicked location using reverse geocoding
  const getRegionFromClick = (mapInstance, lat, lng, callback) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        let region = null;

        // Find administrative area level 1 (country/region)
        if (results && results.length > 0) {
          for (let i = 0; i < results.length; i++) {
            const result = results[i];
            for (let j = 0; j < result.address_components.length; j++) {
              const component = result.address_components[j];
              if (component.types.includes("administrative_area_level_1")) {
                region = {
                  name: component.long_name,
                  slug: component.long_name.toLowerCase().replace(/\s+/g, "-"),
                  lat,
                  lng,
                  placeId: result.place_id,
                };
                break;
              }
            }
            if (region) break;
          }
        }

        callback(region);
      } else {
        console.error("Geocoder failed due to: " + status);
        callback(null);
      }
    });
  };

  // Add markers for countries
  const addCountryMarkers = (mapInstance) => {
    if (!countries || countries.length === 0) return;

    const bounds = new window.google.maps.LatLngBounds();
    const markers = [];

    countries.forEach((country) => {
      if (!country.lat || !country.lng) return;

      // Add a marker for each country
      const marker = new window.google.maps.Marker({
        position: { lat: country.lat, lng: country.lng },
        map: mapInstance,
        title: country.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: "#10B981",
          fillOpacity: 1,
          strokeWeight: 0,
          scale: 8,
        },
      });

      // Add click event to marker
      marker.addListener("click", () => {
        if (onRegionSelect) {
          setSelectedRegion(country);
          onRegionSelect(country);
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-bold">${country.name}</h3>
            <p class="text-sm">${country.agencies || 0} agencies</p>
          </div>
        `,
      });

      marker.addListener("mouseover", () => {
        infoWindow.open(mapInstance, marker);
      });

      marker.addListener("mouseout", () => {
        infoWindow.close();
      });

      markers.push(marker);
      bounds.extend(marker.getPosition());
    });

    // Fit map to bounds if we have markers
    if (markers.length > 0) {
      // Add some padding to the bounds
      mapInstance.fitBounds(bounds);
      
      // Adjust zoom level to show all markers properly
      window.google.maps.event.addListenerOnce(mapInstance, 'bounds_changed', function() {
        this.setZoom(Math.min(this.getZoom(), 6));
      });
    }
  };

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userPos);

        // Center map on user location
        if (map) {
          map.setCenter(userPos);
          map.setZoom(6);

          // Add user location marker
          new window.google.maps.Marker({
            position: userPos,
            map: map,
            title: "Your Location",
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
          });

          // Find nearby regions (simplified)
          findNearbyRegions(userPos);
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
        alert("Unable to get your location. Please enable location services.");
      }
    );
  };

  // Find nearby regions (simplified implementation)
  const findNearbyRegions = (userPos) => {
    if (!countries || countries.length === 0) return;

    // Simple distance calculation (simplified for demo)
    const nearby = countries
      .slice(0, 4) // Take first 4 for demo
      .map((country) => ({
        ...country,
        distance: Math.sqrt(
          Math.pow(country.lat - userPos.lat, 2) +
            Math.pow(country.lng - userPos.lng, 2)
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 4);

    setNearbyRegions(nearby);
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

  return (
    <div className="relative">
      {loading && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10 ${className}`}
          style={{ height }}
        >
          <div className="flex items-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary-green mr-2" />
            <span className="text-gray-600">Loading map...</span>
          </div>
        </div>
      )}

      <div
        ref={mapRef}
        className={`rounded-lg ${className}`}
        style={{ height }}
      />

      {/* User location button */}
      <button
        onClick={getUserLocation}
        className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
        title="Find my location"
      >
        <Navigation className="w-5 h-5 text-primary-green" />
      </button>

      {/* Nearby regions panel */}
      {nearbyRegions && nearbyRegions.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-10">
          <h3 className="font-bold text-text-charcoal mb-2">Nearby Regions</h3>
          <div className="space-y-2">
            {nearbyRegions.map((region) => (
              <button
                key={region.slug}
                onClick={() => onRegionSelect && onRegionSelect(region)}
                className="flex items-center w-full text-left p-2 rounded hover:bg-gray-100 transition-colors"
              >
                <MapPin className="w-4 h-4 text-primary-green mr-2" />
                <span className="text-sm">{region.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}