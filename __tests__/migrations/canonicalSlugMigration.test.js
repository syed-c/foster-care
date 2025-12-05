const migration = require('../../migrations/20251108120000_add_canonical_slug');

// Mock knex
const mockKnex = {
  schema: {
    table: jest.fn().mockReturnThis()
  },
  select: jest.fn().mockReturnThis(),
  join: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis()
};

describe('Canonical Slug Migration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('up migration', () => {
    it('should add canonical_slug columns to all location tables', async () => {
      mockKnex.select.mockResolvedValueOnce([]); // countries
      mockKnex.select.mockResolvedValueOnce([]); // regions
      mockKnex.select.mockResolvedValueOnce([]); // cities
      
      await migration.up(mockKnex);
      
      // Check that columns were added
      expect(mockKnex.schema.table).toHaveBeenCalledWith('countries', expect.any(Function));
      expect(mockKnex.schema.table).toHaveBeenCalledWith('regions', expect.any(Function));
      expect(mockKnex.schema.table).toHaveBeenCalledWith('cities', expect.any(Function));
    });

    it('should backfill canonical_slug for countries', async () => {
      mockKnex.select.mockResolvedValueOnce([
        { id: '1', slug: 'england' },
        { id: '2', slug: 'scotland' }
      ]); // countries
      mockKnex.select.mockResolvedValueOnce([]); // regions
      mockKnex.select.mockResolvedValueOnce([]); // cities
      
      await migration.up(mockKnex);
      
      // Check that countries were updated
      expect(mockKnex.where).toHaveBeenCalledWith('id', '1');
      expect(mockKnex.update).toHaveBeenCalledWith({ canonical_slug: '/foster-agency/england' });
      
      expect(mockKnex.where).toHaveBeenCalledWith('id', '2');
      expect(mockKnex.update).toHaveBeenCalledWith({ canonical_slug: '/foster-agency/scotland' });
    });

    it('should backfill canonical_slug for regions', async () => {
      mockKnex.select.mockResolvedValueOnce([]); // countries
      mockKnex.select.mockResolvedValueOnce([
        { id: '1', slug: 'greater-london', country_slug: 'england' }
      ]); // regions
      mockKnex.select.mockResolvedValueOnce([]); // cities
      
      await migration.up(mockKnex);
      
      // Check that regions were updated
      expect(mockKnex.where).toHaveBeenCalledWith('id', '1');
      expect(mockKnex.update).toHaveBeenCalledWith({ canonical_slug: '/foster-agency/england/greater-london' });
    });

    it('should backfill canonical_slug for cities', async () => {
      mockKnex.select.mockResolvedValueOnce([]); // countries
      mockKnex.select.mockResolvedValueOnce([]); // regions
      mockKnex.select.mockResolvedValueOnce([
        { id: '1', slug: 'london', region_slug: 'greater-london', country_slug: 'england' }
      ]); // cities
      
      await migration.up(mockKnex);
      
      // Check that cities were updated
      expect(mockKnex.where).toHaveBeenCalledWith('id', '1');
      expect(mockKnex.update).toHaveBeenCalledWith({ canonical_slug: '/foster-agency/england/greater-london/london' });
    });
  });

  describe('down migration', () => {
    it('should remove canonical_slug columns from all location tables', async () => {
      await migration.down(mockKnex);
      
      // Check that columns were dropped
      expect(mockKnex.schema.table).toHaveBeenCalledWith('countries', expect.any(Function));
      expect(mockKnex.schema.table).toHaveBeenCalledWith('regions', expect.any(Function));
      expect(mockKnex.schema.table).toHaveBeenCalledWith('cities', expect.any(Function));
    });
  });
});