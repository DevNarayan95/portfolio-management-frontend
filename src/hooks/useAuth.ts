// src/hooks/useAuth.ts
import { useCallback } from 'react';
import { useAuthStore } from '@store/authStore';
import { LoginPayload, RegisterPayload } from '@types';

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
    register: authRegister,
    login: authLogin,
    logout: authLogout,
    fetchCurrentUser,
    clearError,
    clearAuth,
    setError,
  } = useAuthStore();

  /**
   * Handle login with error handling
   */
  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        clearError();
        await authLogin(payload);
        return { success: true };
      } catch (error: any) {
        const errorMessage = error?.message || 'Login failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [authLogin, clearError, setError]
  );

  /**
   * Handle registration with error handling
   */
  const register = useCallback(
    async (payload: RegisterPayload) => {
      try {
        clearError();
        await authRegister(payload);
        return { success: true };
      } catch (error: any) {
        const errorMessage = error?.message || 'Registration failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [authRegister, clearError, setError]
  );

  /**
   * Handle logout
   */
  const logout = useCallback(async () => {
    try {
      clearError();
      await authLogout();
      return { success: true };
    } catch (error: any) {
      console.error('Logout error:', error);
      // Still clear auth even if logout fails
      return { success: true };
    }
  }, [authLogout, clearError]);

  /**
   * Refresh user profile
   */
  const refreshUser = useCallback(async () => {
    try {
      clearError();
      await fetchCurrentUser();
      return { success: true };
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to refresh user';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [fetchCurrentUser, clearError, setError]);

  return {
    // State
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,

    // Methods
    login,
    register,
    logout,
    refreshUser,
    fetchCurrentUser,
    clearError,
    clearAuth,
  };
};
