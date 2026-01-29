// src/constants/index.ts
import { envConfig } from '../config/env.config';

/**
 * Application Constants
 * All constants are derived from environment configuration
 */

// API Configuration
export const API_CONFIG = {
  baseURL: envConfig.apiBaseUrl,
  timeout: envConfig.apiTimeout,
} as const;

// Application Info
export const APP_CONFIG = {
  name: envConfig.appName,
  version: envConfig.appVersion,
  nodeEnv: envConfig.nodeEnv,
  logLevel: envConfig.logLevel,
} as const;

// Investment Types
export const INVESTMENT_TYPES = {
  MUTUAL_FUND: 'Mutual Fund',
  STOCK: 'Stock',
  BOND: 'Bond',
  CRYPTO: 'Cryptocurrency',
} as const;

// Transaction Types
export const TRANSACTION_TYPES = {
  BUY: 'Buy',
  SELL: 'Sell',
} as const;

// UI Constants
export const UI_CONFIG = {
  currency: '₹',
  chartColors: {
    primary: '#2563eb',
    success: '#059669',
    danger: '#dc2626',
    warning: '#f59e0b',
    secondary: '#64748b',
  },
} as const;

// Storage Keys
export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'pms_auth_token',
  REFRESH_TOKEN: 'pms_refresh_token',
  USER: 'pms_user',
  THEME: 'pms_theme',
} as const;

// Pagination
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PAGE_SIZES: [10, 25, 50, 100],
} as const;

// API Routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  PORTFOLIOS: {
    LIST: '/portfolios',
    CREATE: '/portfolios',
    GET: (id: string) => `/portfolios/${id}`,
    UPDATE: (id: string) => `/portfolios/${id}`,
    DELETE: (id: string) => `/portfolios/${id}`,
  },
  INVESTMENTS: {
    LIST: (portfolioId: string) => `/portfolios/${portfolioId}/investments`,
    CREATE: (portfolioId: string) => `/portfolios/${portfolioId}/investments`,
    GET: (portfolioId: string, id: string) => `/portfolios/${portfolioId}/investments/${id}`,
    UPDATE: (portfolioId: string, id: string) => `/portfolios/${portfolioId}/investments/${id}`,
    DELETE: (portfolioId: string, id: string) => `/portfolios/${portfolioId}/investments/${id}`,
  },
  TRANSACTIONS: {
    LIST: (investmentId: string) => `/investments/${investmentId}/transactions`,
    CREATE: (investmentId: string) => `/investments/${investmentId}/transactions`,
    GET: (id: string) => `/transactions/${id}`,
    DELETE: (id: string) => `/transactions/${id}`,
  },
} as const;

// Frontend Routes
export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PORTFOLIOS: '/portfolios',
  PORTFOLIO_DETAIL: (id: string) => `/portfolios/${id}`,
  INVESTMENTS: (portfolioId: string) => `/portfolios/${portfolioId}/investments`,
  TRANSACTIONS: (portfolioId: string) => `/portfolios/${portfolioId}/transactions`,
  SETTINGS: '/settings',
  NOT_FOUND: '/not-found',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized. Please log in again.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'An error occurred on the server. Please try again later.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
  REGISTRATION_SUCCESS: 'Registration successful! Please log in.',
  PORTFOLIO_CREATED: 'Portfolio created successfully!',
  PORTFOLIO_UPDATED: 'Portfolio updated successfully!',
  PORTFOLIO_DELETED: 'Portfolio deleted successfully!',
  INVESTMENT_ADDED: 'Investment added successfully!',
  INVESTMENT_UPDATED: 'Investment updated successfully!',
  INVESTMENT_DELETED: 'Investment deleted successfully!',
  TRANSACTION_ADDED: 'Transaction added successfully!',
} as const;

export const CHART_COLORS = {
  primary: '#2563eb',
  success: '#059669',
  danger: '#dc2626',
  warning: '#f59e0b',
  secondary: '#64748b',
} as const;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
export const API_TIMEOUT = 10000; // 10 seconds
export const CURRENCY_SYMBOL = '₹';
