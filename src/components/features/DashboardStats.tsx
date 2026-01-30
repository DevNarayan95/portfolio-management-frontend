/**
 * Dashboard Stats Component
 * Displays key portfolio statistics
 */

import React from 'react';
import { Card } from '@components/ui';
import { DashboardSummary } from '@types';
import { formatters, helpers } from '@utils';

interface DashboardStatsProps {
  summary: DashboardSummary;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ summary }) => {
  const stats = [
    {
      label: 'Total Portfolios',
      value: summary.totalPortfolios.toString(),
      icon: '💼',
      color: 'blue',
    },
    {
      label: 'Total Invested',
      value: formatters.currency(summary.totalInvestedAmount),
      icon: '💰',
      color: 'green',
    },
    {
      label: 'Current Value',
      value: formatters.currency(summary.totalCurrentValue),
      icon: '📈',
      color: 'purple',
    },
    {
      label: 'Total Gain/Loss',
      value: formatters.currency(summary.totalGainLoss),
      valueColor: helpers.getProfitColor(summary.totalGainLoss),
      icon: '🎯',
      color: 'red',
      subValue: formatters.percentage(summary.overallGainLossPercentage),
      subValueColor: helpers.getProfitColor(summary.totalGainLoss),
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
                  {summary.totalGainLoss >= 0 ? '+' : ''}
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
