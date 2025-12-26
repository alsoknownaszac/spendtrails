import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { getSafeEnvironmentConfig } from '../lib/sanity.startup-validator'

// Get safe configuration that handles missing/placeholder values
const config = getSafeEnvironmentConfig()

export default defineConfig({
  name: 'spendtrails-studio',
  title: 'Spendtrails CMS',
  
  projectId: config.projectId,
  dataset: config.dataset,
  
  basePath: '/studio',
  
  plugins: [
    structureTool(),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  document: {
    // Remove 'Settings' from new document options, since there should only be one
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'siteSettings')
      }
      return prev
    },
  },
})