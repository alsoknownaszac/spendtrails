/**
 * Sanity Initialization
 * 
 * Handles early initialization of Sanity configuration validation and logging.
 * This should be imported early in the application lifecycle to ensure
 * proper startup validation and logging.
 */

import { initializeDevelopmentLogging } from './sanity.dev-status'

/**
 * Initialize Sanity configuration validation and logging
 * This function should be called once during application startup
 */
export function initializeSanity(): void {
  // The client initialization happens automatically when imported
  // This just triggers development logging
  initializeDevelopmentLogging()
}

/**
 * Auto-initialize when this module is imported
 * This ensures validation happens as early as possible
 */
if (typeof window === 'undefined') {
  // Only run on server-side to avoid duplicate logging
  initializeSanity()
}