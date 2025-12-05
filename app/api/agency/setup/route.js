import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { userId, ...agencyData } = await request.json();

    // Validate required fields
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if agency already exists for this user
    const { data: existingAgency, error: existingAgencyError } = await supabaseAdmin
      .from('agencies')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (existingAgencyError && existingAgencyError.code !== 'PGRST116') {
      console.error('Error checking existing agency:', existingAgencyError);
      return NextResponse.json(
        { error: 'Database error while checking agency' },
        { status: 500 }
      );
    }

    // Prepare update data - try with registration_complete, fallback without it
    let updateData = {
      ...agencyData,
      updated_at: new Date().toISOString()
    };

    if (existingAgency) {
      // Update existing agency
      let { data: updatedAgency, error: updateError } = await supabaseAdmin
        .from('agencies')
        .update({
          ...updateData,
          registration_complete: true
        })
        .eq('id', existingAgency.id)
        .select()
        .single();

      // If registration_complete column doesn't exist, try without it
      if (updateError && updateError.message.includes('registration_complete')) {
        const { data, error } = await supabaseAdmin
          .from('agencies')
          .update(updateData)
          .eq('id', existingAgency.id)
          .select()
          .single();
        
        updatedAgency = data;
        updateError = error;
      }

      if (updateError) {
        console.error('Error updating agency:', updateError);
        return NextResponse.json(
          { error: 'Failed to update agency: ' + updateError.message },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { 
          success: true, 
          agency: updatedAgency,
          message: 'Agency profile updated successfully'
        },
        { status: 200 }
      );
    } else {
      // Create new agency
      let insertData = {
        user_id: userId,
        ...agencyData,
        // Generate slug from name
        slug: agencyData.name.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') + '-' + Math.random().toString(36).substring(2, 6),
        // Set default values
        featured: false,
        verified: false,
        rating: 0,
        review_count: 0,
        subscription_plan: 'free',
        subscription_status: 'active',
        registration_complete: true
      };

      let { data: newAgency, error: createError } = await supabaseAdmin
        .from('agencies')
        .insert(insertData)
        .select()
        .single();

      // If registration_complete column doesn't exist, try without it
      if (createError && createError.message.includes('registration_complete')) {
        delete insertData.registration_complete;
        const { data, error } = await supabaseAdmin
          .from('agencies')
          .insert(insertData)
          .select()
          .single();
        
        newAgency = data;
        createError = error;
      }

      if (createError) {
        console.error('Error creating agency:', createError);
        return NextResponse.json(
          { error: 'Failed to create agency: ' + createError.message },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { 
          success: true, 
          agency: newAgency,
          message: 'Agency profile created successfully'
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Agency setup error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred: ' + error.message },
      { status: 500 }
    );
  }
}