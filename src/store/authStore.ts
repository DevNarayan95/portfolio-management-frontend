/**
 * Authentication Store (Zustand)
 * Manages authentication state globally
 */

import { create } from 'zustand';
import { User, AuthTokens } from '@types/index';
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  LoginPayload,
  RegisterPayload,
} from '@services/api/authApi';

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
  clearError: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
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
      set({
        isLoading: false,
        error: error.message || 'Registration failed',
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
      set({
        isLoading: false,
        error: error.message || 'Login failed',
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
      set({
        isLoading: false,
        error: error.message || 'Logout failed',
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

      // Check if token exists
      const token = localStorage.getItem('auth_token');
      const isAuthenticated = !!token;

      set({
        user,
        isAuthenticated,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Failed to fetch user',
        isAuthenticated: false,
        user: null,
      });
    }
  },

  clearError: () => set({ error: null }),

  clearAuth: () =>
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
      error: null,
    }),
}));
