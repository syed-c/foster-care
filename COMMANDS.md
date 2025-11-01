# Command Reference

## 🚀 Development Setup

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
```

Visit http://localhost:3000

## 🗄️ Database Setup

### Supabase Configuration
1. Create a Supabase project
2. Run the SQL schema from `supabase-schema.sql`
3. Update environment variables with your Supabase credentials

### Environment Variables
Copy `.env.example` to `.env` and configure:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 📚 CMS Setup

### Sanity CMS
1. Install Sanity CLI:
   ```bash
   npm install -g @sanity/cli
   ```

2. Create a new Sanity project:
   ```bash
   sanity init
   ```

3. Deploy Sanity Studio:
   ```bash
   sanity deploy
   ```

4. Configure environment variables:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-api-token
   ```

## 🔧 Development Commands

### Build for Production
```bash
npm run build
# or
yarn build
```

### Start Production Server
```bash
npm run start
# or
yarn start
```

### Lint Code
```bash
npm run lint
# or
yarn lint
```

## 🧪 Testing

### Run Tests
```bash
npm run test
# or
yarn test
```

## 🌐 Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Manual Deployment
```bash
npm run build
# Then serve the .next directory
```

## 🛠️ Admin Dashboard Access

### Create Admin User
1. Register a new user through the frontend
2. Update user role in Supabase database:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
   ```

## 📈 Monitoring

### View Logs
```bash
# For Vercel deployments
vercel logs your-project-name
```

## 🔍 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env` file is in root directory
   - Restart development server

2. **Database Connection Errors**
   - Verify Supabase credentials
   - Check network connectivity

3. **CMS Content Not Showing**
   - Verify Sanity project ID and dataset
   - Check document status (must be published)

4. **Authentication Issues**
   - Verify NextAuth configuration
   - Check Google OAuth credentials

### Debug Mode
Enable debug logging by setting:
```bash
DEBUG=next-auth,sanity,*,-babel
```

## 📊 Performance Optimization

### Analyze Bundle Size
```bash
npm run build && npx next-app-analyzer
```

### Optimize Images
All images are automatically optimized through Next.js Image component.

## 🔒 Security

### Update Dependencies
```bash
npm audit fix
# or
yarn audit fix
```

### Check for Vulnerabilities
```bash
npm audit
# or
yarn audit
```

## 🔄 Updates

### Update Next.js
```bash
npm install next@latest react@latest react-dom@latest
# or
yarn add next@latest react@latest react-dom@latest
```

### Update Sanity
```bash
npm install @sanity/client@latest
# or
yarn add @sanity/client@latest
```

## 📦 Package Management

### Add New Dependency
```bash
npm install package-name
# or
yarn add package-name
```

### Remove Dependency
```bash
npm uninstall package-name
# or
yarn remove package-name
```

## 🎨 Design System

### Update Tailwind Configuration
Modify `tailwind.config.js` to adjust:
- Color palette
- Spacing
- Typography
- Breakpoints

### Custom CSS
Add custom styles in `app/globals.css`

## 🌍 Internationalization

### Add New Language
1. Create translation files in `/locales`
2. Update `middleware.js` for language detection
3. Modify components to use translation hooks

## 📱 Mobile Optimization

### Test Mobile Responsiveness
```bash
npm run dev
# Then use browser dev tools to test mobile views
```

### PWA Support
The application includes PWA support through Next.js configuration.

## 📤 Data Migration

### Export Data
```bash
# Use Supabase CLI or dashboard to export data
```

### Import Data
```bash
# Use Supabase CLI or dashboard to import data
```

## 📈 Analytics

### Google Analytics
Configure in `app/layout.js`:
```javascript
// Add Google Analytics script
```

## 💌 Email Service

### Resend Configuration
Update environment variables:
```bash
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=your-from-email
```

## 💳 Payment Processing

### Stripe Configuration
Update environment variables:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-publishable-key
STRIPE_SECRET_KEY=your-secret-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret
```

## 🗺️ Google Maps

### API Key Configuration
Update environment variable:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## 📚 Content Management

### Add New Content Type
1. Create new Sanity schema in `/sanity/schemas`
2. Update frontend components to display content
3. Add new routes if needed

## 🧑‍💼 Admin Features

### Agency Management
- Approve/reject agencies
- Feature/unfeature agencies
- View agency details

### Lead Management
- View all leads
- Mark leads as replied/closed
- Contact lead submitters

### User Management
- View all users
- Delete users (read-only)
- Monitor user activity

### CMS Management
- Edit pages
- Create new content
- Manage SEO metadata

## 📈 Performance Monitoring

### Lighthouse Testing
Run in Chrome DevTools to check:
- Performance
- Accessibility
- Best practices
- SEO

### Web Vitals
Monitor:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)