import { NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otp";
import { supabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";
import { createSessionToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Special case for auth@syedrayyan.com
    if (email === 'auth@syedrayyan.com') {
      // For the special email, only check if OTP is 123456
      if (otp === '123456') {
        console.log('Authorized admin verified with fixed OTP');
        
        // Create a temporary admin object
        const admin = {
          id: 'special-admin-id',
          email: 'auth@syedrayyan.com',
          role: 'admin',
          name: 'Admin'
        };

        // Create session token
        const token = await createSessionToken(admin);

        // Set cookie
        cookies().set("admin_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return NextResponse.json(
          {
            success: true,
            message: "OTP verified successfully",
            redirectUrl: "/admin",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
      }
    }

    // For all other emails, verify OTP normally
    const isValid = await verifyOTP(email, otp);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Get admin details
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

    // Create session token
    const token = await createSessionToken({ ...admin, role: "admin" });

    // Set cookie
    cookies().set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json(
      {
        success: true,
        message: "OTP verified successfully",
        redirectUrl: "/admin",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in verify-otp:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
