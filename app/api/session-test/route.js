import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  return new Response(JSON.stringify({ session }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
