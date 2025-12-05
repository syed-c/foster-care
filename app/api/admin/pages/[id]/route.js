import { verify } from 'jsonwebtoken';
import { sanityClient } from '@/lib/sanity';

// Handle GET requests to fetch a single page
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
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

    // Fetch page from Sanity
    const page = await sanityClient.fetch(
      `*[_type == "page" && _id == $id][0]`,
      { id }
    );

    if (!page) {
      return new Response(
        JSON.stringify({ error: 'Page not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        page
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching page:', error);
    
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

// Handle POST requests to create a new page
export async function POST(request) {
  try {
    const body = await request.json();

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

// Handle PUT requests to update a page
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

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

    // Update page in Sanity
    const mutations = [
      {
        patch: {
          id: id,
          set: {
            title: body.title,
            'slug.current': body.slug?.current || body.slug || '',
            'seo.title': body.seo?.title || '',
            'seo.description': body.seo?.description || ''
          }
        }
      }
    ];
    
    const result = await sanityClient.mutate(mutations);
    
    // Fetch updated page
    const updatedPage = await sanityClient.fetch(
      `*[_type == "page" && _id == $id][0]`,
      { id }
    );

    return new Response(
      JSON.stringify({ 
        success: true,
        page: updatedPage
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error updating page:', error);
    
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