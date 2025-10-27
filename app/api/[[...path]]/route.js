import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '@/lib/mongodb';
import Agency from '@/lib/models/Agency';
import User from '@/lib/models/User';
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
    await connectDB();

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
      const limit = parseInt(url.searchParams.get('limit') || '50');
      const page = parseInt(url.searchParams.get('page') || '1');

      let query = {};

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { 'location.city': { $regex: search, $options: 'i' } },
          { 'location.region': { $regex: search, $options: 'i' } },
          { 'location.postcode': { $regex: search, $options: 'i' } },
        ];
      }

      if (type) {
        query.type = type;
      }

      if (featured === 'true') {
        query.featured = true;
      }

      const skip = (page - 1) * limit;
      const agencies = await Agency.find(query)
        .select('-reviews')
        .limit(limit)
        .skip(skip)
        .sort({ featured: -1, rating: -1 });

      const total = await Agency.countDocuments(query);

      return handleCORS(NextResponse.json({
        agencies,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      }));
    }

    // POST /api/agencies - Create new agency
    if (route === '/agencies' && method === 'POST') {
      const body = await request.json();
      
      const agency = new Agency({
        id: uuidv4(),
        ...body,
      });

      await agency.save();

      return handleCORS(NextResponse.json({ 
        success: true,
        agency 
      }, { status: 201 }));
    }

    // GET /api/agencies/:id - Get single agency
    if (route.startsWith('/agencies/') && method === 'GET') {
      const agencyId = path[1];
      const agency = await Agency.findOne({ id: agencyId });

      if (!agency) {
        return handleCORS(NextResponse.json(
          { error: 'Agency not found' },
          { status: 404 }
        ));
      }

      return handleCORS(NextResponse.json({ agency }));
    }

    // PUT /api/agencies/:id - Update agency
    if (route.startsWith('/agencies/') && method === 'PUT') {
      const agencyId = path[1];
      const body = await request.json();

      const agency = await Agency.findOneAndUpdate(
        { id: agencyId },
        { $set: body },
        { new: true, runValidators: true }
      );

      if (!agency) {
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
      
      const agency = await Agency.findOneAndDelete({ id: agencyId });

      if (!agency) {
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

      const agency = await Agency.findOne({ id: agencyId });

      if (!agency) {
        return handleCORS(NextResponse.json(
          { error: 'Agency not found' },
          { status: 404 }
        ));
      }

      const review = {
        id: uuidv4(),
        userId: body.userId,
        userName: body.userName,
        comment: body.comment,
        stars: body.stars,
        createdAt: new Date(),
      };

      agency.reviews.push(review);
      agency.updateRating();
      await agency.save();

      return handleCORS(NextResponse.json({ 
        success: true,
        review,
        agency: {
          id: agency.id,
          rating: agency.rating,
          reviewCount: agency.reviewCount,
        }
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

      const agency = await Agency.findOne({ id: agencyId });

      if (!agency) {
        return handleCORS(NextResponse.json(
          { error: 'Agency not found' },
          { status: 404 }
        ));
      }

      // Send email to agency
      const emailResult = await sendContactEmail({
        to: agency.contactEmail,
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
      const user = await User.findOne({ id: userId }).select('-password');

      if (!user) {
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

      const user = await User.findOneAndUpdate(
        { id: userId },
        { $set: body },
        { new: true }
      ).select('-password');

      if (!user) {
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

      const user = await User.findOne({ id: userId });

      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ));
      }

      if (!user.savedAgencies.includes(agencyId)) {
        user.savedAgencies.push(agencyId);
        await user.save();
      }

      return handleCORS(NextResponse.json({ 
        success: true,
        savedAgencies: user.savedAgencies
      }));
    }

    // DELETE /api/users/:id/save-agency/:agencyId - Remove saved agency
    if (route.match(/^\/users\/[^\/]+\/save-agency\/[^\/]+$/) && method === 'DELETE') {
      const userId = path[1];
      const agencyId = path[3];

      const user = await User.findOne({ id: userId });

      if (!user) {
        return handleCORS(NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        ));
      }

      user.savedAgencies = user.savedAgencies.filter(id => id !== agencyId);
      await user.save();

      return handleCORS(NextResponse.json({ 
        success: true,
        savedAgencies: user.savedAgencies
      }));
    }

    // ============ SEED DATA ENDPOINT (Development only) ============
    if (route === '/seed' && method === 'POST') {
      // Clear existing data
      await Agency.deleteMany({});
      
      // Create seed agencies
      const seedAgencies = [
        {
          id: uuidv4(),
          name: 'Care4Kids London',
          logo: 'https://images.pexels.com/photos/3768146/pexels-photo-3768146.jpeg',
          description: 'Leading fostering agency in London with over 20 years of experience providing exceptional care and support to foster families and children.',
          location: {
            city: 'London',
            region: 'Greater London',
            postcode: 'SW1A 1AA',
            address: '123 Care Street, London',
          },
          type: 'Private',
          rating: 4.8,
          reviewCount: 45,
          services: ['Long-term Fostering', 'Respite Care', 'Emergency Placement', 'Training & Support'],
          contactEmail: 'info@care4kidslondon.co.uk',
          contactPhone: '020 1234 5678',
          website: 'https://care4kidslondon.co.uk',
          featured: true,
          recruiting: true,
          accreditation: 'Ofsted Outstanding',
          reviews: [
            {
              id: uuidv4(),
              userId: 'user1',
              userName: 'Sarah Johnson',
              comment: 'Wonderful agency with incredible support staff. They have been there for us every step of the way.',
              stars: 5,
              createdAt: new Date('2024-01-15'),
            },
          ],
        },
        {
          id: uuidv4(),
          name: 'Manchester Family Fostering',
          description: 'Dedicated to finding loving homes for children in Manchester and surrounding areas. Comprehensive training and 24/7 support.',
          location: {
            city: 'Manchester',
            region: 'Greater Manchester',
            postcode: 'M1 1AE',
            address: '45 Foster Lane, Manchester',
          },
          type: 'Charity',
          rating: 4.6,
          reviewCount: 32,
          services: ['Long-term Fostering', 'Parent and Child', 'Sibling Groups', 'Specialist Support'],
          contactEmail: 'hello@manchesterfostering.org.uk',
          contactPhone: '0161 234 5678',
          website: 'https://manchesterfostering.org.uk',
          featured: true,
          recruiting: true,
          accreditation: 'Ofsted Good',
          reviews: [],
        },
        {
          id: uuidv4(),
          name: 'Birmingham Children First',
          description: 'Local authority fostering service committed to keeping children safe and helping them thrive in caring environments.',
          location: {
            city: 'Birmingham',
            region: 'West Midlands',
            postcode: 'B1 1BB',
            address: 'City Hall, Birmingham',
          },
          type: 'Local Authority',
          rating: 4.5,
          reviewCount: 28,
          services: ['Long-term Fostering', 'Short Breaks', 'Emergency Care', 'Adoption Support'],
          contactEmail: 'fostering@birmingham.gov.uk',
          contactPhone: '0121 303 1234',
          recruiting: true,
          accreditation: 'Ofsted Good',
          reviews: [],
        },
        {
          id: uuidv4(),
          name: 'Glasgow Foster Care Network',
          description: 'Scotland\'s trusted fostering partner, providing compassionate care and professional support to children and foster families.',
          location: {
            city: 'Glasgow',
            region: 'Scotland',
            postcode: 'G1 1AA',
            address: '78 Care Road, Glasgow',
          },
          type: 'Private',
          rating: 4.7,
          reviewCount: 38,
          services: ['Long-term Fostering', 'Respite Care', 'Therapeutic Fostering', 'Kinship Care'],
          contactEmail: 'info@glasgowfoster.co.uk',
          contactPhone: '0141 234 5678',
          website: 'https://glasgowfoster.co.uk',
          featured: true,
          recruiting: true,
          accreditation: 'Care Inspectorate',
          reviews: [],
        },
        {
          id: uuidv4(),
          name: 'Bristol Community Foster Care',
          description: 'Community-focused fostering agency dedicated to providing stable, loving homes for children in the South West.',
          location: {
            city: 'Bristol',
            region: 'South West',
            postcode: 'BS1 1AA',
            address: '12 Community Street, Bristol',
          },
          type: 'Charity',
          rating: 4.4,
          reviewCount: 22,
          services: ['Long-term Fostering', 'Parent and Child', 'Emergency Placement'],
          contactEmail: 'contact@bristolfoster.org.uk',
          contactPhone: '0117 234 5678',
          recruiting: true,
          accreditation: 'Ofsted Good',
          reviews: [],
        },
        {
          id: uuidv4(),
          name: 'Leeds Family Support Services',
          description: 'Experienced fostering agency providing comprehensive support and training to foster carers across Yorkshire.',
          location: {
            city: 'Leeds',
            region: 'Yorkshire',
            postcode: 'LS1 1AA',
            address: '90 Support Avenue, Leeds',
          },
          type: 'Private',
          rating: 4.6,
          reviewCount: 31,
          services: ['Long-term Fostering', 'Short Breaks', 'Sibling Groups', 'Teen Fostering'],
          contactEmail: 'info@leedsfamily.co.uk',
          contactPhone: '0113 234 5678',
          featured: true,
          recruiting: true,
          accreditation: 'Ofsted Outstanding',
          reviews: [],
        },
      ];

      await Agency.insertMany(seedAgencies);

      return handleCORS(NextResponse.json({
        success: true,
        message: `Seeded ${seedAgencies.length} agencies`,
        count: seedAgencies.length,
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