# Migration Guide: Builders to Agencies

This document outlines the changes made to transform the Standzon-based directory from "Builders" to "Agencies" terminology.

## 🔄 Terminology Changes

| Old Term (Builders) | New Term (Agencies) | Files Affected |
|---------------------|---------------------|----------------|
| Builders | Agencies | All files |
| Builder Profile | Agency Profile | Multiple files |
| Builder Directory | Agency Directory | Multiple files |

## 📁 File Structure Updates

### Removed Files
- GMB Integration features
- Bulk Builder Import functionality

### Updated Directories
- Renamed all "builders" references to "agencies"
- Updated route structures accordingly

### New Admin Dashboard
- Created new admin section at `/admin`
- Added agency management at `/admin/agencies`
- Added lead management at `/admin/leads`
- Added user management at `/admin/users`
- Added CMS page editor at `/admin/pages-editor`

## 🎨 Design System Update

### Old Color Scheme
- Primary: #773344 (Burgundy)
- Secondary: #E3B5A4 (Beige)
- Accent: #F5E9E2 (Cream)

### New Color Scheme
- Primary: #7CE2A7 (Mint Green)
- Secondary: #7DC3EB (Sky Blue)
- Accent: #F9CBA2 (Peach)
- Background: #FAF9F6 (Off White)
- Text: #2C2C2C (Charcoal)

### Font Updates
- Headings: Poppins
- Subheadings: Nunito
- Body: Inter

## 🗃️ Database Changes

### User Roles
- Removed "admin" role from public registration (kept for internal use)
- Maintained "user" and "agency" roles

### Table Updates
- All "builders" references changed to "agencies"
- Maintained all existing functionality

## 🧠 Functional Behavior Updates

### Admin Features
- Approve/Reject agencies before public visibility
- "Feature" toggle for homepage visibility
- View all leads per agency
- View users (read-only)
- Edit CMS pages via Sanity API

### Search Functionality
- Search by agency name and location
- Client-side filtering for performance

### Authentication
- Agency signup requires admin approval
- Two roles: Public User, Agency

### Email Integration
- New lead auto-email to agency + admin

## 📦 Data Structures

### Agency Model
```javascript
{
  name: String,
  slug: String,
  logo: String,
  shortIntro: String,
  description: String,
  location: String, // city reference
  rating: Number,
  reviews: [
    {
      user: ObjectId,
      stars: Number,
      comment: String,
      date: Date,
    }
  ],
  contactEmail: String,
  phone: String,
  website: String,
  status: String, // 'pending', 'approved', 'rejected'
  featured: Boolean,
  createdAt: Date,
}
```

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  role: 'user' | 'agency',
  savedAgencies: [ObjectId]
}
```

### Lead Model
```javascript
{
  agency: ObjectId,
  user: ObjectId,
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: Date,
}
```

## 🗺️ Route Updates

### Public Routes
- `/` Homepage
- `/agencies` (directory + filters)
- `/agency/[slug]` (agency detail)
- `/locations` (list from Sanity)
- `/locations/[slug]` (dynamic CMS pages)
- `/blog` from CMS
- `/blog/[slug]`
- `/contact`

### Auth Routes
- `/auth/login`
- `/auth/register-agency`

### Admin Routes
- `/admin/dashboard`
- `/admin/agencies`
- `/admin/agencies/[id]` — Approve / Reject / Feature
- `/admin/leads`
- `/admin/users` (read-only list)
- `/admin/pages-editor` → Sanity CMS editing

## 📝 TODO Comments Added

1. `// TODO: Add Stripe for Featured Plan in next version`
2. `// TODO: Admin user level in future if needed`
3. `// TODO: Add CSV Import for agencies later`

## 🧪 Testing Checklist

- [x] All routes working correctly
- [x] Admin dashboard functional
- [x] Agency approval workflow
- [x] Lead management
- [x] User management
- [x] CMS page editing
- [x] Search functionality
- [x] Authentication flows
- [x] Email notifications
- [x] Responsive design
- [x] Modern UI implementation

## 🚀 Deployment Ready

The application is fully deployable with all changes implemented and tested.