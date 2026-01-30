/**
 * Custom Hook for Toast Notifications
 * Provides easy access to toast functionality
 */

import { useCallback } from 'react';
import { useToastStore } from '@store';

export const useToast = () => {
  const { toasts, addToast, removeToast, clearToasts } = useToastStore();

  const success = useCallback(
    (message: string, duration?: number, title?: string) => {
      return addToast(message, 'success', duration, title);
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, duration?: number, title?: string) => {
      return addToast(message, 'error', duration, title);
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, duration?: number, title?: string) => {
      return addToast(message, 'warning', duration, title);
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, duration?: number, title?: string) => {
      return addToast(message, 'info', duration, title);
    },
    [addToast]
  );

  return {
    toasts,
    success,
    error,
    warning,
    info,
    removeToast,
    clearToasts,
  };
};
