export { default } from 'next-auth/middleware';

export const config = {
  // Skip authentication for public routes
  matcher: [
    '/dashboard/:path*',
    '/api/stripe/:path*',
    '/api/user/:path*'
  ],
}