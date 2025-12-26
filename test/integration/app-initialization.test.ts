/**
 * Application Initialization Test
 * 
 * Tests that the application can initialize without errors in fallback mode
 * and that all critical components can be imported and used.
 * 
 * Requirements: 4.3, 3.4
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('Application Initialization Test', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('should initialize all Sanity components without errors in fallback mode', async () => {
    // Set placeholder configuration to ensure fallback mode
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'placeholder_project_id'
    process.env.NEXT_PUBLIC_SANITY_DATASET = 'production'
    process.env.NEXT_PUBLIC_SANITY_API_VERSION = '2024-01-01'

    // Test that all critical components can be imported and initialized
    const { client } = await import('@/lib/sanity.client')
    const { 
      getHomepageData, 
      getSiteSettings, 
      getFeaturesPageData, 
      getPricingPageData 
    } = await import('@/lib/sanity.fetch')
    const { fallbackDataStore } = await import('@/lib/sanity.fallback-data')

    // Verify client is in fallback mode
    expect(client.getMode()).toBe('fallback')
    expect(client.isConfigured()).toBe(false)

    // Verify all data fetching functions work
    const homepage = await getHomepageData()
    const siteSettings = await getSiteSettings()
    const featuresPage = await getFeaturesPageData()
    const pricingPage = await getPricingPageData()

    // Verify data structure
    expect(homepage._type).toBe('homepage')
    expect(siteSettings._type).toBe('siteSettings')
    expect(featuresPage._type).toBe('featuresPage')
    expect(pricingPage._type).toBe('pricingPage')

    // Verify fallback data store works
    const fallbackHomepage = fallbackDataStore.getHomepage()
    expect(fallbackHomepage._type).toBe('homepage')
    expect(fallbackHomepage.hero).toBeDefined()
    expect(fallbackHomepage.features.length).toBeGreaterThan(0)
  })

  it('should handle missing environment variables gracefully', async () => {
    // Remove all Sanity environment variables
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    delete process.env.NEXT_PUBLIC_SANITY_DATASET
    delete process.env.NEXT_PUBLIC_SANITY_API_VERSION
    delete process.env.SANITY_API_READ_TOKEN

    // Application should still initialize without errors
    const { client } = await import('@/lib/sanity.client')
    const { getHomepageData } = await import('@/lib/sanity.fetch')

    expect(client.getMode()).toBe('fallback')
    expect(client.isConfigured()).toBe(false)

    // Data fetching should still work
    const homepage = await getHomepageData()
    expect(homepage._type).toBe('homepage')
  })

  it('should provide consistent data across all content types', async () => {
    // Set fallback mode
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'placeholder_project_id'

    const { 
      getHomepageData, 
      getSiteSettings, 
      getFeaturesPageData, 
      getPricingPageData,
      getPageData
    } = await import('@/lib/sanity.fetch')

    // Fetch all content types
    const [homepage, siteSettings, featuresPage, pricingPage, aboutPage] = await Promise.all([
      getHomepageData(),
      getSiteSettings(),
      getFeaturesPageData(),
      getPricingPageData(),
      getPageData('about')
    ])

    // Verify all content has required fields
    expect(homepage._id).toBeTruthy()
    expect(homepage._type).toBe('homepage')
    expect(homepage.title).toBeTruthy()

    expect(siteSettings._id).toBeTruthy()
    expect(siteSettings._type).toBe('siteSettings')
    expect(siteSettings.title).toBeTruthy()

    expect(featuresPage._id).toBeTruthy()
    expect(featuresPage._type).toBe('featuresPage')
    expect(featuresPage.title).toBeTruthy()

    expect(pricingPage._id).toBeTruthy()
    expect(pricingPage._type).toBe('pricingPage')
    expect(pricingPage.title).toBeTruthy()

    expect(aboutPage).toBeDefined()
    expect(aboutPage!._id).toBeTruthy()
    expect(aboutPage!._type).toBe('page')
    expect(aboutPage!.title).toBeTruthy()
  })

  it('should handle all page routes without errors', async () => {
    // Set fallback mode
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'placeholder_project_id'

    const { getPageData } = await import('@/lib/sanity.fetch')

    // Test all known page routes
    const knownPages = ['about', 'privacy', 'terms', 'contact', 'security', 'how-it-works']

    for (const slug of knownPages) {
      const pageData = await getPageData(slug)
      expect(pageData).toBeDefined()
      expect(pageData!._type).toBe('page')
      expect(pageData!.slug.current).toBe(slug)
      expect(pageData!.title).toBeTruthy()
    }

    // Test unknown page
    const unknownPage = await getPageData('non-existent-page')
    expect(unknownPage).toBeNull()
  })
})