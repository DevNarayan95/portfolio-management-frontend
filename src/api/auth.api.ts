/**
 * Authentication API Service
 */

import axiosClient from './client';
import { API_ENDPOINTS } from '@constants';
import { ApiResponse, LoginRequest, RegisterRequest, AuthResponse, User } from '@types';
import { handleApiError } from './endpoints';

export const authApi = {
  // Register new user
  async register(payload: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.AUTH.REGISTER, {
        email: payload.email,
        password: payload.password,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
      });

      return {
        success: true,
        statusCode: 201,
        message: 'Registration successful',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Login user
  async login(payload: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);

      return {
        success: true,
        statusCode: 200,
        message: 'Login successful',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Logout user
  async logout(): Promise<ApiResponse<null>> {
    try {
      await axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT, {});

      return {
        success: true,
        statusCode: 200,
        message: 'Logout successful',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get current user
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.AUTH.CURRENT_USER);

      return {
        success: true,
        statusCode: 200,
        message: 'User fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Refresh token
  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await axiosClient.post(
        API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      return {
        success: true,
        statusCode: 200,
        message: 'Token refreshed successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};
