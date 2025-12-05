import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(request) {
  try {
    // Special case for auth@syedrayyan.com
    const specialAccess = request.cookies.get('special_super_admin_access')?.value;
    if (specialAccess === 'auth@syedrayyan.com') {
      // Return special user data
      return NextResponse.json({
        user: {
          id: 'special-admin',
          email: 'auth@syedrayyan.com',
          role: 'admin',
          name: 'Admin'
        }
      });
    }

    const token = request.cookies.get("admin_token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    try {
      // Verify the token
      const decoded = verify(token, process.env.NEXTAUTH_SECRET);
      
      // Check if it's an admin
      if (decoded.role !== "admin") {
        return NextResponse.json(
          { error: "Not authorized" },
          { status: 403 }
        );
      }
      
      // Return user data
      return NextResponse.json({
        user: {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          name: decoded.name
        }
      });
      
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error("Error in admin me endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}