# Sanity CMS Setup Guide

This guide explains how to set up Sanity CMS for the Foster Care Directory UK project.

## 🚀 Initial Setup

1. **Install Sanity CLI**:
   ```bash
   npm install -g @sanity/cli
   ```

2. **Create a new Sanity project**:
   ```bash
   sanity init
   ```
   Follow the prompts to create a new project.

3. **Get your project credentials**:
   - Project ID
   - Dataset name (usually "production")
   - API token

## 🔧 Environment Variables

Add these to your `.env` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

## 📁 Sanity Schema Structure

Create these document types in your Sanity schema:

### Page Schema
```javascript
{
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'hero',
      title: 'Hero Content',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'subheading', type: 'text', title: 'Subheading' },
        { name: 'image', type: 'image', title: 'Image' }
      ]
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        { type: 'cta' }
      ]
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    }
  ]
}
```

### Location Schema
```javascript
{
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ]
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    }
  ]
}
```

### Blog Schema
```javascript
{
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Guides', value: 'guides' },
          { title: 'News', value: 'news' },
          { title: 'Stories', value: 'stories' }
        ]
      }
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ]
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }]
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    }
  ]
}
```

### Author Schema
```javascript
{
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text'
    }
  ]
}
```

### SEO Schema
```javascript
{
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    }
  ]
}
```

## 🌐 Dynamic Routes

The CMS supports these dynamic routes:

1. **Pages**: `/[slug]`
2. **Locations**: `/locations/[slug]`
3. **Blog Posts**: `/blog/[slug]`

## 🔍 SEO Implementation

Each content type includes SEO fields:
- Title
- Description
- Image

These are used to generate meta tags for each page.

## 🖼️ Image Optimization

Sanity images are optimized using:
- `@sanity/image-url` for URL generation
- Next.js Image component for rendering

## 📡 API Integration

The project uses `@sanity/client` to fetch data:

```javascript
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
```

## 🧪 Testing

1. Create sample content in Sanity Studio
2. Verify content appears on the website
3. Test SEO meta tags
4. Check image optimization
5. Validate dynamic routes

## 🚀 Deployment

1. Deploy Sanity Studio to sanity.io
2. Deploy Next.js app with environment variables
3. Configure CORS settings in Sanity for your domain

## 📝 Content Management Workflow

1. Content creators use Sanity Studio to create/edit content
2. Changes are automatically reflected on the website
3. SEO metadata is managed per-page
4. Images are automatically optimized

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: 
   - Add your domain to Sanity project CORS settings

2. **Missing Content**:
   - Check document status (must be published)
   - Verify slug matches route

3. **Image Issues**:
   - Ensure image assets are uploaded
   - Check image URL generation

### Environment Variables

Ensure all environment variables are correctly set:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`

## 📚 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Example](https://github.com/sanity-io/next.js-sanity)
- [Sanity Studio Documentation](https://www.sanity.io/docs/sanity-studio)