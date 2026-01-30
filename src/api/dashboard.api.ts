/**
 * Dashboard API Service
 */

import axiosClient from './client';
import { API_ENDPOINTS } from '@constants';
import { ApiResponse, DashboardSummary } from '@types';
import { handleApiError } from './endpoints';

export const dashboardApi = {
  // Get dashboard summary
  async getDashboardSummary(): Promise<ApiResponse<DashboardSummary>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.DASHBOARD.SUMMARY);

      return {
        success: true,
        statusCode: 200,
        message: 'Dashboard summary fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get portfolio summary
  async getPortfolioSummary(portfolioId: string): Promise<ApiResponse<any>> {
    try {
      const response = await axiosClient.get(
        API_ENDPOINTS.DASHBOARD.PORTFOLIO_SUMMARY(portfolioId)
      );

      return {
        success: true,
        statusCode: 200,
        message: 'Portfolio summary fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get portfolio performance
  async getPortfolioPerformance(portfolioId: string): Promise<ApiResponse<any>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.DASHBOARD.PERFORMANCE(portfolioId));

      return {
        success: true,
        statusCode: 200,
        message: 'Portfolio performance fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get portfolio allocation
  async getPortfolioAllocation(portfolioId: string): Promise<ApiResponse<any>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.DASHBOARD.ALLOCATION(portfolioId));

      return {
        success: true,
        statusCode: 200,
        message: 'Portfolio allocation fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get top performers
  async getTopPerformers(portfolioId: string, limit: number = 5): Promise<ApiResponse<any>> {
    try {
      const response = await axiosClient.get(
        `${API_ENDPOINTS.DASHBOARD.TOP_PERFORMERS(portfolioId)}?limit=${limit}`
      );

      return {
        success: true,
        statusCode: 200,
        message: 'Top performers fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get bottom performers
  async getBottomPerformers(portfolioId: string, limit: number = 5): Promise<ApiResponse<any>> {
    try {
      const response = await axiosClient.get(
        `${API_ENDPOINTS.DASHBOARD.BOTTOM_PERFORMERS(portfolioId)}?limit=${limit}`
      );

      return {
        success: true,
        statusCode: 200,
        message: 'Bottom performers fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};
