/**
 * Portfolio API Service
 * This service handles all portfolio-related API calls
 */

import { Portfolio, CreatePortfolioPayload, ApiResponse } from '@types/index';
import { mockPortfolios, simulateApiDelay } from '@services/mockData';
import axiosInstance from '@utils/axios';

/**
 * Get all portfolios
 */
export const getAllPortfolios = async (): Promise<ApiResponse<Portfolio[]>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.get('/portfolios')
  // return response.data

  return {
    success: true,
    statusCode: 200,
    message: 'Portfolios fetched successfully',
    data: mockPortfolios,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Get portfolio by ID
 */
export const getPortfolioById = async (id: string): Promise<ApiResponse<Portfolio>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.get(`/portfolios/${id}`)
  // return response.data

  const portfolio = mockPortfolios.find((p) => p.id === id);

  if (!portfolio) {
    return {
      success: false,
      statusCode: 404,
      message: 'Portfolio not found',
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: 'Portfolio fetched successfully',
    data: portfolio,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Create new portfolio
 */
export const createPortfolio = async (
  payload: CreatePortfolioPayload
): Promise<ApiResponse<Portfolio>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.post('/portfolios', payload)
  // return response.data

  const newPortfolio: Portfolio = {
    id: 'portfolio-' + Date.now(),
    userId: '1',
    name: payload.name,
    description: payload.description,
    totalValue: 0,
    totalInvested: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    success: true,
    statusCode: 201,
    message: 'Portfolio created successfully',
    data: newPortfolio,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Update portfolio
 */
export const updatePortfolio = async (
  id: string,
  payload: Partial<CreatePortfolioPayload>
): Promise<ApiResponse<Portfolio>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.put(`/portfolios/${id}`, payload)
  // return response.data

  const portfolio = mockPortfolios.find((p) => p.id === id);

  if (!portfolio) {
    return {
      success: false,
      statusCode: 404,
      message: 'Portfolio not found',
      timestamp: new Date().toISOString(),
    };
  }

  const updatedPortfolio: Portfolio = {
    ...portfolio,
    ...payload,
    updatedAt: new Date().toISOString(),
  };

  return {
    success: true,
    statusCode: 200,
    message: 'Portfolio updated successfully',
    data: updatedPortfolio,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Delete portfolio
 */
export const deletePortfolio = async (id: string): Promise<ApiResponse<null>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.delete(`/portfolios/${id}`)
  // return response.data

  const portfolio = mockPortfolios.find((p) => p.id === id);

  if (!portfolio) {
    return {
      success: false,
      statusCode: 404,
      message: 'Portfolio not found',
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: 'Portfolio deleted successfully',
    timestamp: new Date().toISOString(),
  };
};
