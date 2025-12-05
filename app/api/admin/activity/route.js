import { supabaseAdmin } from '@/lib/supabase';
import { verify } from 'jsonwebtoken';

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

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 10;

    // Fetch recent agencies
    const { data: agencies, error: agenciesError } = await supabaseAdmin
      .from('agencies')
      .select('id, name, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (agenciesError) {
      throw new Error(agenciesError.message);
    }

    // Fetch recent users
    const { data: users, error: usersError } = await supabaseAdmin
      .from('users')
      .select('id, name, email, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (usersError) {
      throw new Error(usersError.message);
    }

    // Fetch recent contact inquiries
    const { data: inquiries, error: inquiriesError } = await supabaseAdmin
      .from('contact_inquiries')
      .select('id, name, email, message, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (inquiriesError) {
      throw new Error(inquiriesError.message);
    }

    // Combine and sort all activities
    const allActivities = [
      ...agencies.map(agency => ({
        id: agency.id,
        action: 'New agency registered',
        item: agency.name,
        time: new Date(agency.created_at).toLocaleDateString(),
        timestamp: new Date(agency.created_at).getTime()
      })),
      ...users.map(user => ({
        id: user.id,
        action: 'New user registered',
        item: `${user.name} (${user.email})`,
        time: new Date(user.created_at).toLocaleDateString(),
        timestamp: new Date(user.created_at).getTime()
      })),
      ...inquiries.map(inquiry => ({
        id: inquiry.id,
        action: 'New contact inquiry',
        item: `${inquiry.name}: ${inquiry.message.substring(0, 50)}${inquiry.message.length > 50 ? '...' : ''}`,
        time: new Date(inquiry.created_at).toLocaleDateString(),
        timestamp: new Date(inquiry.created_at).getTime()
      }))
    ];

    // Sort by timestamp and take the most recent
    const sortedActivities = allActivities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);

    return new Response(
      JSON.stringify({ 
        success: true,
        activity: sortedActivities
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching activity:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        activity: []
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