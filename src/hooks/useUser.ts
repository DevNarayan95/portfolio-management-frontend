/**
 * Custom Hook for User Profile Management
 * Handles user profile operations
 */

import { useState, useCallback } from 'react';
import { userApi } from '@api';
import { useToast } from './useToast';
import { User, UpdateProfileRequest, ChangePasswordRequest, UserStats } from '@types';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@constants';

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { success, error: showError } = useToast();

  // Get profile
  const getProfile = useCallback(async (): Promise<User | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userApi.getProfile();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message);
    } catch (err: any) {
      const errorMessage = err.message || ERROR_MESSAGES.SERVER_ERROR;
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update profile with toast
  const updateProfile = useCallback(
    async (payload: UpdateProfileRequest): Promise<User | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await userApi.updateProfile(payload);
        if (response.success && response.data) {
          success(SUCCESS_MESSAGES.PROFILE_UPDATED);
          return response.data;
        }
        throw new Error(response.message);
      } catch (err: any) {
        const errorMessage = err.message || ERROR_MESSAGES.SERVER_ERROR;
        setError(errorMessage);
        showError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [success, showError]
  );

  // Change password with toast
  const changePassword = useCallback(
    async (payload: ChangePasswordRequest): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await userApi.changePassword(payload);
        if (response.success) {
          success(SUCCESS_MESSAGES.PASSWORD_CHANGED);
          return true;
        }
        throw new Error(response.message);
      } catch (err: any) {
        const errorMessage = err.message || ERROR_MESSAGES.SERVER_ERROR;
        setError(errorMessage);
        showError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [success, showError]
  );

  // Get user stats
  const getStats = useCallback(async (): Promise<UserStats | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userApi.getStats();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message);
    } catch (err: any) {
      const errorMessage = err.message || ERROR_MESSAGES.SERVER_ERROR;
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete account with toast
  const deleteAccount = useCallback(
    async (password: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await userApi.deleteAccount(password);
        if (response.success) {
          success('Account deleted successfully');
          return true;
        }
        throw new Error(response.message);
      } catch (err: any) {
        const errorMessage = err.message || ERROR_MESSAGES.SERVER_ERROR;
        setError(errorMessage);
        showError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [success, showError]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    getProfile,
    updateProfile,
    changePassword,
    getStats,
    deleteAccount,
    clearError,
  };
};
