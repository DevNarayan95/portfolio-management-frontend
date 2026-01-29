/**
 * Custom Hook for Portfolio Management
 * Provides easy access to portfolio store and operations
 */

import { usePortfolioStore } from '@store/portfolioStore';
import {
  CreatePortfolioPayload,
  CreateInvestmentPayload,
  UpdateInvestmentPayload,
} from '@types/index';

export const usePortfolio = () => {
  const {
    portfolios,
    currentPortfolio,
    investments,
    dashboardSummary,
    isLoading,
    error,
    fetchPortfolios,
    fetchPortfolioById,
    createNewPortfolio,
    updateCurrentPortfolio,
    deleteCurrentPortfolio,
    fetchInvestments,
    addInvestment,
    updateCurrentInvestment,
    removeInvestment,
    fetchDashboardSummary,
    clearError,
    clearPortfolioData,
  } = usePortfolioStore();

  return {
    portfolios,
    currentPortfolio,
    investments,
    dashboardSummary,
    isLoading,
    error,
    fetchPortfolios,
    fetchPortfolioById,
    createNewPortfolio,
    updateCurrentPortfolio,
    deleteCurrentPortfolio,
    fetchInvestments,
    addInvestment,
    updateCurrentInvestment,
    removeInvestment,
    fetchDashboardSummary,
    clearError,
    clearPortfolioData,
  };
};
