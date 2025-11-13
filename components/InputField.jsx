'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function InputField({ 
  id, 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  rows = 3,
  description,
  error
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={required ? "required" : ""}>
        {label}
      </Label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {type === 'textarea' ? (
        <Textarea
          id={id}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={error ? "border-red-500" : ""}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={error ? "border-red-500" : ""}
        />
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}