import { NextResponse } from "next/server";
import { generateOTP, storeOTP, sendOTPEmail } from "@/lib/otp";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Special case for auth@syedrayyan.com
    if (email === 'auth@syedrayyan.com') {
      console.log('Authorized admin email detected');
      
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
    const { data: admin, error: adminError } = await supabaseAdmin
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (adminError || !admin) {
      return NextResponse.json(
        { error: "Email not authorized as admin" },
        { status: 403 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    console.log("Generated OTP:", otp);

    // Store OTP in database
    const stored = await storeOTP(email, otp);

    if (!stored) {
      return NextResponse.json(
        { error: "Failed to generate OTP" },
        { status: 500 }
      );
    }

    // Send OTP via email
    const emailResult = await sendOTPEmail(email, otp);

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent successfully",
        testOtp: otp, // For development purposes
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in request-otp:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
