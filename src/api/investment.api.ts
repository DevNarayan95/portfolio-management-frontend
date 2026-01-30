/**
 * Investment API Service
 */

import axiosClient from './client';
import { API_ENDPOINTS } from '@constants';
import { ApiResponse, Investment, CreateInvestmentRequest, UpdateInvestmentRequest } from '@types';
import { handleApiError } from './endpoints';

export const investmentApi = {
  // Get investments by portfolio
  async getInvestments(portfolioId: string): Promise<ApiResponse<Investment[]>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.INVESTMENTS.LIST(portfolioId));

      return {
        success: true,
        statusCode: 200,
        message: 'Investments fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get investment by ID
  async getInvestmentById(portfolioId: string, id: string): Promise<ApiResponse<Investment>> {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.INVESTMENTS.GET_BY_ID(portfolioId, id));

      return {
        success: true,
        statusCode: 200,
        message: 'Investment fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Create investment
  async createInvestment(
    portfolioId: string,
    payload: CreateInvestmentRequest
  ): Promise<ApiResponse<Investment>> {
    try {
      const response = await axiosClient.post(
        API_ENDPOINTS.INVESTMENTS.CREATE(portfolioId),
        payload
      );

      return {
        success: true,
        statusCode: 201,
        message: 'Investment created successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update investment
  async updateInvestment(
    portfolioId: string,
    id: string,
    payload: UpdateInvestmentRequest
  ): Promise<ApiResponse<Investment>> {
    try {
      const response = await axiosClient.put(
        API_ENDPOINTS.INVESTMENTS.UPDATE(portfolioId, id),
        payload
      );

      return {
        success: true,
        statusCode: 200,
        message: 'Investment updated successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Delete investment
  async deleteInvestment(portfolioId: string, id: string): Promise<ApiResponse<null>> {
    try {
      await axiosClient.delete(API_ENDPOINTS.INVESTMENTS.DELETE(portfolioId, id));

      return {
        success: true,
        statusCode: 200,
        message: 'Investment deleted successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get investment performance
  async getInvestmentPerformance(portfolioId: string, id: string): Promise<ApiResponse<any>> {
    try {
      const response = await axiosClient.get(
        API_ENDPOINTS.INVESTMENTS.PERFORMANCE(portfolioId, id)
      );

      return {
        success: true,
        statusCode: 200,
        message: 'Investment performance fetched successfully',
        data: response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return handleApiError(error);
    }
  },
};
