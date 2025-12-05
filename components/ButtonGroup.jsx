'use client';

import { Button } from '@/components/ui/button';
import { 
  Save, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown,
  Eye,
  Edit,
  RefreshCw
} from 'lucide-react';

export default function ButtonGroup({ 
  onSave,
  onAddSection,
  onPreviewToggle,
  previewMode,
  saving = false,
  className = "",
  hasErrors = false
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Button 
        onClick={onSave}
        disabled={saving || hasErrors}
        className="flex items-center"
      >
        {saving ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </>
        )}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onAddSection}
        className="flex items-center"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Section
      </Button>
      
      <Button 
        variant={previewMode ? "default" : "outline"} 
        onClick={onPreviewToggle}
        className="flex items-center"
      >
        {previewMode ? (
          <>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </>
        ) : (
          <>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </>
        )}
      </Button>
    </div>
  );
}