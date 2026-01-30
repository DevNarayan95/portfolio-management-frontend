// src/store/portfolioStore.ts
import { create } from 'zustand';
import {
  Portfolio,
  Investment,
  DashboardSummary,
  CreatePortfolioPayload,
  CreateInvestmentPayload,
  UpdateInvestmentPayload,
} from '@types';
import {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from '@services/portfolioApi';
import {
  getInvestmentsByPortfolio,
  createInvestment,
  updateInvestment,
  deleteInvestment,
} from '@services/investmentApi';
import { getDashboardSummary } from '@services/dashboardApi';

/**
 * Portfolio Store (Zustand)
 * Manages portfolio state globally
 */

export interface PortfolioStore {
  // State
  portfolios: Portfolio[];
  currentPortfolio: Portfolio | null;
  investments: Investment[];
  dashboardSummary: DashboardSummary | null;
  isLoading: boolean;
  error: string | null;

  // Portfolio Actions
  fetchPortfolios: () => Promise<void>;
  fetchPortfolioById: (id: string) => Promise<void>;
  createNewPortfolio: (payload: CreatePortfolioPayload) => Promise<void>;
  updateCurrentPortfolio: (payload: Partial<CreatePortfolioPayload>) => Promise<void>;
  deleteCurrentPortfolio: () => Promise<void>;

  // Investment Actions
  fetchInvestments: (portfolioId: string) => Promise<void>;
  addInvestment: (payload: CreateInvestmentPayload) => Promise<void>;
  updateCurrentInvestment: (
    investmentId: string,
    payload: UpdateInvestmentPayload
  ) => Promise<void>;
  removeInvestment: (investmentId: string) => Promise<void>;

  // Dashboard Actions
  fetchDashboardSummary: () => Promise<void>;

  // Utility Actions
  clearError: () => void;
  clearPortfolioData: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => {
  // Create a stable reference to actions
  const actions = {
    fetchPortfolios: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await getAllPortfolios();

        if (!response.success) {
          throw new Error(response.message);
        }

        set({
          portfolios: response.data || [],
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          isLoading: false,
          error: error.message || 'Failed to fetch portfolios',
        });
      }
    },

    fetchPortfolioById: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await getPortfolioById(id);

        if (!response.success) {
          throw new Error(response.message);
        }

        set({
          currentPortfolio: response.data || null,
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          isLoading: false,
          error: error.message || 'Failed to fetch portfolio',
        });
      }
    },

    createNewPortfolio: async (payload: CreatePortfolioPayload) => {
      set({ isLoading: true, error: null });
      try {
        const response = await createPortfolio(payload);

        if (!response.success) {
          throw new Error(response.message);
        }

        const newPortfolio = response.data!;
        const state = get();

        set({
          portfolios: [...state.portfolios, newPortfolio],
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          isLoading: false,
          error: error.message || 'Failed to create portfolio',
        });
        throw error;
      }
    },

    updateCurrentPortfolio: async (payload: Partial<CreatePortfolioPayload>) => {
      const state = get();
      if (!state.currentPortfolio) {
        set({ error: 'No portfolio selected' });
        return;
      }

      set({ isLoading: true, error: null });
      try {
        const response = await updatePortfolio(state.currentPortfolio.id, payload);

        if (!response.success) {
          throw new Error(response.message);
        }

        const updatedPortfolio = response.data!;

        set({
          currentPortfolio: updatedPortfolio,
          portfolios: state.portfolios.map((p) =>
            p.id === updatedPortfolio.id ? updatedPortfolio : p
          ),
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          isLoading: false,
          error: error.message || 'Failed to update portfolio',
        });
        throw error;
      }
    },

    deleteCurrentPortfolio: async () => {
      const state = get();
      if (!state.currentPortfolio) {
        set({ error: 'No portfolio selected' });
        return;
      }

      set({ isLoading: true, error: null });
      try {
        const response = await deletePortfolio(state.currentPortfolio.id);

        if (!response.success) {
          throw new Error(response.message);
        }

        set({
          portfolios: state.portfolios.filter((p) => p.id !== state.currentPortfolio!.id),
          currentPortfolio: null,
          investments: [],
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          isLoading: false,
          error: error.message || 'Failed to delete portfolio',
        });
        throw error;
      }
    },

    fetchInvestments: async (portfolioId: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await getInvestmentsByPortfolio(portfolioId);

        if (!response.success) {
          throw new Error(response.message);
        }

        set({
          investments: response.data || [],
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          isLoading: false,
          error: error.message || 'Failed to fetch investments',
        });
      }
    },

    addInvestment: async (payload: CreateInvestmentPayload) => {
      const state = get();
      if (!state.currentPortfolio) {
        set({ error: 'No portfolio selected' });
        return;
      }

      set({ isLoading: true, error: null });
      try {
        const response = await createInvestment(state.currentPortfolio.id, payload);

        if (!response.success) {
          throw new Error(response.message);
        }

        const newInvestment = response.data!;

        set({
          investments: [...state.investments, newInvestment],
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          isLoading: false,
          error: error.message || 'Failed to add investment',
        });
        throw error;
      }
    },

    updateCurrentInvestment: async (investmentId: string, payload: UpdateInvestmentPayload) => {
      const state = get();
      if (!state.currentPortfolio) {
        set({ error: 'No portfolio selected' });
        return;
      }

      set({ isLoading: true, error: null });
      try {
        const response = await updateInvestment(state.currentPortfolio.id, investmentId, payload);

        if (!response.success) {
          throw new Error(response.message);
        }

        const updatedInvestment = response.data!;

        set({
          investments: state.investments.map((inv) =>
            inv.id === updatedInvestment.id ? updatedInvestment : inv
          ),
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          isLoading: false,
          error: error.message || 'Failed to update investment',
        });
        throw error;
      }
    },

    removeInvestment: async (investmentId: string) => {
      const state = get();
      if (!state.currentPortfolio) {
        set({ error: 'No portfolio selected' });
        return;
      }

      set({ isLoading: true, error: null });
      try {
        const response = await deleteInvestment(state.currentPortfolio.id, investmentId);

        if (!response.success) {
          throw new Error(response.message);
        }

        set({
          investments: state.investments.filter((inv) => inv.id !== investmentId),
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          isLoading: false,
          error: error.message || 'Failed to delete investment',
        });
        throw error;
      }
    },

    fetchDashboardSummary: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await getDashboardSummary();

        if (!response.success) {
          throw new Error(response.message);
        }

        set({
          dashboardSummary: response.data || null,
          isLoading: false,
          error: null,
        });
      } catch (error: any) {
        set({
          isLoading: false,
          error: error.message || 'Failed to fetch dashboard summary',
        });
      }
    },

    clearError: () => set({ error: null }),

    clearPortfolioData: () =>
      set({
        portfolios: [],
        currentPortfolio: null,
        investments: [],
        dashboardSummary: null,
        error: null,
      }),
  };

  return {
    // Initial state
    portfolios: [],
    currentPortfolio: null,
    investments: [],
    dashboardSummary: null,
    isLoading: false,
    error: null,

    // Actions
    ...actions,
  };
});
