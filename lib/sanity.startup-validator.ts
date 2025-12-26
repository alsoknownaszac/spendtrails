/**
 * Sanity Startup Validation
 * 
 * Handles environment variable validation and logging at application startup.
 * Provides clear feedback about configuration status and safe defaults.
 */

import { 
  validateEnvironmentConfig, 
  createConfigFromEnv, 
  isPlaceholderValue,
  type ConfigValidationResult,
  type SanityConfig 
} from './sanity.config-validator'

export interface StartupValidationResult {
  configStatus: 'valid' | 'invalid' | 'missing';
  mode: 'live' | 'fallback';
  environmentIssues: EnvironmentIssue[];
  recommendations: string[];
}

export interface EnvironmentIssue {
  variable: string;
  issue: 'missing' | 'placeholder' | 'invalid_format';
  currentValue?: string;
  expectedFormat?: string;
}

/**
 * Environment variable definitions with their validation rules
 */
const ENV_VARIABLE_DEFINITIONS = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: {
    required: true,
    description: 'Sanity project ID (8-character alphanumeric string)',
    example: 'abc12345',
    format: /^[a-z0-9]{8}$/
  },
  NEXT_PUBLIC_SANITY_DATASET: {
    required: true,
    description: 'Sanity dataset name',
    example: 'production',
    validValues: ['production', 'development', 'staging', 'test']
  },
  NEXT_PUBLIC_SANITY_API_VERSION: {
    required: false,
    description: 'Sanity API version (YYYY-MM-DD format)',
    example: '2024-01-01',
    format: /^\d{4}-\d{2}-\d{2}$/,
    defaultValue: '2024-01-01'
  },
  SANITY_API_READ_TOKEN: {
    required: false,
    description: 'Sanity API read token (for private content)',
    example: 'sk...',
    sensitive: true
  },
  SANITY_PREVIEW_SECRET: {
    required: false,
    description: 'Secret for preview mode',
    example: 'preview-secret-123',
    sensitive: true
  }
} as const;

/**
 * Validates all Sanity-related environment variables
 */
export function validateStartupEnvironment(): StartupValidationResult {
  const issues: EnvironmentIssue[] = [];
  const recommendations: string[] = [];
  
  // Check each environment variable
  Object.entries(ENV_VARIABLE_DEFINITIONS).forEach(([varName, definition]) => {
    const value = process.env[varName];
    
    if (!value || value.trim() === '') {
      if (definition.required) {
        issues.push({
          variable: varName,
          issue: 'missing',
          expectedFormat: definition.description
        });
      }
    } else if (isPlaceholderValue(value)) {
      issues.push({
        variable: varName,
        issue: 'placeholder',
        currentValue: definition.sensitive ? '[REDACTED]' : value,
        expectedFormat: definition.description
      });
    } else {
      // Validate format if specified
      if (definition.format && !definition.format.test(value)) {
        issues.push({
          variable: varName,
          issue: 'invalid_format',
          currentValue: definition.sensitive ? '[REDACTED]' : value,
          expectedFormat: definition.description
        });
      }
      
      // Validate against allowed values if specified
      if (definition.validValues && !definition.validValues.includes(value)) {
        issues.push({
          variable: varName,
          issue: 'invalid_format',
          currentValue: value,
          expectedFormat: `One of: ${definition.validValues.join(', ')}`
        });
      }
    }
  });
  
  // Generate recommendations based on issues
  if (issues.length > 0) {
    recommendations.push('Copy .env.local.example to .env.local and update the placeholder values');
    
    const hasProjectIdIssue = issues.some(issue => 
      issue.variable === 'NEXT_PUBLIC_SANITY_PROJECT_ID'
    );
    
    if (hasProjectIdIssue) {
      recommendations.push('Create a new Sanity project at https://sanity.io/manage');
      recommendations.push('Run `npm run sanity:init` to set up your Sanity project');
    }
    
    recommendations.push('See SANITY_SETUP.md for detailed configuration instructions');
  }
  
  // Determine overall status
  const requiredIssues = issues.filter(issue => 
    ENV_VARIABLE_DEFINITIONS[issue.variable as keyof typeof ENV_VARIABLE_DEFINITIONS]?.required
  );
  
  let configStatus: 'valid' | 'invalid' | 'missing';
  if (requiredIssues.length === 0 && issues.length === 0) {
    configStatus = 'valid';
  } else if (requiredIssues.some(issue => issue.issue === 'missing')) {
    configStatus = 'missing';
  } else {
    configStatus = 'invalid';
  }
  
  const mode = configStatus === 'valid' ? 'live' : 'fallback';
  
  return {
    configStatus,
    mode,
    environmentIssues: issues,
    recommendations
  };
}

/**
 * Logs startup validation results with appropriate log levels
 */
export function logStartupValidation(result: StartupValidationResult): void {
  const prefix = '[Sanity Startup]';
  
  if (result.configStatus === 'valid') {
    console.info(`${prefix} ✅ Sanity configuration is valid - running in live mode`);
    return;
  }
  
  // Log configuration issues
  console.warn(`${prefix} ⚠️  Sanity configuration issues detected - running in fallback mode`);
  
  if (result.environmentIssues.length > 0) {
    console.warn(`${prefix} Environment variable issues:`);
    
    result.environmentIssues.forEach(issue => {
      const issueType = {
        missing: 'Missing',
        placeholder: 'Placeholder value',
        invalid_format: 'Invalid format'
      }[issue.issue];
      
      let message = `  • ${issue.variable}: ${issueType}`;
      
      if (issue.currentValue) {
        message += ` (current: "${issue.currentValue}")`;
      }
      
      if (issue.expectedFormat) {
        message += ` - Expected: ${issue.expectedFormat}`;
      }
      
      console.warn(`${prefix} ${message}`);
    });
  }
  
  // Log recommendations
  if (result.recommendations.length > 0) {
    console.info(`${prefix} 💡 Recommendations:`);
    result.recommendations.forEach(recommendation => {
      console.info(`${prefix}   • ${recommendation}`);
    });
  }
  
  // Log fallback mode explanation
  console.info(`${prefix} 📄 Serving static content while Sanity is not configured`);
  console.info(`${prefix} 🔧 The application will work normally with fallback data`);
}

/**
 * Performs complete startup validation and logging
 */
export function performStartupValidation(): StartupValidationResult {
  const result = validateStartupEnvironment();
  logStartupValidation(result);
  return result;
}

/**
 * Gets safe environment variable values with defaults
 */
export function getSafeEnvironmentConfig(): SanityConfig {
  const config = createConfigFromEnv();
  
  // Apply safe defaults for missing or invalid values
  return {
    projectId: config.projectId || 'fallback-project',
    dataset: config.dataset || 'production',
    apiVersion: config.apiVersion || '2024-01-01',
    token: config.token && !isPlaceholderValue(config.token) ? config.token : undefined,
    useCdn: config.useCdn ?? false,
    perspective: config.perspective || 'published'
  };
}

/**
 * Checks if the application is running in development mode
 */
export function isDevelopmentMode(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Checks if the application is building (during build time)
 */
export function isBuildTime(): boolean {
  return process.env.NODE_ENV === 'production' && !process.env.VERCEL;
}

/**
 * Gets configuration status for display in development tools
 */
export function getConfigurationStatus(): {
  mode: 'live' | 'fallback';
  status: string;
  details: string[];
} {
  const result = validateStartupEnvironment();
  
  const statusMessages = {
    valid: 'Sanity is properly configured and connected',
    invalid: 'Sanity configuration has issues',
    missing: 'Sanity configuration is missing'
  };
  
  const details: string[] = [];
  
  if (result.environmentIssues.length > 0) {
    details.push(`${result.environmentIssues.length} environment variable issue(s)`);
  }
  
  if (result.recommendations.length > 0) {
    details.push('Configuration recommendations available');
  }
  
  return {
    mode: result.mode,
    status: statusMessages[result.configStatus],
    details
  };
}