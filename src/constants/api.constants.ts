/**
 * API Endpoint Constants
 */

export const API_ENDPOINTS = {
  // Auth Endpoints
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    CURRENT_USER: '/auth/me',
  },

  // Portfolio Endpoints
  PORTFOLIOS: {
    LIST: '/portfolios',
    CREATE: '/portfolios',
    GET_BY_ID: (id: string) => `/portfolios/${id}`,
    UPDATE: (id: string) => `/portfolios/${id}`,
    DELETE: (id: string) => `/portfolios/${id}`,
    STATS: (id: string) => `/portfolios/${id}/stats`,
  },

  // Investment Endpoints
  INVESTMENTS: {
    LIST: (portfolioId: string) => `/portfolios/${portfolioId}/investments`,
    CREATE: (portfolioId: string) => `/portfolios/${portfolioId}/investments`,
    GET_BY_ID: (portfolioId: string, id: string) => `/portfolios/${portfolioId}/investments/${id}`,
    UPDATE: (portfolioId: string, id: string) => `/portfolios/${portfolioId}/investments/${id}`,
    DELETE: (portfolioId: string, id: string) => `/portfolios/${portfolioId}/investments/${id}`,
    PERFORMANCE: (portfolioId: string, id: string) =>
      `/portfolios/${portfolioId}/investments/${id}/performance`,
  },

  // Transaction Endpoints
  TRANSACTIONS: {
    CREATE: (portfolioId: string, investmentId: string) =>
      `/portfolios/${portfolioId}/investments/${investmentId}/transactions`,
    LIST_BY_PORTFOLIO: (portfolioId: string) => `/portfolios/${portfolioId}/transactions`,
    LIST_BY_INVESTMENT: (portfolioId: string, investmentId: string) =>
      `/portfolios/${portfolioId}/investments/${investmentId}/transactions`,
    GET_BY_ID: (portfolioId: string, id: string) => `/portfolios/${portfolioId}/transactions/${id}`,
    ANALYTICS: (portfolioId: string) => `/portfolios/${portfolioId}/transactions/analytics`,
  },

  // Dashboard Endpoints
  DASHBOARD: {
    SUMMARY: '/dashboard/summary',
    PORTFOLIO_SUMMARY: (portfolioId: string) => `/dashboard/portfolio/${portfolioId}/summary`,
    PERFORMANCE: (portfolioId: string) => `/dashboard/portfolio/${portfolioId}/performance`,
    ALLOCATION: (portfolioId: string) => `/dashboard/portfolio/${portfolioId}/allocation`,
    TOP_PERFORMERS: (portfolioId: string) => `/dashboard/portfolio/${portfolioId}/top-performers`,
    BOTTOM_PERFORMERS: (portfolioId: string) =>
      `/dashboard/portfolio/${portfolioId}/bottom-performers`,
  },

  // User Endpoints (IMPORTANT: Note the /users/ plural form)
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    DELETE_ACCOUNT: '/users/account',
    STATS: '/users/stats',
  },
} as const;
