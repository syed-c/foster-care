import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { cookies } from "next/headers";
import { createSessionToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Special case for the hardcoded admin credentials
    if (email === 'syedrayyan7117@gmail.com' && password === 'aDMIN@8899') {
      console.log('Hardcoded admin credentials used');
      
      // Create a temporary admin object
      const admin = {
        id: 'hardcoded-admin-id',
        email: 'syedrayyan7117@gmail.com',
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
          message: "Login successful",
          redirectUrl: "/admin",
        },
        { status: 200 }
      );
    }

    // Check if user exists in the database with admin role
    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("role", "admin")
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if user has a password
    if (!user.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session token
    const token = await createSessionToken({ ...user, role: "admin" });

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
        message: "Login successful",
        redirectUrl: "/admin",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in admin login:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}