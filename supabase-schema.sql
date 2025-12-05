-- Foster Care Directory UK - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE (for NextAuth)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  email_verified TIMESTAMPTZ,
  image TEXT,
  password TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'agency', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ACCOUNTS TABLE (for NextAuth OAuth)
-- =====================================================
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider, provider_account_id)
);

-- =====================================================
-- SESSIONS TABLE (for NextAuth)
-- =====================================================
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- VERIFICATION TOKENS TABLE (for NextAuth)
-- =====================================================
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- =====================================================
-- AGENCIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  logo TEXT,
  cover_image TEXT,
  description TEXT,
  
  -- Location details
  city TEXT,
  region TEXT,
  postcode TEXT,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Agency details
  type TEXT DEFAULT 'Private' CHECK (type IN ('Private', 'Charity', 'Local Authority')),
  accreditation TEXT,
  
  -- Contact information
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,
  
  -- Status flags
  featured BOOLEAN DEFAULT FALSE,
  recruiting BOOLEAN DEFAULT TRUE,
  verified BOOLEAN DEFAULT FALSE,
  registration_complete BOOLEAN DEFAULT FALSE,
  
  -- Ratings
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- Subscription
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'basic', 'premium', 'enterprise')),
  subscription_status TEXT DEFAULT 'active',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_expires_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- AGENCY SERVICES TABLE (many-to-many)
-- =====================================================
CREATE TABLE IF NOT EXISTS agency_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- AGENCY LOCATIONS TABLE (multiple locations per agency)
-- =====================================================
CREATE TABLE IF NOT EXISTS agency_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  region TEXT,
  postcode TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  email TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  images JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- REVIEWS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_name TEXT,
  comment TEXT,
  stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SAVED AGENCIES TABLE (user favorites)
-- =====================================================
CREATE TABLE IF NOT EXISTS saved_agencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, agency_id)
);

-- =====================================================
-- CONTACT INQUIRIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID REFERENCES agencies(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'general' CHECK (type IN ('general', 'agency')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'replied', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ANALYTICS TABLE (for agency dashboard)
-- =====================================================
CREATE TABLE IF NOT EXISTS agency_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  profile_views INTEGER DEFAULT 0,
  contact_clicks INTEGER DEFAULT 0,
  website_clicks INTEGER DEFAULT 0,
  phone_clicks INTEGER DEFAULT 0,
  email_clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(agency_id, date)
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_agencies_user_id ON agencies(user_id);
CREATE INDEX IF NOT EXISTS idx_agencies_slug ON agencies(slug);
CREATE INDEX IF NOT EXISTS idx_agencies_featured ON agencies(featured);
CREATE INDEX IF NOT EXISTS idx_agencies_location ON agencies(city, region);
CREATE INDEX IF NOT EXISTS idx_agency_services_agency_id ON agency_services(agency_id);
CREATE INDEX IF NOT EXISTS idx_agency_locations_agency_id ON agency_locations(agency_id);
CREATE INDEX IF NOT EXISTS idx_reviews_agency_id ON reviews(agency_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(approved);
CREATE INDEX IF NOT EXISTS idx_saved_agencies_user_id ON saved_agencies(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_agency_id ON contact_inquiries(agency_id);
CREATE INDEX IF NOT EXISTS idx_agency_analytics_agency_id ON agency_analytics(agency_id);
CREATE INDEX IF NOT EXISTS idx_agency_analytics_date ON agency_analytics(date);

-- =====================================================
-- TRIGGERS for Updated_at Timestamps
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop triggers if they exist to avoid conflicts
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_accounts_updated_at ON accounts;
DROP TRIGGER IF EXISTS update_agencies_updated_at ON agencies;
DROP TRIGGER IF EXISTS update_agency_locations_updated_at ON agency_locations;
DROP TRIGGER IF EXISTS update_reviews_updated_at ON reviews;

-- Then create the triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agencies_updated_at BEFORE UPDATE ON agencies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agency_locations_updated_at BEFORE UPDATE ON agency_locations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_inquiries_updated_at BEFORE UPDATE ON contact_inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) Policies
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_analytics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Agencies are viewable by everyone" ON agencies;
DROP POLICY IF EXISTS "Users can insert their own agency" ON agencies;
DROP POLICY IF EXISTS "Users can update their own agency" ON agencies;
DROP POLICY IF EXISTS "Users can delete their own agency" ON agencies;
DROP POLICY IF EXISTS "Agency services viewable by everyone" ON agency_services;
DROP POLICY IF EXISTS "Agency owners can manage services" ON agency_services;
DROP POLICY IF EXISTS "Agency locations viewable by everyone" ON agency_locations;
DROP POLICY IF EXISTS "Agency owners can manage locations" ON agency_locations;
DROP POLICY IF EXISTS "Approved reviews viewable by everyone" ON reviews;
DROP POLICY IF EXISTS "Users can add reviews" ON reviews;
DROP POLICY IF EXISTS "Users can manage their saved agencies" ON saved_agencies;
DROP POLICY IF EXISTS "Anyone can submit contact inquiry" ON contact_inquiries;
DROP POLICY IF EXISTS "Agencies can view their inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Agency owners can view analytics" ON agency_analytics;
DROP POLICY IF EXISTS "Agency owners can insert analytics" ON agency_analytics;
DROP POLICY IF EXISTS "Admins can do anything" ON users;
DROP POLICY IF EXISTS "Admins can do anything" ON agencies;
DROP POLICY IF EXISTS "Admins can do anything" ON agency_services;
DROP POLICY IF EXISTS "Admins can do anything" ON agency_locations;
DROP POLICY IF EXISTS "Admins can do anything" ON reviews;
DROP POLICY IF EXISTS "Admins can do anything" ON saved_agencies;
DROP POLICY IF EXISTS "Admins can do anything" ON contact_inquiries;
DROP POLICY IF EXISTS "Admins can do anything" ON agency_analytics;

-- Users: Can read their own data, service role can do anything
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Agencies: Public read, owners can update
CREATE POLICY "Agencies are viewable by everyone" ON agencies FOR SELECT USING (true);
CREATE POLICY "Users can insert their own agency" ON agencies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own agency" ON agencies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own agency" ON agencies FOR DELETE USING (auth.uid() = user_id);

-- Agency Services: Follow agency permissions
CREATE POLICY "Agency services viewable by everyone" ON agency_services FOR SELECT USING (true);
CREATE POLICY "Agency owners can manage services" ON agency_services FOR ALL USING (
  EXISTS (SELECT 1 FROM agencies WHERE agencies.id = agency_services.agency_id AND agencies.user_id = auth.uid())
);

-- Agency Locations: Follow agency permissions
CREATE POLICY "Agency locations viewable by everyone" ON agency_locations FOR SELECT USING (true);
CREATE POLICY "Agency owners can manage locations" ON agency_locations FOR ALL USING (
  EXISTS (SELECT 1 FROM agencies WHERE agencies.id = agency_locations.agency_id AND agencies.user_id = auth.uid())
);

-- Reviews: Approved reviews public, users can add reviews
CREATE POLICY "Approved reviews viewable by everyone" ON reviews FOR SELECT USING (approved = true);
CREATE POLICY "Users can add reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Saved Agencies: Users can manage their own saves
CREATE POLICY "Users can manage their saved agencies" ON saved_agencies FOR ALL USING (auth.uid() = user_id);

-- Contact Inquiries: Users can insert, agencies can view their own
CREATE POLICY "Anyone can submit contact inquiry" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Agencies can view their inquiries" ON contact_inquiries FOR SELECT USING (
  agency_id IS NULL OR EXISTS (SELECT 1 FROM agencies WHERE agencies.id = contact_inquiries.agency_id AND agencies.user_id = auth.uid())
);

-- Agency Analytics: Only agency owners can view
CREATE POLICY "Agency owners can view analytics" ON agency_analytics FOR SELECT USING (
  EXISTS (SELECT 1 FROM agencies WHERE agencies.id = agency_analytics.agency_id AND agencies.user_id = auth.uid())
);
CREATE POLICY "Agency owners can insert analytics" ON agency_analytics FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM agencies WHERE agencies.id = agency_analytics.agency_id AND agencies.user_id = auth.uid())
);

-- Admin access: Service role can do anything
CREATE POLICY "Admins can do anything" ON users FOR ALL USING ( EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin') );
CREATE POLICY "Admins can do anything" ON agencies FOR ALL USING ( EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin') );
CREATE POLICY "Admins can do anything" ON agency_services FOR ALL USING ( EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin') );
CREATE POLICY "Admins can do anything" ON agency_locations FOR ALL USING ( EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin') );
CREATE POLICY "Admins can do anything" ON reviews FOR ALL USING ( EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin') );
CREATE POLICY "Admins can do anything" ON saved_agencies FOR ALL USING ( EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin') );
CREATE POLICY "Admins can do anything" ON contact_inquiries FOR ALL USING ( EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin') );
CREATE POLICY "Admins can do anything" ON agency_analytics FOR ALL USING ( EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin') );

-- =====================================================
-- FUNCTIONS for Agency Rating Updates
-- =====================================================
CREATE OR REPLACE FUNCTION update_agency_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE agencies
  SET 
    rating = (
      SELECT AVG(stars)::DECIMAL(3,2)
      FROM reviews
      WHERE agency_id = NEW.agency_id AND approved = true
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE agency_id = NEW.agency_id AND approved = true
    )
  WHERE id = NEW.agency_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS update_agency_rating_on_review ON reviews;

-- Create trigger
CREATE TRIGGER update_agency_rating_on_review
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_agency_rating();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================
-- Uncomment to insert sample agencies

/*
INSERT INTO agencies (name, slug, description, city, region, type, contact_email, contact_phone, featured, recruiting, verified)
VALUES 
  ('Care4Kids London', 'care4kids-london', 'Leading fostering agency in London with over 20 years of experience.', 'London', 'Greater London', 'Private', 'info@care4kids.co.uk', '020 1234 5678', true, true, true),
  ('Manchester Family Fostering', 'manchester-family-fostering', 'Dedicated to finding loving homes for children in Manchester.', 'Manchester', 'Greater Manchester', 'Charity', 'hello@manchesterfostering.org.uk', '0161 234 5678', true, true, true),
  ('Birmingham Children First', 'birmingham-children-first', 'Local authority fostering service committed to keeping children safe.', 'Birmingham', 'West Midlands', 'Local Authority', 'fostering@birmingham.gov.uk', '0121 303 1234', false, true, true);
*/