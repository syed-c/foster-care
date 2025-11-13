'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function CMSInput({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  rows = 3,
  ...rest 
}) {
  return type === 'textarea' ? (
    <Textarea
      {...rest}
      value={value ?? ''}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  ) : (
    <Input
      {...rest}
      type={type}
      value={value ?? ''}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
    />
  );
}