import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export function middleware(request) {
  // Special case for auth@syedrayyan.com
  const specialAccess = request.cookies.get('special_super_admin_access')?.value;
  if (specialAccess === 'auth@syedrayyan.com') {
    // Allow direct access for the special user
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/admin/signin", request.url));
  }

  try {
    // Verify the token
    const decoded = verify(token, process.env.NEXTAUTH_SECRET);

    // Check if it's an admin
    if (decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/signin", request.url));
    }

    // Continue to the protected route
    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired
    return NextResponse.redirect(new URL("/admin/signin", request.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    // Exclude the signin page
    "/((?!admin/signin)admin.*)",
  ],
};