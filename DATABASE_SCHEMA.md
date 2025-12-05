# Database Schema

## Overview
This document defines the database schema for the Foster Care Directory UK platform. The schema includes all entities required for the application to function properly with full SEO capabilities, programmatic content generation, and advanced filtering.

## Entities

### 1. Agency
```sql
CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo_url TEXT,
  cover_image_url TEXT,
  description TEXT,
  type VARCHAR(50) CHECK (type IN ('Private', 'Charity', 'Local Authority')),
  accreditation TEXT,
  city VARCHAR(100),
  region VARCHAR(100),
  country VARCHAR(100),
  postcode VARCHAR(20),
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  website VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  recruiting BOOLEAN DEFAULT TRUE,
  verified BOOLEAN DEFAULT FALSE,
  registration_complete BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  subscription_plan VARCHAR(50) DEFAULT 'free',
  subscription_status VARCHAR(50) DEFAULT 'active',
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Location (Hierarchical: Country → Region → City → Area)
```sql
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  canonical_slug VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id UUID REFERENCES countries(id),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  canonical_slug VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(country_id, slug)
);

CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region_id UUID REFERENCES regions(id),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  canonical_slug VARCHAR(255) UNIQUE,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(region_id, slug)
);
```

### 3. Review
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  user_name VARCHAR(255),
  comment TEXT,
  stars INTEGER CHECK (stars >= 1 AND stars <= 5),
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 4. FAQ
```sql
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  location_id UUID REFERENCES cities(id), -- Nullable for general FAQs
  agency_id UUID REFERENCES agencies(id), -- Nullable for agency-specific FAQs
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Blog/Resource
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category VARCHAR(100),
  featured_image_url TEXT,
  author_name VARCHAR(255),
  meta_title VARCHAR(255),
  meta_description TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 6. Lead
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES agencies(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT,
  type VARCHAR(50) DEFAULT 'general',
  status VARCHAR(50) DEFAULT 'new',
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 7. AgencyUser (Agency Team Members)
```sql
CREATE TABLE agency_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  role VARCHAR(50) DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 8. AgencyLocation (Multiple locations per agency)
```sql
CREATE TABLE agency_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  region VARCHAR(100),
  postcode VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone VARCHAR(20),
  email VARCHAR(255),
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 9. Analytics
```sql
CREATE TABLE agency_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  profile_views INTEGER DEFAULT 0,
  contact_clicks INTEGER DEFAULT 0,
  website_clicks INTEGER DEFAULT 0,
  phone_clicks INTEGER DEFAULT 0,
  email_clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(agency_id, date)
);
```

## Indexes for Performance
```sql
-- Agencies indexes
CREATE INDEX idx_agencies_slug ON agencies(slug);
CREATE INDEX idx_agencies_location ON agencies(country, region, city);
CREATE INDEX idx_agencies_featured ON agencies(featured);
CREATE INDEX idx_agencies_rating ON agencies(rating DESC);

-- Locations indexes
CREATE INDEX idx_countries_slug ON countries(slug);
CREATE INDEX idx_regions_slug ON regions(slug);
CREATE INDEX idx_cities_slug ON cities(slug);
CREATE INDEX idx_cities_region ON cities(region_id);

-- Reviews indexes
CREATE INDEX idx_reviews_agency ON reviews(agency_id);
CREATE INDEX idx_reviews_approved ON reviews(approved);

-- Blog posts indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(published, published_at DESC);

-- FAQ indexes
CREATE INDEX idx_faqs_location ON faqs(location_id);
CREATE INDEX idx_faqs_agency ON faqs(agency_id);
CREATE INDEX idx_faqs_category ON faqs(category);

-- Analytics indexes
CREATE INDEX idx_analytics_agency ON agency_analytics(agency_id);
CREATE INDEX idx_analytics_date ON agency_analytics(date);
```

## Triggers for Data Integrity
```sql
-- Update updated_at timestamp on row update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables
CREATE TRIGGER update_agencies_updated_at BEFORE UPDATE ON agencies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_countries_updated_at BEFORE UPDATE ON countries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_regions_updated_at BEFORE UPDATE ON regions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cities_updated_at BEFORE UPDATE ON cities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agency_analytics_updated_at BEFORE UPDATE ON agency_analytics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Row Level Security (RLS) Policies
```sql
-- Enable RLS
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_analytics ENABLE ROW LEVEL SECURITY;

-- Agencies: Public read, owners can update
CREATE POLICY "Agencies are viewable by everyone" ON agencies FOR SELECT USING (true);
CREATE POLICY "Users can insert their own agency" ON agencies FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own agency" ON agencies FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete their own agency" ON agencies FOR DELETE USING (user_id = auth.uid());

-- Locations: Public read
CREATE POLICY "Countries are viewable by everyone" ON countries FOR SELECT USING (true);
CREATE POLICY "Regions are viewable by everyone" ON regions FOR SELECT USING (true);
CREATE POLICY "Cities are viewable by everyone" ON cities FOR SELECT USING (true);

-- Reviews: Approved reviews public, users can add reviews
CREATE POLICY "Approved reviews viewable by everyone" ON reviews FOR SELECT USING (approved = true);
CREATE POLICY "Users can add reviews" ON reviews FOR INSERT WITH CHECK (user_id = auth.uid());

-- Blog posts: Published posts public, admins can manage
CREATE POLICY "Published blog posts viewable by everyone" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admins can manage blog posts" ON blog_posts FOR ALL USING (EXISTS (
  SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
));

-- FAQs: Public read
CREATE POLICY "FAQs are viewable by everyone" ON faqs FOR SELECT USING (true);

-- Leads: Agencies can view their own
CREATE POLICY "Agencies can view their leads" ON leads FOR SELECT USING (
  EXISTS (SELECT 1 FROM agencies WHERE agencies.id = leads.agency_id AND agencies.user_id = auth.uid())
);

-- Agency users: Agency owners can manage
CREATE POLICY "Agency owners can manage team members" ON agency_users FOR ALL USING (
  EXISTS (SELECT 1 FROM agencies WHERE agencies.id = agency_users.agency_id AND agencies.user_id = auth.uid())
);

-- Agency locations: Agency owners can manage
CREATE POLICY "Agency owners can manage locations" ON agency_locations FOR ALL USING (
  EXISTS (SELECT 1 FROM agencies WHERE agencies.id = agency_locations.agency_id AND agencies.user_id = auth.uid())
);

-- Analytics: Only agency owners can view
CREATE POLICY "Agency owners can view analytics" ON agency_analytics FOR SELECT USING (
  EXISTS (SELECT 1 FROM agencies WHERE agencies.id = agency_analytics.agency_id AND agencies.user_id = auth.uid())
);
```