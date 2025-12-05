'use client';

import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const availableSections = [
  { id: 'hero', type: 'hero', title: 'Hero', description: 'Main banner with title and call-to-action' },
  { id: 'overview', type: 'overview', title: 'Overview', description: 'General information about the location' },
  { id: 'system', type: 'system', title: 'Fostering System', description: 'Information about the fostering system' },
  { id: 'reasons', type: 'reasons', title: 'Reasons to Foster', description: 'List of reasons to become a foster carer' },
  { id: 'featuredAreas', type: 'featuredAreas', title: 'Featured Areas', description: 'Highlighted regions or cities' },
  { id: 'faqs', type: 'faqs', title: 'FAQs', description: 'Frequently asked questions' },
  { id: 'trustbar', type: 'trustbar', title: 'Trust Bar', description: 'Regulatory information and trust indicators' },
  { id: 'finalcta', type: 'finalcta', title: 'Final CTA', description: 'Final call-to-action section' }
];

export default function AddSectionModal({ onAddSection }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddSection = (sectionType) => {
    if (onAddSection) {
      onAddSection(sectionType);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableSections.map((section) => (
            <div 
              key={section.id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleAddSection(section)}
            >
              <h3 className="font-medium">{section.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}