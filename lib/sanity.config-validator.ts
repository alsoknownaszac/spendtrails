/**
 * Sanity Configuration Validation Utilities
 * 
 * Provides validation logic for Sanity CMS configuration to detect
 * missing, invalid, or placeholder values and determine the appropriate
 * operating mode (live vs fallback).
 */

export interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
  useCdn?: boolean;
  perspective?: string;
}

export interface ConfigValidationResult {
  isValid: boolean;
  mode: 'live' | 'fallback';
  issues: string[];
}

export type ConfigurationMode = 'live' | 'fallback';

export interface ClientState {
  mode: ConfigurationMode;
  isInitialized: boolean;
  lastError?: string;
  configIssues: string[];
}

/**
 * Common placeholder patterns found in environment variables
 */
const PLACEHOLDER_PATTERNS = [
  // Exact matches
  'your_project_id_here',
  'your_read_token_here',
  'your_preview_secret_here',
  'placeholder_project_id',
  'placeholder',
  'example',
  'test',
  'demo',
  
  // Pattern-based matches (will be checked with includes/startsWith)
  'your_',
  'placeholder_',
  'example_',
  'test_',
  'demo_',
  'change_me',
  'replace_me',
  'todo',
  'fixme',
  'xxx',
  'yyy',
  'zzz',
];

/**
 * Detects if a value appears to be a placeholder
 */
export function isPlaceholderValue(value: string | undefined): boolean {
  if (!value || value.trim() === '') {
    return true;
  }

  const normalizedValue = value.toLowerCase().trim();
  
  // Check exact matches
  if (PLACEHOLDER_PATTERNS.some(pattern => normalizedValue === pattern)) {
    return true;
  }
  
  // Check pattern-based matches
  const patternMatches = [
    'your_',
    'placeholder_',
    'example_',
    'test_',
    'demo_',
    'change_me',
    'replace_me',
    'todo',
    'fixme'
  ];
  
  if (patternMatches.some(pattern => normalizedValue.includes(pattern))) {
    return true;
  }
  
  // Check for common placeholder formats
  if (normalizedValue.match(/^(x{3,}|y{3,}|z{3,})$/)) {
    return true;
  }
  
  // Check for template-style placeholders
  if (normalizedValue.match(/\{\{.*\}\}/) || normalizedValue.match(/<.*>/)) {
    return true;
  }
  
  return false;
}

/**
 * Validates Sanity project ID format
 */
export function isValidProjectId(projectId: string | undefined): boolean {
  if (!projectId || isPlaceholderValue(projectId)) {
    return false;
  }
  
  // Sanity project IDs are typically 8-character alphanumeric strings
  const projectIdPattern = /^[a-z0-9]{8}$/;
  return projectIdPattern.test(projectId);
}

/**
 * Validates Sanity dataset name
 */
export function isValidDataset(dataset: string | undefined): boolean {
  if (!dataset || isPlaceholderValue(dataset)) {
    return false;
  }
  
  // Common valid dataset names
  const validDatasets = ['production', 'development', 'staging', 'test'];
  return validDatasets.includes(dataset.toLowerCase()) || 
         /^[a-z][a-z0-9_-]*$/.test(dataset);
}

/**
 * Validates API version format
 */
export function isValidApiVersion(apiVersion: string | undefined): boolean {
  if (!apiVersion) {
    return false;
  }
  
  // API version should be in YYYY-MM-DD format
  const apiVersionPattern = /^\d{4}-\d{2}-\d{2}$/;
  return apiVersionPattern.test(apiVersion);
}

/**
 * Main configuration validation function
 */
export function validateSanityConfig(config: SanityConfig): ConfigValidationResult {
  const issues: string[] = [];
  let isValid = true;
  
  // Validate project ID
  if (!config.projectId) {
    issues.push('Project ID is missing');
    isValid = false;
  } else if (isPlaceholderValue(config.projectId)) {
    issues.push(`Project ID appears to be a placeholder: "${config.projectId}"`);
    isValid = false;
  } else if (!isValidProjectId(config.projectId)) {
    issues.push(`Project ID format is invalid: "${config.projectId}". Expected 8-character alphanumeric string.`);
    isValid = false;
  }
  
  // Validate dataset
  if (!config.dataset) {
    issues.push('Dataset is missing');
    isValid = false;
  } else if (isPlaceholderValue(config.dataset)) {
    issues.push(`Dataset appears to be a placeholder: "${config.dataset}"`);
    isValid = false;
  } else if (!isValidDataset(config.dataset)) {
    issues.push(`Dataset name is invalid: "${config.dataset}"`);
    isValid = false;
  }
  
  // Validate API version
  if (!config.apiVersion) {
    issues.push('API version is missing');
    isValid = false;
  } else if (!isValidApiVersion(config.apiVersion)) {
    issues.push(`API version format is invalid: "${config.apiVersion}". Expected YYYY-MM-DD format.`);
    isValid = false;
  }
  
  // Check token if provided
  if (config.token && isPlaceholderValue(config.token)) {
    issues.push(`API token appears to be a placeholder: "${config.token}"`);
    // Token being a placeholder doesn't make the config invalid for read-only operations
  }
  
  const mode: ConfigurationMode = isValid ? 'live' : 'fallback';
  
  return {
    isValid,
    mode,
    issues
  };
}

/**
 * Creates a Sanity configuration from environment variables with safe defaults
 */
export function createConfigFromEnv(): SanityConfig {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '';
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
  const token = process.env.SANITY_API_READ_TOKEN;
  
  return {
    projectId: isPlaceholderValue(projectId) ? '' : projectId,
    dataset: isPlaceholderValue(dataset) ? 'production' : dataset,
    apiVersion: isPlaceholderValue(apiVersion) ? '2024-01-01' : apiVersion,
    token: token && !isPlaceholderValue(token) ? token : undefined,
    useCdn: process.env.NODE_ENV === 'production',
    perspective: 'published'
  };
}

/**
 * Validates the current environment configuration
 */
export function validateEnvironmentConfig(): ConfigValidationResult {
  const config = createConfigFromEnv();
  return validateSanityConfig(config);
}

/**
 * Gets safe default configuration for fallback mode
 */
export function getSafeDefaultConfig(): SanityConfig {
  return {
    projectId: 'fallback',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    perspective: 'published'
  };
}