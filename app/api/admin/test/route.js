import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/authOptions';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response(
      JSON.stringify({ 
        success: false,
        message: 'No active session'
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  
  if (session.user.role !== 'admin') {
    return new Response(
      JSON.stringify({ 
        success: false,
        message: 'User is not an admin'
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  
  return new Response(
    JSON.stringify({ 
      success: true,
      message: 'Session is valid and user is admin',
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}