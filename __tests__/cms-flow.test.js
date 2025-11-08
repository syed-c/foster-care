// __tests__/cms-flow.test.js
// Unit test for CMS save → persist → reload → render flow

import { POST, GET } from '../app/api/admin/locations/[id]/content/route';

describe('CMS Location Content API', () => {
  // Mock Supabase client
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    maybeSingle: jest.fn(),
    insert: jest.fn().mockReturnThis(),
    upsert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('PUT handler', () => {
    it('should save location content and return saved data', async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          hero: { heading: 'Test Heading' },
          title: 'Test Location',
          slug: 'test-location',
          type: 'city'
        })
      };

      const mockParams = { id: 'test-location-id' };

      // Mock Supabase responses
      mockSupabase.maybeSingle.mockResolvedValueOnce({ data: { id: 'test-location-id' }, error: null }); // Location exists
      mockSupabase.upsert.mockResolvedValueOnce({ 
        data: [{ 
          location_id: 'test-location-id',
          template_type: 'city',
          content_json: { hero: { heading: 'Test Heading' } }
        }], 
        error: null 
      });

      // Mock the supabase import
      jest.mock('@/lib/supabase', () => ({
        supabaseAdmin: mockSupabase
      }));

      const response = await PUT(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.saved).toBeDefined();
      expect(data.saved.content_json.hero.heading).toBe('Test Heading');
    });

    it('should create location if it does not exist', async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({
          hero: { heading: 'New Location' },
          title: 'New Location',
          slug: 'new-location',
          type: 'city'
        })
      };

      const mockParams = { id: 'new-location-id' };

      // Mock Supabase responses
      mockSupabase.maybeSingle.mockResolvedValueOnce({ data: null, error: null }); // Location doesn't exist
      mockSupabase.insert.mockResolvedValueOnce({ data: null, error: null }); // Insert location
      mockSupabase.upsert.mockResolvedValueOnce({ 
        data: [{ 
          location_id: 'new-location-id',
          template_type: 'city',
          content_json: { hero: { heading: 'New Location' } }
        }], 
        error: null 
      });

      // Mock the supabase import
      jest.mock('@/lib/supabase', () => ({
        supabaseAdmin: mockSupabase
      }));

      const response = await PUT(mockRequest, { params: mockParams });
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(mockSupabase.insert).toHaveBeenCalled();
    });
  });

  describe('GET handler', () => {
    it('should retrieve location content', async () => {
      const mockParams = { id: 'test-location-id' };

      // Mock Supabase responses
      mockSupabase.maybeSingle.mockResolvedValueOnce({ 
        data: { 
          content_json: { hero: { heading: 'Test Heading' } },
          template_type: 'city'
        }, 
        error: null 
      });

      // Mock the supabase import
      jest.mock('@/lib/supabase', () => ({
        supabaseAdmin: mockSupabase
      }));

      const response = await GET({ params: mockParams });
      const data = await response.json();

      expect(data.success).toBe(true);
      expect(data.content.hero.heading).toBe('Test Heading');
    });
  });
});