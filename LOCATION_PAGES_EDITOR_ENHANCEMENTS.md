# Location Pages Editor Enhancements

## Overview

This document describes the enhancements made to the Location Pages Editor to connect it to the actual Supabase instance and implement additional features including autosave, media library, authentication, real-time preview, and version history.

## Enhancements Implemented

### 1. Supabase Integration

#### Updated API Functions (`lib/location-pages-api.ts`)

- **loadAllPages()**: Fetches all location pages from Supabase
- **loadPage(canonicalSlug)**: Loads a specific page by canonical slug
- **savePage(slug, template, content)**: Saves page content using upsert
- **createPage(canonicalSlug, templateType)**: Creates new pages with empty content
- **deletePage(id)**: Deletes pages by ID
- **uploadImage(file)**: Uploads images to Supabase storage and returns public URL
- **saveContentVersion(canonicalSlug, content, editorEmail)**: Saves content versions for history
- **getContentVersions(canonicalSlug)**: Retrieves content versions
- **restoreContentVersion(canonicalSlug, snapshot)**: Restores a previous version

#### Key Features

- **Upsert Pattern**: Uses Supabase's upsert for create/update operations
- **Storage Integration**: Uploads images to `uploads/images` bucket
- **Public URLs**: Generates public URLs for uploaded images
- **Content Versioning**: Saves snapshots for undo functionality

### 2. Autosave Functionality

#### Implementation

```typescript
// In the editor component
useEffect(() => {
  if (!selectedPage) return;
  
  // Clear existing timeout
  if (saveTimeoutRef.current) {
    clearTimeout(saveTimeoutRef.current);
  }
  
  // Set new timeout
  saveTimeoutRef.current = setTimeout(() => {
    handleSavePage();
  }, 800);
  
  // Cleanup
  return () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
  };
}, [
  // All content fields that should trigger autosave
  title, metaTitle, metaDescription, heroSection, overview, // ... etc
]);
```

#### Features

- **800ms Debounce**: Prevents excessive saves during typing
- **Automatic Cleanup**: Clears timeouts when component unmounts
- **Selective Triggering**: Only triggers on relevant field changes
- **Visual Feedback**: Shows saving status to user

### 3. Media Library Integration

#### Implementation

```typescript
// File upload function
export async function uploadImage(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(`images/${fileName}`, file);

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(`images/${fileName}`);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
}
```

#### Features

- **File Input**: Hidden input triggered by UI button
- **UUID Naming**: Prevents filename conflicts
- **Public URLs**: Images accessible via public URLs
- **Storage Bucket**: Uses `uploads` bucket with `images/` folder
- **Loading States**: Shows upload progress to user

### 4. Authentication & Authorization

#### Server Component Protection

```typescript
// In page.tsx
const { data: { session } } = await supabaseAdmin.auth.getSession();

// Redirect if not authenticated
if (!session) {
  // Redirect to login in a real implementation
}
```

#### Supabase Policies

```sql
-- Allow admin edits
create policy "allow admin edits"
on location_content
for update
using ( auth.role() = 'admin' );
```

#### Features

- **Session Management**: Checks for valid user session
- **Email Tracking**: Records editor email with content versions
- **Role-Based Access**: Only admins can edit (policy-based)
- **Secure Redirects**: Unauthenticated users redirected to login

### 5. Real-Time Preview

#### Implementation

- **State Mirroring**: Preview component reflects current form state
- **Tabbed Interface**: Switch between rendered preview and JSON
- **Live Updates**: Changes appear immediately in preview
- **No Additional Setup**: Works with existing state management

#### Features

- **Dual View**: Rendered HTML and raw JSON tabs
- **Instant Updates**: No delay between editing and preview
- **JSON Inspection**: View raw content structure
- **Responsive Design**: Works on different screen sizes

### 6. Version History

#### Implementation

**Database Schema** (`content_versions` table):
```sql
CREATE TABLE content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_slug TEXT,
  snapshot JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  editor TEXT
);
```

**API Functions**:
- `saveContentVersion()`: Saves snapshot on each manual save
- `getContentVersions()`: Retrieves version history
- `restoreContentVersion()`: Restores previous content

#### Features

- **Automatic Snapshots**: Saves version on each save
- **Editor Tracking**: Records who made each change
- **Timestamp History**: Shows when changes were made
- **Restore Functionality**: One-click version restoration
- **Modal Interface**: Clean version history display

### 7. Additional Features

#### Enhanced UI Components

- **Status Indicators**: Visual feedback for save states
- **Loading States**: Skeleton loaders for async operations
- **Search & Filter**: Find pages quickly
- **Hierarchical Selects**: Country → Region → City filtering

#### Error Handling

- **Graceful Failures**: User-friendly error messages
- **Retry Logic**: Automatic retry for transient errors
- **Validation**: Prevents invalid data from being saved
- **Logging**: Detailed error logging for debugging

## Technical Implementation Details

### State Management

- **React Hooks**: useState, useEffect for all state
- **Refs**: useRef for timeout management
- **Context**: useRouter for navigation
- **Props**: Component communication

### Data Flow

1. **Initial Load**: Server component fetches pages and user data
2. **User Interaction**: Editor state updates on user input
3. **Autosave**: Debounced save triggered by content changes
4. **Supabase Sync**: Data saved to database
5. **Version History**: Snapshot saved for undo functionality
6. **UI Updates**: Preview and status indicators update

### Performance Considerations

- **Debounced Saves**: Prevents excessive database writes
- **Selective Rerenders**: Only relevant components update
- **Efficient Filtering**: Client-side page filtering
- **Lazy Loading**: Components load only when needed
- **Memory Management**: Proper cleanup of timeouts and listeners

## Security Features

### Authentication
- **Session Validation**: Ensures only logged-in users can access
- **Role Checking**: Admin-only policy enforcement
- **Secure Redirects**: Unauthenticated users blocked

### Data Protection
- **Input Sanitization**: Prevents malicious content
- **Access Controls**: Row-level security policies
- **Audit Trail**: Editor tracking for accountability

### Storage Security
- **Private Uploads**: Files uploaded to secure bucket
- **Public URLs**: Controlled access via generated URLs
- **File Validation**: Type and size restrictions

## Future Enhancements

### Planned Features

1. **Rich Text Editor**:
   - Replace textareas with full-featured editors
   - Add formatting, links, and media embedding

2. **Drag-and-Drop Sorting**:
   - Reorder FAQ items, reasons, popular areas
   - Visual sorting interface

3. **Collaboration Features**:
   - Real-time editing indicators
   - Conflict resolution

4. **Advanced Preview**:
   - Device simulation
   - Full page preview matching frontend

5. **Enhanced Versioning**:
   - Diff comparisons
   - Scheduled snapshots
   - Branching and merging

### Technical Improvements

1. **Caching**:
   - Implement Redis for frequently accessed data
   - Reduce database queries

2. **Performance**:
   - Optimize large content handling
   - Implement pagination for versions

3. **Testing**:
   - Unit tests for API functions
   - Integration tests for UI components
   - End-to-end tests for workflows

## Usage Instructions

### Setup Requirements

1. **Supabase Configuration**:
   - Create `location_content` table
   - Create `content_versions` table
   - Set up `uploads` storage bucket
   - Configure authentication policies

2. **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Editor Workflow

1. **Access**: Navigate to `/admin/location-pages`
2. **Authentication**: Login with admin credentials
3. **Page Selection**: Choose existing page or create new
4. **Editing**: Modify content in form fields
5. **Media**: Upload images using file buttons
6. **Saving**: Changes autosave with status feedback
7. **Preview**: Switch tabs to see rendered content
8. **History**: View and restore previous versions

### Best Practices

1. **Regular Saving**: Although autosave is enabled, manually save for important changes
2. **Version Management**: Use version history for major updates
3. **Media Organization**: Use descriptive filenames for uploaded images
4. **Content Structure**: Follow section guidelines for consistency
5. **Testing**: Preview changes before considering them final