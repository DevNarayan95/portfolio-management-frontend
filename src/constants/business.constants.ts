/**
 * Business Logic Constants
 */

export const INVESTMENT_TYPES = {
  STOCK: 'Stock',
  MUTUAL_FUND: 'Mutual Fund',
  BOND: 'Bond',
  CRYPTOCURRENCY: 'Cryptocurrency',
} as const;

export const TRANSACTION_TYPES = {
  BUY: 'Buy',
  SELL: 'Sell',
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  PAGE_SIZES: [10, 25, 50, 100],
} as const;

export const UI_CONFIG = {
  TOAST_DURATION: 5000,
  TOAST_POSITION: 'bottom-right',
  MODAL_ANIMATION_DURATION: 200,
  DEBOUNCE_DELAY: 300,
} as const;

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\d\s\-\+\(\)]+$/,
} as const;

export const CURRENCY_CONFIG = {
  SYMBOL: 'RM',
  DECIMAL_PLACES: 2,
  LOCALE: 'en-IN',
} as const;
