import { NextResponse } from 'next/server';
import { 
  loadAllContent, 
  getContentBySlug, 
  updateContent, 
  saveContent, 
  searchContent 
} from '@/lib/cms';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const query = searchParams.get('q');

    if (slug) {
      const content = getContentBySlug(slug);
      if (!content) {
        return NextResponse.json({ error: 'Content not found' }, { status: 404 });
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
    const { slug, ...updates } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
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

