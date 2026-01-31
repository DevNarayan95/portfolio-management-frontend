/**
 * Authentication API Service (FIXED FOR YOUR BACKEND)
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

      console.log('Register Response:', response.data);

      const apiResponse = response.data;

      if (!apiResponse.success) {
        return {
          success: false,
          statusCode: apiResponse.statusCode || 400,
          message: apiResponse.message || 'Registration failed',
          timestamp: new Date().toISOString(),
        };
      }

      // Extract from response.data.data
      const authData = apiResponse.data;

      // Transform backend response to match AuthResponse structure
      const transformedData: AuthResponse = {
        user: {
          id: authData.id || '',
          email: authData.email,
          firstName: authData.firstName,
          lastName: authData.lastName,
          phone: authData.phone,
          createdAt: authData.createdAt || new Date().toISOString(),
          updatedAt: authData.updatedAt || new Date().toISOString(),
        },
        tokens: {
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
        },
      };

      console.log('Transformed Auth Data:', transformedData);

      return {
        success: true,
        statusCode: 201,
        message: 'Registration successful',
        data: transformedData,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Register Error:', error);
      return handleApiError(error);
    }
  },

  // Login user
  async login(payload: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);

      console.log('Login Response:', response.data);

      const apiResponse = response.data;

      if (!apiResponse.success) {
        return {
          success: false,
          statusCode: apiResponse.statusCode || 400,
          message: apiResponse.message || 'Login failed',
          timestamp: new Date().toISOString(),
        };
      }

      // Extract from response.data.data
      const authData = apiResponse.data;

      console.log('Auth Data:', authData);

      // Check if we have the required fields
      if (!authData.email || !authData.firstName || !authData.lastName) {
        console.error('Missing required fields in auth data:', authData);
        return {
          success: false,
          statusCode: 500,
          message: 'Invalid response from server - missing user data',
          timestamp: new Date().toISOString(),
        };
      }

      if (!authData.accessToken || !authData.refreshToken) {
        console.error('Missing tokens in auth data:', authData);
        return {
          success: false,
          statusCode: 500,
          message: 'Invalid response from server - missing tokens',
          timestamp: new Date().toISOString(),
        };
      }

      // Transform backend response to match AuthResponse structure
      const transformedData: AuthResponse = {
        user: {
          id: authData.id || '',
          email: authData.email,
          firstName: authData.firstName,
          lastName: authData.lastName,
          phone: authData.phone,
          createdAt: authData.createdAt || new Date().toISOString(),
          updatedAt: authData.updatedAt || new Date().toISOString(),
        },
        tokens: {
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
        },
      };

      console.log('Transformed Auth Data:', transformedData);

      return {
        success: true,
        statusCode: 200,
        message: 'Login successful',
        data: transformedData,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Login Error:', error);
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
      console.error('Logout Error:', error);
      return handleApiError(error);
    }
  },

  // Get current user
  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.AUTH.CURRENT_USER);

      console.log('getCurrentUser Response:', response.data);

      const apiResponse = response.data;

      if (!apiResponse.success) {
        return {
          success: false,
          statusCode: apiResponse.statusCode || 400,
          message: apiResponse.message || 'Failed to fetch user',
          timestamp: new Date().toISOString(),
        };
      }

      // Extract from response.data.data
      const userData = apiResponse.data;

      // Transform to User interface
      const transformedUser: User = {
        id: userData.id || '',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        createdAt: userData.createdAt || new Date().toISOString(),
        updatedAt: userData.updatedAt || new Date().toISOString(),
      };

      console.log('Transformed User Data:', transformedUser);

      return {
        success: true,
        statusCode: 200,
        message: 'User fetched successfully',
        data: transformedUser,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('getCurrentUser Error:', error);
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

      console.log('Refresh Token Response:', response.data);

      const apiResponse = response.data;

      if (!apiResponse.success) {
        return {
          success: false,
          statusCode: apiResponse.statusCode || 400,
          message: apiResponse.message || 'Token refresh failed',
          timestamp: new Date().toISOString(),
        };
      }

      const authData = apiResponse.data;

      // Transform backend response
      const transformedData: AuthResponse = {
        user: {
          id: authData.id || '',
          email: authData.email,
          firstName: authData.firstName,
          lastName: authData.lastName,
          phone: authData.phone,
          createdAt: authData.createdAt || new Date().toISOString(),
          updatedAt: authData.updatedAt || new Date().toISOString(),
        },
        tokens: {
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
        },
      };

      return {
        success: true,
        statusCode: 200,
        message: 'Token refreshed successfully',
        data: transformedData,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Refresh Token Error:', error);
      return handleApiError(error);
    }
  },
};
