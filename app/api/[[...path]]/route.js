import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { sendContactEmail, sendGeneralInquiry } from '@/lib/email';

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }));
}

// Main route handler
async function handleRoute(request, { params }) {
  const { path = [] } = params;
  const route = `/${path.join('/')}`;
  const method = request.method;
  const url = new URL(request.url);

  try {

    // ============ ROOT ENDPOINT ============
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ 
        message: 'Foster Care Directory UK API',
        version: '1.0.0',
        status: 'running'
      }));
    }

    // ============ AGENCIES ENDPOINTS ============
    
    // GET /api/agencies - List all agencies with filters
    if (route === '/agencies' && method === 'GET') {
      const search = url.searchParams.get('search');
      const type = url.searchParams.get('type');
      const featured = url.searchParams.get('featured');
      const userId = url.searchParams.get('userId');
      const limit = parseInt(url.searchParams.get('limit') || '50');
      const page = parseInt(url.searchParams.get('page') || '1');
      const offset = (page - 1) * limit;

      let query = supabaseAdmin.from('agencies').select('*', { count: 'exact' });

      // User ID filter (for dashboard)
      if (userId) {
        query = query.eq('user_id', userId);
      }

      // Search filter
      if (search) {
        query = query.or(`name.ilike.%${search}%,city.ilike.%${search}%,region.ilike.%${search}%,postcode.ilike.%${search}%`);
      }

      // Type filter
      if (type) {
        query = query.eq('type', type);
      }

      // Featured filter
      if (featured === 'true') {
        query = query.eq('featured', true);
      }

      // Pagination and sorting
      query = query
        .order('featured', { ascending: false })
        .order('rating', { ascending: false })
        .range(offset, offset + limit - 1);

      const { data: agencies, error, count } = await query;

      if (error) {
        console.error('Error fetching agencies:', error);
        return handleCORS(NextResponse.json(
          { error: 'Failed to fetch agencies' },
          { status: 500 }
        ));
      }

      return handleCORS(NextResponse.json({
        agencies: agencies || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          pages: Math.ceil((count || 0) / limit),
        },
      }));
    }

    // POST /api/agencies - Create new agency
    if (route === '/agencies' && method === 'POST') {
      const body = await request.json();
      
      const { data: agency, error } = await supabaseAdmin
        .from('agencies')
        .insert(body)
        .select()
        .single();

      if (error) {
        console.error('Error creating agency:', error);
        return handleCORS(NextResponse.json(
          { error: 'Failed to create agency' },
          { status: 500 }
        ));
      }

      return handleCORS(NextResponse.json({ 
        success: true,
        agency 
      }, { status: 201 }));
    }

    // GET /api/agencies/:id - Get single agency
    if (route.startsWith('/agencies/') && method === 'GET') {
      const agencyId = path[1];
      
      // Fetch agency with reviews
      const { data: agency, error: agencyError } = await supabaseAdmin
        .from('agencies')
        .select('*')
        .eq('id', agencyId)
        .single();

      if (agencyError || !agency) {
        return handleCORS(NextResponse.json(
          { error: 'Agency not found' },
          { status: 404 }
        ));
      }

      // Fetch services
      const { data: services } = await supabaseAdmin
        .from('agency_services')
        .select('service_name')
        .eq('agency_id', agencyId);

      // Fetch approved reviews
      const { data: reviews } = await supabaseAdmin
        .from('reviews')
        .select('*')
        .eq('agency_id', agencyId)
        .eq('approved', true)
        .order('created_at', { ascending: false });

      agency.services = services?.map(s => s.service_name) || [];
      agency.reviews = reviews || [];

      return handleCORS(NextResponse.json({ agency }));
    }

    // PUT /api/agencies/:id - Update agency
    if (route.startsWith('/agencies/') && method === 'PUT') {
      const agencyId = path[1];
      const body = await request.json();

      const { data: agency, error } = await supabaseAdmin
        .from('agencies')
        .update(body)
        .eq('id', agencyId)
        .select()
        .single();

      if (error || !agency) {
        return handleCORS(NextResponse.json(
          { error: 'Agency not found' },
          { status: 404 }
        ));
      }

      return handleCORS(NextResponse.json({ 
        success: true,
        agency 
      }));
    }

    // DELETE /api/agencies/:id - Delete agency
    if (route.startsWith('/agencies/') && method === 'DELETE') {
      const agencyId = path[1];
      
      const { error } = await supabaseAdmin
        .from('agencies')
        .delete()
        .eq('id', agencyId);

      if (error) {
        return handleCORS(NextResponse.json(
          { error: 'Agency not found' },
          { status: 404 }
        ));
      }

      return handleCORS(NextResponse.json({ 
        success: true,
        message: 'Agency deleted successfully'
      }));
    }

    // ============ REVIEWS ENDPOINTS ============
    
    // POST /api/agencies/:id/reviews - Add review to agency
    if (route.match(/^\/agencies\/[^\/]+\/reviews$/) && method === 'POST') {
      const agencyId = path[1];
      const body = await request.json();

      // Check if agency exists
      const { data: agency } = await supabaseAdmin
        .from('agencies')
        .select('id')
        .eq('id', agencyId)
        .single();

      if (!agency) {
        return handleCORS(NextResponse.json(
          { error: 'Agency not found' },
          { status: 404 }
        ));
      }

      // Create review
      const { data: review, error } = await supabaseAdmin
        .from('reviews')
        .insert({
          agency_id: agencyId,
          user_id: body.userId,
          user_name: body.userName,
          comment: body.comment,
          stars: body.stars,
          approved: false, // Requires approval
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating review:', error);
        return handleCORS(NextResponse.json(
          { error: 'Failed to create review' },
          { status: 500 }
        ));
      }

      return handleCORS(NextResponse.json({ 
        success: true,
        review,
        message: 'Review submitted for approval'
      }, { status: 201 }));
    }

    // ============ CONTACT ENDPOINTS ============
    
    // POST /api/contact/agency - Contact an agency
    if (route === '/contact/agency' && method === 'POST') {
      const body = await request.json();
      const { agencyId, name, email, message } = body;

      if (!agencyId || !name || !email || !message) {
        return handleCORS(NextResponse.json(
          { error: 'All fields are required' },
          { status: 400 }
        ));
      }

      const { data: agency } = await supabaseAdmin
        .from('agencies')
        .select('id, name, contact_email')
        .eq('id', agencyId)
        .single();

      if (!agency) {
        return handleCORS(NextResponse.json(
          { error: 'Agency not found' },
          { status: 404 }
        ));
      }

      // Store inquiry in database
      await supabaseAdmin
        .from('contact_inquiries')
        .insert({
          agency_id: agencyId,
          name,
          email,
          message,
          type: 'agency',
        });

      // Send email to agency
      const emailResult = await sendContactEmail({
        to: agency.contact_email,
        from: email,
        name,
        message,
        agencyName: agency.name,
      });

      if (!emailResult.success) {
        return handleCORS(NextResponse.json(
          { error: 'Failed to send email', details: emailResult.error },
          { status: 500 }
        ));
      }

      return handleCORS(NextResponse.json({ 
        success: true,
        message: 'Your inquiry has been sent successfully'
      }));
    }

    // POST /api/contact/general - General contact form
    if (route === '/contact/general' && method === 'POST') {
      const body = await request.json();
      const { name, email, message } = body;

      if (!name || !email || !message) {
        return handleCORS(NextResponse.json(
          { error: 'All fields are required' },
          { status: 400 }
        ));
      }

      // Store inquiry in database
      await supabaseAdmin
        .from('contact_inquiries')
        .insert({
          name,
          email,
          message,
          type: 'general',
        });

      const emailResult = await sendGeneralInquiry({ name, email, message });

      if (!emailResult.success) {
        return handleCORS(NextResponse.json(
          { error: 'Failed to send email', details: emailResult.error },
          { status: 500 }
        ));
      }

      return handleCORS(NextResponse.json({ 
        success: true,
        message: 'Your message has been sent successfully'
      }));
    }

    // ============ USERS ENDPOINTS ============
    
    // GET /api/users/:id - Get user profile
    if (route.startsWith('/users/') && method === 'GET') {
      const userId = path[1];
      
      const { data: user, error } = await supabaseAdmin
        .from('users')
        .select('id, name, email, image, role, created_at')
        .eq('id', userId)
        .single();

      if (error || !user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ));
      }

      return handleCORS(NextResponse.json({ user }));
    }

    // PUT /api/users/:id - Update user profile
    if (route.startsWith('/users/') && method === 'PUT') {
      const userId = path[1];
      const body = await request.json();

      // Remove sensitive fields
      delete body.password;
      delete body.role;

      const { data: user, error } = await supabaseAdmin
        .from('users')
        .update(body)
        .eq('id', userId)
        .select('id, name, email, image, role, created_at')
        .single();

      if (error || !user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ));
      }

      return handleCORS(NextResponse.json({ 
        success: true,
        user 
      }));
    }

    // POST /api/users/:id/save-agency - Save agency to user favorites
    if (route.match(/^\/users\/[^\/]+\/save-agency$/) && method === 'POST') {
      const userId = path[1];
      const body = await request.json();
      const { agencyId } = body;

      // Upsert (insert or ignore if exists)
      const { error } = await supabaseAdmin
        .from('saved_agencies')
        .upsert(
          { user_id: userId, agency_id: agencyId },
          { onConflict: 'user_id,agency_id' }
        );

      if (error) {
        console.error('Error saving agency:', error);
        return handleCORS(NextResponse.json(
          { error: 'Failed to save agency' },
          { status: 500 }
        ));
      }

      // Get all saved agencies
      const { data: savedAgencies } = await supabaseAdmin
        .from('saved_agencies')
        .select('agency_id')
        .eq('user_id', userId);

      return handleCORS(NextResponse.json({ 
        success: true,
        savedAgencies: savedAgencies?.map(s => s.agency_id) || []
      }));
    }

    // DELETE /api/users/:id/save-agency/:agencyId - Remove saved agency
    if (route.match(/^\/users\/[^\/]+\/save-agency\/[^\/]+$/) && method === 'DELETE') {
      const userId = path[1];
      const agencyId = path[3];

      const { error } = await supabaseAdmin
        .from('saved_agencies')
        .delete()
        .eq('user_id', userId)
        .eq('agency_id', agencyId);

      if (error) {
        console.error('Error removing saved agency:', error);
        return handleCORS(NextResponse.json(
          { error: 'Failed to remove agency' },
          { status: 500 }
        ));
      }

      // Get remaining saved agencies
      const { data: savedAgencies } = await supabaseAdmin
        .from('saved_agencies')
        .select('agency_id')
        .eq('user_id', userId);

      return handleCORS(NextResponse.json({ 
        success: true,
        savedAgencies: savedAgencies?.map(s => s.agency_id) || []
      }));
    }

    // ============ LOCATIONS ENDPOINTS ============
    
    // GET /api/locations - Get locations for an agency
    if (route === '/locations' && method === 'GET') {
      const agencyId = url.searchParams.get('agencyId');
      
      if (!agencyId) {
        return handleCORS(NextResponse.json(
          { error: 'Agency ID required' },
          { status: 400 }
        ));
      }

      const { data: locations, error } = await supabaseAdmin
        .from('agency_locations')
        .select('*')
        .eq('agency_id', agencyId)
        .order('is_primary', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching locations:', error);
        return handleCORS(NextResponse.json(
          { error: 'Failed to fetch locations' },
          { status: 500 }
        ));
      }

      return handleCORS(NextResponse.json({ locations: locations || [] }));
    }

    // POST /api/locations - Create new location
    if (route === '/locations' && method === 'POST') {
      const body = await request.json();

      const { data: location, error } = await supabaseAdmin
        .from('agency_locations')
        .insert(body)
        .select()
        .single();

      if (error) {
        console.error('Error creating location:', error);
        return handleCORS(NextResponse.json(
          { error: 'Failed to create location' },
          { status: 500 }
        ));
      }

      return handleCORS(NextResponse.json({ 
        success: true,
        location 
      }, { status: 201 }));
    }

    // PUT /api/locations/:id - Update location
    if (route.match(/^\/locations\/[^\/]+$/) && method === 'PUT') {
      const locationId = path[1];
      const body = await request.json();

      const { data: location, error } = await supabaseAdmin
        .from('agency_locations')
        .update(body)
        .eq('id', locationId)
        .select()
        .single();

      if (error) {
        console.error('Error updating location:', error);
        return handleCORS(NextResponse.json(
          { error: 'Failed to update location' },
          { status: 500 }
        ));
      }

      return handleCORS(NextResponse.json({ 
        success: true,
        location 
      }));
    }

    // DELETE /api/locations/:id - Delete location
    if (route.match(/^\/locations\/[^\/]+$/) && method === 'DELETE') {
      const locationId = path[1];

      const { error } = await supabaseAdmin
        .from('agency_locations')
        .delete()
        .eq('id', locationId);

      if (error) {
        console.error('Error deleting location:', error);
        return handleCORS(NextResponse.json(
          { error: 'Failed to delete location' },
          { status: 500 }
        ));
      }

      return handleCORS(NextResponse.json({ 
        success: true,
        message: 'Location deleted successfully'
      }));
    }

    // ============ SEED DATA ENDPOINT (Development only) ============
    if (route === '/seed' && method === 'POST') {
      // Clear existing data
      await supabaseAdmin.from('agencies').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Create seed agencies
      const seedAgencies = [
        {
          name: 'Care4Kids London',
          logo: 'https://images.pexels.com/photos/3768146/pexels-photo-3768146.jpeg',
          description: 'Leading fostering agency in London with over 20 years of experience providing exceptional care and support to foster families and children.',
          city: 'London',
          region: 'Greater London',
          postcode: 'SW1A 1AA',
          address: '123 Care Street, London',
          type: 'Private',
          rating: 4.8,
          review_count: 45,
          contact_email: 'info@care4kidslondon.co.uk',
          contact_phone: '020 1234 5678',
          website: 'https://care4kidslondon.co.uk',
          featured: true,
          recruiting: true,
          verified: true,
          accreditation: 'Ofsted Outstanding',
        },
        {
          name: 'Manchester Family Fostering',
          description: 'Dedicated to finding loving homes for children in Manchester and surrounding areas. Comprehensive training and 24/7 support.',
          city: 'Manchester',
          region: 'Greater Manchester',
          postcode: 'M1 1AE',
          address: '45 Foster Lane, Manchester',
          type: 'Charity',
          rating: 4.6,
          review_count: 32,
          contact_email: 'hello@manchesterfostering.org.uk',
          contact_phone: '0161 234 5678',
          website: 'https://manchesterfostering.org.uk',
          featured: true,
          recruiting: true,
          verified: true,
          accreditation: 'Ofsted Good',
        },
        {
          name: 'Birmingham Children First',
          description: 'Local authority fostering service committed to keeping children safe and helping them thrive in caring environments.',
          city: 'Birmingham',
          region: 'West Midlands',
          postcode: 'B1 1BB',
          address: 'City Hall, Birmingham',
          type: 'Local Authority',
          rating: 4.5,
          review_count: 28,
          contact_email: 'fostering@birmingham.gov.uk',
          contact_phone: '0121 303 1234',
          recruiting: true,
          verified: true,
          accreditation: 'Ofsted Good',
        },
        {
          name: 'Glasgow Foster Care Network',
          description: 'Scotland\'s trusted fostering partner, providing compassionate care and professional support to children and foster families.',
          city: 'Glasgow',
          region: 'Scotland',
          postcode: 'G1 1AA',
          address: '78 Care Road, Glasgow',
          type: 'Private',
          rating: 4.7,
          review_count: 38,
          contact_email: 'info@glasgowfoster.co.uk',
          contact_phone: '0141 234 5678',
          website: 'https://glasgowfoster.co.uk',
          featured: true,
          recruiting: true,
          verified: true,
          accreditation: 'Care Inspectorate',
        },
        {
          name: 'Bristol Community Foster Care',
          description: 'Community-focused fostering agency dedicated to providing stable, loving homes for children in the South West.',
          city: 'Bristol',
          region: 'South West',
          postcode: 'BS1 1AA',
          address: '12 Community Street, Bristol',
          type: 'Charity',
          rating: 4.4,
          review_count: 22,
          contact_email: 'contact@bristolfoster.org.uk',
          contact_phone: '0117 234 5678',
          recruiting: true,
          verified: true,
          accreditation: 'Ofsted Good',
        },
        {
          name: 'Leeds Family Support Services',
          description: 'Experienced fostering agency providing comprehensive support and training to foster carers across Yorkshire.',
          city: 'Leeds',
          region: 'Yorkshire',
          postcode: 'LS1 1AA',
          address: '90 Support Avenue, Leeds',
          type: 'Private',
          rating: 4.6,
          review_count: 31,
          contact_email: 'info@leedsfamily.co.uk',
          contact_phone: '0113 234 5678',
          website: 'https://leedsfamily.co.uk',
          featured: true,
          recruiting: true,
          verified: true,
          accreditation: 'Ofsted Outstanding',
        },
      ];

      const { data, error } = await supabaseAdmin
        .from('agencies')
        .insert(seedAgencies)
        .select();

      if (error) {
        console.error('Seed error:', error);
        return handleCORS(NextResponse.json(
          { error: 'Failed to seed data', details: error.message },
          { status: 500 }
        ));
      }

      return handleCORS(NextResponse.json({
        success: true,
        message: `Seeded ${data?.length || 0} agencies`,
        count: data?.length || 0,
      }));
    }

    // Route not found
    return handleCORS(NextResponse.json(
      { error: `Route ${route} not found` },
      { status: 404 }
    ));

  } catch (error) {
    console.error('API Error:', error);
    return handleCORS(NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    ));
  }
}

// Export all HTTP methods
export const GET = handleRoute;
export const POST = handleRoute;
export const PUT = handleRoute;
export const DELETE = handleRoute;
export const PATCH = handleRoute;