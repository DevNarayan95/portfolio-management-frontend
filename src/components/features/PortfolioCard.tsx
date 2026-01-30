/**
 * Portfolio Card Component
 * Displays individual portfolio information
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge } from '@components/ui';
import { Portfolio } from '@types';
import { formatters, helpers } from '@utils';
import { ROUTES } from '@constants';

interface PortfolioCardProps {
  portfolio: Portfolio;
  stats: {
    totalValue: number;
    totalInvested: number;
    profit: number;
    profitPercentage: number;
  };
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio, stats }) => {
  const bgColor = helpers.getProfitBgColor(stats.profit);
  const textColor = helpers.getProfitColor(stats.profit);

  return (
    <Link to={ROUTES.PORTFOLIO_DETAIL(portfolio.id)}>
      <Card hover className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{portfolio.name}</h3>
            {portfolio.description && (
              <p className="text-sm text-gray-600">{portfolio.description}</p>
            )}
          </div>
          <Badge variant="primary">Portfolio</Badge>
        </div>

        <div className="space-y-3">
          {/* Current Value */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Current Value</span>
            <span className="font-semibold text-gray-900">
              {formatters.currency(stats.totalValue)}
            </span>
          </div>

          {/* Invested Amount */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Invested Amount</span>
            <span className="font-semibold text-gray-900">
              {formatters.currency(stats.totalInvested)}
            </span>
          </div>

          {/* Profit/Loss */}
          <div
            className={`flex items-center justify-between pt-2 border-t border-gray-200 ${bgColor} rounded p-2`}
          >
            <span className="text-gray-600 text-sm">Gain / Loss</span>
            <div className="text-right">
              <p className={`font-semibold ${textColor}`}>{formatters.currency(stats.profit)}</p>
              <p className={`text-sm ${textColor}`}>
                {stats.profit >= 0 ? '+' : ''}
                {formatters.percentage(stats.profitPercentage)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
