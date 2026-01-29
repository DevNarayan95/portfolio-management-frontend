// src/services/api/authApi.ts
import { User, LoginPayload, RegisterPayload, AuthTokens, ApiResponse } from '@types';
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
  try {
    const response = await axiosInstance.post('/auth/register', {
      email: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
    });

    const { accessToken, refreshToken, ...userData } = response.data;

    localStorage.setItem('auth_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    return {
      success: true,
      statusCode: 201,
      message: 'User registered successfully',
      data: {
        id: userData.userId || userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
      } as User,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Registration failed';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
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
  try {
    const response = await axiosInstance.post('/auth/login', {
      email: payload.email,
      password: payload.password,
    });

    const { accessToken, refreshToken, ...userData } = response.data;

    localStorage.setItem('auth_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    return {
      success: true,
      statusCode: 200,
      message: 'Login successful',
      data: {
        user: {
          id: userData.userId || userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
        } as User,
        tokens: {
          accessToken,
          refreshToken,
        },
      },
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Login failed';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<ApiResponse<null>> => {
  try {
    await axiosInstance.post('/auth/logout', {});

    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    return {
      success: true,
      statusCode: 200,
      message: 'Logout successful',
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    throw { success: false, statusCode: error.response?.status || 500, message: 'Logout failed' };
  }
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await axiosInstance.get('/auth/me');

    return {
      success: true,
      statusCode: 200,
      message: 'User fetched successfully',
      data: {
        id: response.data.userId || response.data.id,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone,
      } as User,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch user';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};
