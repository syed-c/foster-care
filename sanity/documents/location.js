export default {
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