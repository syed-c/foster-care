import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET /api/cms/sections - Get sections for a page
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    const isActive = searchParams.get('isActive');
    
    let query = supabase
      .from('cms_page_sections')
      .select(`
        *,
        cms_section_fields(*)
      `)
      .order('sort_order', { ascending: true });
    
    if (pageId) {
      query = query.eq('page_id', pageId);
    }
    
    if (isActive !== null) {
      query = query.eq('is_active', isActive === 'true');
    }
    
    const { data, error } = await query;
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/cms/sections - Create a new section
export async function POST(request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('cms_page_sections')
      .insert(body)
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/cms/sections/:id - Update a section
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Remove fields that shouldn't be updated directly
    const { id: _, ...updateData } = body;
    
    const { data, error } = await supabase
      .from('cms_page_sections')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/cms/sections/:id - Delete a section
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    // Delete the section (cascading will delete fields)
    const { error } = await supabase
      .from('cms_page_sections')
      .delete()
      .eq('id', id);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ message: 'Section deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}