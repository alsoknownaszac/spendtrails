import { createClient, type SanityClient, type ClientPerspective } from 'next-sanity'
import { 
  validateEnvironmentConfig, 
  createConfigFromEnv, 
  getSafeDefaultConfig,
  type ConfigurationMode,
  type ClientState,
  type ConfigValidationResult 
} from './sanity.config-validator'
import { fallbackDataStore, type FallbackDataStore } from './sanity.fallback-data'
import { 
  performStartupValidation, 
  getSafeEnvironmentConfig,
  type StartupValidationResult 
} from './sanity.startup-validator'

/**
 * Interface for the enhanced Sanity client that supports both live and fallback modes
 */
export interface SanityClientInterface {
  fetch<T>(query: string, params?: any): Promise<T>
  getMode(): ConfigurationMode
  isConfigured(): boolean
  getState(): ClientState
}

/**
 * Enhanced Sanity client that gracefully handles missing or invalid configuration
 * by automatically switching between live CMS mode and static fallback mode
 */
class EnhancedSanityClient implements SanityClientInterface {
  private mode: ConfigurationMode
  private liveClient?: SanityClient
  private previewLiveClient?: SanityClient
  private fallbackData: FallbackDataStore
  private state: ClientState
  private validationResult: ConfigValidationResult
  private startupResult: StartupValidationResult

  constructor() {
    this.fallbackData = fallbackDataStore
    
    // Perform comprehensive startup validation
    this.startupResult = performStartupValidation()
    this.validationResult = validateEnvironmentConfig()
    this.mode = this.startupResult.mode
    
    this.state = {
      mode: this.mode,
      isInitialized: false,
      configIssues: this.validationResult.issues
    }

    this.initializeClient()
  }

  private initializeClient(): void {
    try {
      if (this.mode === 'live') {
        this.initializeLiveClient()
      } else {
        this.initializeFallbackMode()
      }
      
      this.state.isInitialized = true
      this.logInitializationStatus()
    } catch (error) {
      this.handleInitializationError(error)
    }
  }

  private initializeLiveClient(): void {
    const config = getSafeEnvironmentConfig()
    
    this.liveClient = createClient({
      projectId: config.projectId,
      dataset: config.dataset,
      apiVersion: config.apiVersion,
      useCdn: config.useCdn || false,
      perspective: (config.perspective as ClientPerspective) || 'published',
    })

    // Create preview client if token is available
    if (config.token) {
      this.previewLiveClient = createClient({
        projectId: config.projectId,
        dataset: config.dataset,
        apiVersion: config.apiVersion,
        useCdn: false,
        perspective: 'previewDrafts',
        token: config.token,
      })
    }
  }

  private initializeFallbackMode(): void {
    // Startup validation already logged the issues and recommendations
    // Just log a brief confirmation that we're in fallback mode
    console.info('[Sanity Client] Initialized in fallback mode - serving static content')
  }

  private handleInitializationError(error: unknown): void {
    const errorMessage = error instanceof Error ? error.message : 'Unknown initialization error'
    
    console.error('[Sanity Client] Initialization failed, falling back to static mode:', errorMessage)
    
    // Force fallback mode on initialization error
    this.mode = 'fallback'
    this.state.mode = 'fallback'
    this.state.lastError = errorMessage
    this.state.configIssues.push(`Initialization error: ${errorMessage}`)
    this.state.isInitialized = true
  }

  private logInitializationStatus(): void {
    if (this.mode === 'live') {
      console.info('[Sanity Client] Successfully initialized in live mode')
    }
    // Fallback mode logging is handled by startup validator
  }

  /**
   * Fetch data from Sanity or fallback store based on current mode
   */
  async fetch<T>(query: string, params?: any): Promise<T> {
    if (this.mode === 'live' && this.liveClient) {
      return this.fetchFromLive<T>(query, params)
    } else {
      return this.fetchFromFallback<T>(query, params)
    }
  }

  private async fetchFromLive<T>(query: string, params?: any): Promise<T> {
    try {
      if (!this.liveClient) {
        throw new Error('Live client not initialized')
      }

      const result = await this.liveClient.fetch<T>(query, params)
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown fetch error'
      
      console.warn(`[Sanity Client] Live fetch failed, falling back to static content: ${errorMessage}`)
      
      // Update state to track the error but don't switch mode permanently
      this.state.lastError = errorMessage
      
      // Return fallback data for this request
      return this.fetchFromFallback<T>(query, params)
    }
  }

  private async fetchFromFallback<T>(query: string, params?: any): Promise<T> {
    try {
      // Parse the query to determine what type of content is being requested
      const contentType = this.parseQueryContentType(query)
      
      let fallbackContent: any
      
      switch (contentType) {
        case 'homepage':
          fallbackContent = this.fallbackData.getHomepage()
          break
        case 'siteSettings':
          fallbackContent = this.fallbackData.getSiteSettings()
          break
        case 'featuresPage':
          fallbackContent = this.fallbackData.getFeaturesPage()
          break
        case 'pricingPage':
          fallbackContent = this.fallbackData.getPricingPage()
          break
        case 'page':
          // Extract slug from params or query
          const slug = params?.slug || this.extractSlugFromQuery(query)
          fallbackContent = this.fallbackData.getPage(slug)
          break
        default:
          // Return empty array for unknown queries to prevent errors
          fallbackContent = []
      }

      return fallbackContent as T
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown fallback error'
      
      console.error(`[Sanity Client] Fallback fetch failed: ${errorMessage}`)
      
      this.state.lastError = errorMessage
      
      // Return safe default to prevent application crashes
      return this.getSafeDefault<T>()
    }
  }

  private parseQueryContentType(query: string): string {
    // Simple query parsing to determine content type
    // This is a basic implementation that can be enhanced based on actual query patterns
    
    if (query.includes('_type == "homepage"') || query.includes('homepage')) {
      return 'homepage'
    }
    
    if (query.includes('_type == "siteSettings"') || query.includes('siteSettings')) {
      return 'siteSettings'
    }
    
    if (query.includes('_type == "featuresPage"') || query.includes('featuresPage')) {
      return 'featuresPage'
    }
    
    if (query.includes('_type == "pricingPage"') || query.includes('pricingPage')) {
      return 'pricingPage'
    }
    
    if (query.includes('_type == "page"') || query.includes('slug.current')) {
      return 'page'
    }
    
    return 'unknown'
  }

  private extractSlugFromQuery(query: string): string {
    // Extract slug from query patterns like: slug.current == $slug
    const slugMatch = query.match(/slug\.current\s*==\s*['"$]([^'"]+)['"]?/)
    return slugMatch ? slugMatch[1].replace('$', '') : ''
  }

  private getSafeDefault<T>(): T {
    // Return safe defaults based on common return types
    // This prevents the application from crashing when fallback also fails
    return null as T
  }

  /**
   * Get the current operating mode
   */
  getMode(): ConfigurationMode {
    return this.mode
  }

  /**
   * Check if Sanity is properly configured
   */
  isConfigured(): boolean {
    return this.mode === 'live' && this.validationResult.isValid
  }

  /**
   * Get the current client state
   */
  getState(): ClientState {
    return { ...this.state }
  }

  /**
   * Get the startup validation result
   */
  getStartupValidation(): StartupValidationResult {
    return this.startupResult
  }

  /**
   * Get live client for preview mode (if available)
   */
  getPreviewClient(): SanityClient | undefined {
    return this.previewLiveClient
  }

  /**
   * Get the underlying live client for compatibility with external libraries
   * Returns a safe default client in fallback mode to prevent errors
   */
  getLiveClient(): SanityClient {
    if (this.liveClient) {
      return this.liveClient
    }
    
    // Return a safe default client for compatibility
    const safeConfig = getSafeDefaultConfig()
    return createClient({
      projectId: safeConfig.projectId,
      dataset: safeConfig.dataset,
      apiVersion: safeConfig.apiVersion,
      useCdn: false,
      perspective: 'published',
    })
  }
}

// Create singleton instance
const enhancedClient = new EnhancedSanityClient()

// Export the enhanced client instance
export const client = enhancedClient

// Legacy exports for backward compatibility
export const previewClient = enhancedClient.getPreviewClient()

export function getClient(preview?: boolean): SanityClientInterface | SanityClient | undefined {
  if (preview && enhancedClient.getPreviewClient()) {
    return enhancedClient.getPreviewClient()
  }
  return enhancedClient
}

// Export types for external use
export type { ConfigurationMode, ClientState }