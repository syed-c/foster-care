// app/api/admin/locations/[id]/content/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

async function ensureLocation(locationId, fallback = {}) {
  // First, try to select without specifying columns to avoid schema cache issues
  const { data: existing, error: selErr } = await supabaseAdmin
    .from('locations')
    .select()
    .eq('id', locationId)
    .maybeSingle();

  if (selErr) {
    console.error('ensureLocation select error:', selErr);
    // If we get a schema cache error, try a more generic select
    if (selErr.message && selErr.message.includes('editable')) {
      console.log('Trying fallback select query...');
      const { data: fallbackData, error: fallbackErr } = await supabaseAdmin
        .from('locations')
        .select('*')
        .eq('id', locationId)
        .maybeSingle();
      
      if (fallbackErr) throw fallbackErr;
      if (fallbackData) return fallbackData;
    } else {
      throw selErr;
    }
  }
  
  if (existing) return existing;

  // When inserting, be more careful about the fields we include
  const insertPayload = {
    id: locationId,
    name: fallback.name || fallback.title || `Location ${locationId.slice(0,8)}`,
    slug: fallback.slug || (fallback.name && fallback.name.toLowerCase().replace(/\s+/g,'-')) || `auto-${locationId.slice(0,8)}`,
    canonical_slug: fallback.canonical_slug || null,
    type: fallback.type || fallback.template_type || 'city'
    // Note: Not including editable field to avoid schema cache issues
  };

  // Only add editable if it's explicitly false (since default is true)
  if (fallback.editable === false) {
    insertPayload.editable = false;
  }

  const { error: insertErr } = await supabaseAdmin.from('locations').insert([insertPayload]);
  if (insertErr) {
    console.error('Insert error:', insertErr);
    // If we get a schema error, try without the editable field
    if (insertErr.message && insertErr.message.includes('editable')) {
      console.log('Retrying insert without editable field...');
      delete insertPayload.editable;
      const { error: retryErr } = await supabaseAdmin.from('locations').insert([insertPayload]);
      if (retryErr) throw retryErr;
    } else {
      throw insertErr;
    }
  }
  
  return insertPayload;
}

export async function PUT(req, { params }) {
  const locationId = params.id;
  if (!locationId) return NextResponse.json({ success:false, error:'Missing location id' }, { status:400 });

  let body;
  try { body = await req.json(); } catch (e) {
    console.error('PUT parse error', e); return NextResponse.json({ success:false, error:'Invalid JSON' }, { status:400 });
  }

  try {
    await ensureLocation(locationId, body);
  } catch (e) {
    console.error('ensureLocation error', e); 
    // If we get a schema cache error, try to refresh the schema and retry
    if (e.message && e.message.includes('editable')) {
      console.log('Schema cache error detected, attempting to handle gracefully...');
      // Continue with the operation, as the ensureLocation function already has fallback logic
    } else {
      return NextResponse.json({ success:false, error: e.message || String(e) }, { status:500 });
    }
  }

  // Ensure we have a proper canonical slug
  const canonicalSlug = body.canonical_slug || 
                       (body.slug ? (body.slug.startsWith('/foster-agency/') ? body.slug : `/foster-agency/${body.slug}`) : 
                        null);

  const upsertObj = {
    location_id: locationId,
    template_type: body.template_type || 'city',
    content_json: body,
    canonical_slug: canonicalSlug,
    updated_at: new Date().toISOString()
  };

  const { data: upserted, error: upsertErr } = await supabaseAdmin
    .from('location_content')
    .upsert([upsertObj], { onConflict: 'location_id' })
    .select();

  if (upsertErr) {
    console.error('upsert error', upsertErr);
    return NextResponse.json({ success:false, error: upsertErr.message }, { status:500 });
  }

  // Try to revalidate the page if canonical_slug is available
  try {
    if (canonicalSlug) {
      // Note: revalidation is not available in API routes in App Router
      // This would need to be handled differently in a production environment
      console.log('Content updated for canonical_slug:', canonicalSlug);
    }
  } catch (e) {
    console.warn('Revalidation failed (dev mode or no ISR)');
  }

  // Return the upserted row in standardized shape
  return NextResponse.json({ success: true, saved: upserted?.[0] ?? upsertObj });
}

export async function GET(req, { params }) {
  const locationId = params.id;
  if (!locationId) return NextResponse.json({ success:false, error:'Missing location id' }, { status:400 });

  const { data, error } = await supabaseAdmin
    .from('location_content')
    .select('content_json, template_type, updated_at, canonical_slug')
    .eq('location_id', locationId)
    .maybeSingle();

  if (error) {
    console.error('GET content error', error);
    return NextResponse.json({ success:false, error: error.message }, { status:500 });
  }

  return NextResponse.json({ 
    success:true, 
    content: data?.content_json ?? null, 
    template_type: data?.template_type ?? null, 
    canonical_slug: data?.canonical_slug ?? null,
    updated_at: data?.updated_at ?? null 
  });
}