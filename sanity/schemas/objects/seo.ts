import { defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines and social sharing (50-60 characters)',
      validation: (Rule) => Rule.max(60).warning('Keep titles under 60 characters for better SEO'),
    },
    {
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines and social sharing (150-160 characters)',
      validation: (Rule) => Rule.max(160).warning('Keep descriptions under 160 characters for better SEO'),
    },
    {
      name: 'image',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for SEO (optional)',
      options: {
        layout: 'tags',
      },
    },
  ],
})