const { buildCanonicalSlug } = require('../../services/locationService');

// Mock Supabase client
jest.mock('../../lib/supabase-server', () => ({
  supabaseAdmin: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn()
  }
}));

describe('Location Service', () => {
  describe('buildCanonicalSlug', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should build canonical slug for a 3-level location (country/region/city)', async () => {
      const mockSupabase = require('../../lib/supabase-server').supabaseAdmin;
      
      // Mock city query
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: 'city-1',
          name: 'Redcar',
          slug: 'redcar',
          region_id: 'region-1'
        }
      });
      
      // Mock region query
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: 'region-1',
          name: 'Redcar and Cleveland',
          slug: 'redcar-and-cleveland',
          country_id: 'country-1'
        }
      });
      
      // Mock country query
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: 'country-1',
          name: 'England',
          slug: 'england'
        }
      });

      const result = await buildCanonicalSlug('city-1', 'city');
      
      expect(result).toBe('/foster-agency/england/redcar-and-cleveland/redcar');
    });

    it('should handle missing slugs by generating from name', async () => {
      const mockSupabase = require('../../lib/supabase-server').supabaseAdmin;
      
      // Mock city query with missing slug
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: 'city-1',
          name: 'Redcar',
          slug: '',
          region_id: 'region-1'
        }
      });
      
      // Mock region query with missing slug
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: 'region-1',
          name: 'Redcar and Cleveland',
          slug: '',
          country_id: 'country-1'
        }
      });
      
      // Mock country query with missing slug
      mockSupabase.single.mockResolvedValueOnce({
        data: {
          id: 'country-1',
          name: 'England',
          slug: ''
        }
      });

      const result = await buildCanonicalSlug('city-1', 'city');
      
      expect(result).toBe('/foster-agency/england/redcar-and-cleveland/redcar');
    });

    it('should handle errors gracefully', async () => {
      const mockSupabase = require('../../lib/supabase-server').supabaseAdmin;
      
      // Mock error
      mockSupabase.single.mockRejectedValueOnce(new Error('Database error'));

      await expect(buildCanonicalSlug('city-1', 'city')).rejects.toThrow('Database error');
    });
  });
});