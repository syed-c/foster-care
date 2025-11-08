'use client';

import { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  MapPin,
  Edit,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function LocationTree({ 
  nodes, 
  onSelect, 
  expandedCountries, 
  setExpandedCountries, 
  expandedRegions, 
  setExpandedRegions 
}) {
  const handleNodeClick = (node) => {
    if (node.editable) {
      onSelect(node);
    }
  };

  const toggleCountry = (countryId) => {
    setExpandedCountries(prev => ({ ...prev, [countryId]: !prev[countryId] }));
  };

  const toggleRegion = (regionId) => {
    setExpandedRegions(prev => ({ ...prev, [regionId]: !prev[regionId] }));
  };

  const getLocationTypeLabel = (type) => {
    switch (type) {
      case 'country':
        return 'Country';
      case 'region':
      case 'county':
        return 'Region';
      case 'city':
        return 'City';
      default:
        return type;
    }
  };

  const getLocationTypeDescription = (type) => {
    switch (type) {
      case 'country':
        return 'Country-level template with regions and national information';
      case 'region':
      case 'county':
        return 'Region/county-level template with cities and local information';
      case 'city':
        return 'City-level template with detailed local information';
      default:
        return 'Location';
    }
  };

  const renderNode = (node) => {
    if (node.type === 'country') {
      const isExpanded = expandedCountries[node.id];
      return (
        <Accordion key={node.id} type="single" collapsible className="w-full">
          <AccordionItem value={node.id} className="border-b-0">
            <AccordionTrigger 
              className="py-2 hover:no-underline"
              onClick={() => toggleCountry(node.id)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {isExpanded ? <FolderOpen className="w-4 h-4 mr-2" /> : <Folder className="w-4 h-4 mr-2" />}
                  <span className="font-medium">{node.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground" title={getLocationTypeDescription(node.type)}>
                    <Info className="w-3 h-3 inline mr-1" />
                    {getLocationTypeLabel(node.type)}
                  </span>
                </div>
                {node.editable && (
                  <span
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-6 px-2 text-xs cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeClick(node);
                    }}
                  >
                    Edit
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {node.children && node.children.map(child => (
                <div key={child.id} className="ml-4">
                  {renderNode(child)}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    } else if (node.type === 'region' || node.type === 'county') {
      const isExpanded = expandedRegions[node.id];
      return (
        <Accordion key={node.id} type="single" collapsible className="w-full">
          <AccordionItem value={node.id} className="border-b-0">
            <AccordionTrigger 
              className="py-2 hover:no-underline text-sm"
              onClick={() => toggleRegion(node.id)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  {isExpanded ? <FolderOpen className="w-4 h-4 mr-2" /> : <Folder className="w-4 h-4 mr-2" />}
                  <span>{node.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground" title={getLocationTypeDescription(node.type)}>
                    <Info className="w-3 h-3 inline mr-1" />
                    {getLocationTypeLabel(node.type)}
                  </span>
                </div>
                {node.editable && (
                  <span
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-6 px-2 text-xs cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNodeClick(node);
                    }}
                  >
                    Edit
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {node.children && node.children.map(child => (
                <div key={child.id} className="ml-4">
                  {renderNode(child)}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    } else {
      // City or other editable node
      return (
        <div
          key={node.id}
          className={`w-full justify-between text-sm inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 px-2 cursor-pointer ${
            node.editable 
              ? 'hover:bg-accent hover:text-accent-foreground' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={() => handleNodeClick(node)}
        >
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-2" />
            <span>{node.name}</span>
            <span className="ml-2 text-xs text-muted-foreground" title={getLocationTypeDescription(node.type)}>
              <Info className="w-3 h-3 inline mr-1" />
              {getLocationTypeLabel(node.type)}
            </span>
          </div>
          <div className="flex items-center">
            {node.editable && (
              <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded mr-2">Editable</span>
            )}
            <span className="text-xs text-muted-foreground truncate max-w-[150px]">{node.canonical_slug}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="space-y-1">
      {nodes.map(node => renderNode(node))}
    </div>
  );
}