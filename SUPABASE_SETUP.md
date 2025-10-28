# Supabase Database Setup Instructions

## Step 1: Run the Schema SQL

1. Go to your Supabase project: https://vcvvtklbyvdbysfdbnfp.supabase.co
2. Navigate to the **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire content of `supabase-schema.sql`
5. Paste it into the SQL Editor
6. Click **Run** to execute the schema

This will create all necessary tables, indexes, policies, and functions for the Foster Care Directory.

## Step 2: Enable Storage for Images

1. Navigate to **Storage** in your Supabase dashboard
2. Create a new bucket called `agency-images`
3. Make it **public** for storing agency logos, covers, and location images
4. Configure the following policies:
   - Allow public read access
   - Allow authenticated users to upload
   - Allow agency owners to delete their own images

## Step 3: Configure Authentication

1. Go to **Authentication** > **Providers**
2. Enable **Email** provider (already enabled by default)
3. For Google OAuth (when you have credentials):
   - Enable **Google** provider
   - Add your Google Client ID and Secret
   - Add authorized redirect URL: `http://localhost:3000/api/auth/callback/google`

## Database Tables Created

### Core Tables
- `users` - User accounts (NextAuth compatible)
- `accounts` - OAuth provider accounts
- `sessions` - User sessions
- `verification_tokens` - Email verification

### Application Tables
- `agencies` - Fostering agency profiles
- `agency_services` - Services offered by agencies
- `agency_locations` - Multiple locations per agency
- `reviews` - User reviews for agencies
- `saved_agencies` - User favorites
- `contact_inquiries` - Contact form submissions
- `agency_analytics` - Dashboard analytics data

## Security Features

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Policies for public read / authenticated write
- ✅ Auto-updating timestamps
- ✅ Rating calculation triggers
- ✅ UUID primary keys for security

## Next Steps

After running the schema:
1. The application will automatically connect using environment variables
2. You can start creating agencies through the UI
3. Analytics will be tracked automatically
4. Reviews will update agency ratings in real-time
