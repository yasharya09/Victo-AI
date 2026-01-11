/**
 * Environment configuration with type safety and validation
 */

interface EnvironmentConfig {
  // API Configuration
  api: {
    baseUrl: string;
    timeout: number;
  };
  
  // Authentication
  auth: {
    tokenKey: string;
    refreshTokenKey: string;
    tokenExpiryKey: string;
  };
  
  // Application
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
    debug: boolean;
  };
  
  // External Services
  services: {
    analytics?: string;
    monitoring?: string;
    sentry?: string;
  };
}

/**
 * Get environment variable with fallback
 */
function getEnvVar(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

/**
 * Get boolean environment variable
 */
function getBoolEnvVar(key: string, fallback: boolean): boolean {
  const value = process.env[key];
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
}

/**
 * Environment configuration
 */
export const env: EnvironmentConfig = {
  api: {
    baseUrl: getEnvVar('NEXT_PUBLIC_API_BASE_URL', 'http://127.0.0.1:8000/api/v1/'),
    timeout: parseInt(getEnvVar('NEXT_PUBLIC_API_TIMEOUT', '10000')),
  },
  
  auth: {
    tokenKey: 'access_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiryKey: 'token_expiry',
  },
  
  app: {
    name: 'VICTO AI',
    version: '1.0.0',
    environment: (getEnvVar('NODE_ENV', 'development') as EnvironmentConfig['app']['environment']) || 'development',
    debug: getBoolEnvVar('NEXT_PUBLIC_DEBUG', false),
  },
  
  services: {
    analytics: getEnvVar('NEXT_PUBLIC_ANALYTICS_ID', ''),
    monitoring: getEnvVar('NEXT_PUBLIC_MONITORING_URL', ''),
    sentry: getEnvVar('NEXT_PUBLIC_SENTRY_DSN', ''),
  },
};

/**
 * Check if running in development mode
 */
export const isDevelopment = env.app.environment === 'development';

/**
 * Check if running in production mode
 */
export const isProduction = env.app.environment === 'production';

/**
 * Check if running in staging mode
 */
export const isStaging = env.app.environment === 'staging';

/**
 * Validate required environment variables
 */
export function validateEnvironment(): void {
  const requiredVars = [
    'NEXT_PUBLIC_API_BASE_URL',
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

/**
 * Get API endpoint URL
 */
export function getApiUrl(endpoint: string): string {
  return `${env.api.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}
