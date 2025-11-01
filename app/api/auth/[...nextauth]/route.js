import NextAuth from 'next-auth';
import { authOptions } from './authOptions';

const handler = NextAuth(authOptions);

// Export authOptions for other files that need it
export { authOptions };

export { handler as GET, handler as POST };
