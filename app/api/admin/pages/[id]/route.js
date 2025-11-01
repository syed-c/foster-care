import { supabaseAdmin } from '@/lib/supabase';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // Update page in Supabase
    const { data: page, error } = await supabaseAdmin
      .from('pages')
      .update({
        title: body.title,
        content: body.content,
        meta_description: body.meta_description,
        slug: body.slug,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        ...page
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error updating page:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}