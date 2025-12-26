import { defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main headline text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'highlightText',
      title: 'Highlight Text',
      type: 'string',
      description: 'Text to highlight with gradient (optional)',
    },
    {
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
      description: 'Supporting text below the headline',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'cta',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'cta',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Optional background image for the hero section',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
    },
  },
})