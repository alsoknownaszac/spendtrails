import { defineType } from 'sanity'

export default defineType({
  name: 'stats',
  title: 'Statistic',
  type: 'object',
  fields: [
    {
      name: 'value',
      title: 'Value',
      type: 'number',
      description: 'The numeric value to display',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
      description: 'Text to append after the number (e.g., "M+", "B+", "%")',
    },
    {
      name: 'prefix',
      title: 'Prefix',
      type: 'string',
      description: 'Text to prepend before the number (e.g., "$")',
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Description text below the statistic',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'animationDuration',
      title: 'Animation Duration (ms)',
      type: 'number',
      description: 'How long the counter animation should take',
      initialValue: 2000,
      validation: (Rule) => Rule.min(500).max(5000),
    },
  ],
  preview: {
    select: {
      value: 'value',
      suffix: 'suffix',
      prefix: 'prefix',
      label: 'label',
    },
    prepare({ value, suffix, prefix, label }) {
      const displayValue = `${prefix || ''}${value}${suffix || ''}`
      return {
        title: displayValue,
        subtitle: label,
      }
    },
  },
})