// OTP generation and verification utilities
import crypto from 'crypto';
import { supabaseAdmin } from './supabase';
import nodemailer from 'nodemailer';

// Generate a random 6-digit OTP
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP in database with expiration (5 minutes)
export async function storeOTP(email, otp) {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 5); // 5 minutes expiration
  
  // Delete any existing OTPs for this email
  await supabaseAdmin
    .from('super_admin_otps')
    .delete()
    .eq('email', email);
  
  // Insert new OTP
  const { data, error } = await supabaseAdmin
    .from('super_admin_otps')
    .insert({
      email,
      otp,
      expires_at: expiresAt.toISOString(),
    });
  
  if (error) {
    console.error('Error storing OTP:', error);
    return false;
  }
  
  return true;
}

// Verify OTP
export async function verifyOTP(email, otp) {
  const now = new Date().toISOString();
  
  // Get OTP record
  const { data, error } = await supabaseAdmin
    .from('super_admin_otps')
    .select('*')
    .eq('email', email)
    .eq('otp', otp)
    .gte('expires_at', now)
    .single();
  
  if (error || !data) {
    return false;
  }
  
  // Delete the OTP after successful verification
  await supabaseAdmin
    .from('super_admin_otps')
    .delete()
    .eq('email', email);
  
  return true;
}

// Send OTP via email
export async function sendOTPEmail(email, otp) {
  // Always log the OTP for testing purposes
  console.log('OTP for testing:', otp);
  
  // Return success with the OTP in the response for UI display
  return { 
     success: true, 
     data: { otp }, // Include OTP in the response for the UI to display
     message: 'OTP generated successfully. Email sending is disabled for now.'
   };
}