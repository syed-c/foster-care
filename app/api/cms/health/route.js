import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET /api/cms/health - Check if CMS tables exist and are accessible
export async function GET() {
  try {
    // Check if cms_pages table exists
    const { data: pagesData, error: pagesError } = await supabase
      .from('cms_pages')
      .select('count')
      .limit(1);
    
    // Check if cms_page_sections table exists
    const { data: sectionsData, error: sectionsError } = await supabase
      .from('cms_page_sections')
      .select('count')
      .limit(1);
    
    // Check if cms_section_fields table exists
    const { data: fieldsData, error: fieldsError } = await supabase
      .from('cms_section_fields')
      .select('count')
      .limit(1);
    
    const tablesExist = !pagesError && !sectionsError && !fieldsError;
    
    return NextResponse.json({
      status: 'success',
      tablesExist,
      pagesTable: !pagesError,
      sectionsTable: !sectionsError,
      fieldsTable: !fieldsError,
      message: tablesExist 
        ? 'All CMS tables are accessible' 
        : 'Some CMS tables are missing or not accessible'
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error.message
    }, { status: 500 });
  }
}