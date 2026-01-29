// src/services/api/investmentApi.ts
import { Investment, CreateInvestmentPayload, UpdateInvestmentPayload, ApiResponse } from '@types';
import { mockInvestments, simulateApiDelay } from '@services/mockData';
import axiosInstance from '@utils/axios';

/**
 * Investment API Service
 * This service handles all investment-related API calls
 */

/**
 * Get all investments for a portfolio
 */
export const getInvestmentsByPortfolio = async (
  portfolioId: string
): Promise<ApiResponse<Investment[]>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.get(`/portfolios/${portfolioId}/investments`)
  // return response.data

  const investments = mockInvestments.filter((inv) => inv.portfolioId === portfolioId);

  return {
    success: true,
    statusCode: 200,
    message: 'Investments fetched successfully',
    data: investments,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Get investment by ID
 */
export const getInvestmentById = async (
  portfolioId: string,
  investmentId: string
): Promise<ApiResponse<Investment>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.get(`/portfolios/${portfolioId}/investments/${investmentId}`)
  // return response.data

  const investment = mockInvestments.find(
    (inv) => inv.id === investmentId && inv.portfolioId === portfolioId
  );

  if (!investment) {
    return {
      success: false,
      statusCode: 404,
      message: 'Investment not found',
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: 'Investment fetched successfully',
    data: investment,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Create new investment
 */
export const createInvestment = async (
  portfolioId: string,
  payload: CreateInvestmentPayload
): Promise<ApiResponse<Investment>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.post(`/portfolios/${portfolioId}/investments`, payload)
  // return response.data

  const newInvestment: Investment = {
    id: 'inv-' + Date.now(),
    portfolioId,
    ...payload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currentPrice: 0,
  };

  return {
    success: true,
    statusCode: 201,
    message: 'Investment created successfully',
    data: newInvestment,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Update investment
 */
export const updateInvestment = async (
  portfolioId: string,
  investmentId: string,
  payload: UpdateInvestmentPayload
): Promise<ApiResponse<Investment>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.put(`/portfolios/${portfolioId}/investments/${investmentId}`, payload)
  // return response.data

  const investment = mockInvestments.find(
    (inv) => inv.id === investmentId && inv.portfolioId === portfolioId
  );

  if (!investment) {
    return {
      success: false,
      statusCode: 404,
      message: 'Investment not found',
      timestamp: new Date().toISOString(),
    };
  }

  const updatedInvestment: Investment = {
    ...investment,
    ...payload,
    updatedAt: new Date().toISOString(),
  };

  return {
    success: true,
    statusCode: 200,
    message: 'Investment updated successfully',
    data: updatedInvestment,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Delete investment
 */
export const deleteInvestment = async (
  portfolioId: string,
  investmentId: string
): Promise<ApiResponse<null>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.delete(`/portfolios/${portfolioId}/investments/${investmentId}`)
  // return response.data

  const investment = mockInvestments.find(
    (inv) => inv.id === investmentId && inv.portfolioId === portfolioId
  );

  if (!investment) {
    return {
      success: false,
      statusCode: 404,
      message: 'Investment not found',
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: 'Investment deleted successfully',
    timestamp: new Date().toISOString(),
  };
};
