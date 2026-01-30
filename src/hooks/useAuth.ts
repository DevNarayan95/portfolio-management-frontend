/**
 * Custom Hook for Authentication
 * Provides authentication functionality with toast integration
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store';
import { useToast } from './useToast';
import { LoginRequest, RegisterRequest } from '@types';
import { SUCCESS_MESSAGES, ERROR_MESSAGES, ROUTES } from '@constants';

export const useAuth = () => {
  const navigate = useNavigate();
  const {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,
    register: storeRegister,
    login: storeLogin,
    logout: storeLogout,
    getCurrentUser,
    clearError,
  } = useAuthStore();
  const { success, error: showError } = useToast();

  // Register action with toast
  const register = useCallback(
    async (payload: RegisterRequest) => {
      const result = await storeRegister(payload);
      if (result) {
        success(SUCCESS_MESSAGES.REGISTER);
        navigate(ROUTES.LOGIN);
        return true;
      } else {
        showError(error || ERROR_MESSAGES.REGISTER_FAILED);
        return false;
      }
    },
    [storeRegister, success, showError, navigate, error]
  );

  // Login action with toast
  const login = useCallback(
    async (payload: LoginRequest) => {
      const result = await storeLogin(payload);
      if (result) {
        success(SUCCESS_MESSAGES.LOGIN);
        navigate(ROUTES.DASHBOARD);
        return true;
      } else {
        showError(error || ERROR_MESSAGES.LOGIN_FAILED);
        return false;
      }
    },
    [storeLogin, success, showError, navigate, error]
  );

  // Logout action with toast
  const logout = useCallback(async () => {
    await storeLogout();
    success(SUCCESS_MESSAGES.LOGOUT);
    navigate(ROUTES.LOGIN);
  }, [storeLogout, success, navigate]);

  // Refresh user action
  const refreshUser = useCallback(async () => {
    await getCurrentUser();
  }, [getCurrentUser]);

  return {
    user,
    tokens,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout,
    refreshUser,
    clearError,
  };
};
