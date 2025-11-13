# 🚀 Quick Start Guide

## Current Status
✅ **Phase 2 Complete** - App is running on http://localhost:3001

---

## ⚡ Immediate Next Steps

### 1. Setup Database (REQUIRED)
```bash
# Go to Supabase Dashboard
https://vcvvtklbyvdbysfdbnfp.supabase.co

# Navigate to SQL Editor
# Copy ALL content from: supabase-schema.sql
# Paste and click "RUN"
```

### 2. Seed Sample Data (Optional)
```bash
# In a new terminal or browser:
curl -X POST http://localhost:3001/api/seed

# Or visit in browser:
http://localhost:3001/api/seed
```

### 3. Test the Application
```
http://localhost:3001              ← Homepage
http://localhost:3001/auth/signup  ← Create account
http://localhost:3001/auth/signin  ← Sign in
http://localhost:3001/agencies     ← Browse agencies
http://localhost:3001/contact      ← Contact form
http://localhost:3001/resources    ← Resources page
```

---

## 🎨 New Color Theme

Your site now uses the burgundy/beige/cream palette:

| Color | Hex | Usage |
|-------|-----|-------|
| 🟥 Burgundy | `#773344` | Primary buttons, headers, links |
| 🟫 Beige | `#E3B5A4` | Secondary accents, badges |
| 🟨 Cream | `#F5E9E2` | Backgrounds, sections |

---

## ✅ What's Working

- ✅ User registration (user & agency roles)
- ✅ Email/password authentication  
- ✅ Google OAuth (structure ready - add credentials when ready)
- ✅ Browse agencies
- ✅ View agency details
- ✅ Contact forms
- ✅ Complete burgundy/beige/cream theme
- ✅ Supabase database integration
- ✅ All API endpoints

---

## 🔧 What's Next

### Pending Features:
1. **Agency Dashboard** ← Next to build
   - Profile editing
   - Analytics charts
   - Review management
   - Location management

2. **Stripe Payments**
   - Subscription plans
   - Checkout flow

3. **Google Maps**
   - Interactive maps
   - Location search
   - **Requires API key configuration** - See [GOOGLE_MAPS_SETUP.md](GOOGLE_MAPS_SETUP.md)

4. **Sanity CMS**
   - Blog posts
   - Resources

---

## 🐛 Troubleshooting

### If you see errors:

**"Module not found: mongoose"**
- ✅ Fixed! Old MongoDB dependencies removed

**"Agency not found"**
- Run the Supabase SQL schema first
- Then seed data with POST /api/seed

**Colors still showing green/blue**
- Hard refresh browser (Ctrl + Shift + R)
- Clear browser cache

**Port 3000 in use**
- App automatically runs on port 3001
- This is normal!

---

## 📞 Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production
npm start

# Seed database
curl -X POST http://localhost:3001/api/seed
```

---

## 📊 Database Quick Reference

### Main Tables:
- `users` - User accounts
- `agencies` - Agency profiles
- `reviews` - User reviews (requires approval)
- `agency_locations` - Multiple locations
- `contact_inquiries` - Contact submissions
- `saved_agencies` - User favorites

### Key Fields (snake_case):
```javascript
{
  // Agency
  id: "uuid",
  name: "string",
  city: "string",              // NOT location.city
  region: "string",            // NOT location.region
  contact_email: "email",      // NOT contactEmail
  contact_phone: "phone",      // NOT contactPhone
  review_count: "number",      // NOT reviewCount
  featured: "boolean",
  recruiting: "boolean",
  verified: "boolean"
}
```

---

## 🎯 Testing Account

Create a test account:
1. Go to http://localhost:3001/auth/signup
2. Choose "Fostering Agency" role
3. Fill in details
4. Submit
5. Auto-redirected to dashboard (when built)
6. Check Supabase database for created records

---

**Ready to continue? Let me know and I'll build the Agency Dashboard next!** 🚀
