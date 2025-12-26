/**
 * Development Status Utilities for Sanity Configuration
 * 
 * Provides utilities for displaying configuration status in development mode
 * and helping developers understand the current Sanity setup state.
 */

import { client } from './sanity.client'
import { getConfigurationStatus, isDevelopmentMode } from './sanity.startup-validator'

/**
 * Logs detailed configuration status for development debugging
 */
export function logDevelopmentStatus(): void {
  if (!isDevelopmentMode()) {
    return
  }

  const status = getConfigurationStatus()
  const clientState = client.getState()
  const startupResult = client.getStartupValidation()

  console.group('🔧 Sanity Configuration Status (Development)')
  
  console.log(`Mode: ${status.mode}`)
  console.log(`Status: ${status.status}`)
  
  if (status.details.length > 0) {
    console.log('Details:', status.details)
  }
  
  if (startupResult.environmentIssues.length > 0) {
    console.group('Environment Issues:')
    startupResult.environmentIssues.forEach(issue => {
      console.log(`• ${issue.variable}: ${issue.issue}`)
    })
    console.groupEnd()
  }
  
  if (startupResult.recommendations.length > 0) {
    console.group('Recommendations:')
    startupResult.recommendations.forEach(rec => {
      console.log(`• ${rec}`)
    })
    console.groupEnd()
  }
  
  console.groupEnd()
}

/**
 * Gets a summary of the current configuration for display
 */
export function getConfigurationSummary(): {
  mode: 'live' | 'fallback'
  isConfigured: boolean
  issueCount: number
  recommendationCount: number
  summary: string
} {
  const status = getConfigurationStatus()
  const startupResult = client.getStartupValidation()
  
  let summary: string
  
  if (status.mode === 'live') {
    summary = '✅ Sanity is configured and working'
  } else {
    summary = `⚠️ Using fallback mode (${startupResult.environmentIssues.length} issues)`
  }
  
  return {
    mode: status.mode,
    isConfigured: status.mode === 'live',
    issueCount: startupResult.environmentIssues.length,
    recommendationCount: startupResult.recommendations.length,
    summary
  }
}

/**
 * Creates a configuration status banner for development
 */
export function createStatusBanner(): string {
  const summary = getConfigurationSummary()
  
  if (summary.mode === 'live') {
    return '🟢 Sanity: Live Mode'
  }
  
  return `🟡 Sanity: Fallback Mode (${summary.issueCount} issues)`
}

/**
 * Checks if configuration help should be shown
 */
export function shouldShowConfigurationHelp(): boolean {
  if (!isDevelopmentMode()) {
    return false
  }
  
  const summary = getConfigurationSummary()
  return !summary.isConfigured && summary.issueCount > 0
}

/**
 * Gets configuration help text for developers
 */
export function getConfigurationHelp(): string[] {
  const startupResult = client.getStartupValidation()
  
  const help = [
    '🔧 Sanity Configuration Help',
    '',
    'Your Sanity CMS is not configured. The app is running with static content.',
    ''
  ]
  
  if (startupResult.recommendations.length > 0) {
    help.push('Quick Setup:')
    startupResult.recommendations.forEach(rec => {
      help.push(`  • ${rec}`)
    })
    help.push('')
  }
  
  help.push('For detailed setup instructions, see SANITY_SETUP.md')
  
  return help
}

/**
 * Automatically logs status in development mode (call this once at startup)
 */
export function initializeDevelopmentLogging(): void {
  if (isDevelopmentMode()) {
    // Log status after a brief delay to avoid cluttering startup logs
    setTimeout(() => {
      logDevelopmentStatus()
      
      if (shouldShowConfigurationHelp()) {
        console.log('\n' + getConfigurationHelp().join('\n'))
      }
    }, 1000)
  }
}