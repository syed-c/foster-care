# Location Page CMS Editor - Admin Guide

## Accessing the Editor

Navigate to `/admin/locations-editor` in your browser to access the location page CMS editor.

## Getting Started

1. **Select Page Type**: Choose whether you're editing a Country, Region, or City page
2. **Choose Location**: Select the appropriate country, region, and/or city
3. **Configure SEO**: Fill in the page title, meta title, and meta description
4. **Edit Content Sections**: Expand each section to edit its content
5. **Save Your Work**: Use the Save buttons to persist your changes

## Page Configuration

### Page Type Selector
- **Country**: Top-level pages (e.g., England, Scotland)
- **Region**: Second-level pages (e.g., Greater London, West Midlands)
- **City**: Third-level pages (e.g., London, Manchester)

### Location Selectors
Based on your page type, you'll see different location selectors:
- **Country pages**: Only country selector
- **Region pages**: Country and region selectors
- **City pages**: Country, region, and city selectors

### Canonical Slug
This read-only field shows the URL path for your page. It's automatically generated based on your selections.

## Content Sections

The editor shows different sections based on your page type:

### Country Pages
1. Hero Section
2. Overview Content
3. Foster System Info
4. Reasons to Foster
5. Featured Popular Areas
6. Regions Grid
7. FAQs
8. Regulatory & Trust Bar
9. Final CTA Section

### Region Pages
1. Hero Section
2. About Fostering in Region
3. Benefits & Support
4. Popular Cities in Region
5. Allowances & Support info
6. Testimonials
7. Region FAQs
8. Trust Bar
9. Final CTA

### City Pages
1. Hero Section
2. City Overview Content
3. Types of Fostering
4. Top Agencies
5. Reasons to Foster in City
6. Allowances & support in city
7. Local Support Resources
8. FAQ Section
9. Regulation / Trust Bar
10. Final CTA

## Editing Content

### Text Fields
Most content is entered through simple text fields or textareas. Some fields have character counters to help you meet content goals.

### Repeatable Items
Many sections have repeatable items (like FAQ questions or featured areas). Use the "Add Item" button to create new entries and the trash can icon to remove existing ones.

### Rich Text Content
Some fields support longer formatted text. These areas show a character counter to help you write appropriately sized content.

## Saving Your Work

### Manual Save
Click the "Save Page" button at the top of the editor to save all your changes.

### Section Save
Each section has its own "Save Section" button for granular control.

### Auto-save
The editor will automatically save changes when you navigate away from a field.

## Previewing Changes

### Preview Button
Click the "Preview" button at the top to open your page in a new tab.

### Live Preview Panel
The right-hand panel shows a live preview of your page. Changes are reflected in real-time.

## Completeness Indicators

Each section shows a status indicator:
- **Green Checkmark**: Section is complete
- **Yellow Exclamation**: Section needs attention

The sidebar also shows overall page completeness statistics.

## Best Practices

1. **Start with SEO**: Always fill in the title and meta fields first
2. **Work Section by Section**: Complete one section before moving to the next
3. **Use the Preview**: Regularly check how your content looks
4. **Save Frequently**: Don't lose your work with regular saves
5. **Check Completeness**: Aim for green checkmarks on all sections

## Troubleshooting

### Page Not Loading
- Check that all required location fields are filled
- Verify your canonical slug is correct
- Ensure you have network connectivity to Supabase

### Save Errors
- Check browser console for error messages
- Verify all required fields are filled
- Ensure you have proper permissions

### Preview Issues
- Try refreshing the preview page
- Check that the page exists in the database
- Verify the canonical slug is correct

## Need Help?

Contact the development team for:
- Access permission issues
- Persistent error messages
- Feature requests
- Training on advanced features