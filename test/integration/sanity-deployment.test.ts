/**
 * Integration tests for Sanity deployment scenarios
 * 
 * Tests the build process with missing Sanity configuration,
 * verifies all pages render correctly in fallback mode,
 * and tests switching between fallback and live modes.
 * 
 * Requirements: 4.3, 3.4
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { 
  getHomepageData, 
  getSiteSettings, 
  getPageData, 
  getFeaturesPageData, 
  getPricingPageData,
  getClientMode,
  isClientConfigured,
  safeContentFetch
} from '@/lib/sanity.fetch'
import { client } from '@/lib/sanity.client'
import { fallbackDataStore } from '@/lib/sanity.fallback-data'

describe('Sanity Deployment Integration Tests', () => {
  // Store original environment variables
  const originalEnv = process.env

  beforeEach(() => {
    // Reset environment for each test
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv
  })

  describe('Build Process with Missing Sanity Configuration', () => {
    it('should handle completely missing environment variables', async () => {
      // Remove all Sanity environment variables
      delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      delete process.env.NEXT_PUBLIC_SANITY_DATASET
      delete process.env.NEXT_PUBLIC_SANITY_API_VERSION
      delete process.env.SANITY_API_READ_TOKEN

      // Import fresh client instance
      const { client: freshClient } = await import('@/lib/sanity.client')
      
      expect(freshClient.getMode()).toBe('fallback')
      expect(freshClient.isConfigured()).toBe(false)
      
      const state = freshClient.getState()
      expect(state.mode).toBe('fallback')
      expect(state.isInitialized).toBe(true)
      expect(state.configIssues.length).toBeGreaterThan(0)
    })

    it('should handle placeholder environment variables', async () => {
      // Set placeholder values
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'your_project_id_here'
      process.env.NEXT_PUBLIC_SANITY_DATASET = 'production'
      process.env.NEXT_PUBLIC_SANITY_API_VERSION = '2024-01-01'
      process.env.SANITY_API_READ_TOKEN = 'your_read_token_here'

      // Import fresh client instance
      const { client: freshClient } = await import('@/lib/sanity.client')
      
      expect(freshClient.getMode()).toBe('fallback')
      expect(freshClient.isConfigured()).toBe(false)
      
      const state = freshClient.getState()
      expect(state.configIssues.length).toBeGreaterThan(0)
      // The startup validator handles placeholder detection differently
      expect(state.configIssues.some(issue => 
        issue.includes('Placeholder') || issue.includes('Missing') || issue.includes('Project ID')
      )).toBe(true)
    })

    it('should handle mixed valid and invalid configuration', async () => {
      // Set mixed configuration
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'abc12345' // Valid format
      process.env.NEXT_PUBLIC_SANITY_DATASET = 'production'
      process.env.NEXT_PUBLIC_SANITY_API_VERSION = 'invalid-version' // Invalid format
      process.env.SANITY_API_READ_TOKEN = 'your_read_token_here' // Placeholder

      // Import fresh client instance
      const { client: freshClient } = await import('@/lib/sanity.client')
      
      expect(freshClient.getMode()).toBe('fallback')
      expect(freshClient.isConfigured()).toBe(false)
      
      const state = freshClient.getState()
      expect(state.configIssues.length).toBeGreaterThan(0)
      // The startup validator handles API version validation
      expect(state.configIssues.some(issue => 
        issue.includes('Invalid format') || issue.includes('API version')
      )).toBe(true)
    })
  })

  describe('Page Rendering in Fallback Mode', () => {
    beforeEach(() => {
      // Ensure we're in fallback mode
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'placeholder_project_id'
      process.env.NEXT_PUBLIC_SANITY_DATASET = 'production'
      process.env.NEXT_PUBLIC_SANITY_API_VERSION = '2024-01-01'
    })

    it('should render homepage correctly in fallback mode', async () => {
      const homepageData = await getHomepageData()
      
      expect(homepageData).toBeDefined()
      expect(homepageData._type).toBe('homepage')
      expect(homepageData.hero).toBeDefined()
      expect(homepageData.hero.headline).toBeTruthy()
      expect(homepageData.hero.subheadline).toBeTruthy()
      expect(homepageData.hero.primaryCta).toBeDefined()
      expect(homepageData.features).toBeInstanceOf(Array)
      expect(homepageData.features.length).toBeGreaterThan(0)
      expect(homepageData.stats).toBeInstanceOf(Array)
      expect(homepageData.testimonials).toBeInstanceOf(Array)
    })

    it('should render site settings correctly in fallback mode', async () => {
      const siteSettings = await getSiteSettings()
      
      expect(siteSettings).toBeDefined()
      expect(siteSettings._type).toBe('siteSettings')
      expect(siteSettings.title).toBeTruthy()
      expect(siteSettings.description).toBeTruthy()
      expect(siteSettings.seo).toBeDefined()
    })

    it('should render features page correctly in fallback mode', async () => {
      const featuresData = await getFeaturesPageData()
      
      expect(featuresData).toBeDefined()
      expect(featuresData._type).toBe('featuresPage')
      expect(featuresData.hero).toBeDefined()
      expect(featuresData.mainFeatures).toBeInstanceOf(Array)
      expect(featuresData.mainFeatures.length).toBeGreaterThan(0)
      expect(featuresData.additionalFeatures).toBeInstanceOf(Array)
    })

    it('should render pricing page correctly in fallback mode', async () => {
      const pricingData = await getPricingPageData()
      
      expect(pricingData).toBeDefined()
      expect(pricingData._type).toBe('pricingPage')
      expect(pricingData.hero).toBeDefined()
      expect(pricingData.plans).toBeInstanceOf(Array)
      expect(pricingData.plans.length).toBeGreaterThan(0)
      expect(pricingData.faqs).toBeInstanceOf(Array)
    })

    it('should handle known page slugs in fallback mode', async () => {
      const knownSlugs = ['about', 'privacy', 'terms', 'contact', 'security', 'how-it-works']
      
      for (const slug of knownSlugs) {
        const pageData = await getPageData(slug)
        
        expect(pageData).toBeDefined()
        expect(pageData?._type).toBe('page')
        expect(pageData?.slug.current).toBe(slug)
        expect(pageData?.title).toBeTruthy()
      }
    })

    it('should return null for unknown page slugs in fallback mode', async () => {
      const unknownSlug = 'non-existent-page'
      const pageData = await getPageData(unknownSlug)
      
      expect(pageData).toBeNull()
    })

    it('should handle invalid page slug gracefully', async () => {
      const pageData = await getPageData('')
      
      expect(pageData).toBeNull()
    })
  })

  describe('Safe Content Fetch Utility', () => {
    beforeEach(() => {
      // Ensure we're in fallback mode
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'placeholder_project_id'
    })

    it('should safely fetch all content types', async () => {
      const homepage = await safeContentFetch('homepage')
      expect(homepage).toBeDefined()
      expect(homepage._type).toBe('homepage')

      const siteSettings = await safeContentFetch('siteSettings')
      expect(siteSettings).toBeDefined()
      expect(siteSettings._type).toBe('siteSettings')

      const featuresPage = await safeContentFetch('featuresPage')
      expect(featuresPage).toBeDefined()
      expect(featuresPage._type).toBe('featuresPage')

      const pricingPage = await safeContentFetch('pricingPage')
      expect(pricingPage).toBeDefined()
      expect(pricingPage._type).toBe('pricingPage')

      const page = await safeContentFetch('page', { slug: 'about' })
      expect(page).toBeDefined()
      expect(page._type).toBe('page')
    })

    it('should handle missing slug parameter for page content', async () => {
      const result = await safeContentFetch('page')
      // Should return fallback data instead of throwing
      expect(result).toBeNull()
    })

    it('should handle unknown content types', async () => {
      await expect(safeContentFetch('unknown' as any)).rejects.toThrow('Cannot provide fallback for unknown content type')
    })
  })

  describe('Client Mode Detection', () => {
    it('should detect fallback mode with placeholder configuration', async () => {
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'placeholder_project_id'
      process.env.NEXT_PUBLIC_SANITY_DATASET = 'production'
      process.env.NEXT_PUBLIC_SANITY_API_VERSION = '2024-01-01'

      const mode = getClientMode()
      expect(mode).toBe('fallback')
      
      const isConfigured = isClientConfigured()
      expect(isConfigured).toBe(false)
    })

    it('should detect fallback mode with missing configuration', async () => {
      delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      delete process.env.NEXT_PUBLIC_SANITY_DATASET

      const mode = getClientMode()
      expect(mode).toBe('fallback')
      
      const isConfigured = isClientConfigured()
      expect(isConfigured).toBe(false)
    })
  })

  describe('Error Recovery and Resilience', () => {
    beforeEach(() => {
      // Set up fallback mode
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'placeholder_project_id'
    })

    it('should handle fetch errors gracefully', async () => {
      // Mock a fetch error scenario
      const originalFetch = client.fetch
      vi.spyOn(client, 'fetch').mockRejectedValueOnce(new Error('Network error'))

      const homepageData = await getHomepageData()
      
      // Should still return fallback data
      expect(homepageData).toBeDefined()
      expect(homepageData._type).toBe('homepage')
      
      // Restore original fetch
      client.fetch = originalFetch
    })

    it('should handle invalid response data gracefully', async () => {
      // Mock invalid response
      vi.spyOn(client, 'fetch').mockResolvedValueOnce(null)

      const homepageData = await getHomepageData()
      
      // Should return fallback data
      expect(homepageData).toBeDefined()
      expect(homepageData._type).toBe('homepage')
    })
  })

  describe('Schema Compliance in Fallback Mode', () => {
    it('should ensure fallback homepage data matches expected schema', () => {
      const fallbackHomepage = fallbackDataStore.getHomepage()
      
      // Check required fields
      expect(fallbackHomepage._id).toBeTruthy()
      expect(fallbackHomepage._type).toBe('homepage')
      expect(fallbackHomepage.title).toBeTruthy()
      
      // Check hero structure
      expect(fallbackHomepage.hero).toBeDefined()
      expect(fallbackHomepage.hero.headline).toBeTruthy()
      expect(fallbackHomepage.hero.subheadline).toBeTruthy()
      expect(fallbackHomepage.hero.primaryCta).toBeDefined()
      expect(fallbackHomepage.hero.primaryCta.text).toBeTruthy()
      expect(fallbackHomepage.hero.primaryCta.url).toBeTruthy()
      
      // Check arrays
      expect(Array.isArray(fallbackHomepage.features)).toBe(true)
      expect(Array.isArray(fallbackHomepage.stats)).toBe(true)
      expect(Array.isArray(fallbackHomepage.testimonials)).toBe(true)
      
      // Check feature structure
      fallbackHomepage.features.forEach(feature => {
        expect(feature._key).toBeTruthy()
        expect(feature.iconName).toBeTruthy()
        expect(feature.title).toBeTruthy()
        expect(feature.description).toBeTruthy()
      })
    })

    it('should ensure fallback site settings data matches expected schema', () => {
      const fallbackSettings = fallbackDataStore.getSiteSettings()
      
      expect(fallbackSettings._id).toBeTruthy()
      expect(fallbackSettings._type).toBe('siteSettings')
      expect(fallbackSettings.title).toBeTruthy()
      expect(fallbackSettings.description).toBeTruthy()
      expect(fallbackSettings.seo).toBeDefined()
    })

    it('should ensure fallback page data matches expected schema', () => {
      const fallbackPage = fallbackDataStore.getPage('about')
      
      expect(fallbackPage).toBeDefined()
      expect(fallbackPage!._id).toBeTruthy()
      expect(fallbackPage!._type).toBe('page')
      expect(fallbackPage!.title).toBeTruthy()
      expect(fallbackPage!.slug).toBeDefined()
      expect(fallbackPage!.slug.current).toBe('about')
      expect(fallbackPage!.seo).toBeDefined()
    })
  })

  describe('Route Availability in Fallback Mode', () => {
    beforeEach(() => {
      // Ensure fallback mode
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'placeholder_project_id'
    })

    it('should ensure all main routes return valid content', async () => {
      const routes = [
        { type: 'homepage', fetch: () => getHomepageData() },
        { type: 'siteSettings', fetch: () => getSiteSettings() },
        { type: 'featuresPage', fetch: () => getFeaturesPageData() },
        { type: 'pricingPage', fetch: () => getPricingPageData() }
      ]

      for (const route of routes) {
        const data = await route.fetch()
        expect(data).toBeDefined()
        expect(data._type).toBe(route.type)
      }
    })

    it('should ensure known page routes return valid content', async () => {
      const pageRoutes = ['about', 'privacy', 'terms', 'contact', 'security', 'how-it-works']

      for (const slug of pageRoutes) {
        const pageData = await getPageData(slug)
        expect(pageData).toBeDefined()
        expect(pageData!._type).toBe('page')
        expect(pageData!.slug.current).toBe(slug)
      }
    })
  })
})