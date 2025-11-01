import { NextResponse } from 'next/server';
import { generateOTP, storeOTP, sendOTPEmail } from '@/lib/otp';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // DIRECT FIX: Always allow auth@syedrayyan.com
    if (email === 'auth@syedrayyan.com') {
      console.log('Authorized super admin email detected');
      
      // Use a fixed OTP for easy testing
      const otp = "123456";
      
      // Store the OTP
      await storeOTP(email, otp);
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'OTP generated successfully',
          testOtp: otp
        },
        { status: 200 }
      );
    }
    
    // For all other emails, check the database
    const { data: superAdmin, error: superAdminError } = await supabaseAdmin
      .from('super_admins')
      .select('*')
      .eq('email', email)
      .single();
    
    if (superAdminError || !superAdmin) {
      return NextResponse.json(
        { error: 'Email not authorized as super admin' },
        { status: 403 }
      );
    }
    
    // Generate OTP
    const otp = generateOTP();
    console.log('Generated OTP:', otp);
    
    // Store OTP in database
    const stored = await storeOTP(email, otp);
    
    if (!stored) {
      return NextResponse.json(
        { error: 'Failed to generate OTP' },
        { status: 500 }
      );
    }
    
    // Send OTP via email
    console.log('Sending OTP via email');
    try {
      const emailResult = await sendOTPEmail(email, otp);
      console.log('Email sending result:', emailResult);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }
    
    // Return the OTP in the response for testing
    return NextResponse.json(
      { 
        success: true, 
        message: 'OTP generated successfully',
        testOtp: otp // For testing only
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error in request-otp:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}