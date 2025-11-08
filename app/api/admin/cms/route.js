import { NextResponse } from 'next/server';
import { 
  loadAllContent, 
  getContentBySlug, 
  updateContent, 
  saveContent, 
  ensureContentExists
} from '@/lib/cms';
import { updateCanonicalSlug } from '@/services/locationService';
import { locationSchemas, getDefaultContent } from '@/lib/locationSchemas';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const query = searchParams.get('q');

    if (slug) {
      // Try to find existing content
      let content = getContentBySlug(slug);
      
      // If no content exists, we might need to create default content
      // But we need more context about the location type
      if (!content) {
        content = saveContent({ slug });
      }
      
      return NextResponse.json(content);
    }

    if (query) {
      const results = searchContent(query);
      return NextResponse.json(results);
    }

    const allContent = loadAllContent();
    return NextResponse.json(allContent);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { slug, ...content } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Save content with structured sections
    saveContent({ ...content, slug });
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to save content' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { slug, canonical_slug, template_type, ...updates } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // If canonical_slug is provided, we're updating location content
    if (canonical_slug) {
      // Extract location info from slug
      const parts = slug.split('/');
      if (parts.length >= 4 && parts[0] === 'foster-agency') {
        // This is a location content update
        // Update with structured sections
        const updated = updateContent(slug, {
          ...updates,
          template_type: template_type || 'city'
        });
        return NextResponse.json({ success: true, content: updated });
      }
    }

    const updated = updateContent(slug, updates);
    return NextResponse.json({ success: true, content: updated });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to update content' },
      { status: 500 }
    );
  }
}