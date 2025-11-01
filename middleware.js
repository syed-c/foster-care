export { default } from 'next-auth/middleware';

export const config = {
  // Only apply authentication to specific routes that require it
  matcher: [
    '/dashboard/:path*',
    '/api/stripe/:path*',
    '/api/user/:path*',
  ],
}