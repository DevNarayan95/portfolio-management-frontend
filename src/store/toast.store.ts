/**
 * Toast Notification Store (Zustand)
 * Global state management for toast notifications
 */

import { create } from 'zustand';
import { Toast, ToastType } from '@types';

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number, title?: string) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (message: string, type: ToastType, duration = 5000, title?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;

    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id,
          message,
          type,
          duration,
          title,
        },
      ],
    }));

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }

    return id;
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));

/**
 * Toast helper functions for easy usage
 */
export const toast = {
  success: (message: string, duration?: number, title?: string) =>
    useToastStore.getState().addToast(message, 'success', duration, title),

  error: (message: string, duration?: number, title?: string) =>
    useToastStore.getState().addToast(message, 'error', duration, title),

  warning: (message: string, duration?: number, title?: string) =>
    useToastStore.getState().addToast(message, 'warning', duration, title),

  info: (message: string, duration?: number, title?: string) =>
    useToastStore.getState().addToast(message, 'info', duration, title),
};
