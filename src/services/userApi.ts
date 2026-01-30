// src/services/api/userApi.ts
import { UpdateProfilePayload, ChangePasswordPayload, ApiResponse, User } from '@types';
import axiosInstance from '@utils/axios';

/**
 * User API Service
 * This service handles all user-related API calls
 */

/**
 * Get user profile
 */
export const getUserProfile = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await axiosInstance.get('/user/profile');

    return {
      success: true,
      statusCode: 200,
      message: 'User profile fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to fetch user profile';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  payload: UpdateProfilePayload
): Promise<ApiResponse<User>> => {
  try {
    const response = await axiosInstance.put('/user/profile', payload);

    return {
      success: true,
      statusCode: 200,
      message: 'User profile updated successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to update user profile';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Change user password
 */
export const changeUserPassword = async (
  payload: ChangePasswordPayload
): Promise<ApiResponse<null>> => {
  try {
    await axiosInstance.post('/user/change-password', payload);

    return {
      success: true,
      statusCode: 200,
      message: 'Password changed successfully',
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to change password';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Delete user account
 */
export const deleteUserAccount = async (password: string): Promise<ApiResponse<null>> => {
  try {
    await axiosInstance.delete('/user/account', { data: { password } });

    return {
      success: true,
      statusCode: 200,
      message: 'Account deleted successfully',
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to delete user account';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get user stats
 */
export const getUserStats = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await axiosInstance.get('/user/stats');

    return {
      success: true,
      statusCode: 200,
      message: 'User statistics fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to fetch user statistics';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};
