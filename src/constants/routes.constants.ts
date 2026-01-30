/**
 * Route Constants
 */

export const ROUTES = {
  // Public Routes
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',

  // Protected Routes
  DASHBOARD: '/dashboard',

  // Portfolio Routes
  PORTFOLIOS: '/portfolios',
  PORTFOLIO_DETAIL: (id: string) => `/portfolios/${id}`,

  // Profile Routes
  PROFILE: '/profile',
  PROFILE_SETTINGS: '/profile/settings',

  // Error Routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
} as const;
