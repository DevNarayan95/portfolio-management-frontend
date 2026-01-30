/**
 * User Profile API Service
 */

import axiosClient from './client';
import { API_ENDPOINTS } from '@constants';
import { ApiResponse, User, UpdateProfileRequest, ChangePasswordRequest, UserStats } from '@types';
import { handleApiError } from './endpoints';

export const userApi = {
  // Get user profile
  async getProfile(): Promise<ApiResponse<User>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.USERS.PROFILE);

      return {
        success: true,
        statusCode: 200,
        message: 'Profile fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update user profile
  async updateProfile(payload: UpdateProfileRequest): Promise<ApiResponse<User>> {
    try {
      const response = await axiosClient.put(API_ENDPOINTS.USERS.UPDATE_PROFILE, payload);

      return {
        success: true,
        statusCode: 200,
        message: 'Profile updated successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Change password
  async changePassword(payload: ChangePasswordRequest): Promise<ApiResponse<null>> {
    try {
      await axiosClient.post(API_ENDPOINTS.USERS.CHANGE_PASSWORD, {
        currentPassword: payload.currentPassword,
        newPassword: payload.newPassword,
      });

      return {
        success: true,
        statusCode: 200,
        message: 'Password changed successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get user statistics
  async getStats(): Promise<ApiResponse<UserStats>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.USERS.STATS);

      return {
        success: true,
        statusCode: 200,
        message: 'User statistics fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Delete account
  async deleteAccount(password: string): Promise<ApiResponse<null>> {
    try {
      await axiosClient.delete(API_ENDPOINTS.USERS.DELETE_ACCOUNT, {
        data: { password },
      });

      return {
        success: true,
        statusCode: 200,
        message: 'Account deleted successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};
