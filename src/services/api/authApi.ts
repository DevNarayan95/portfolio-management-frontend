// src/services/api/authApi.ts
import { User, LoginPayload, RegisterPayload, AuthTokens, ApiResponse } from '@types';
import { mockUser, simulateApiDelay } from '@services/mockData';
import axiosInstance from '@utils/axios';

/**
 * Authentication API Service
 * This service handles all authentication-related API calls
 * Currently uses mock data, easily replaceable with real API calls
 */

/**
 * Register a new user
 */
export const registerUser = async (payload: RegisterPayload): Promise<ApiResponse<User>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.post('/auth/register', payload)
  // return response.data

  return {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: {
      ...mockUser,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
    },
    timestamp: new Date().toISOString(),
  };
};

/**
 * Login user
 */
export const loginUser = async (
  payload: LoginPayload
): Promise<
  ApiResponse<{
    user: User;
    tokens: AuthTokens;
  }>
> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.post('/auth/login', payload)
  // return response.data

  return {
    success: true,
    statusCode: 200,
    message: 'Login successful',
    data: {
      user: mockUser,
      tokens: {
        accessToken: 'mock_access_token_' + Math.random().toString(36).substr(2, 9),
        refreshToken: 'mock_refresh_token_' + Math.random().toString(36).substr(2, 9),
      },
    },
    timestamp: new Date().toISOString(),
  };
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (
  refreshToken: string
): Promise<
  ApiResponse<{
    accessToken: string;
  }>
> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.post('/auth/refresh-token', { refreshToken })
  // return response.data

  return {
    success: true,
    statusCode: 200,
    message: 'Token refreshed successfully',
    data: {
      accessToken: 'mock_access_token_' + Math.random().toString(36).substr(2, 9),
    },
    timestamp: new Date().toISOString(),
  };
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<ApiResponse<null>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.post('/auth/logout')
  // return response.data

  return {
    success: true,
    statusCode: 200,
    message: 'Logout successful',
    timestamp: new Date().toISOString(),
  };
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call when backend is ready
  // const response = await axiosInstance.get('/auth/me')
  // return response.data

  return {
    success: true,
    statusCode: 200,
    message: 'User fetched successfully',
    data: mockUser,
    timestamp: new Date().toISOString(),
  };
};
