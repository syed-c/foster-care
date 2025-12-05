# Foster Care Directory UK

A modern, futuristic platform connecting fostering agencies with potential foster carers across the UK.

## 🎨 Design System

- **Primary Color**: #7CE2A7 (Mint Green)
- **Secondary Color**: #7DC3EB (Sky Blue)
- **Accent Color**: #F9CBA2 (Peach)
- **Background**: #FAF9F6 (Off White)
- **Text**: #2C2C2C (Charcoal)
- **Fonts**: Poppins (headings), Nunito (subheadings), Inter (body)

## 🏗️ Project Structure

```
app/
├── admin/                  # Admin dashboard
│   ├── agencies/           # Agency management
│   │   └── [id]/           # Agency detail view
│   ├── leads/              # Lead management
│   ├── users/              # User management
│   ├── pages-editor/       # CMS page editor
│   └── page.js             # Admin dashboard
├── agencies/               # Agency directory
├── agency/[id]/            # Agency detail pages
├── api/                    # API routes
├── auth/                   # Authentication pages
├── contact/                # Contact page
├── dashboard/              # Agency dashboard
├── resources/              # Resources section
└── page.js                 # Homepage
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables**:
   Copy `.env.example` to `.env` and fill in your credentials

3. **Google Maps Setup (Important)**:
   Follow the instructions in [GOOGLE_MAPS_SETUP.md](GOOGLE_MAPS_SETUP.md) to configure Google Maps API properly

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**:
   Visit http://localhost:3000

## 🗄️ Database Setup

1. Create a Supabase project
2. Run the SQL schema from `supabase-schema.sql`
3. Update environment variables with your Supabase credentials

## 🔄 Database Updates

When updating the database schema, run the migration script:

```bash
node scripts/update-contact-inquiries-schema.js
```

This will output the SQL needed to update your database schema for the contact inquiries table.

## 📚 CMS Integration

This project uses Sanity CMS for content management:
- Pages
- Locations
- Blog posts
- Resources

Configure your Sanity project ID and dataset in the environment variables.

## 🔐 Authentication

The platform supports two user roles:
- **User**: Foster carers and parents
- **Agency**: Fostering agencies

Admin role is reserved for platform administrators.

### Admin Authentication

Admin users can sign in to the admin panel at `/admin/signin` using email and password credentials.

Default admin credentials:
- **Email**: syedrayyan7117@gmail.com
- **Password**: aDMIN@8899

All admin pages (`/admin/*`) are protected and require authentication.

## 🛠️ Features

- ✅ Agency directory with search and filtering
- ✅ Agency profiles with reviews and ratings
- ✅ Contact forms for agencies
- ✅ User dashboard for saved agencies
- ✅ Agency dashboard for profile management
- ✅ Admin dashboard for content management
- ✅ CMS integration for dynamic content
- ✅ Responsive design with modern UI
- ✅ SEO-friendly URLs

## 📝 TODO

- [ ] Add Stripe integration for featured agency plans
- [ ] Implement CSV import for agencies
- [ ] Add admin user levels for future scalability

## 🌐 Deployment

This is a Next.js application that can be deployed to Vercel, Netlify, or any Node.js hosting platform.

## 📄 License

This project is proprietary and confidential.