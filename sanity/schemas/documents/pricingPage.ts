import { defineType } from 'sanity'

export default defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Pricing Page',
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
          initialValue: 'Simple, transparent pricing',
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 3,
          initialValue: 'Start free and upgrade when you\'re ready. No hidden fees, no surprises—just the features you need to take control of your finances.',
        },
      ],
    },
    {
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [{ type: 'pricingPlan' }],
      validation: (Rule) => Rule.max(4),
    },
    {
      name: 'annualSavings',
      title: 'Annual Savings Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Save 20% with annual billing',
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'string',
          initialValue: 'Pay yearly and keep more money in your pocket.',
        },
      ],
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'faq' }],
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