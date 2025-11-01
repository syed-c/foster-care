import { sign } from 'jsonwebtoken';

/**
 * Creates a session token for the super admin
 * @param {Object} user - The user object
 * @returns {string} - The JWT token
 */
export async function createSessionToken(user) {
  return sign(
    { 
      id: user.id,
      email: user.email,
      role: user.role || 'super_admin',
      name: user.name || 'Super Admin'
    },
    process.env.NEXTAUTH_SECRET,
    { expiresIn: '7d' }
  );
}