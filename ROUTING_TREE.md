# Full Routing Tree with Slug Structure Enforcement

## Overview
This document defines the complete routing structure for the Foster Care Directory UK platform with strict enforcement of the required slug patterns.

## Route Definitions

### 1. Homepage & Main Pages
```
GET /                                    -> Homepage
GET /fostering-agencies-uk               -> Main agencies directory
GET /resources                           -> Blog/Resources hub
GET /agency-dashboard                    -> Agency dashboard (protected)
GET /auth/register                       -> User/Agency registration
GET /auth/login                          -> Login page
GET /auth/agency-setup                   -> Agency setup (post-registration)
```

### 2. Location-Based Routing (Strict Slug Structure)
```
# Country Level
GET /fostering-agencies-uk/{country}     -> Country page (e.g., /fostering-agencies-uk/england)

# Region Level
GET /fostering-agencies-uk/{country}/{region}  -> Region page (e.g., /fostering-agencies-uk/england/greater-london)

# City Level
GET /fostering-agencies-uk/{country}/{region}/{city}  -> City page (e.g., /fostering-agencies-uk/england/greater-london/london)

# Agency Profile
GET /fostering-agencies-uk/{country}/{region}/{city}/{agency-slug}  -> Agency profile page (e.g., /fostering-agencies-uk/england/greater-london/london/care4kids-london)

# Location FAQ Pages
GET /fostering-agencies-uk/faq           -> Global FAQ
GET /fostering-agencies-uk/{country}/faq -> Country FAQ
GET /fostering-agencies-uk/{country}/{region}/faq  -> Region FAQ
GET /fostering-agencies-uk/{country}/{region}/{city}/faq  -> City FAQ
```

### 3. Blog/Resources Routing
```
GET /resources                           -> Resources hub
GET /resources/{category}                -> Category listing (e.g., /resources/guides)
GET /resources/{article-slug}            -> Individual article (e.g., /resources/getting-started-with-fostering)
```

### 4. Agency Dashboard Routes (Protected)
```
GET /agency-dashboard                    -> Dashboard overview
GET /agency-dashboard/profile            -> Agency profile management
GET /agency-dashboard/leads              -> Lead management
GET /agency-dashboard/analytics          -> Performance analytics
GET /agency-dashboard/settings           -> Account settings
```

## Slug Generation Rules

### Country Slugs
- Based on country name in lowercase
- Spaces replaced with hyphens
- Examples: "england", "scotland", "wales", "northern-ireland"

### Region Slugs
- Based on region name in lowercase
- Spaces replaced with hyphens
- Examples: "greater-london", "west-midlands", "greater-manchester"

### City Slugs
- Based on city name in lowercase
- Spaces replaced with hyphens
- Examples: "london", "birmingham", "manchester"

### Agency Slugs
- Based on agency name in lowercase
- Spaces replaced with hyphens
- Must be unique within the city
- Examples: "care4kids-london", "bright-futures-fostering"

## Canonical URL Structure

All location-based pages will have canonical URLs that follow this pattern:
- Countries: `/fostering-agencies-uk/{country}`
- Regions: `/fostering-agencies-uk/{country}/{region}`
- Cities: `/fostering-agencies-uk/{country}/{region}/{city}`
- Agencies: `/fostering-agencies-uk/{country}/{region}/{city}/{agency-slug}`

## Redirect Rules

To maintain SEO integrity and handle legacy URLs:
1. All variations of location slugs will redirect to the canonical version
2. Legacy URLs from previous versions will redirect to new structure
3. Non-canonical paths will 301 redirect to canonical paths

## API Routes for Dynamic Data

```
# Agency API
GET /api/agencies                        -> List agencies with filters
GET /api/agencies/{id}                   -> Get agency by ID
GET /api/agencies/slug/{slug}            -> Get agency by slug
GET /api/agencies/location/{city}        -> Get agencies by city
GET /api/agencies/featured               -> Get featured agencies

# Location API
GET /api/locations/countries             -> List all countries
GET /api/locations/countries/{slug}      -> Get country by slug
GET /api/locations/regions/{country}     -> List regions in country
GET /api/locations/regions/{slug}        -> Get region by slug
GET /api/locations/cities/{region}       -> List cities in region
GET /api/locations/cities/{slug}         -> Get city by slug

# Content API
GET /api/blog                            -> List blog posts
GET /api/blog/{slug}                     -> Get blog post by slug
GET /api/blog/category/{category}        -> Get posts by category
GET /api/faqs                            -> List FAQs
GET /api/faqs/location/{location-id}     -> Get FAQs for location
GET /api/faqs/agency/{agency-id}         -> Get FAQs for agency

# User/Agency API
GET /api/user                            -> Get current user
POST /api/auth/register                  -> Register new user/agency
POST /api/auth/login                     -> Login
POST /api/agency/setup                   -> Complete agency setup
PUT /api/agency/profile                  -> Update agency profile
GET /api/agency/dashboard                -> Get agency dashboard data
GET /api/agency/leads                    -> Get agency leads
GET /api/agency/analytics                -> Get agency analytics

# Lead Capture API
POST /api/leads                          -> Submit lead
```

## Middleware Protection

Routes will be protected using middleware:
- `/agency-dashboard/*` - Requires authenticated agency user
- `/auth/agency-setup` - Requires authenticated user with agency role
- API routes for agency management - Require appropriate authentication/authorization

## Sitemap Generation

The sitemap will be dynamically generated with these priorities:
1. Homepage (/) - Priority: 1.0, Change Frequency: daily
2. Country pages - Priority: 0.9, Change Frequency: weekly
3. Region pages - Priority: 0.8, Change Frequency: weekly
4. City pages - Priority: 0.7, Change Frequency: weekly
5. Agency pages - Priority: 0.6, Change Frequency: monthly
6. Blog posts - Priority: 0.5, Change Frequency: weekly
7. FAQ pages - Priority: 0.4, Change Frequency: monthly