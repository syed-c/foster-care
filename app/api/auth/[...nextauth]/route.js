// This is a placeholder for NextAuth compatibility
// The actual authentication is handled via admin_token cookies

export const authOptions = {
  providers: [],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      // This is a placeholder - actual session handling is done via cookies
      return session;
    },
    async jwt({ token, user }) {
      // This is a placeholder - actual JWT handling is done via cookies
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
};

// Export empty handlers for NextAuth compatibility
export const GET = () => new Response(null, { status: 404 });
export const POST = () => new Response(null, { status: 404 });