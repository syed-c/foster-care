import { supabaseAdmin } from '@/lib/supabase';

/**
 * Check if an agency user has completed their registration
 * @param {string} userId - The user ID to check
 * @returns {Promise<{complete: boolean, agency: object|null}>} - Registration status and agency data
 */
export async function checkAgencyRegistrationStatus(userId) {
  try {
    // Fetch agency data for this user
    const { data: agencies, error } = await supabaseAdmin
      .from('agencies')
      .select('*')
      .eq('user_id', userId)
      .limit(1);

    if (error) {
      console.error('Error checking agency registration status:', error);
      return { complete: false, agency: null };
    }

    // If no agency found, registration is not complete
    if (!agencies || agencies.length === 0) {
      return { complete: false, agency: null };
    }

    const agency = agencies[0];
    
    // Check if registration is marked as complete
    return { 
      complete: agency.registration_complete === true, 
      agency 
    };
  } catch (error) {
    console.error('Error checking agency registration status:', error);
    return { complete: false, agency: null };
  }
}