import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';

export async function GET(request) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    
    // Check if user is admin
    if (!session || session.user.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // For now, return mock data since we're using Sanity CMS
    // In a real implementation, this would fetch from Sanity
    const mockAuthors = [
      { _id: 'author-1', name: 'Admin User', slug: 'admin-user' },
      { _id: 'author-2', name: 'Content Editor', slug: 'content-editor' }
    ];

    return new Response(
      JSON.stringify({ authors: mockAuthors }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching authors:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}