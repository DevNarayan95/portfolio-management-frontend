/**
 * Form Validation Utilities
 */

import { VALIDATION_RULES, ERROR_MESSAGES } from '@constants';

export const validators = {
  // Email validation
  email: (email: string): string | null => {
    if (!email) return ERROR_MESSAGES.REQUIRED_FIELD;
    if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
      return ERROR_MESSAGES.INVALID_EMAIL;
    }
    return null;
  },

  // Password validation
  password: (password: string): string | null => {
    if (!password) return ERROR_MESSAGES.REQUIRED_FIELD;
    if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
      return `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`;
    }
    if (!VALIDATION_RULES.PASSWORD_REGEX.test(password)) {
      return 'Password must contain uppercase, lowercase, number, and special character';
    }
    return null;
  },

  // Required field validation
  required: (value: string, fieldName: string): string | null => {
    if (!value || value.trim() === '') {
      return `${fieldName} is required`;
    }
    return null;
  },

  // Email or password validation
  emailOrPassword: (email: string, password: string): { [key: string]: string | null } => {
    return {
      email: validators.email(email),
      password: validators.password(password),
    };
  },

  // Profile update validation
  profileUpdate: (firstName: string, lastName: string): { [key: string]: string | null } => {
    return {
      firstName: validators.required(firstName, 'First name'),
      lastName: validators.required(lastName, 'Last name'),
    };
  },

  // Password change validation
  passwordChange: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): { [key: string]: string | null } => {
    const errors: { [key: string]: string | null } = {
      currentPassword: validators.required(currentPassword, 'Current password'),
      newPassword: validators.password(newPassword),
      confirmPassword: null,
    };

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      errors.confirmPassword = ERROR_MESSAGES.PASSWORD_MISMATCH;
    }

    if (currentPassword && newPassword && currentPassword === newPassword) {
      errors.newPassword = ERROR_MESSAGES.SAME_PASSWORD;
    }

    return errors;
  },

  // Portfolio name validation
  portfolioName: (name: string): string | null => {
    return validators.required(name, 'Portfolio name');
  },

  // Number validation
  number: (value: any, fieldName: string): string | null => {
    if (value === null || value === undefined || value === '') {
      return `${fieldName} is required`;
    }
    if (isNaN(Number(value))) {
      return `${fieldName} must be a number`;
    }
    if (Number(value) <= 0) {
      return `${fieldName} must be greater than 0`;
    }
    return null;
  },
};
