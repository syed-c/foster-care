// app/api/admin/locations/[id]/content/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

async function ensureLocation(locationId, fallback = {}) {
  const { data: existing, error: selErr } = await supabaseAdmin
    .from('locations').select('id').eq('id', locationId).maybeSingle();

  if (selErr) throw selErr;
  if (existing) return existing;

  const insertPayload = {
    id: locationId,
    name: fallback.name || fallback.title || `Location ${locationId.slice(0,8)}`,
    slug: fallback.slug || (fallback.name && fallback.name.toLowerCase().replace(/\s+/g,'-')) || `auto-${locationId.slice(0,8)}`,
    canonical_slug: fallback.canonical_slug || null,
    type: fallback.type || fallback.template_type || 'city',
    editable: fallback.editable ?? true
  };

  const { error: insertErr } = await supabaseAdmin.from('locations').insert([insertPayload]);
  if (insertErr) throw insertErr;
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
    console.error('ensureLocation error', e); return NextResponse.json({ success:false, error: e.message || String(e) }, { status:500 });
  }

  const upsertObj = {
    location_id: locationId,
    template_type: body.template_type || 'city',
    content_json: body,
    canonical_slug: body.canonical_slug || null,
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
    if (body.canonical_slug) {
      // Note: revalidation is not available in API routes in App Router
      // This would need to be handled differently in a production environment
      console.log('Content updated for canonical_slug:', body.canonical_slug);
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