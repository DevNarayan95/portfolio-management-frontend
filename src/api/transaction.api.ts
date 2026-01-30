/**
 * Transaction API Service
 */

import axiosClient from './client';
import { API_ENDPOINTS } from '@constants';
import {
  ApiResponse,
  Transaction,
  CreateTransactionRequest,
  PaginatedResponse,
  FilterTransactionRequest,
  TransactionAnalytics,
} from '@types';
import { handleApiError } from './endpoints';

export const transactionApi = {
  // Create transaction
  async createTransaction(
    portfolioId: string,
    investmentId: string,
    payload: CreateTransactionRequest
  ): Promise<ApiResponse<Transaction>> {
    try {
      const response = await axiosClient.post(
        API_ENDPOINTS.TRANSACTIONS.CREATE(portfolioId, investmentId),
        payload
      );

      return {
        success: true,
        statusCode: 201,
        message: 'Transaction created successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get transactions by portfolio
  async getTransactionsByPortfolio(
    portfolioId: string,
    filters?: FilterTransactionRequest
  ): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    try {
      const params = new URLSearchParams();
      if (filters?.type) params.append('type', filters.type);
      if (filters?.fromDate) params.append('fromDate', filters.fromDate);
      if (filters?.toDate) params.append('toDate', filters.toDate);
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const response = await axiosClient.get(
        `${API_ENDPOINTS.TRANSACTIONS.LIST_BY_PORTFOLIO(portfolioId)}?${params.toString()}`
      );

      return {
        success: true,
        statusCode: 200,
        message: 'Transactions fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get transactions by investment
  async getTransactionsByInvestment(
    portfolioId: string,
    investmentId: string,
    filters?: FilterTransactionRequest
  ): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    try {
      const params = new URLSearchParams();
      if (filters?.type) params.append('type', filters.type);
      if (filters?.fromDate) params.append('fromDate', filters.fromDate);
      if (filters?.toDate) params.append('toDate', filters.toDate);
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const response = await axiosClient.get(
        `${API_ENDPOINTS.TRANSACTIONS.LIST_BY_INVESTMENT(portfolioId, investmentId)}?${params.toString()}`
      );

      return {
        success: true,
        statusCode: 200,
        message: 'Transactions fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get transaction analytics
  async getTransactionAnalytics(portfolioId: string): Promise<ApiResponse<TransactionAnalytics>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.TRANSACTIONS.ANALYTICS(portfolioId));

      return {
        success: true,
        statusCode: 200,
        message: 'Transaction analytics fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};
