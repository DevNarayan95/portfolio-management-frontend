/**
 * Transaction API Service
 * This service handles all transaction-related API calls
 */

import {
  Transaction,
  CreateTransactionPayload,
  ApiResponse,
  PaginatedResponse,
} from '@types/index';
import { mockTransactions, simulateApiDelay } from '@services/mockData';
import axiosInstance from '@utils/axios';

/**
 * Get transactions for a portfolio with pagination
 */
export const getTransactionsByPortfolio = async (
  portfolioId: string,
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<PaginatedResponse<Transaction>>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.get(`/portfolios/${portfolioId}/transactions`, {
  //   params: { page, limit }
  // })
  // return response.data

  const transactions = mockTransactions;
  const total = transactions.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedData = transactions.slice(startIndex, startIndex + limit);

  return {
    success: true,
    statusCode: 200,
    message: 'Transactions fetched successfully',
    data: {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    },
    timestamp: new Date().toISOString(),
  };
};

/**
 * Get transactions for an investment
 */
export const getTransactionsByInvestment = async (
  portfolioId: string,
  investmentId: string
): Promise<ApiResponse<Transaction[]>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.get(
  //   `/portfolios/${portfolioId}/investments/${investmentId}/transactions`
  // )
  // return response.data

  const transactions = mockTransactions.filter((txn) => txn.investmentId === investmentId);

  return {
    success: true,
    statusCode: 200,
    message: 'Transactions fetched successfully',
    data: transactions,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Create transaction
 */
export const createTransaction = async (
  portfolioId: string,
  investmentId: string,
  payload: CreateTransactionPayload
): Promise<ApiResponse<Transaction>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.post(
  //   `/portfolios/${portfolioId}/investments/${investmentId}/transactions`,
  //   payload
  // )
  // return response.data

  const newTransaction: Transaction = {
    id: 'txn-' + Date.now(),
    investmentId,
    ...payload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    success: true,
    statusCode: 201,
    message: 'Transaction created successfully',
    data: newTransaction,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Get transaction by ID
 */
export const getTransactionById = async (
  portfolioId: string,
  investmentId: string,
  transactionId: string
): Promise<ApiResponse<Transaction>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.get(
  //   `/portfolios/${portfolioId}/investments/${investmentId}/transactions/${transactionId}`
  // )
  // return response.data

  const transaction = mockTransactions.find((txn) => txn.id === transactionId);

  if (!transaction) {
    return {
      success: false,
      statusCode: 404,
      message: 'Transaction not found',
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: 'Transaction fetched successfully',
    data: transaction,
    timestamp: new Date().toISOString(),
  };
};
