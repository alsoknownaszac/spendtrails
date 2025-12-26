import { defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal title for this page',
      initialValue: 'Homepage',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'hero',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'stats',
      title: 'Statistics Section',
      type: 'array',
      of: [{ type: 'stats' }],
      description: 'Statistics to display below the hero',
      validation: (Rule) => Rule.max(4),
    },
    {
      name: 'features',
      title: 'Features Section',
      type: 'array',
      of: [{ type: 'feature' }],
      description: 'Main features to highlight',
      validation: (Rule) => Rule.max(6),
    },
    {
      name: 'featuresHeadline',
      title: 'Features Section Headline',
      type: 'string',
      initialValue: 'Everything you need for financial clarity',
    },
    {
      name: 'featuresSubheadline',
      title: 'Features Section Subheadline',
      type: 'string',
      initialValue: 'From budgeting to investments, Spendtrails brings all your finances together.',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'testimonial' }],
      description: 'Customer testimonials for the marquee section',
    },
    {
      name: 'testimonialsHeadline',
      title: 'Testimonials Section Headline',
      type: 'string',
      initialValue: 'Trusted by millions',
    },
    {
      name: 'securitySection',
      title: 'Security Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Your security is our priority',
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'string',
          initialValue: 'We use bank-level encryption and never sell your data. Your financial information stays private.',
        },
      ],
    },
    {
      name: 'finalCta',
      title: 'Final CTA Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Start your journey to financial clarity',
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'string',
          initialValue: 'Download Spendtrails free and take the first step toward understanding your spending.',
        },
      ],
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