'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { locationSchemas } from '@/lib/locationSchemas';
import { Info } from 'lucide-react';

export default function TemplateGuide() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Template Guide</h2>
        <p className="text-muted-foreground">
          Understanding the sections available for each location template type
        </p>
      </div>
      
      {Object.entries(locationSchemas).map(([type, schema]) => (
        <Card key={type} className="overflow-hidden">
          <CardHeader className="bg-muted">
            <CardTitle className="flex items-center">
              <Info className="w-5 h-5 mr-2" />
              {schema.label}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {schema.description}
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {schema.sections.map((section) => (
                <div key={section.key} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{section.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {section.description}
                      </p>
                    </div>
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {section.fields.length} fields
                    </div>
                  </div>
                  {section.contentGuidance && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                      <strong>Guidance:</strong> {section.contentGuidance}
                    </div>
                  )}
                  <div className="mt-2">
                    <div className="text-xs text-muted-foreground">
                      Fields: {section.fields.map(field => field.label).join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-medium text-blue-800 mb-2">Content Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use clear, concise language that's easy to understand</li>
            <li>• Include local information specific to each location</li>
            <li>• Add relevant links to external resources when appropriate</li>
            <li>• Keep FAQ answers helpful and informative</li>
            <li>• Use consistent formatting and styling across all sections</li>
            <li>• Focus on the needs of prospective foster carers</li>
            <li>• Highlight local support services and community resources</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}