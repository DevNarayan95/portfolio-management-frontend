/**
 * Axios Instance with Interceptors
 * Handles authentication, token refresh, and error handling
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { ENV } from '@config/environment';

// Create axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: ENV.apiBaseUrl,
  timeout: ENV.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Add auth token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle token refresh
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
          // No refresh token - redirect to login
          localStorage.clear();
          window.location.href = '/auth/login';
          return Promise.reject(error);
        }

        // Request new access token
        const response = await axios.post(
          `${ENV.apiBaseUrl}/auth/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Update tokens
        localStorage.setItem('auth_token', accessToken);
        if (newRefreshToken) {
          localStorage.setItem('refresh_token', newRefreshToken);
        }

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear auth and redirect to login
        localStorage.clear();
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other 401 errors
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
