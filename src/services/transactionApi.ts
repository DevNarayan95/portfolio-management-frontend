// src/services/api/transactionApi.ts
import {
  Transaction,
  CreateTransactionPayload,
  ApiResponse,
  FilterTransactionPayload,
} from '@types';
import axiosInstance from '@utils/axios';

/**
 * Transaction API Service
 * This service handles all transaction-related API calls
 */

/**
 * Create transaction
 */
export const createTransaction = async (
  portfolioId: string,
  investmentId: string,
  payload: CreateTransactionPayload
): Promise<ApiResponse<Transaction>> => {
  try {
    const response = await axiosInstance.post(
      `/portfolios/${portfolioId}/investments/${investmentId}/transactions`,
      payload
    );

    return {
      success: true,
      statusCode: 201,
      message: 'Transaction created successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to create transaction';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get transactions by portfolio
 */
export const getPortfolioTransactions = async (
  portfolioId: string,
  filters?: FilterTransactionPayload
): Promise<ApiResponse<Transaction[]>> => {
  try {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.fromDate) params.append('fromDate', filters.fromDate);
    if (filters?.toDate) params.append('toDate', filters.toDate);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await axiosInstance.get(
      `/portfolios/${portfolioId}/transactions?${params.toString()}`
    );

    return {
      success: true,
      statusCode: 200,
      message: 'Transactions fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to fetch transactions';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get transactions by investment
 */
export const getInvestmentTransactions = async (
  portfolioId: string,
  investmentId: string,
  filters?: FilterTransactionPayload
): Promise<ApiResponse<Transaction[]>> => {
  try {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.fromDate) params.append('fromDate', filters.fromDate);
    if (filters?.toDate) params.append('toDate', filters.toDate);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await axiosInstance.get(
      `/portfolios/${portfolioId}/investments/${investmentId}/transactions?${params.toString()}`
    );

    return {
      success: true,
      statusCode: 200,
      message: 'Transactions fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to fetch transactions';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get transaction by ID
 */
export const getTransactionById = async (
  portfolioId: string,
  transactionId: string
): Promise<ApiResponse<Transaction>> => {
  try {
    const response = await axiosInstance.get(
      `/portfolios/${portfolioId}/transactions/${transactionId}`
    );

    return {
      success: true,
      statusCode: 200,
      message: 'Transaction fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch transaction';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get transactions analytics
 */
export const getTransactionsAnalytics = async (portfolioId: string): Promise<ApiResponse<any>> => {
  try {
    const response = await axiosInstance.get(`/portfolios/${portfolioId}/transactions/analytics`);

    return {
      success: true,
      statusCode: 200,
      message: 'Transaction analytics fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to fetch transaction analytics';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};
