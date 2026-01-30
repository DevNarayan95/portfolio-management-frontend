// src/services/api/portfolioApi.ts
import { Portfolio, CreatePortfolioPayload, ApiResponse } from '@types';
import axiosInstance from '@utils/axios';

/**
 * Portfolio API Service
 * This service handles all portfolio-related API calls
 */

/**
 * Get all portfolios
 */
export const getAllPortfolios = async (): Promise<ApiResponse<Portfolio[]>> => {
  try {
    const response = await axiosInstance.get('/portfolios');

    return {
      success: true,
      statusCode: 200,
      message: 'Portfolios fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch portfolios';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get portfolio by ID
 */
export const getPortfolioById = async (id: string): Promise<ApiResponse<Portfolio>> => {
  try {
    const response = await axiosInstance.get(`/portfolios/${id}`);

    return {
      success: true,
      statusCode: 200,
      message: 'Portfolio fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch portfolio';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Create new portfolio
 */
export const createPortfolio = async (
  payload: CreatePortfolioPayload
): Promise<ApiResponse<Portfolio>> => {
  try {
    const response = await axiosInstance.post('/portfolios', {
      name: payload.name,
      description: payload.description,
    });

    return {
      success: true,
      statusCode: 201,
      message: 'Portfolio created successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to create portfolio';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Update portfolio
 */
export const updatePortfolio = async (
  id: string,
  payload: Partial<CreatePortfolioPayload>
): Promise<ApiResponse<Portfolio>> => {
  try {
    const response = await axiosInstance.put(`/portfolios/${id}`, {
      name: payload.name,
      description: payload.description,
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Portfolio updated successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to update portfolio';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Delete portfolio
 */
export const deletePortfolio = async (id: string): Promise<ApiResponse<null>> => {
  try {
    await axiosInstance.delete(`/portfolios/${id}`);

    return {
      success: true,
      statusCode: 204,
      message: 'Portfolio deleted successfully',
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to delete portfolio';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get portoflio statistics
 */
export const getPortfolioStats = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await axiosInstance.get(`/portfolios/${id}/stats`);

    return {
      success: true,
      statusCode: 200,
      message: 'Portfolio statistics fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to fetch portfolio statistics';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};
