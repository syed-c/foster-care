import { withAuth } from 'next-auth/middleware';
import { supabaseAdmin } from '@/lib/supabase';

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;
    
    // If user is not authenticated, let next-auth handle it
    if (!token) {
      return;
    }
    
    // Check if this is an agency user trying to access dashboard pages
    if (token.role === 'agency' && pathname.startsWith('/dashboard')) {
      // Check if agency has completed registration
      try {
        const { data: agencies, error } = await supabaseAdmin
          .from('agencies')
          .select('registration_complete')
          .eq('user_id', token.sub)
          .limit(1);
        
        if (!error && agencies && agencies.length > 0) {
          const agency = agencies[0];
          
          // If registration is not complete and user is trying to access dashboard (except registration page)
          if (!agency.registration_complete && pathname !== '/auth/signup/agency-registration') {
            // Redirect to agency registration
            const url = req.nextUrl.clone();
            url.pathname = '/auth/signup/agency-registration';
            return Response.redirect(url);
          }
        } else if (pathname !== '/auth/signup/agency-registration') {
          // No agency found, redirect to registration
          const url = req.nextUrl.clone();
          url.pathname = '/auth/signup/agency-registration';
          return Response.redirect(url);
        }
      } catch (error) {
        console.error('Error checking agency registration status:', error);
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
);

export const config = {
  // Apply authentication to dashboard and API routes that require it
  matcher: [
    '/dashboard/:path*',
    '/api/stripe/:path*',
    '/api/user/:path*',
  ],
};