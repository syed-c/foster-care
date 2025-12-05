import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        session: session || null,
        message: session ? 'Session found' : 'No session found'
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error fetching session:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        session: null
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}