# Foster Agency Directory - Setup & Testing Guide

## 🎯 Project Overview

This is a Next.js 14 (App Router) directory website for foster agencies in the UK, built entirely in **JavaScript** (no TypeScript). It features:

- Dynamic routing from CSV data
- JSON-based CMS for content management
- Admin UI for editing content
- SEO-optimized pages with JSON-LD schema
- Beautiful UI with custom color scheme

## 📁 File Structure

```
lib/
  ├── locationData.js      # CSV parser and location utilities
  ├── cms.js               # CMS functions for content.json
  └── sitemap.js           # Static path generators

app/
  ├── foster-agency/
  │   ├── page.js                          # Main directory page
  │   ├── [country]/page.js                # Country pages
  │   ├── [country]/[region]/page.js       # Region pages
  │   └── [country]/[region]/[city]/page.js # City pages
  └── admin/
      └── cms/
          └── page.js                      # Admin CMS editor

components/foster-agency/
  ├── Breadcrumbs.jsx
  ├── Hero.jsx
  ├── FAQAccordion.jsx
  ├── LocationGrid.jsx
  ├── UsefulResources.jsx
  └── WhyFosterCare.jsx

data/
  └── content.json                         # CMS content storage (auto-created)
```

## 🚀 Setup Steps

### 1. Install Dependencies

The project uses `csv-parse` for parsing CSV files. It should already be in your `package.json`:

```bash
npm install
```

### 2. Verify CSV File

Ensure `uk-foster-agency-location-urls.csv` is in the root directory with this structure:

```csv
country,region_or_county,city_or_district,url
England,Greater London,London,/foster-agency/england/greater-london/london
...
```

### 3. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000/foster-agency`

## 🧪 Testing Guide

### Test Main Directory Page

1. **Visit**: `http://localhost:3000/foster-agency`
   - Should show 4 country cards: England, Scotland, Wales, Northern Ireland
   - Each card should link to `/foster-agency/[country-slug]`

### Test Country Pages

1. **Visit**: `http://localhost:3000/foster-agency/england`
   - Should show breadcrumbs (Home > Foster Agencies > England)
   - Hero section with title
   - Grid of regions in England
   - Each region card links to `/foster-agency/england/[region-slug]`

### Test Region Pages

1. **Visit**: `http://localhost:3000/foster-agency/england/greater-london`
   - Should show breadcrumbs (Home > Foster Agencies > England > Greater London)
   - Grid of cities in Greater London
   - Each city card links to `/foster-agency/england/greater-london/[city-slug]`

### Test City Pages

1. **Visit**: `http://localhost:3000/foster-agency/england/greater-london/london`
   - Should show full breadcrumb trail
   - Hero section with CTA button
   - Intro text section
   - "Find Agencies in [City]" grid (placeholder agencies)
   - "Why Foster Care Matters" section
   - Useful Resources section (if configured)
   - FAQ Accordion (if configured)
   - JSON-LD schema in page source (view page source to verify)

### Test Admin CMS

1. **Visit**: `http://localhost:3000/admin/cms`
   - Should show list of all content pages (initially empty or with defaults)
   - Search bar to filter content
   - Click "Edit" on any content to edit:
     - Title, H1, Description
     - Meta Title, Meta Description
     - Hero Text, Intro Text
     - FAQs (add/remove)
     - Useful Resources
   - Save changes and verify they appear on the actual pages

## 📝 Seeding CMS Content

### Option 1: Automatic (Recommended)

Content is automatically created when pages are visited for the first time with default values. Just visit any page:

1. Visit `/foster-agency/england/greater-london/london`
2. Check `data/content.json` - it should have an entry for `england/greater-london/london`

### Option 2: Manual Seeding Script

Create a seed script if needed:

```javascript
// scripts/seed-cms.js
const { ensureContentExists } = require('../lib/cms');

// Seed a few example pages
ensureContentExists('england', {
  title: 'Foster Agencies in England',
  h1: 'Find the Best Foster Agencies in England',
  description: 'Discover trusted foster agencies across England...',
});

ensureContentExists('england/greater-london', {
  title: 'Foster Agencies in Greater London',
  h1: 'Foster Agencies in Greater London',
  description: 'Find foster agencies in the Greater London area...',
});

ensureContentExists('england/greater-london/london', {
  title: 'Foster Agencies in London',
  h1: 'Find the Best Foster Agencies in London',
  description: 'Comprehensive directory of foster agencies in London...',
  faqs: [
    {
      question: 'How many foster agencies are in London?',
      answer: 'London has numerous accredited foster agencies serving different areas and needs.'
    }
  ]
});

console.log('CMS content seeded successfully!');
```

Run: `node scripts/seed-cms.js`

### Option 3: Direct JSON Editing

Edit `data/content.json` directly:

```json
{
  "england": {
    "slug": "england",
    "title": "Foster Agencies in England",
    "h1": "Find the Best Foster Agencies in England",
    "description": "Discover trusted foster agencies...",
    "meta_title": "Foster Agencies in England | UK Directory",
    "meta_description": "Find foster agencies...",
    "hero_text": "Find the perfect foster agency in England",
    "faqs": [
      {
        "question": "Question here?",
        "answer": "Answer here."
      }
    ],
    "useful_resources": [
      {
        "title": "Gov.uk - Fostering",
        "url": "https://www.gov.uk/fostering",
        "description": "Official government information"
      }
    ],
    "intro_text": "Welcome to our directory..."
  }
}
```

## 🎨 Color Scheme

- **Primary**: `#160F29` (Dark purple/navy)
- **Secondary**: `#23CE6B` (Green)
- **Background**: `#F6F8FF` (Light blue/white)

These colors are used throughout via Tailwind classes and direct hex values.

## 🔧 Key Features

### Dynamic Routing
- All routes are generated at build time from CSV data
- Uses Next.js `generateStaticParams()` for static generation
- Supports Next.js 15 async params

### CMS System
- JSON-based storage in `data/content.json`
- Auto-creates default content when pages are first visited
- Admin UI at `/admin/cms` for editing
- Search functionality
- Supports FAQs and useful resources arrays

### SEO Features
- Dynamic meta tags from CMS
- JSON-LD schema markup for city pages
- Breadcrumb navigation
- Semantic HTML structure

## 🐛 Troubleshooting

### CSV Not Loading
- Check that `uk-foster-agency-location-urls.csv` exists in root
- Verify CSV format matches expected structure
- Check console for file read errors

### Content Not Saving
- Ensure `data/` directory is writable
- Check that `content.json` can be created
- Verify API route is working: `/api/admin/cms`

### Pages Showing 404
- Run `npm run build` to generate static paths
- Check that CSV has valid data
- Verify slug generation matches URLs

### Admin CMS Not Loading
- Check browser console for errors
- Verify API route `/api/admin/cms` is accessible
- Check network tab for failed requests

## 📦 Build for Production

```bash
npm run build
npm start
```

This will:
1. Parse CSV and generate all static paths
2. Pre-render all pages
3. Create optimized production build

## 🎯 Next Steps

1. **Add Real Agency Data**: Replace placeholder agencies in city pages with actual database/API data
2. **Add Search Functionality**: Implement search across all pages
3. **Add Filters**: Filter agencies by type, services, etc.
4. **Analytics**: Add tracking for page views
5. **Performance**: Add caching for CSV parsing and CMS reads

## 📄 API Endpoints

### GET `/api/admin/cms`
- Returns all content
- Query params:
  - `?slug=england` - Get specific content
  - `?q=search+term` - Search content

### PUT `/api/admin/cms`
- Updates existing content
- Body: `{ slug: "...", title: "...", ... }`

### POST `/api/admin/cms`
- Creates new content
- Body: `{ slug: "...", title: "...", ... }`

## ✅ Testing Checklist

- [ ] Main directory page loads with countries
- [ ] Country pages show regions
- [ ] Region pages show cities
- [ ] City pages show all sections
- [ ] Breadcrumbs work correctly
- [ ] Admin CMS loads and shows content
- [ ] Can edit and save content in admin
- [ ] Changes reflect on actual pages
- [ ] JSON-LD schema appears in page source
- [ ] Meta tags are dynamic
- [ ] All links navigate correctly
- [ ] Mobile responsive design works

---

**Built with**: Next.js 14, JavaScript, TailwindCSS, CSV-Parse
**Data Source**: `uk-foster-agency-location-urls.csv`
**CMS Storage**: `data/content.json`

