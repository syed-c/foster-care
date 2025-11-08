import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: existingUserError } = await supabaseAdmin
      .from('users')
      .select()
      .eq('email', email)
      .single();

    if (existingUserError && existingUserError.code !== 'PGRST116') {
      console.error('Error checking existing user:', existingUserError);
      return NextResponse.json(
        { error: 'Database error while checking user' },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const { data: newUser, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        name,
        email,
        password: hashedPassword,
        role
      })
      .select()
      .single();

    if (userError) {
      console.error('Error creating user:', userError);
      return NextResponse.json(
        { error: 'Failed to create user: ' + userError.message },
        { status: 500 }
      );
    }

    // If agency role, create agency profile with registration_complete = false
    if (role === 'agency') {
      try {
        // Generate a slug from the name
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now().toString().slice(-4);
        
        // Prepare agency data
        let agencyData = {
          user_id: newUser.id,
          name: name,
          slug: slug,
          contact_email: email,
          // Default values for required fields
          type: 'Private',
          featured: false,
          verified: false,
          recruiting: true,
          rating: 0,
          review_count: 0,
          subscription_plan: 'free',
          subscription_status: 'active'
        };

        // Try to add registration_complete field
        let finalAgencyData = { ...agencyData, registration_complete: false };
        
        // Create agency with registration_complete
        let { data: agencyDataResult, error: agencyError } = await supabaseAdmin
          .from('agencies')
          .insert(finalAgencyData)
          .select()
          .single();

        // If registration_complete column doesn't exist, try without it
        if (agencyError && agencyError.message.includes('registration_complete')) {
          const { data, error } = await supabaseAdmin
            .from('agencies')
            .insert(agencyData)
            .select()
            .single();
          
          agencyDataResult = data;
          agencyError = error;
        }

        if (agencyError) {
          console.error('Error creating agency:', agencyError);
          console.error('Agency data being inserted:', finalAgencyData);
          
          // Delete the user if agency creation fails
          const { error: deleteUserError } = await supabaseAdmin
            .from('users')
            .delete()
            .eq('id', newUser.id);
            
          if (deleteUserError) {
            console.error('Failed to cleanup user after agency creation failure:', deleteUserError);
          }
            
          return NextResponse.json(
            { error: 'Failed to create agency account: ' + agencyError.message },
            { status: 500 }
          );
        }
        
        console.log('Successfully created agency:', agencyDataResult);
      } catch (agencyCreateError) {
        console.error('Exception creating agency:', agencyCreateError);
        
        // Delete the user if agency creation fails
        const { error: deleteUserError } = await supabaseAdmin
          .from('users')
          .delete()
          .eq('id', newUser.id);
          
        if (deleteUserError) {
          console.error('Failed to cleanup user after agency creation exception:', deleteUserError);
        }
          
        return NextResponse.json(
          { error: 'Failed to create account: ' + agencyCreateError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: newUser.id,
          name,
          email,
          role
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred: ' + error.message },
      { status: 500 }
    );
  }
}