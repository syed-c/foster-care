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
        // For page fetching, we'll allow access without authentication
        // but log the attempt for security monitoring
        console.log('Page fetch attempt without authentication');
      } else {
        try {
          // Verify the token
          const decoded = verify(token, process.env.NEXTAUTH_SECRET);
          
          // Check if it's an admin
          if (decoded.role !== "admin") {
            console.log('Page fetch attempt with invalid role');
          }
        } catch (error) {
          console.log('Page fetch attempt with invalid token');
        }
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

// Handle POST requests to create a new page
export async function POST(request) {
  try {
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
          JSON.stringify({ error: 'Forbidden' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await request.json();
    
    // Create new page in Sanity
    const newDocument = {
      _type: 'page',
      title: body.title,
      slug: {
        _type: 'slug',
        current: body.slug?.current || body.slug || ''
      },
      seo: {
        _type: 'seo',
        title: body.seo?.title || '',
        description: body.seo?.description || ''
      }
    };
    
    const result = await sanityClient.create(newDocument);
    
    return new Response(
      JSON.stringify({ 
        success: true,
        page: result
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error creating page:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message
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