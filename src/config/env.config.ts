// src/config/env.config.ts
/**
 * Environment Configuration Validator
 * Ensures all required environment variables are present at runtime
 */

interface EnvironmentConfig {
  apiBaseUrl: string;
  appName: string;
  appVersion: string;
  nodeEnv: 'development' | 'staging' | 'production';
  apiTimeout: number;
  enableAnalytics: boolean;
  enableSentry: boolean;
  jwtRefreshTokenKey: string;
  jwtAccessTokenKey: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  sentryDsn?: string;
  analyticsKey?: string;
}

const requiredEnvVars = [
  'VITE_APP_NAME',
  'VITE_APP_VERSION',
  'VITE_NODE_ENV',
  'VITE_API_BASE_URL',
] as const;

/**
 * Validates that all required environment variables are present
 * @throws {Error} If any required environment variables are missing
 */
function validateEnvironment(): void {
  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    const value = import.meta.env[envVar as keyof ImportMetaEnv];
    if (!value) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    const errorMessage = [
      'Missing required environment variables:',
      ...missing.map((v) => `  • ${v}`),
      '',
      'Please check your .env file and restart the development server.',
    ].join('\n');

    throw new Error(errorMessage);
  }
}

/**
 * Gets the validated environment configuration
 * @returns {EnvironmentConfig} Validated environment configuration
 * @throws {Error} If required environment variables are missing
 */
function getEnvConfig(): EnvironmentConfig {
  validateEnvironment();

  return {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
    appName: import.meta.env.VITE_APP_NAME as string,
    appVersion: import.meta.env.VITE_APP_VERSION as string,
    nodeEnv: import.meta.env.VITE_NODE_ENV as 'development' | 'staging' | 'production',
    apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableSentry: import.meta.env.VITE_ENABLE_SENTRY === 'true',
    jwtRefreshTokenKey: import.meta.env.VITE_JWT_REFRESH_TOKEN_KEY || 'refresh_token',
    jwtAccessTokenKey: import.meta.env.VITE_JWT_ACCESS_TOKEN_KEY || 'access_token',
    logLevel: (import.meta.env.VITE_LOG_LEVEL || 'info') as 'debug' | 'info' | 'warn' | 'error',
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
    analyticsKey: import.meta.env.VITE_ANALYTICS_KEY,
  };
}

// Initialize and export the configuration
export const envConfig = getEnvConfig();

export default envConfig;
