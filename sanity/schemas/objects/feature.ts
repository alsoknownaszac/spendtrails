import { defineType } from 'sanity'

const iconOptions = [
  { title: 'Piggy Bank', value: 'PiggyBank' },
  { title: 'Credit Card', value: 'CreditCard' },
  { title: 'Trending Up', value: 'TrendingUp' },
  { title: 'Bell', value: 'Bell' },
  { title: 'Wallet', value: 'Wallet' },
  { title: 'Bar Chart 3', value: 'BarChart3' },
  { title: 'Target', value: 'Target' },
  { title: 'Receipt', value: 'Receipt' },
  { title: 'Refresh CW', value: 'RefreshCw' },
  { title: 'Home', value: 'Home' },
  { title: 'Smartphone', value: 'Smartphone' },
  { title: 'Zap', value: 'Zap' },
  { title: 'Eye', value: 'Eye' },
  { title: 'Users', value: 'Users' },
  { title: 'Heart', value: 'Heart' },
  { title: 'Brain', value: 'Brain' },
  { title: 'Globe', value: 'Globe' },
  { title: 'Graduation Cap', value: 'GraduationCap' },
  { title: 'Shield', value: 'Shield' },
  { title: 'Lock', value: 'Lock' },
  { title: 'Server', value: 'Server' },
  { title: 'Lightbulb', value: 'Lightbulb' },
]

export default defineType({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fields: [
    {
      name: 'iconName',
      title: 'Icon',
      type: 'string',
      options: {
        list: iconOptions,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key benefits (for detailed feature pages)',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      iconName: 'iconName',
    },
    prepare({ title, subtitle, iconName }) {
      return {
        title,
        subtitle,
        media: () => `📱`, // Simple emoji as preview
      }
    },
  },
})