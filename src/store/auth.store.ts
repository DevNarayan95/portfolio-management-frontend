/**
 * Authentication Store (Zustand)
 * Global state management for authentication
 */

import { create } from 'zustand';
import { User, AuthTokens } from '@types';
import { authApi } from '@api';
import { LoginRequest, RegisterRequest } from '@types';

interface AuthStore {
  // State
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  register: (payload: RegisterRequest) => Promise<boolean>;
  login: (payload: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial State
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Register Action
  register: async (payload: RegisterRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.register(payload);

      if (!response.success) {
        set({ isLoading: false, error: response.message });
        return false;
      }

      // Save tokens
      const { user, tokens } = response.data!;
      localStorage.setItem('auth_token', tokens.accessToken);
      localStorage.setItem('refresh_token', tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      set({ isLoading: false });
      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // Login Action
  login: async (payload: LoginRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(payload);

      if (!response.success) {
        set({ isLoading: false, error: response.message });
        return false;
      }

      // Save tokens and user
      const { user, tokens } = response.data!;
      localStorage.setItem('auth_token', tokens.accessToken);
      localStorage.setItem('refresh_token', tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      set({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // Logout Action
  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();

      // Clear storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');

      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      // Clear storage anyway
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');

      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  // Initialize Auth Action
  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('auth_token');
      const refreshToken = localStorage.getItem('refresh_token');
      localStorage.getItem('user');

      // If no tokens, not authenticated
      if (!token || !refreshToken) {
        set({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
        return;
      }

      // Try to get current user
      const response = await authApi.getCurrentUser();

      if (response.success && response.data) {
        set({
          user: response.data,
          tokens: { accessToken: token, refreshToken },
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // Clear invalid tokens
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');

        set({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
      }
    } catch (error) {
      // Clear tokens on error
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');

      set({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    }
  },

  // Get Current User Action
  getCurrentUser: async () => {
    set({ isLoading: true });
    try {
      const response = await authApi.getCurrentUser();

      if (response.success && response.data) {
        set({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },

  // Clear Error Action
  clearError: () => {
    set({ error: null });
  },
}));
