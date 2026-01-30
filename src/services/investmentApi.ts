// src/services/api/investmentApi.ts
import { Investment, CreateInvestmentPayload, UpdateInvestmentPayload, ApiResponse } from '@types';
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
  try {
    const response = await axiosInstance.get(`/portfolios/${portfolioId}/investments`);

    return {
      success: true,
      statusCode: 200,
      message: 'Investments fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch investments';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get investment by ID
 */
export const getInvestmentById = async (
  portfolioId: string,
  investmentId: string
): Promise<ApiResponse<Investment>> => {
  try {
    const response = await axiosInstance.get(
      `/portfolios/${portfolioId}/investments/${investmentId}`
    );

    return {
      success: true,
      statusCode: 200,
      message: 'Investment fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch investment';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Create new investment
 */
export const createInvestment = async (
  portfolioId: string,
  payload: CreateInvestmentPayload
): Promise<ApiResponse<Investment>> => {
  try {
    const response = await axiosInstance.post(`/portfolios/${portfolioId}/investments`, payload);

    return {
      success: true,
      statusCode: 201,
      message: 'Investment created successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to create investment';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Update investment
 */
export const updateInvestment = async (
  portfolioId: string,
  investmentId: string,
  payload: UpdateInvestmentPayload
): Promise<ApiResponse<Investment>> => {
  try {
    const response = await axiosInstance.put(
      `/portfolios/${portfolioId}/investments/${investmentId}`,
      payload
    );

    return {
      success: true,
      statusCode: 200,
      message: 'Investment updated successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to update investment';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Delete investment
 */
export const deleteInvestment = async (
  portfolioId: string,
  investmentId: string
): Promise<ApiResponse<null>> => {
  try {
    await axiosInstance.delete(`/portfolios/${portfolioId}/investments/${investmentId}`);

    return {
      success: true,
      statusCode: 200,
      message: 'Investment deleted successfully',
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'Failed to delete investment';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get investment performance
 */
export const getInvestmentPerformance = async (
  portfolioId: string,
  investmentId: string
): Promise<ApiResponse<any>> => {
  try {
    const response = await axiosInstance.get(
      `/portfolios/${portfolioId}/investments/${investmentId}/performance`
    );

    return {
      success: true,
      statusCode: 200,
      message: 'Investment performance fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to fetch investment performance';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};
