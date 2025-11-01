export default {
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