'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export async function checkAdminAuth() {
  // Get the cookie store (awaiting it properly)
  const cookieStore = await cookies();
  
  // Check for special super admin access (same logic as API route)
  const specialAccess = cookieStore.get('special_super_admin_access')?.value;
  if (specialAccess === 'auth@syedrayyan.com') {
    return true;
  }

  // Check for admin token (same logic as API route)
  const token = cookieStore.get('admin_token')?.value;
  
  if (!token) {
    redirect('/admin/signin');
  }
  
  try {
    // Verify the token (same logic as API route)
    const decoded = verify(token, process.env.NEXTAUTH_SECRET);
    
    // Check if it's an admin (same logic as API route)
    if (decoded.role !== 'admin') {
      redirect('/admin/signin');
    }
    
    return true;
  } catch (error) {
    console.error('Error verifying admin token:', error);
    redirect('/admin/signin');
  }
}