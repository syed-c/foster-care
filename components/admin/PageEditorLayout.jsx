'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import SidebarPagesList from '@/components/admin/SidebarPagesList';
import PageEditorContent from '@/components/admin/PageEditorContent';

export default function PageEditorLayout({ 
  locations = [],
  generalPages = [],
  selectedLocation,
  selectedPage,
  onLocationSelect,
  onPageSelect,
  onReloadLocations
}) {
  return (
    <div className="flex h-screen bg-background-offwhite">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white">
        <SidebarPagesList
          locations={locations}
          generalPages={generalPages}
          onLocationSelect={onLocationSelect}
          onPageSelect={onPageSelect}
          onReload={onReloadLocations}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedLocation || selectedPage ? (
          <PageEditorContent
            selectedLocation={selectedLocation}
            selectedPage={selectedPage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Page Selected</h3>
              <p className="text-gray-500">Select a page from the sidebar to start editing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}