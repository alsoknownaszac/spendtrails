import { client, type ConfigurationMode } from './sanity.client'
import { 
  homepageQuery, 
  siteSettingsQuery, 
  pageQuery, 
  featuresPageQuery, 
  pricingPageQuery 
} from './sanity.queries'
import { 
  fallbackHomepageData,
  fallbackDataStore,
  type FallbackHomepageData,
  type FallbackSiteSettingsData,
  type FallbackPageData,
  type FallbackFeaturesPageData,
  type FallbackPricingPageData
} from './sanity.fallback-data'

/**
 * Enhanced fetch utilities with error recovery and fallback logic
 * 
 * These functions provide robust data fetching that gracefully handles:
 * - Missing Sanity configuration
 * - Network failures
 * - Invalid queries
 * - Schema mismatches
 * 
 * All functions automatically fall back to static content when needed.
 */

/**
 * Fetch homepage data with error recovery
 * Requirements: 3.4, 4.2
 */
export async function getHomepageData(): Promise<FallbackHomepageData> {
  try {
    const result = await client.fetch<FallbackHomepageData>(homepageQuery)
    
    // Validate that we got valid data
    if (!result || typeof result !== 'object') {
      console.warn('[Sanity Fetch] Invalid homepage data received, using fallback')
      return fallbackDataStore.getHomepage()
    }
    
    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.warn(`[Sanity Fetch] Homepage fetch failed: ${errorMessage}, using fallback`)
    
    // Always return fallback data to ensure the application continues working
    return fallbackDataStore.getHomepage()
  }
}

/**
 * Fetch site settings with error recovery
 * Requirements: 3.4, 4.2
 */
export async function getSiteSettings(): Promise<FallbackSiteSettingsData> {
  try {
    const result = await client.fetch<FallbackSiteSettingsData>(siteSettingsQuery)
    
    // Validate that we got valid data
    if (!result || typeof result !== 'object') {
      console.warn('[Sanity Fetch] Invalid site settings data received, using fallback')
      return fallbackDataStore.getSiteSettings()
    }
    
    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.warn(`[Sanity Fetch] Site settings fetch failed: ${errorMessage}, using fallback`)
    
    // Always return fallback data to ensure the application continues working
    return fallbackDataStore.getSiteSettings()
  }
}

/**
 * Fetch page data by slug with error recovery
 * Requirements: 3.4, 4.2
 */
export async function getPageData(slug: string): Promise<FallbackPageData | null> {
  try {
    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
      console.warn('[Sanity Fetch] Invalid slug provided, using fallback')
      return fallbackDataStore.getPage(slug || '')
    }
    
    const result = await client.fetch<FallbackPageData | null>(pageQuery, { slug })
    
    // If no result from live query, try fallback
    if (!result) {
      const fallbackResult = fallbackDataStore.getPage(slug)
      if (fallbackResult) {
        console.info(`[Sanity Fetch] No live data for page "${slug}", using fallback`)
      }
      return fallbackResult
    }
    
    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.warn(`[Sanity Fetch] Page fetch failed for "${slug}": ${errorMessage}, using fallback`)
    
    // Try to return fallback data for the requested page
    return fallbackDataStore.getPage(slug)
  }
}

/**
 * Fetch features page data with error recovery
 * Requirements: 3.4, 4.2
 */
export async function getFeaturesPageData(): Promise<FallbackFeaturesPageData> {
  try {
    const result = await client.fetch<FallbackFeaturesPageData>(featuresPageQuery)
    
    // Validate that we got valid data
    if (!result || typeof result !== 'object') {
      console.warn('[Sanity Fetch] Invalid features page data received, using fallback')
      return fallbackDataStore.getFeaturesPage()
    }
    
    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.warn(`[Sanity Fetch] Features page fetch failed: ${errorMessage}, using fallback`)
    
    // Always return fallback data to ensure the application continues working
    return fallbackDataStore.getFeaturesPage()
  }
}

/**
 * Fetch pricing page data with error recovery
 * Requirements: 3.4, 4.2
 */
export async function getPricingPageData(): Promise<FallbackPricingPageData> {
  try {
    const result = await client.fetch<FallbackPricingPageData>(pricingPageQuery)
    
    // Validate that we got valid data
    if (!result || typeof result !== 'object') {
      console.warn('[Sanity Fetch] Invalid pricing page data received, using fallback')
      return fallbackDataStore.getPricingPage()
    }
    
    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.warn(`[Sanity Fetch] Pricing page fetch failed: ${errorMessage}, using fallback`)
    
    // Always return fallback data to ensure the application continues working
    return fallbackDataStore.getPricingPage()
  }
}

/**
 * Generic fetch function with error recovery for custom queries
 * Requirements: 3.4, 4.2
 */
export async function fetchWithFallback<T>(
  query: string, 
  params?: any, 
  fallbackValue?: T
): Promise<T | null> {
  try {
    const result = await client.fetch<T>(query, params)
    
    // Return result if valid, otherwise use fallback
    if (result !== undefined && result !== null) {
      return result
    }
    
    if (fallbackValue !== undefined) {
      console.info('[Sanity Fetch] No data returned, using provided fallback')
      return fallbackValue
    }
    
    return null
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.warn(`[Sanity Fetch] Custom query failed: ${errorMessage}`)
    
    // Return fallback value if provided, otherwise null
    return fallbackValue !== undefined ? fallbackValue : null
  }
}

/**
 * Get the current client mode for debugging and monitoring
 * Requirements: 4.2
 */
export function getClientMode(): ConfigurationMode {
  return client.getMode()
}

/**
 * Check if Sanity is properly configured
 * Requirements: 4.2
 */
export function isClientConfigured(): boolean {
  return client.isConfigured()
}

/**
 * Get client state for debugging and monitoring
 * Requirements: 4.2
 */
export function getClientState() {
  return client.getState()
}

/**
 * Utility function to safely fetch any content type with automatic fallback
 * This ensures all routes continue to work in both live and fallback modes
 * Requirements: 3.4
 */
export async function safeContentFetch<T>(
  contentType: 'homepage' | 'siteSettings' | 'featuresPage' | 'pricingPage' | 'page',
  params?: { slug?: string }
): Promise<T> {
  try {
    switch (contentType) {
      case 'homepage':
        return await getHomepageData() as T
      case 'siteSettings':
        return await getSiteSettings() as T
      case 'featuresPage':
        return await getFeaturesPageData() as T
      case 'pricingPage':
        return await getPricingPageData() as T
      case 'page':
        if (!params?.slug) {
          throw new Error('Slug parameter required for page content')
        }
        const pageData = await getPageData(params.slug)
        return pageData as T
      default:
        throw new Error(`Unknown content type: ${contentType}`)
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(`[Sanity Fetch] Safe content fetch failed for ${contentType}: ${errorMessage}`)
    
    // Return appropriate fallback based on content type
    switch (contentType) {
      case 'homepage':
        return fallbackDataStore.getHomepage() as T
      case 'siteSettings':
        return fallbackDataStore.getSiteSettings() as T
      case 'featuresPage':
        return fallbackDataStore.getFeaturesPage() as T
      case 'pricingPage':
        return fallbackDataStore.getPricingPage() as T
      case 'page':
        return fallbackDataStore.getPage(params?.slug || '') as T
      default:
        throw new Error(`Cannot provide fallback for unknown content type: ${contentType}`)
    }
  }
}

// Export fallback data for backward compatibility
export { fallbackHomepageData, fallbackDataStore }