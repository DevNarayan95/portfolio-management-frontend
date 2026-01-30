/**
 * Portfolio Detail Page
 * View and manage individual portfolio
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@components/layout';
import { InvestmentList, TransactionHistory } from '@components/features';
import { Button, Card, Tabs, Spinner, Alert, Modal } from '@components/ui';
import { InvestmentForm } from '@components/forms';
import { usePortfolio, useForm } from '@hooks';
import {
  CreateInvestmentRequest,
  CreateTransactionRequest,
  Investment,
  TransactionType,
} from '@types';
import { formatters, helpers } from '@utils';
import { ROUTES } from '@constants';

export const PortfolioDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    currentPortfolio,
    investments,
    transactions,
    isLoading,
    error,
    fetchPortfolioById,
    fetchInvestments,
    fetchTransactions,
    createInvestment,
    deleteInvestment,
    createTransaction,
    clearError,
  } = usePortfolio();

  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPortfolioById(id);
      fetchInvestments(id);
      fetchTransactions(id);
    }
  }, [id]);

  const handleCreateInvestment = async (values: CreateInvestmentRequest) => {
    if (id) {
      const success = await createInvestment(id, values);
      if (success) {
        setIsInvestmentModalOpen(false);
        await fetchInvestments(id);
      }
    }
  };

  const handleCreateTransaction = async (values: CreateTransactionRequest) => {
    if (id && selectedInvestment) {
      const success = await createTransaction(id, selectedInvestment, values);
      if (success) {
        setIsTransactionModalOpen(false);
        setSelectedInvestment(null);
        await fetchTransactions(id);
      }
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Spinner size="lg" color="primary" />
      </MainLayout>
    );
  }

  if (error || !currentPortfolio || !id) {
    return (
      <MainLayout>
        <Alert
          type="error"
          title="Failed to load portfolio"
          message={error || 'Portfolio not found'}
          onClose={clearError}
        />
        <Button onClick={() => navigate(ROUTES.PORTFOLIOS)} className="mt-4">
          Back to Portfolios
        </Button>
      </MainLayout>
    );
  }

  // Calculate totals
  const totalInvested = investments.reduce(
    (sum: number, inv: { purchasePrice: number; quantity: number }) =>
      sum + inv.purchasePrice * inv.quantity,
    0
  );
  const totalValue = investments.reduce(
    (sum: number, inv: { currentPrice: number; quantity: number }) =>
      sum + inv.currentPrice * inv.quantity,
    0
  );
  const totalProfit = totalValue - totalInvested;
  const profitPercentage = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

  const tabsData = [
    {
      id: 'investments',
      label: `Investments (${investments.length})`,
      content: (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setIsInvestmentModalOpen(true)}>+ Add Investment</Button>
          </div>

          <InvestmentList
            investments={investments}
            onDelete={(investment) => deleteInvestment(id, investment.id)}
          />
        </div>
      ),
    },
    {
      id: 'transactions',
      label: `Transactions (${transactions.length})`,
      content: (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setIsTransactionModalOpen(true)}>+ Add Transaction</Button>
          </div>

          <TransactionHistory transactions={transactions} />
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-8">
        <Button onClick={() => navigate(ROUTES.PORTFOLIOS)} variant="secondary" size="sm">
          ← Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">{currentPortfolio.name}</h1>
        {currentPortfolio.description && (
          <p className="text-gray-600 mt-2">{currentPortfolio.description}</p>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <p className="text-sm text-gray-600">Total Invested</p>
          <p className="text-2xl font-bold text-gray-900">{formatters.currency(totalInvested)}</p>
        </Card>

        <Card>
          <p className="text-sm text-gray-600">Current Value</p>
          <p className="text-2xl font-bold text-gray-900">{formatters.currency(totalValue)}</p>
        </Card>

        <Card>
          <p className="text-sm text-gray-600">Gain/Loss</p>
          <p className={`text-2xl font-bold ${helpers.getProfitColor(totalProfit)}`}>
            {formatters.currency(totalProfit)}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-gray-600">Return %</p>
          <p className={`text-2xl font-bold ${helpers.getProfitColor(totalProfit)}`}>
            {formatters.percentage(profitPercentage)}
          </p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabsData} />

      {/* Investment Modal */}
      <Modal
        isOpen={isInvestmentModalOpen}
        title="Add New Investment"
        onClose={() => setIsInvestmentModalOpen(false)}
        size="lg"
      >
        <InvestmentForm
          onSubmit={handleCreateInvestment}
          onCancel={() => setIsInvestmentModalOpen(false)}
        />
      </Modal>

      {/* Transaction Modal */}
      <Modal
        isOpen={isTransactionModalOpen}
        title="Add New Transaction"
        onClose={() => {
          setIsTransactionModalOpen(false);
          setSelectedInvestment(null);
        }}
        size="md"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Investment
            </label>
            <select
              value={selectedInvestment || ''}
              onChange={(e) => setSelectedInvestment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose an investment...</option>
              {investments.map((inv: Investment) => (
                <option key={inv.id} value={inv.id}>
                  {inv.name} ({inv.symbol})
                </option>
              ))}
            </select>
          </div>

          {selectedInvestment && (
            <TransactionForm investmentId={selectedInvestment} onSubmit={handleCreateTransaction} />
          )}
        </form>
      </Modal>
    </MainLayout>
  );
};

/**
 * Transaction Form Component
 */
interface TransactionFormProps {
  investmentId: string;
  onSubmit: (values: CreateTransactionRequest) => Promise<void>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const { isSubmitting, handleSubmit } = useForm<CreateTransactionRequest>({
    initialValues: {
      type: TransactionType.BUY,
      quantity: 0,
      price: 0,
      amount: 0,
      transactionDate: new Date().toISOString().split('T')[0],
      notes: '',
    },
    validate: (values) => {
      const newErrors: { [key: string]: string } = {};
      if (!values.quantity || values.quantity <= 0) newErrors.quantity = 'Quantity is required';
      if (!values.price || values.price <= 0) newErrors.price = 'Price is required';
      return newErrors;
    },
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields would go here */}
      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Add Transaction
      </Button>
    </form>
  );
};
