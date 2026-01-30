// src/store/authStore.ts
import { create } from 'zustand';
import { User, AuthTokens, LoginPayload, RegisterPayload } from '@types';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '@services/authApi';

/**
 * Authentication Store (Zustand)
 * Manages authentication state globally
 */

export interface AuthStore {
  // State
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  register: (payload: RegisterPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  clearError: () => void;
  clearAuth: () => void;
  setError: (error: string) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  register: async (payload: RegisterPayload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await registerUser(payload);

      if (!response.success) {
        throw new Error(response.message);
      }

      set({
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.response?.data?.message || 'Registration failed';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  login: async (payload: LoginPayload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await loginUser(payload);

      if (!response.success) {
        throw new Error(response.message);
      }

      const { user, tokens } = response.data!;

      // Store tokens in localStorage
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
    } catch (error: any) {
      const errorMessage = error?.message || error?.response?.data?.message || 'Login failed';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await logoutUser();

      // Clear localStorage
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
    } catch (error: any) {
      // Even if logout fails, clear local state
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
    }
  },

  fetchCurrentUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getCurrentUser();

      if (!response.success) {
        throw new Error(response.message);
      }

      const user = response.data!;
      const token = localStorage.getItem('auth_token');
      const isAuthenticated = !!token;

      set({
        user,
        isAuthenticated,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage =
        error?.message || error?.response?.data?.message || 'Failed to fetch user';
      set({
        isLoading: false,
        error: errorMessage,
        isAuthenticated: false,
        user: null,
      });
      throw error;
    }
  },

  /**
   * Initialize auth on app load
   * Restores user session from stored tokens
   */
  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('auth_token');
      const refreshToken = localStorage.getItem('refresh_token');

      // If no tokens, user is not authenticated
      if (!token || !refreshToken) {
        set({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: null,
        });
        return;
      }

      // Try to fetch current user with existing token
      const response = await getCurrentUser();

      if (response.success && response.data) {
        set({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('Failed to validate session');
      }
    } catch (error: any) {
      // If fetch fails, clear auth state
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');

      set({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      });
    }
  },

  /**
   * Set error message
   */
  setError: (error: string) => set({ error }),

  /**
   * Clear error message
   */
  clearError: () => set({ error: null }),

  /**
   * Clear all auth data
   */
  clearAuth: () =>
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      error: null,
    }),
}));
