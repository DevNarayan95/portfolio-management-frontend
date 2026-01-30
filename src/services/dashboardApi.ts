// src/services/api/dashboardApi.ts
import { DashboardSummary, ApiResponse } from '@types';
import axiosInstance from '@utils/axios';

/**
 * Dashboard API Service
 * This service handles all dashboard-related API calls
 */

/**
 * Get dashboard summary
 */
export const getDashboardSummary = async (): Promise<ApiResponse<DashboardSummary>> => {
  try {
    const response = await axiosInstance.get('/dashboard/summary');

    return {
      success: true,
      statusCode: 200,
      message: 'Dashboard summary fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to fetch dashboard summary';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get portfolio summary
 */
export const getPortfolioSummary = async (
  portfolioId: string
): Promise<ApiResponse<DashboardSummary>> => {
  try {
    const response = await axiosInstance.get(`/dashboard/portfolio/${portfolioId}/summary`);

    return {
      success: true,
      statusCode: 200,
      message: 'Portfolio summary fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to fetch portfolio summary';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get investment performance
 */
export const getInvestmentPerformanceDashboard = async (
  portfolioId: string
): Promise<ApiResponse<DashboardSummary>> => {
  try {
    const response = await axiosInstance.get(`/dashboard/portfolio/${portfolioId}/performance`);

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

/**
 * Get portfolio allocation
 */
export const getPortfolioAllocation = async (
  portfolioId: string
): Promise<ApiResponse<DashboardSummary>> => {
  try {
    const response = await axiosInstance.get(`/dashboard/portfolio/${portfolioId}/allocation`);

    return {
      success: true,
      statusCode: 200,
      message: 'Portfolio allocation fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Failed to fetch portfolio allocation';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get top performing investments
 */
export const getTopPerformers = async (
  portfolioId: string,
  limit: number = 5
): Promise<ApiResponse<DashboardSummary>> => {
  try {
    const response = await axiosInstance.get(
      `/dashboard/portfolio/${portfolioId}/top-performers?limit=${limit}`
    );

    return {
      success: true,
      statusCode: 200,
      message: 'Top performing investments fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Failed to fetch top performing investments';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};

/**
 * Get bottom performing investments
 */
export const getBottomPerformers = async (
  portfolioId: string,
  limit: number = 5
): Promise<ApiResponse<DashboardSummary>> => {
  try {
    const response = await axiosInstance.get(
      `/dashboard/portfolio/${portfolioId}/bottom-performers?limit=${limit}`
    );

    return {
      success: true,
      statusCode: 200,
      message: 'Bottom performing investments fetched successfully',
      data: response.data,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Failed to fetch bottom performing investments';
    throw { success: false, statusCode: error.response?.status || 500, message };
  }
};
