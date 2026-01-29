// src/utils/validation.ts
import { FormError } from '@types';

/**
 * Validation utilities for form inputs
 */
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === '') return `${fieldName} is required`;
  return null;
};

export const validateNumber = (value: string, fieldName: string): string | null => {
  if (!value) return `${fieldName} is required`;
  if (isNaN(Number(value))) return `${fieldName} must be a number`;
  if (Number(value) <= 0) return `${fieldName} must be greater than 0`;
  return null;
};

export const validateForm = (
  values: Record<string, string | number>,
  validators: Record<string, (value: any) => string | null>
): FormError => {
  const errors: FormError = {};

  Object.keys(validators).forEach((field) => {
    const error = validators[field](values[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

export const hasFormErrors = (errors: FormError): boolean => {
  return Object.keys(errors).length > 0;
};
