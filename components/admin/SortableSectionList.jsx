'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GripVertical,
  MoveUp,
  MoveDown,
  Trash2
} from 'lucide-react';

export default function SortableSectionList({ sections, onMoveSection, onRemoveSection, onEditSection }) {
  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <Card key={section.id} className="bg-white rounded-lg border border-gray-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 cursor-move text-gray-400">
                  <GripVertical className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">{section.title} Section</CardTitle>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMoveSection(index, index - 1)}
                  disabled={index === 0}
                >
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMoveSection(index, index + 1)}
                  disabled={index === sections.length - 1}
                >
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveSection(section.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Section content would be rendered here */}
            <div className="text-sm text-muted-foreground">
              Click to edit this section
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}