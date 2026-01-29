// src/components/features/PerformanceChart.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@components/ui';
import { CHART_COLORS } from '@constants/index';

/**
 * Performance Chart Component
 * Displays line chart of portfolio performance over time
 */

interface PerformanceData {
  date: string;
  value: number;
  invested: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  title?: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  title = 'Portfolio Performance',
}) => {
  if (data.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="text-center py-8">
          <p className="text-gray-600">No performance data available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke={CHART_COLORS.primary}
            name="Current Value"
            strokeWidth={2}
            dot={{ fill: CHART_COLORS.primary }}
          />
          <Line
            type="monotone"
            dataKey="invested"
            stroke={CHART_COLORS.secondary}
            name="Invested Amount"
            strokeWidth={2}
            dot={{ fill: CHART_COLORS.secondary }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
