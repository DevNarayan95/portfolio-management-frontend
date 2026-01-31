/**
 * Dashboard Page
 * Main dashboard with portfolio overview
 */

import React, { useEffect } from 'react';
import { MainLayout } from '@components/layout';
import { DashboardStats, PortfolioCard } from '@components/features';
import { Spinner, Card, Button, Alert } from '@components/ui';
import { usePortfolio } from '@hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants';
export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { dashboardSummary, isLoading, error, fetchDashboardSummary, clearError } = usePortfolio();

  useEffect(() => {
    fetchDashboardSummary();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <Spinner size="lg" color="primary" />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Alert type="error" title="Failed to load dashboard" message={error} onClose={clearError} />
        <Button onClick={fetchDashboardSummary} className="mt-4">
          Retry
        </Button>
      </MainLayout>
    );
  }

  if (!dashboardSummary) {
    return (
      <MainLayout>
        <Alert type="info" message="No portfolio data available" />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your investment portfolios</p>
      </div>

      {/* Stats */}
      <DashboardStats summary={dashboardSummary} />

      {/* Portfolios */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Portfolios</h2>
          <Button onClick={() => navigate(ROUTES.PORTFOLIOS)}>View All Portfolios</Button>
        </div>

        {dashboardSummary.portfolios.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You don't have any portfolios yet</p>
              <div className="flex justify-center">
                <Button onClick={() => navigate(ROUTES.PORTFOLIOS)}>
                  Create Your First Portfolio
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardSummary.portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.portfolioId}
                portfolio={{
                  id: portfolio.portfolioId,
                  userId: '',
                  name: portfolio.portfolioName,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                }}
                stats={{
                  totalValue: portfolio.totalCurrentValue,
                  totalInvested: portfolio.totalInvestedAmount,
                  profit: portfolio.totalGainLoss,
                  profitPercentage: parseFloat(portfolio.gainLossPercentage),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};
