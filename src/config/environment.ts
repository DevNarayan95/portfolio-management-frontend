/**
 * Environment Configuration
 */

interface EnvironmentConfig {
  apiBaseUrl: string;
  appName: string;
  appVersion: string;
  nodeEnv: 'development' | 'staging' | 'production';
  apiTimeout: number;
  enableAnalytics: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

const validateEnv = (): EnvironmentConfig => {
  return {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/',
    appName: import.meta.env.VITE_APP_NAME || 'Portfolio Management System',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    nodeEnv: (import.meta.env.VITE_NODE_ENV || 'development') as any,
    apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    logLevel: (import.meta.env.VITE_LOG_LEVEL || 'info') as any,
  };
};

export const ENV = validateEnv();
