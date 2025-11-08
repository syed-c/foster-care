import { verify } from 'jsonwebtoken';
import { sanityClient } from '@/lib/sanity';

export async function GET(request) {
  try {
    // Special case for auth@syedrayyan.com
    const specialAccess = request.cookies.get('special_super_admin_access')?.value;
    if (specialAccess !== 'auth@syedrayyan.com') {
      // Check for admin token
      const token = request.cookies.get("admin_token")?.value;
      
      if (!token) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      try {
        // Verify the token
        const decoded = verify(token, process.env.NEXTAUTH_SECRET);
        
        // Check if it's an admin
        if (decoded.role !== "admin") {
          return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch (error) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Fetch pages from Sanity
    const pages = await sanityClient.fetch(
      `*[_type == "page"] | order(title) {
        _id,
        title,
        slug
      }`
    );

    return new Response(
      JSON.stringify({ 
        success: true,
        pages: pages || []
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching pages:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        pages: []
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}