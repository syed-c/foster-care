'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, FileText, MapPin, Folder, FolderOpen } from 'lucide-react';

export default function SidebarPagesList({ 
  locations = [], 
  generalPages = [],
  onLocationSelect,
  onPageSelect,
  onReload
}) {
  const [expandedGroups, setExpandedGroups] = useState({
    countries: true,
    regions: false,
    cities: false,
    general: true
  });

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // Separate locations by type
  const countries = locations.filter(loc => loc.type === 'country');
  const regions = locations.filter(loc => loc.type === 'region');
  const cities = locations.filter(loc => loc.type === 'city');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg">Pages</h3>
        <p className="text-sm text-muted-foreground">Manage content pages</p>
      </div>

      {/* Reload Button */}
      <div className="p-3 border-b border-gray-200">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onReload}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reload Pages
        </Button>
      </div>

      {/* Content Tree */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Countries */}
        <div>
          <div 
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50 rounded"
            onClick={() => toggleGroup('countries')}
          >
            <h4 className="font-medium text-sm">Countries</h4>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              {expandedGroups.countries ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <Folder className="h-4 w-4" />
              )}
            </Button>
          </div>
          {expandedGroups.countries && (
            <div className="mt-1 space-y-1">
              {countries.map(country => (
                <div 
                  key={country.id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer ml-4"
                  onClick={() => onLocationSelect(country)}
                >
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">{country.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Regions */}
        <div>
          <div 
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50 rounded"
            onClick={() => toggleGroup('regions')}
          >
            <h4 className="font-medium text-sm">Regions (auto-collapsed)</h4>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              {expandedGroups.regions ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <Folder className="h-4 w-4" />
              )}
            </Button>
          </div>
          {expandedGroups.regions && (
            <div className="mt-1 space-y-1">
              {regions.map(region => (
                <div 
                  key={region.id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer ml-4"
                  onClick={() => onLocationSelect(region)}
                >
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">{region.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cities */}
        <div>
          <div 
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50 rounded"
            onClick={() => toggleGroup('cities')}
          >
            <h4 className="font-medium text-sm">Cities (auto-collapsed)</h4>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              {expandedGroups.cities ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <Folder className="h-4 w-4" />
              )}
            </Button>
          </div>
          {expandedGroups.cities && (
            <div className="mt-1 space-y-1">
              {cities.map(city => (
                <div 
                  key={city.id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer ml-4"
                  onClick={() => onLocationSelect(city)}
                >
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">{city.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* General Pages */}
        <div>
          <div 
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50 rounded"
            onClick={() => toggleGroup('general')}
          >
            <h4 className="font-medium text-sm">General Pages</h4>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              {expandedGroups.general ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <Folder className="h-4 w-4" />
              )}
            </Button>
          </div>
          {expandedGroups.general && (
            <div className="mt-1 space-y-1">
              {generalPages.map(page => (
                <div 
                  key={page._id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer ml-4"
                  onClick={() => onPageSelect(page)}
                >
                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm">{page.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}