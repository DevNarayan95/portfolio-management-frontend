/**
 * Custom Hook for Portfolio Management
 * Provides portfolio operations with toast integration
 */

import { useCallback } from 'react';
import { usePortfolioStore } from '@store';
import { useToast } from './useToast';
import {
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
  CreateInvestmentRequest,
  UpdateInvestmentRequest,
  CreateTransactionRequest,
  FilterTransactionRequest,
} from '@types';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@constants';

export const usePortfolio = () => {
  const {
    portfolios,
    currentPortfolio,
    investments,
    transactions,
    dashboardSummary,
    isLoading,
    error,
    fetchPortfolios,
    fetchPortfolioById,
    createPortfolio: storeCreatePortfolio,
    updatePortfolio: storeUpdatePortfolio,
    deletePortfolio: storeDeletePortfolio,
    fetchInvestments,
    createInvestment: storeCreateInvestment,
    updateInvestment: storeUpdateInvestment,
    deleteInvestment: storeDeleteInvestment,
    fetchTransactions,
    createTransaction: storeCreateTransaction,
    fetchDashboardSummary,
    clearError,
  } = usePortfolioStore();

  const { success, error: showError } = useToast();

  // Create portfolio with toast
  const createPortfolio = useCallback(
    async (payload: CreatePortfolioRequest) => {
      const result = await storeCreatePortfolio(payload);
      if (result) {
        success(SUCCESS_MESSAGES.PORTFOLIO_CREATED);
        return true;
      } else {
        showError(error || ERROR_MESSAGES.SERVER_ERROR);
        return false;
      }
    },
    [storeCreatePortfolio, success, showError, error]
  );

  // Update portfolio with toast
  const updatePortfolio = useCallback(
    async (id: string, payload: UpdatePortfolioRequest) => {
      const result = await storeUpdatePortfolio(id, payload);
      if (result) {
        success(SUCCESS_MESSAGES.PORTFOLIO_UPDATED);
        return true;
      } else {
        showError(error || ERROR_MESSAGES.SERVER_ERROR);
        return false;
      }
    },
    [storeUpdatePortfolio, success, showError, error]
  );

  // Delete portfolio with toast
  const deletePortfolio = useCallback(
    async (id: string) => {
      const result = await storeDeletePortfolio(id);
      if (result) {
        success(SUCCESS_MESSAGES.PORTFOLIO_DELETED);
        return true;
      } else {
        showError(error || ERROR_MESSAGES.SERVER_ERROR);
        return false;
      }
    },
    [storeDeletePortfolio, success, showError, error]
  );

  // Create investment with toast
  const createInvestment = useCallback(
    async (portfolioId: string, payload: CreateInvestmentRequest) => {
      const result = await storeCreateInvestment(portfolioId, payload);
      if (result) {
        success(SUCCESS_MESSAGES.INVESTMENT_CREATED);
        return true;
      } else {
        showError(error || ERROR_MESSAGES.SERVER_ERROR);
        return false;
      }
    },
    [storeCreateInvestment, success, showError, error]
  );

  // Update investment with toast
  const updateInvestment = useCallback(
    async (portfolioId: string, investmentId: string, payload: UpdateInvestmentRequest) => {
      const result = await storeUpdateInvestment(portfolioId, investmentId, payload);
      if (result) {
        success(SUCCESS_MESSAGES.INVESTMENT_UPDATED);
        return true;
      } else {
        showError(error || ERROR_MESSAGES.SERVER_ERROR);
        return false;
      }
    },
    [storeUpdateInvestment, success, showError, error]
  );

  // Delete investment with toast
  const deleteInvestment = useCallback(
    async (portfolioId: string, investmentId: string) => {
      const result = await storeDeleteInvestment(portfolioId, investmentId);
      if (result) {
        success(SUCCESS_MESSAGES.INVESTMENT_DELETED);
        return true;
      } else {
        showError(error || ERROR_MESSAGES.SERVER_ERROR);
        return false;
      }
    },
    [storeDeleteInvestment, success, showError, error]
  );

  // Create transaction with toast
  const createTransaction = useCallback(
    async (portfolioId: string, investmentId: string, payload: CreateTransactionRequest) => {
      const result = await storeCreateTransaction(portfolioId, investmentId, payload);
      if (result) {
        success(SUCCESS_MESSAGES.TRANSACTION_CREATED);
        return true;
      } else {
        showError(error || ERROR_MESSAGES.SERVER_ERROR);
        return false;
      }
    },
    [storeCreateTransaction, success, showError, error]
  );

  return {
    // State
    portfolios,
    currentPortfolio,
    investments,
    transactions,
    dashboardSummary,
    isLoading,
    error,

    // Portfolio actions
    fetchPortfolios: useCallback(fetchPortfolios, []),
    fetchPortfolioById: useCallback((id: string) => fetchPortfolioById(id), [fetchPortfolioById]),
    createPortfolio,
    updatePortfolio,
    deletePortfolio,

    // Investment actions
    fetchInvestments: useCallback(
      (portfolioId: string) => fetchInvestments(portfolioId),
      [fetchInvestments]
    ),
    createInvestment,
    updateInvestment,
    deleteInvestment,

    // Transaction actions
    fetchTransactions: useCallback(
      (portfolioId: string, filters?: FilterTransactionRequest) =>
        fetchTransactions(portfolioId, filters),
      [fetchTransactions]
    ),
    createTransaction,

    // Dashboard actions
    fetchDashboardSummary: useCallback(fetchDashboardSummary, [fetchDashboardSummary]),

    // Utility
    clearError,
  };
};
