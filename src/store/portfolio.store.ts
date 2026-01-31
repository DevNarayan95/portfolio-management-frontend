/**
 * Portfolio Store (Zustand)
 * Global state management for portfolios
 * Fixed version with proper error handling and type safety
 */

import { create } from 'zustand';
import { Portfolio, Investment, DashboardSummary, Transaction } from '@types';
import { portfolioApi, investmentApi, transactionApi } from '@api';
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

  /**
   * Fetch all portfolios
   */
  fetchPortfolios: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await portfolioApi.getPortfolios();

      if (response.success && response.data) {
        set({ portfolios: response.data, isLoading: false });
      } else {
        set({ isLoading: false, error: response.message || 'Failed to fetch portfolios' });
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Failed to fetch portfolios' });
    }
  },

  /**
   * Fetch portfolio by ID
   */
  fetchPortfolioById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await portfolioApi.getPortfolioById(id);

      if (response.success && response.data) {
        set({ currentPortfolio: response.data, isLoading: false });
      } else {
        set({ isLoading: false, error: response.message || 'Failed to fetch portfolio' });
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Failed to fetch portfolio' });
    }
  },

  /**
   * Create new portfolio
   */
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
        set({ isLoading: false, error: response.message || 'Failed to create portfolio' });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create portfolio';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  /**
   * Update existing portfolio
   */
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
        set({ isLoading: false, error: response.message || 'Failed to update portfolio' });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update portfolio';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  /**
   * Delete portfolio by ID
   */
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
        set({ isLoading: false, error: response.message || 'Failed to delete portfolio' });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to delete portfolio';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // ============ INVESTMENT ACTIONS ============

  /**
   * Fetch investments for a portfolio
   */
  fetchInvestments: async (portfolioId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await investmentApi.getInvestments(portfolioId);

      if (response.success && response.data) {
        const investmentsData = Array.isArray(response.data) ? response.data : [];
        set({ investments: investmentsData, isLoading: false });
      } else {
        set({ isLoading: false, error: response.message || 'Failed to fetch investments' });
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Failed to fetch investments' });
    }
  },

  /**
   * Create new investment
   */
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
        set({ isLoading: false, error: response.message || 'Failed to create investment' });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create investment';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  /**
   * Update existing investment
   */
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
        set({ isLoading: false, error: response.message || 'Failed to update investment' });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update investment';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  /**
   * Delete investment by ID
   */
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
        set({ isLoading: false, error: response.message || 'Failed to delete investment' });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to delete investment';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // ============ TRANSACTION ACTIONS ============

  /**
   * Fetch transactions for a portfolio with optional filters
   */
  fetchTransactions: async (portfolioId: string, filters?: FilterTransactionRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await transactionApi.getTransactionsByPortfolio(portfolioId, filters);

      if (response.success && response.data) {
        const transactionsData = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        set({ transactions: transactionsData, isLoading: false });
      } else {
        set({ isLoading: false, error: response.message || 'Failed to fetch transactions' });
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.message || 'Failed to fetch transactions' });
    }
  },

  /**
   * Create new transaction
   */
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
        set({ isLoading: false, error: response.message || 'Failed to create transaction' });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to create transaction';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // ============ DASHBOARD ACTIONS ============

  /**
   * Fetch dashboard summary
   * Transforms portfolio data into dashboard summary format
   */
  fetchDashboardSummary: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await portfolioApi.getPortfolios();

      if (response.success && response.data) {
        // Ensure response.data is an array
        const portfoliosData = Array.isArray(response.data) ? response.data : [];

        if (portfoliosData.length === 0) {
          set({
            dashboardSummary: {
              totalPortfolios: 0,
              totalInvestedAmount: 0,
              totalCurrentValue: 0,
              totalGainLoss: 0,
              overallGainLossPercentage: 0,
              portfolios: [],
            },
            isLoading: false,
          });
          return;
        }

        const summary: DashboardSummary = {
          totalPortfolios: portfoliosData.length,
          totalInvestedAmount: 0,
          totalCurrentValue: 0,
          totalGainLoss: 0,
          overallGainLossPercentage: 0,
          portfolios: portfoliosData.map((p: Portfolio) => ({
            portfolioId: p.id,
            portfolioName: p.name,
            totalCurrentValue: 0,
            totalInvestedAmount: 0,
            totalGainLoss: 0,
            gainLossPercentage: '0',
            numberOfInvestments: 0,
            investments: [],
          })),
        };

        set({ dashboardSummary: summary, isLoading: false });
      } else {
        set({ isLoading: false, error: response.message || 'No portfolios found' });
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to fetch dashboard';
      set({ isLoading: false, error: errorMessage });
    }
  },

  // ============ UTILITY ACTIONS ============

  /**
   * Clear error message
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Reset store to initial state
   */
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
