import { defineType } from 'sanity'

export default defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "$4.99" or "$0"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'period',
      title: 'Billing Period',
      type: 'string',
      description: 'e.g., "per month", "forever"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cta',
      title: 'CTA Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ctaVariant',
      title: 'CTA Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'default' },
          { title: 'Secondary', value: 'outline' },
        ],
      },
      initialValue: 'default',
    },
    {
      name: 'popular',
      title: 'Popular Plan',
      type: 'boolean',
      description: 'Mark this plan as most popular',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      period: 'period',
      popular: 'popular',
    },
    prepare({ title, price, period, popular }) {
      return {
        title: `${title} - ${price}/${period}`,
        subtitle: popular ? '⭐ Popular' : '',
      }
    },
  },
})