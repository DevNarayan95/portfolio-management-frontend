/**
 * Dashboard API Service
 * This service handles all dashboard-related API calls
 */

import { DashboardSummary, ApiResponse } from '@types/index';
import { calculateDashboardSummary, simulateApiDelay } from '@services/mockData';
import axiosInstance from '@utils/axios';

/**
 * Get dashboard summary
 */
export const getDashboardSummary = async (): Promise<ApiResponse<DashboardSummary>> => {
  // Simulate API call
  await simulateApiDelay();

  // TODO: Replace with actual API call
  // const response = await axiosInstance.get('/dashboard/summary')
  // return response.data

  return {
    success: true,
    statusCode: 200,
    message: 'Dashboard summary fetched successfully',
    data: calculateDashboardSummary(),
    timestamp: new Date().toISOString(),
  };
};
