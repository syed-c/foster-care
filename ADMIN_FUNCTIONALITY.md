# Admin Functionality Documentation

## Overview

The admin section provides comprehensive management capabilities for the Foster Care Directory UK platform. Admin users can manage agencies, users, leads, content, and blog posts through an intuitive interface.

## Access Requirements

To access the admin dashboard, a user must:
1. Have a valid account with the role set to "admin"
2. Be authenticated through the NextAuth system

## Admin Dashboard Sections

### 1. Dashboard Overview
- Displays key statistics about the platform
- Shows quick actions for common tasks
- Lists recent activity
- Shows pending agency approvals

### 2. Agency Management
- View all agencies with filtering and search capabilities
- Approve or reject pending agencies
- Feature or unfeature approved agencies
- Review agency details

### 3. Lead Management
- View all contact inquiries
- Mark leads as replied or closed
- Filter leads by status
- Contact lead submitters directly

### 4. User Management
- View all registered users
- Filter users by role
- Delete users (with confirmation)
- View user details

### 5. Content Management
- Edit pages through Sanity CMS integration
- Manage dynamic content
- Update SEO metadata

### 6. Blog Management
- Create, edit, and delete blog posts
- Manage blog categories
- Publish or unpublish posts
- Assign authors to posts

## API Endpoints

### Stats
- `GET /api/admin/stats` - Fetch dashboard statistics

### Agencies
- `GET /api/admin/agencies` - List agencies with filtering
- `GET /api/admin/agencies/[id]` - Get agency details
- `POST /api/admin/agencies/[id]/approve` - Approve an agency
- `POST /api/admin/agencies/[id]/reject` - Reject an agency
- `POST /api/admin/agencies/[id]/feature` - Toggle featured status

### Leads
- `GET /api/admin/leads` - List leads with filtering
- `POST /api/admin/leads/[id]/replied` - Mark lead as replied
- `POST /api/admin/leads/[id]/closed` - Mark lead as closed

### Users
- `GET /api/admin/users` - List users with filtering
- `DELETE /api/admin/users/[id]` - Delete a user

### Blog Posts
- `GET /api/admin/blogs` - List blog posts
- `GET /api/admin/blogs/[id]` - Get blog post details
- `POST /api/admin/blogs` - Create a new blog post
- `PUT /api/admin/blogs/[id]` - Update a blog post
- `DELETE /api/admin/blogs/[id]` - Delete a blog post

## Security

- All admin routes are protected by middleware
- Only users with the "admin" role can access admin functionality
- API endpoints validate user roles before processing requests
- Sensitive operations require confirmation dialogs

## Testing

To test admin functionality:
1. Create a user account with the "admin" role
2. Sign in to the platform
3. Navigate to `/admin` to access the dashboard
4. Use the functionality test page at `/admin/functionality-test`

## Future Enhancements

Planned improvements:
- Advanced analytics dashboard
- Reporting features
- User role management
- Content scheduling
- Multi-language support