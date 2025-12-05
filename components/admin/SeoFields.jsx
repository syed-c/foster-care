'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SeoFields({ initialData = {}, onDataChange }) {
  const [seoData, setSeoData] = useState({
    metaTitle: '',
    metaDescription: '',
    canonicalUrl: '',
    openGraphTitle: '',
    openGraphDescription: '',
    openGraphImage: '',
    ...initialData
  });

  // Notify parent of changes
  useEffect(() => {
    if (onDataChange) {
      onDataChange(seoData);
    }
  }, [seoData, onDataChange]);

  const handleChange = (field, value) => {
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meta-title">Meta Title</Label>
            <Input
              id="meta-title"
              placeholder="Enter meta title (60 characters max)"
              maxLength={60}
              value={seoData.metaTitle}
              onChange={(e) => handleChange('metaTitle', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {seoData.metaTitle.length}/60 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta-description">Meta Description</Label>
            <Textarea
              id="meta-description"
              placeholder="Enter meta description (160 characters max)"
              maxLength={160}
              rows={3}
              value={seoData.metaDescription}
              onChange={(e) => handleChange('metaDescription', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {seoData.metaDescription.length}/160 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="canonical-url">Canonical URL</Label>
            <Input
              id="canonical-url"
              placeholder="Enter canonical URL"
              value={seoData.canonicalUrl}
              onChange={(e) => handleChange('canonicalUrl', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Open Graph</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="og-title">Open Graph Title</Label>
            <Input
              id="og-title"
              placeholder="Enter Open Graph title"
              value={seoData.openGraphTitle}
              onChange={(e) => handleChange('openGraphTitle', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="og-description">Open Graph Description</Label>
            <Textarea
              id="og-description"
              placeholder="Enter Open Graph description"
              rows={3}
              value={seoData.openGraphDescription}
              onChange={(e) => handleChange('openGraphDescription', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="og-image">Open Graph Image URL</Label>
            <Input
              id="og-image"
              placeholder="Enter Open Graph image URL"
              value={seoData.openGraphImage}
              onChange={(e) => handleChange('openGraphImage', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}