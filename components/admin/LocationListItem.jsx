'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  MapPin, 
  Folder, 
  FolderOpen,
  Edit,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function LocationListItem({ 
  node, 
  onSelect, 
  isExpanded = false, 
  onToggle,
  isActive = false,
  depth = 0,
  selectedLocationId,
  expandedItems
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  
  const getLocationTypeLabel = (type) => {
    switch (type) {
      case 'country': return 'Country';
      case 'region':
      case 'county': return 'Region';
      default: return 'City';
    }
  };

  const getLocationTypeColor = (type) => {
    switch (type) {
      case 'country': return 'bg-gray-500';
      case 'region':
      case 'county': return 'bg-blue-500';
      default: return 'bg-green-500';
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

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (node.editable) {
      onSelect(node);
    }
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    if (hasChildren && onToggle) {
      onToggle(node.id);
    }
  };

  const handleClick = () => {
    if (hasChildren && onToggle) {
      onToggle(node.id);
    } else if (node.editable) {
      onSelect(node);
    }
  };

  // Calculate indentation based on depth
  // Country: depth = 0 → pl-0
  // Region: depth = 1 → pl-6
  // City: depth = 2 → pl-12
  const indentClass = `pl-${Math.max(0, depth * 6)}`;

  return (
    <div 
      className={`
        flex flex-col rounded-lg transition-all duration-200
        ${isActive ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-gray-50'}
        ${node.editable ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}
      `}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main item row */}
      <div className={`flex items-center justify-between px-3 py-2 ${indentClass}`}>
        <div className="flex items-center min-w-0 flex-1">
          {/* Expand/Collapse icon */}
          {hasChildren ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 mr-1 p-0 hover:bg-gray-200 rounded"
              onClick={handleToggle}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          ) : (
            <div className="w-6 h-6 mr-1 flex items-center justify-center">
              <MapPin className="h-3 w-3 text-gray-400" />
            </div>
          )}

          {/* Icon based on type */}
          <div className="mr-2">
            {node.type === 'country' ? (
              isExpanded ? <FolderOpen className="h-4 w-4 text-gray-600" /> : <Folder className="h-4 w-4 text-gray-600" />
            ) : (
              <MapPin className="h-4 w-4 text-gray-500" />
            )}
          </div>

          {/* Location name */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center">
              <span className="truncate font-medium text-sm">{node.name}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-gray-400 ml-1 flex-shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getLocationTypeDescription(node.type)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Type badge */}
        <Badge 
          className={`${getLocationTypeColor(node.type)} text-white text-xs py-0 px-1.5 h-5 ml-2 flex-shrink-0`}
        >
          {getLocationTypeLabel(node.type)}
        </Badge>
      </div>

      {/* Slug and edit button row */}
      <div className={`flex items-center justify-between px-3 pb-2 ${indentClass}`}>
        <div className="min-w-0 flex-1">
          {/* Slug with tooltip for overflow */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs text-muted-foreground truncate block">
                  {node.canonical_slug || `/foster-agency/${node.slug}`}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{node.canonical_slug || `/foster-agency/${node.slug}`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Edit button */}
        {node.editable && (
          <Button
            variant="outline"
            size="sm"
            className="h-6 px-2 text-xs ml-2 flex-shrink-0"
            onClick={handleEditClick}
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="pb-1">
          {node.children.map((child) => (
            <LocationListItem
              key={child.id}
              node={child}
              onSelect={onSelect}
              isExpanded={expandedItems?.has(child.id) || false}
              onToggle={onToggle}
              isActive={selectedLocationId === child.id}
              depth={depth + 1}
              selectedLocationId={selectedLocationId}
              expandedItems={expandedItems}
            />
          ))}
        </div>
      )}
    </div>
  );
}