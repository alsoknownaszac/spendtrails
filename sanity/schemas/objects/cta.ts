import { defineType } from 'sanity'

export default defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
      description: 'Internal link (e.g., /pricing) or external URL',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'variant',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'default' },
          { title: 'Secondary', value: 'outline' },
          { title: 'Ghost', value: 'ghost' },
          { title: 'Link', value: 'link' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'size',
      title: 'Button Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'default' },
          { title: 'Large', value: 'lg' },
        ],
      },
      initialValue: 'default',
    },
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'url',
    },
  },
})