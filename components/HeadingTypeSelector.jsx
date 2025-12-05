'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function HeadingTypeSelector({ 
  value, 
  onValueChange, 
  id, 
  label = "Heading Type",
  required = false
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={required ? "required" : ""}>
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select heading type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="h1">
            <span className="font-bold text-lg">H1</span> - Main page title
          </SelectItem>
          <SelectItem value="h2">
            <span className="font-semibold text-md">H2</span> - Section heading
          </SelectItem>
          <SelectItem value="h3">
            <span className="font-medium">H3</span> - Subsection heading
          </SelectItem>
          <SelectItem value="h4">
            <span>H4</span> - Sub-subsection heading
          </SelectItem>
          <SelectItem value="paragraph">
            <span>Paragraph</span> - Regular text
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}