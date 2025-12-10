import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real implementation, you would authenticate the user here
    // For now, we'll just process the request
    
    const { type, data } = body;
    
    switch (type) {
      case 'country_block':
        // Save country page block
        const { data: block, error: blockError } = await supabaseAdmin
          .from('country_page_blocks')
          .upsert(data, { onConflict: 'id' })
          .select()
          .single();
          
        if (blockError) {
          throw new Error(`Failed to save country block: ${blockError.message}`);
        }
        
        return NextResponse.json({ success: true, data: block });
        
      case 'county':
        // Save county data
        const { data: county, error: countyError } = await supabaseAdmin
          .from('counties')
          .upsert(data, { onConflict: 'id' })
          .select()
          .single();
          
        if (countyError) {
          throw new Error(`Failed to save county: ${countyError.message}`);
        }
        
        return NextResponse.json({ success: true, data: county });
        
      case 'region':
        // Save region data
        const { data: region, error: regionError } = await supabaseAdmin
          .from('regions')
          .upsert(data, { onConflict: 'id' })
          .select()
          .single();
          
        if (regionError) {
          throw new Error(`Failed to save region: ${regionError.message}`);
        }
        
        return NextResponse.json({ success: true, data: region });
        
      default:
        return NextResponse.json(
          { error: 'Invalid data type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error saving CMS data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}