/**
 * Investment List Component
 * Displays list of investments with performance
 */

import React from 'react';
import { Card, Badge, Button } from '@components/ui';
import { Investment } from '@types';
import { formatters, helpers } from '@utils';

interface InvestmentListProps {
  investments: Investment[];
  onEdit?: (investment: Investment) => void;
  onDelete?: (investment: Investment) => void;
  isLoading?: boolean;
}

export const InvestmentList: React.FC<InvestmentListProps> = ({
  investments,
  onEdit,
  onDelete,
  isLoading = false,
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
        const { profit, profitPercentage } = helpers.calculateProfit(
          investment.currentPrice,
          investment.purchasePrice,
          investment.quantity
        );
        const totalValue = investment.currentPrice * investment.quantity;
        // const totalInvested = investment.purchasePrice * investment.quantity;
        const textColor = helpers.getProfitColor(profit);
        const bgColor = helpers.getProfitBgColor(profit);

        return (
          <Card key={investment.id} hover className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-gray-900">{investment.name}</h3>
                  <Badge variant="secondary">{formatters.investmentType(investment.type)}</Badge>
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
                      {formatters.currency(investment.currentPrice)}
                    </p>
                  </div>

                  {/* Purchase Price */}
                  <div>
                    <p className="text-xs text-gray-600">Purchase Price</p>
                    <p className="font-semibold text-gray-900">
                      {formatters.currency(investment.purchasePrice)}
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
                  {formatters.currency(totalValue)}
                </p>

                <div className={`text-right p-2 rounded ${bgColor}`}>
                  <p className={`font-semibold ${textColor}`}>
                    {profit >= 0 ? '+' : ''}
                    {formatters.currency(profit)}
                  </p>
                  <p className={`text-sm ${textColor}`}>
                    {profit >= 0 ? '+' : ''}
                    {formatters.percentage(profitPercentage)}
                  </p>
                </div>

                {(onEdit || onDelete) && (
                  <div className="flex gap-2 mt-3 justify-end">
                    {onEdit && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(investment)}
                        disabled={isLoading}
                      >
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(investment)}
                        disabled={isLoading}
                      >
                        Delete
                      </Button>
                    )}
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
