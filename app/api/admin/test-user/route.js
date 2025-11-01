import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  return new Response(
    JSON.stringify({ 
      session: session || null
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
