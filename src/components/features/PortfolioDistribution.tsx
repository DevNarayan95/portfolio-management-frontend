// src/components/features/PortfolioDistribution.tsx
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Investment, InvestmentType } from '@types';
import { Card } from '@components/ui';
import { CHART_COLORS } from '@constants/index';
import { INVESTMENT_TYPES } from '@constants/index';

/**
 * Portfolio Distribution Chart Component
 * Displays pie chart of portfolio distribution by investment type
 */

interface PortfolioDistributionProps {
  investments: Investment[];
}

export const PortfolioDistribution: React.FC<PortfolioDistributionProps> = ({ investments }) => {
  // Calculate distribution by type
  const distribution = investments.reduce(
    (acc, inv) => {
      const existing = acc.find((item) => item.type === inv.type);
      const value = inv.currentPrice * inv.quantity;

      if (existing) {
        existing.value += value;
      } else {
        acc.push({
          type: inv.type,
          value,
          name: INVESTMENT_TYPES[inv.type as keyof typeof INVESTMENT_TYPES],
        });
      }

      return acc;
    },
    [] as Array<{ type: InvestmentType; value: number; name: string }>
  );

  const COLORS = [
    CHART_COLORS.primary,
    CHART_COLORS.success,
    CHART_COLORS.warning,
    CHART_COLORS.danger,
  ];

  if (distribution.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Distribution</h3>
        <div className="text-center py-8">
          <p className="text-gray-600">No investments to display</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={distribution}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {distribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend with values */}
      <div className="mt-6 space-y-2">
        {distribution.map((item, index) => (
          <div key={item.type} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
            <span className="font-semibold text-gray-900">
              ₹{item.value.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
