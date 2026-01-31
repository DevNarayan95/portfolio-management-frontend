/**
 * Portfolio API Service
 */

import axiosClient from './client';
import { API_ENDPOINTS } from '@constants';
import {
  ApiResponse,
  Portfolio,
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
  PortfolioStats,
} from '@types';
import { handleApiError } from './endpoints';

export const portfolioApi = {
  // Get all portfolios
  async getPortfolios(): Promise<ApiResponse<Portfolio[]>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.PORTFOLIOS.LIST);

      // Normalize to ensure data is always an array
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.data)
          ? response.data.data
          : [];

      return {
        success: true,
        statusCode: 200,
        message: 'Portfolios fetched successfully',
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get portfolio by ID
  async getPortfolioById(id: string): Promise<ApiResponse<Portfolio>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.PORTFOLIOS.GET_BY_ID(id));

      // Ensure data is never undefined
      const data = response.data ?? null;

      return {
        success: true,
        statusCode: 200,
        message: 'Portfolio fetched successfully',
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Create portfolio
  async createPortfolio(payload: CreatePortfolioRequest): Promise<ApiResponse<Portfolio>> {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.PORTFOLIOS.CREATE, payload);

      const data = response.data ?? null;

      return {
        success: true,
        statusCode: 201,
        message: 'Portfolio created successfully',
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update portfolio
  async updatePortfolio(
    id: string,
    payload: UpdatePortfolioRequest
  ): Promise<ApiResponse<Portfolio>> {
    try {
      const response = await axiosClient.put(API_ENDPOINTS.PORTFOLIOS.UPDATE(id), payload);

      const data = response.data ?? null;

      return {
        success: true,
        statusCode: 200,
        message: 'Portfolio updated successfully',
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Delete portfolio
  async deletePortfolio(id: string): Promise<ApiResponse<null>> {
    try {
      await axiosClient.delete(API_ENDPOINTS.PORTFOLIOS.DELETE(id));

      return {
        success: true,
        statusCode: 200,
        message: 'Portfolio deleted successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get portfolio stats
  async getPortfolioStats(id: string): Promise<ApiResponse<PortfolioStats>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.PORTFOLIOS.STATS(id));

      const data = response.data ?? null;

      return {
        success: true,
        statusCode: 200,
        message: 'Portfolio statistics fetched successfully',
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};
