/**
 * Investment List Component
 * Displays list of investments in a portfolio
 */

import React from 'react';
import { Investment, InvestmentType } from '@types/index';
import { Card, Badge } from '@components/ui';
import { formatCurrency, formatPercentage, getProfitColor, calculateProfit } from '@utils/helpers';
import { INVESTMENT_TYPES } from '@constants/index';

interface InvestmentListProps {
  investments: Investment[];
  onEdit?: (investment: Investment) => void;
  onDelete?: (investment: Investment) => void;
}

export const InvestmentList: React.FC<InvestmentListProps> = ({
  investments,
  onEdit,
  onDelete,
}) => {
  if (investments.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-600">No investments yet. Add one to get started!</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {investments.map((investment) => {
        const { profit, profitPercentage } = calculateProfit(
          investment.currentPrice,
          investment.purchasePrice,
          investment.quantity
        );
        const totalValue = investment.currentPrice * investment.quantity;
        const totalInvested = investment.purchasePrice * investment.quantity;

        return (
          <Card key={investment.id} hover className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-gray-900">{investment.name}</h3>
                  <Badge variant="secondary">
                    {INVESTMENT_TYPES[investment.type as keyof typeof INVESTMENT_TYPES]}
                  </Badge>
                  {investment.isSIP && <Badge variant="success">SIP</Badge>}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Symbol */}
                  <div>
                    <p className="text-xs text-gray-600">Symbol</p>
                    <p className="font-semibold text-gray-900">{investment.symbol}</p>
                  </div>

                  {/* Quantity */}
                  <div>
                    <p className="text-xs text-gray-600">Quantity</p>
                    <p className="font-semibold text-gray-900">{investment.quantity}</p>
                  </div>

                  {/* Current Price */}
                  <div>
                    <p className="text-xs text-gray-600">Current Price</p>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(investment.currentPrice)}
                    </p>
                  </div>

                  {/* Purchase Price */}
                  <div>
                    <p className="text-xs text-gray-600">Purchase Price</p>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(investment.purchasePrice)}
                    </p>
                  </div>
                </div>

                {investment.notes && (
                  <p className="text-sm text-gray-600 mt-2">📝 {investment.notes}</p>
                )}
              </div>

              <div className="text-right min-w-fit ml-4">
                <p className="text-xs text-gray-600 mb-1">Current Value</p>
                <p className="text-lg font-semibold text-gray-900 mb-3">
                  {formatCurrency(totalValue)}
                </p>

                <div
                  className={`text-right p-2 rounded ${getProfitColor(profit) === 'text-success' ? 'bg-green-50' : 'bg-red-50'}`}
                >
                  <p className={`font-semibold ${getProfitColor(profit)}`}>
                    {profit >= 0 ? '+' : ''}
                    {formatCurrency(profit)}
                  </p>
                  <p className={`text-sm ${getProfitColor(profit)}`}>
                    {profit >= 0 ? '+' : ''}
                    {formatPercentage(profitPercentage)}
                  </p>
                </div>

                {onEdit && onDelete && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => onEdit(investment)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(investment)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
