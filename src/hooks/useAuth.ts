/**
 * Custom Hook for Authentication (PROPERLY FIXED WITH CORRECT TIMING)
 */

import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store';
import { useToast } from './useToast';
import { LoginRequest, RegisterRequest } from '@types';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@constants';
import { ROUTES } from '@constants';

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

  // Use ref to track if we just logged in
  const loginSuccessRef = useRef(false);

  // Watch for successful login and redirect
  useEffect(() => {
    if (isAuthenticated && loginSuccessRef.current) {
      loginSuccessRef.current = false; // Reset flag
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Register action
  const register = useCallback(
    async (payload: RegisterRequest) => {
      const result = await storeRegister(payload);

      if (result) {
        success(SUCCESS_MESSAGES.REGISTER);
        navigate(ROUTES.LOGIN);
        return true;
      } else {
        const errorMessage = error || ERROR_MESSAGES.REGISTER_FAILED;
        showError(errorMessage);
        return false;
      }
    },
    [storeRegister, success, showError, navigate, error]
  );

  // Login action
  const login = useCallback(
    async (payload: LoginRequest) => {
      try {
        // CLEAR FLAG BEFORE LOGIN
        loginSuccessRef.current = false;

        const result = await storeLogin(payload);

        if (result) {
          success(SUCCESS_MESSAGES.LOGIN);
          navigate(ROUTES.DASHBOARD, { replace: true });
          return true;
        } else {
          const errorMessage = error || ERROR_MESSAGES.LOGIN_FAILED;
          showError(errorMessage);
          return false;
        }
      } catch (err) {
        showError(ERROR_MESSAGES.LOGIN_FAILED);
        return false;
      }
    },
    [storeLogin, success, showError, error, isAuthenticated]
  );

  // Logout action
  const logout = useCallback(async () => {
    loginSuccessRef.current = false;
    await storeLogout();
    success(SUCCESS_MESSAGES.LOGOUT);
    navigate(ROUTES.LOGIN, { replace: true });
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
