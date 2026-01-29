// src/types/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_NODE_ENV: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT?: string;
  readonly VITE_ENABLE_ANALYTICS?: string;
  readonly VITE_ENABLE_SENTRY?: string;
  readonly VITE_JWT_REFRESH_TOKEN_KEY?: string;
  readonly VITE_JWT_ACCESS_TOKEN_KEY?: string;
  readonly VITE_LOG_LEVEL?: string;
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_ANALYTICS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
