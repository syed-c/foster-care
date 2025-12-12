# CMS User Guide

This guide explains how to use the Content Management System (CMS) for the foster care website.

## Overview

The CMS allows you to manage all content on the website through a user-friendly interface at `/admin/cms`. You can create, edit, and delete pages, sections, and individual text elements.

## Accessing the CMS

Navigate to `/admin/cms` in your browser to access the CMS administration panel.

## Managing Pages

### Creating a New Page

1. Go to the Pages tab
2. Click "Create Page"
3. Fill in the page details:
   - **Page Name**: Display name for the page
   - **Page Slug**: URL-friendly identifier (e.g., "home", "about-us")
   - **Page Type**: General or Location
   - **Description**: Brief description of the page content
4. Click "Create Page"

### Editing a Page

1. Click on any page card in the Pages tab
2. This will take you to the Sections management view for that page

### Deleting a Page

1. Click on any page card in the Pages tab
2. Click the trash icon on the page card
3. Confirm deletion when prompted

## Managing Sections

Sections organize content within a page. Each page can have multiple sections.

### Creating a New Section

1. Navigate to a page's Sections view
2. Click "Add Section"
3. The new section will appear in the list

### Editing a Section

1. Click on any section card in the Sections view
2. This will take you to the Text Elements management view for that section

### Deleting a Section

1. Click on any section card in the Sections view
2. Click the trash icon on the section card
3. Confirm deletion when prompted

## Managing Text Elements (Fields)

Text elements are individual pieces of content within a section, such as headings, paragraphs, or button text.

### Editing a Text Element

1. Navigate to a section's Text Elements view
2. Find the field you want to edit
3. Modify the content in the input field
4. Click the save icon or click outside the field to save automatically

### Supported Field Types

- **String**: Single line of text (headings, labels, button text)
- **Text**: Multi-line text (paragraphs, descriptions)

## Content Structure

### Pages

Pages represent top-level content areas like:
- Home page
- About page
- Location pages (e.g., England regions)

### Sections

Sections organize content within pages. Common section types include:
- Hero sections (main banner with call-to-action)
- About sections (descriptive content)
- Benefits/Support sections (feature lists)
- Popular Cities/Counties sections (geographic information)
- Allowances sections (financial/support information)
- FAQ sections (frequently asked questions)
- Trust Bar sections (regulatory information)
- Final CTA sections (closing call-to-action)

### Fields

Fields are individual text elements within sections:
- Headings
- Subheadings
- Paragraph text
- Button labels
- Link URLs

## How Content Appears on Live Pages

1. When a user visits a page, the system first checks the CMS for content
2. If content is found in the CMS, it's displayed
3. If no CMS content is found, the system falls back to the legacy `location_content` table
4. Changes made in the CMS are immediately visible on live pages

## Best Practices

### Content Organization

1. Use descriptive names for pages, sections, and fields
2. Maintain consistent naming conventions
3. Organize sections in a logical order using the sort order feature

### Content Editing

1. Always proofread content before saving
2. Use appropriate field types (string vs text)
3. Keep content concise and user-focused
4. Test links to ensure they work correctly

### Content Updates

1. Make small, incremental changes rather than large updates
2. Review content on live pages after making changes
3. Use the refresh button to reload content if needed

## Troubleshooting

### Content Not Updating

1. Refresh the page to ensure you're seeing the latest content
2. Check that you've saved your changes
3. Clear your browser cache if needed
4. Verify the content appears correctly in the CMS

### Missing Sections or Fields

1. Ensure you're viewing the correct page
2. Check that sections and fields were properly created
3. Contact a developer if content is missing from the database

### Performance Issues

1. The CMS loads all content at once, which may be slow for large sites
2. Use the refresh button to reload content if the interface becomes unresponsive
3. Close and reopen the CMS if performance issues persist

## Technical Details

### Database Structure

The CMS uses three main tables:
- `cms_pages`: Stores page information
- `cms_page_sections`: Stores sections within pages
- `cms_section_fields`: Stores individual text elements within sections

### API Endpoints

The CMS provides RESTful API endpoints for all operations:
- Pages: `/api/cms/pages`
- Sections: `/api/cms/sections`
- Fields: `/api/cms/fields`

### Content Fallback

If CMS content is unavailable, the system automatically falls back to the legacy `location_content` table, ensuring no content is lost during the transition.

## Getting Help

For technical issues or questions about using the CMS, contact your website administrator or development team.