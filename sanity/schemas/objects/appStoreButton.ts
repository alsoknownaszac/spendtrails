import { defineType } from 'sanity'

export default defineType({
  name: 'appStoreButton',
  title: 'App Store Button',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'App Store (iOS)', value: 'ios' },
          { title: 'Google Play (Android)', value: 'android' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Store URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'customImage',
      title: 'Custom Button Image',
      type: 'image',
      description: 'Optional custom button image (will use default platform buttons if not provided)',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
    },
    prepare({ platform, url }) {
      const platformName = platform === 'ios' ? 'App Store' : 'Google Play'
      return {
        title: platformName,
        subtitle: url,
      }
    },
  },
})