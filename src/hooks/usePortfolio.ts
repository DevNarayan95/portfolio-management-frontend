// src/hooks/usePortfolio.ts
import { usePortfolioStore } from '@store/portfolioStore';
import { useCallback } from 'react';
import { CreatePortfolioPayload, CreateInvestmentPayload, UpdateInvestmentPayload } from '@types';

/**
 * Custom Hook for Portfolio Management
 * Provides easy access to portfolio store and operations
 */

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

  // Wrap functions with useCallback to maintain reference
  const memoizedFetchDashboard = useCallback(() => {
    return fetchDashboardSummary();
  }, []);

  const memoizedFetchPortfolios = useCallback(() => {
    return fetchPortfolios();
  }, []);

  const memoizedFetchPortfolioById = useCallback((id: string) => {
    return fetchPortfolioById(id);
  }, []);

  const memoizedFetchInvestments = useCallback((portfolioId: string) => {
    return fetchInvestments(portfolioId);
  }, []);

  return {
    portfolios,
    currentPortfolio,
    investments,
    dashboardSummary,
    isLoading,
    error,
    fetchPortfolios: memoizedFetchPortfolios,
    fetchPortfolioById: memoizedFetchPortfolioById,
    createNewPortfolio,
    updateCurrentPortfolio,
    deleteCurrentPortfolio,
    fetchInvestments: memoizedFetchInvestments,
    addInvestment,
    updateCurrentInvestment,
    removeInvestment,
    fetchDashboardSummary: memoizedFetchDashboard,
    clearError,
    clearPortfolioData,
  };
};
