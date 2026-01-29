// src/components/features/DashboardStats.tsx
import React from 'react';
import { DashboardSummary } from '@types';
import { Card } from '@components/ui';
import { formatCurrency, formatPercentage, getProfitColor } from '@utils/helpers';

/**
 * Dashboard Stats Component
 * Displays key statistics on the dashboard
 */

interface DashboardStatsProps {
  summary: DashboardSummary;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ summary }) => {
  const stats = [
    {
      label: 'Total Portfolios',
      value: summary.totalPortfolios.toString(),
      icon: '💼',
    },
    {
      label: 'Total Invested',
      value: formatCurrency(summary.totalInvested),
      icon: '💰',
    },
    {
      label: 'Current Value',
      value: formatCurrency(summary.totalValue),
      icon: '📈',
    },
    {
      label: 'Total Gain/Loss',
      value: formatCurrency(summary.totalProfit),
      valueColor: getProfitColor(summary.totalProfit),
      icon: '🎯',
      subValue: formatPercentage(summary.totalProfitPercentage),
      subValueColor: getProfitColor(summary.totalProfit),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.valueColor || 'text-gray-900'}`}>
                {stat.value}
              </p>
              {stat.subValue && (
                <p className={`text-sm font-medium mt-1 ${stat.subValueColor}`}>
                  {summary.totalProfit >= 0 ? '+' : ''}
                  {stat.subValue}
                </p>
              )}
            </div>
            <span className="text-4xl opacity-50">{stat.icon}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};
