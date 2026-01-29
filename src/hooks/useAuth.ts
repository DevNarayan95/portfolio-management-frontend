// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useAuthStore } from '@store/authStore';

/**
 * Custom Hook for Authentication
 * Provides easy access to auth store and common auth operations
 */

export const useAuth = () => {
  const {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout,
    fetchCurrentUser,
    clearError,
    clearAuth,
  } = useAuthStore();

  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // If we have stored auth data, validate it by fetching current user
        // For now, we'll just use the stored data
        fetchCurrentUser();
      } catch {
        clearAuth();
      }
    }
  }, []);

  return {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout,
    fetchCurrentUser,
    clearError,
    clearAuth,
  };
};
