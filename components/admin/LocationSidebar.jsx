'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, ArrowRightCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import LocationListItem from '@/components/admin/LocationListItem';

export default function LocationSidebar({ 
  locations = [], 
  onSelect, 
  onReload,
  selectedLocationId = null
}) {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleToggle = (id) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectFirst = () => {
    // Find the first editable location
    const findFirstEditable = (nodes) => {
      for (const node of nodes) {
        if (node.editable) {
          return node;
        }
        if (node.children) {
          const childResult = findFirstEditable(node.children);
          if (childResult) {
            return childResult;
          }
        }
      }
      return null;
    };
    
    const firstEditable = findFirstEditable(locations);
    if (firstEditable && onSelect) {
      onSelect(firstEditable);
    }
  };

  // Set initial expanded state for countries
  useEffect(() => {
    if (locations.length > 0 && expandedItems.size === 0) {
      const countryIds = locations.map(country => country.id);
      setExpandedItems(new Set(countryIds));
    }
  }, [locations]);

  return (
    <div className={`
      flex flex-col h-full bg-gray-50 border-r border-gray-200
      ${isMobile ? 'w-full' : 'w-80 md:w-90'}
    `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg">Locations</h3>
        <p className="text-sm text-muted-foreground">Browse and edit location content</p>
      </div>

      {/* Search and controls */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          {/* Search would go here if needed */}
        </div>
      </div>

      {/* Location tree */}
      <div className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-1">
          {locations && locations.length > 0 ? (
            locations.map((location) => (
              <LocationListItem
                key={location.id}
                node={location}
                onSelect={onSelect}
                isExpanded={expandedItems.has(location.id)}
                onToggle={handleToggle}
                isActive={selectedLocationId === location.id}
                selectedLocationId={selectedLocationId}
                expandedItems={expandedItems}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No locations found</p>
              <p className="text-xs mt-1">Check if canonical_slug migration ran successfully</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer toolbar */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 h-9"
            onClick={handleSelectFirst}
          >
            <ArrowRightCircle className="h-4 w-4 mr-2" />
            Select First
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 h-9"
            onClick={onReload}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reload
          </Button>
        </div>
      </div>
    </div>
  );
}