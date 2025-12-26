import { defineType } from 'sanity'

export default defineType({
  name: 'trustBadge',
  title: 'Trust Badge',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Badge Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Brief description of what this badge represents',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Optional link to more information',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'logo',
    },
  },
})