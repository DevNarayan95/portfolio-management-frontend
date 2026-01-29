// src/pages/DashboardPage.tsx
import React, { useEffect, useRef } from 'react';
import { MainLayout } from '@components/layout';
import {
  DashboardStats,
  PortfolioCard,
  PortfolioDistribution,
  PerformanceChart,
} from '@components/features';
import { usePortfolio } from '@hooks/usePortfolio';
import { Spinner, Alert } from '@components/ui';
import { useNavigate } from 'react-router-dom';

/**
 * Dashboard Page
 * Main dashboard showing portfolio overview
 */

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { dashboardSummary, isLoading, error, fetchDashboardSummary } = usePortfolio();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchDashboardSummary();
    }
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Alert type="error" message={error || 'Failed to load dashboard'} />
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              hasFetched.current = false;
              fetchDashboardSummary();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </MainLayout>
    );
  }

  if (!dashboardSummary) {
    return (
      <MainLayout>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">No data available</p>
          <button
            onClick={() => {
              hasFetched.current = false;
              fetchDashboardSummary();
            }}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Retry
          </button>
        </div>
      </MainLayout>
    );
  }

  // Sample performance data (mock)
  const performanceData = [
    {
      date: '2024-01-01',
      value: dashboardSummary.totalInvested * 0.98,
      invested: dashboardSummary.totalInvested,
    },
    {
      date: '2024-01-15',
      value: dashboardSummary.totalInvested * 1.02,
      invested: dashboardSummary.totalInvested,
    },
    {
      date: '2024-02-01',
      value: dashboardSummary.totalInvested * 1.05,
      invested: dashboardSummary.totalInvested,
    },
    {
      date: '2024-02-15',
      value: dashboardSummary.totalValue * 0.95,
      invested: dashboardSummary.totalInvested,
    },
    {
      date: '2024-02-28',
      value: dashboardSummary.totalValue,
      invested: dashboardSummary.totalInvested,
    },
  ];

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your investment overview.</p>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <DashboardStats summary={dashboardSummary} />
      </div>

      {/* Charts and Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <PerformanceChart data={performanceData} />
        </div>

        {/* Distribution */}
        <div>
          {dashboardSummary.portfolios &&
            dashboardSummary.portfolios.length > 0 &&
            dashboardSummary.portfolios[0]?.investments && (
              <PortfolioDistribution investments={dashboardSummary.portfolios[0].investments} />
            )}
        </div>
      </div>

      {/* Portfolios */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Portfolios</h2>

        {!dashboardSummary.portfolios || dashboardSummary.portfolios.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">You haven't created any portfolios yet.</p>
            <button
              onClick={() => navigate('/portfolios')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create your first portfolio →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardSummary.portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.portfolioId}
                portfolio={{
                  id: portfolio.portfolioId,
                  userId: '1',
                  name: portfolio.portfolioName,
                  description: '',
                  totalValue: portfolio.totalValue,
                  totalInvested: portfolio.totalInvested,
                  createdAt: '',
                  updatedAt: '',
                }}
                totalValue={portfolio.totalValue}
                profit={portfolio.profit}
                profitPercentage={portfolio.profitPercentage}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};
