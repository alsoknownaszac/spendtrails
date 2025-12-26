import { defineType } from 'sanity'

export default defineType({
  name: 'featuresPage',
  title: 'Features Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Features Page',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Features that bring clarity',
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
          initialValue: 'Every feature in Spendtrails is designed with one goal: helping you understand and control your finances.',
        },
      ],
    },
    {
      name: 'mainFeatures',
      title: 'Main Features',
      type: 'array',
      of: [{ type: 'feature' }],
      description: 'Detailed features with benefits',
    },
    {
      name: 'additionalFeatures',
      title: 'Additional Features',
      type: 'array',
      of: [{ type: 'feature' }],
      description: 'Smaller feature cards',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})