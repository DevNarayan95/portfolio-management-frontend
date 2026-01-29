/**
 * Portfolio Card Component
 * Displays portfolio information in card format
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Portfolio } from '@types/index';
import { Card, Badge } from '@components/ui';
import { formatCurrency, formatPercentage, getProfitColor } from '@utils/helpers';

interface PortfolioCardProps {
  portfolio: Portfolio;
  totalValue: number;
  profit: number;
  profitPercentage: number;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  portfolio,
  totalValue,
  profit,
  profitPercentage,
}) => {
  return (
    <Link to={`/portfolios/${portfolio.id}`}>
      <Card hover className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{portfolio.name}</h3>
            <p className="text-sm text-gray-600">{portfolio.description}</p>
          </div>
          <Badge variant="primary">Portfolio</Badge>
        </div>

        <div className="space-y-3">
          {/* Current Value */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Current Value</span>
            <span className="font-semibold text-gray-900">{formatCurrency(totalValue)}</span>
          </div>

          {/* Invested Amount */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Invested Amount</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(portfolio.totalInvested)}
            </span>
          </div>

          {/* Profit/Loss */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-gray-600 text-sm">Gain / Loss</span>
            <div className="text-right">
              <p className={`font-semibold ${getProfitColor(profit)}`}>{formatCurrency(profit)}</p>
              <p className={`text-sm ${getProfitColor(profit)}`}>
                {profit >= 0 ? '+' : ''}
                {formatPercentage(profitPercentage)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
