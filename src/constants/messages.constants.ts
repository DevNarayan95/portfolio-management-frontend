/**
 * Message Constants (Success, Error, etc.)
 */

export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful! Welcome back.',
  LOGOUT: 'Logged out successfully.',
  REGISTER: 'Registration successful! Please log in.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  PORTFOLIO_CREATED: 'Portfolio created successfully.',
  PORTFOLIO_UPDATED: 'Portfolio updated successfully.',
  PORTFOLIO_DELETED: 'Portfolio deleted successfully.',
  INVESTMENT_CREATED: 'Investment added successfully.',
  INVESTMENT_UPDATED: 'Investment updated successfully.',
  INVESTMENT_DELETED: 'Investment deleted successfully.',
  TRANSACTION_CREATED: 'Transaction recorded successfully.',
} as const;

export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  REGISTER_FAILED: 'Registration failed. Please try again.',
  INVALID_EMAIL: 'Invalid email address.',
  WEAK_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, and number.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
  SAME_PASSWORD: 'New password must be different from current password.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'An error occurred on the server. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  REQUIRED_FIELD: 'This field is required.',
} as const;
