/**
 * Portfolio Store (Zustand)
 * Global state management for portfolios
 */

import { create } from 'zustand';
import { Portfolio, Investment, DashboardSummary, Transaction } from '@types';
import { portfolioApi, investmentApi, transactionApi, dashboardApi } from '@api';
import {
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
  CreateInvestmentRequest,
  UpdateInvestmentRequest,
  CreateTransactionRequest,
  FilterTransactionRequest,
} from '@types';

interface PortfolioStore {
  // State
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null;
  investments: Investment[];
  transactions: Transaction[];
  dashboardSummary: DashboardSummary | null;
  isLoading: boolean;
  error: string | null;

  // Portfolio Actions
  fetchPortfolios: () => Promise<void>;
  fetchPortfolioById: (id: string) => Promise<void>;
  createPortfolio: (payload: CreatePortfolioRequest) => Promise<boolean>;
  updatePortfolio: (id: string, payload: UpdatePortfolioRequest) => Promise<boolean>;
  deletePortfolio: (id: string) => Promise<boolean>;

  // Investment Actions
  fetchInvestments: (portfolioId: string) => Promise<void>;
  createInvestment: (portfolioId: string, payload: CreateInvestmentRequest) => Promise<boolean>;
  updateInvestment: (
    portfolioId: string,
    investmentId: string,
    payload: UpdateInvestmentRequest
  ) => Promise<boolean>;
  deleteInvestment: (portfolioId: string, investmentId: string) => Promise<boolean>;

  // Transaction Actions
  fetchTransactions: (portfolioId: string, filters?: FilterTransactionRequest) => Promise<void>;
  createTransaction: (
    portfolioId: string,
    investmentId: string,
    payload: CreateTransactionRequest
  ) => Promise<boolean>;

  // Dashboard Actions
  fetchDashboardSummary: () => Promise<void>;

  // Utility Actions
  clearError: () => void;
  reset: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  // Initial State
  portfolios: [],
  currentPortfolio: null,
  investments: [],
  transactions: [],
  dashboardSummary: null,
  isLoading: false,
  error: null,

  // ============ PORTFOLIO ACTIONS ============

  // Fetch all portfolios
  fetchPortfolios: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await portfolioApi.getPortfolios();

      if (response.success) {
        set({ portfolios: response.data || [], isLoading: false });
      } else {
        set({ isLoading: false, error: response.message });
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Failed to fetch portfolios' });
    }
  },

  // Fetch portfolio by ID
  fetchPortfolioById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await portfolioApi.getPortfolioById(id);

      if (response.success) {
        set({ currentPortfolio: response.data || null, isLoading: false });
      } else {
        set({ isLoading: false, error: response.message });
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Failed to fetch portfolio' });
    }
  },

  // Create portfolio
  createPortfolio: async (payload: CreatePortfolioRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await portfolioApi.createPortfolio(payload);

      if (response.success && response.data) {
        const state = get();
        set({
          portfolios: [...state.portfolios, response.data],
          isLoading: false,
        });
        return true;
      } else {
        set({ isLoading: false, error: response.message });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create portfolio';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // Update portfolio
  updatePortfolio: async (id: string, payload: UpdatePortfolioRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await portfolioApi.updatePortfolio(id, payload);

      if (response.success && response.data) {
        const state = get();
        set({
          currentPortfolio: response.data,
          portfolios: state.portfolios.map((p) => (p.id === id ? (response.data as Portfolio) : p)),
          isLoading: false,
        });
        return true;
      } else {
        set({ isLoading: false, error: response.message });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update portfolio';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // Delete portfolio
  deletePortfolio: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await portfolioApi.deletePortfolio(id);

      if (response.success) {
        const state = get();
        set({
          portfolios: state.portfolios.filter((p) => p.id !== id),
          currentPortfolio: state.currentPortfolio?.id === id ? null : state.currentPortfolio,
          investments: [],
          isLoading: false,
        });
        return true;
      } else {
        set({ isLoading: false, error: response.message });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to delete portfolio';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // ============ INVESTMENT ACTIONS ============

  // Fetch investments
  fetchInvestments: async (portfolioId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await investmentApi.getInvestments(portfolioId);

      if (response.success) {
        set({ investments: response.data || [], isLoading: false });
      } else {
        set({ isLoading: false, error: response.message });
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Failed to fetch investments' });
    }
  },

  // Create investment
  createInvestment: async (portfolioId: string, payload: CreateInvestmentRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await investmentApi.createInvestment(portfolioId, payload);

      if (response.success && response.data) {
        const state = get();
        set({
          investments: [...state.investments, response.data],
          isLoading: false,
        });
        return true;
      } else {
        set({ isLoading: false, error: response.message });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create investment';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // Update investment
  updateInvestment: async (
    portfolioId: string,
    investmentId: string,
    payload: UpdateInvestmentRequest
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await investmentApi.updateInvestment(portfolioId, investmentId, payload);

      if (response.success && response.data) {
        const state = get();
        set({
          investments: state.investments.map((inv) =>
            inv.id === investmentId ? (response.data as Investment) : inv
          ),
          isLoading: false,
        });
        return true;
      } else {
        set({ isLoading: false, error: response.message });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update investment';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // Delete investment
  deleteInvestment: async (portfolioId: string, investmentId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await investmentApi.deleteInvestment(portfolioId, investmentId);

      if (response.success) {
        const state = get();
        set({
          investments: state.investments.filter((inv) => inv.id !== investmentId),
          isLoading: false,
        });
        return true;
      } else {
        set({ isLoading: false, error: response.message });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to delete investment';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // ============ TRANSACTION ACTIONS ============

  // Fetch transactions
  fetchTransactions: async (portfolioId: string, filters?: FilterTransactionRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await transactionApi.getTransactionsByPortfolio(portfolioId, filters);

      if (response.success && response.data) {
        set({ transactions: response.data.data || [], isLoading: false });
      } else {
        set({ isLoading: false, error: response.message });
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Failed to fetch transactions' });
    }
  },

  // Create transaction
  createTransaction: async (
    portfolioId: string,
    investmentId: string,
    payload: CreateTransactionRequest
  ) => {
    set({ isLoading: true, error: null });
    try {
      const response = await transactionApi.createTransaction(portfolioId, investmentId, payload);

      if (response.success && response.data) {
        const state = get();
        set({
          transactions: [...state.transactions, response.data],
          isLoading: false,
        });
        return true;
      } else {
        set({ isLoading: false, error: response.message });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create transaction';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // ============ DASHBOARD ACTIONS ============

  // Fetch dashboard summary
  fetchDashboardSummary: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await dashboardApi.getDashboardSummary();

      if (response.success) {
        set({ dashboardSummary: response.data || null, isLoading: false });
      } else {
        set({ isLoading: false, error: response.message });
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Failed to fetch dashboard' });
    }
  },

  // ============ UTILITY ACTIONS ============

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Reset store
  reset: () => {
    set({
      portfolios: [],
      currentPortfolio: null,
      investments: [],
      transactions: [],
      dashboardSummary: null,
      isLoading: false,
      error: null,
    });
  },
}));
