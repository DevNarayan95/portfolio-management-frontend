/**
 * Application Constants
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Portfolio Management System';

export const INVESTMENT_TYPES = {
  MUTUAL_FUND: 'Mutual Fund',
  STOCK: 'Stock',
  BOND: 'Bond',
  CRYPTO: 'Cryptocurrency',
};

export const TRANSACTION_TYPES = {
  BUY: 'Buy',
  SELL: 'Sell',
};

export const CURRENCY_SYMBOL = '₹';

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
};

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
};

export const API_TIMEOUT = 10000; // 10 seconds

export const CHART_COLORS = {
  primary: '#2563eb',
  success: '#059669',
  danger: '#dc2626',
  warning: '#f59e0b',
  secondary: '#64748b',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PORTFOLIOS: '/portfolios',
  PORTFOLIO_DETAIL: '/portfolios/:id',
  INVESTMENTS: '/portfolios/:id/investments',
  TRANSACTIONS: '/portfolios/:id/transactions',
  SETTINGS: '/settings',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
