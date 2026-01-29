/**
 * Transaction History Component
 * Displays transaction history with filtering
 */

import React, { useState } from 'react';
import { Transaction, TransactionType } from '@types/index';
import { Card, Badge } from '@components/ui';
import { formatCurrency, formatDate } from '@utils/helpers';
import { TRANSACTION_TYPES } from '@constants/index';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<TransactionType | 'ALL'>('ALL');

  const filteredTransactions =
    filter === 'ALL' ? transactions : transactions.filter((txn) => txn.type === filter);

  if (filteredTransactions.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
        <div className="text-center py-8">
          <p className="text-gray-600">No transactions found</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              filter === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter(TransactionType.BUY)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              filter === TransactionType.BUY
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setFilter(TransactionType.SELL)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              filter === TransactionType.SELL
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sell
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Date</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Type</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Quantity</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Price</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">Amount</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{formatDate(txn.transactionDate)}</td>
                <td className="px-4 py-3">
                  <Badge variant={txn.type === TransactionType.BUY ? 'success' : 'danger'}>
                    {TRANSACTION_TYPES[txn.type]}
                  </Badge>
                </td>
                <td className="text-right px-4 py-3 font-medium">{txn.quantity}</td>
                <td className="text-right px-4 py-3 font-medium">{formatCurrency(txn.price)}</td>
                <td className="text-right px-4 py-3 font-semibold text-gray-900">
                  {formatCurrency(txn.amount)}
                </td>
                <td className="px-4 py-3 text-gray-600">{txn.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
