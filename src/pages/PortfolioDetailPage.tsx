// src/pages/PortfolioDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@components/layout';
import { InvestmentList, InvestmentForm, TransactionHistory } from '@components/features';
import { usePortfolio } from '@hooks/usePortfolio';
import { Button, Spinner, Alert, Tabs, Modal, Card } from '@components/ui';
import {
  Investment,
  CreateInvestmentPayload,
  CreateTransactionPayload,
  TransactionType,
} from '@types';
import { mockTransactions } from '@services/mockData';
import { formatCurrency, formatPercentage, getProfitColor } from '@utils/helpers';
import { useForm } from '@hooks/useForm';
import { Input, Select } from '@components/ui';
import { validateNumber } from '@utils/validation';
import { TRANSACTION_TYPES } from '@constants/index';

/**
 * Portfolio Detail Page
 * Show details of a specific portfolio with investments and transactions
 */

export const PortfolioDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    currentPortfolio,
    investments,
    isLoading,
    error,
    fetchPortfolioById,
    fetchInvestments,
    addInvestment,
    updateCurrentInvestment,
    removeInvestment,
  } = usePortfolio();

  const [isInvestmentFormOpen, setIsInvestmentFormOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);

  // Transaction Form
  const {
    values: txnValues,
    errors: txnErrors,
    touched: txnTouched,
    isSubmitting: txnSubmitting,
    handleChange: handleTxnChange,
    handleBlur: handleTxnBlur,
    handleSubmit: handleTxnSubmit,
    resetForm: resetTxnForm,
  } = useForm<CreateTransactionPayload>({
    initialValues: {
      type: TransactionType.BUY,
      quantity: 0,
      price: 0,
      transactionDate: new Date().toISOString().split('T')[0],
      notes: '',
    },
    validate: (values) => {
      const newErrors: Record<string, string> = {};
      const qtyError = validateNumber(values.quantity.toString(), 'Quantity');
      if (qtyError) newErrors.quantity = qtyError;
      const priceError = validateNumber(values.price.toString(), 'Price');
      if (priceError) newErrors.price = priceError;
      return newErrors;
    },
    onSubmit: async (values) => {
      // Handle transaction submission
      console.log('Transaction submitted:', values);
      setIsTransactionModalOpen(false);
      resetTxnForm();
    },
  });

  useEffect(() => {
    if (id) {
      fetchPortfolioById(id);
      fetchInvestments(id);
    }
  }, [id]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (!currentPortfolio) {
    return (
      <MainLayout>
        <Alert type="error" message={error || 'Portfolio not found'} />
      </MainLayout>
    );
  }

  const portfolioTransactions = mockTransactions;
  const totalValue = investments.reduce((sum, inv) => sum + inv.currentPrice * inv.quantity, 0);
  const totalInvested = investments.reduce((sum, inv) => sum + inv.purchasePrice * inv.quantity, 0);
  const profit = totalValue - totalInvested;
  const profitPercentage = (profit / totalInvested) * 100;

  const tabsData = [
    {
      id: 'investments',
      label: `Investments (${investments.length})`,
      content: (
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setEditingInvestment(null);
                setIsInvestmentFormOpen(true);
              }}
            >
              + Add Investment
            </Button>
          </div>

          {isInvestmentFormOpen && (
            <InvestmentForm
              investment={editingInvestment || undefined}
              onSubmit={async (payload: CreateInvestmentPayload) => {
                try {
                  if (editingInvestment) {
                    await updateCurrentInvestment(editingInvestment.id, payload);
                  } else {
                    await addInvestment(payload);
                  }
                  setIsInvestmentFormOpen(false);
                  setEditingInvestment(null);
                  await fetchInvestments(currentPortfolio.id);
                } catch (err) {
                  console.error('Error saving investment:', err);
                }
              }}
              onCancel={() => {
                setIsInvestmentFormOpen(false);
                setEditingInvestment(null);
              }}
            />
          )}

          <InvestmentList
            investments={investments}
            onEdit={(inv) => {
              setEditingInvestment(inv);
              setIsInvestmentFormOpen(true);
            }}
            onDelete={(inv) => {
              if (confirm('Are you sure you want to delete this investment?')) {
                removeInvestment(inv.id);
              }
            }}
          />
        </div>
      ),
    },
    {
      id: 'transactions',
      label: `Transactions (${portfolioTransactions.length})`,
      content: (
        <div className="space-y-4">
          <div>
            <Button
              onClick={() => {
                if (investments.length === 0) {
                  alert('Please add an investment first');
                  return;
                }
                setSelectedInvestment(investments[0]);
                setIsTransactionModalOpen(true);
              }}
            >
              + New Transaction
            </Button>
          </div>
          <TransactionHistory transactions={portfolioTransactions} />
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{currentPortfolio.name}</h1>
          <p className="text-gray-600 mt-2">{currentPortfolio.description}</p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/portfolios')}>
          ← Back to Portfolios
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Total Value</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Invested Amount</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInvested)}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Gain / Loss</p>
          <p className={`text-2xl font-bold ${getProfitColor(profit)}`}>{formatCurrency(profit)}</p>
          <p className={`text-sm ${getProfitColor(profit)}`}>
            {formatPercentage(profitPercentage)}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Total Assets</p>
          <p className="text-2xl font-bold text-gray-900">{investments.length}</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabsData} />

      {/* Transaction Modal */}
      <Modal
        isOpen={isTransactionModalOpen}
        title="Add Transaction"
        onClose={() => {
          setIsTransactionModalOpen(false);
          resetTxnForm();
        }}
        onConfirm={async () => {
          handleTxnSubmit({
            preventDefault: () => {},
          } as React.FormEvent<HTMLFormElement>);
        }}
        confirmText="Add Transaction"
      >
        <form className="space-y-4">
          {selectedInvestment && (
            <Card>
              <p className="text-sm text-gray-600">{selectedInvestment.name}</p>
              <p className="font-semibold text-gray-900">{selectedInvestment.symbol}</p>
            </Card>
          )}

          <Select
            label="Transaction Type"
            name="type"
            options={[
              { value: TransactionType.BUY, label: TRANSACTION_TYPES.BUY },
              { value: TransactionType.SELL, label: TRANSACTION_TYPES.SELL },
            ]}
            value={txnValues.type}
            onChange={handleTxnChange}
            onBlur={handleTxnBlur}
            required
          />

          <Input
            label="Quantity"
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={txnValues.quantity}
            onChange={handleTxnChange}
            onBlur={handleTxnBlur}
            error={txnTouched.quantity ? txnErrors.quantity : ''}
            step="0.01"
            fullWidth
            required
          />

          <Input
            label="Price"
            type="number"
            name="price"
            placeholder="Enter price per unit"
            value={txnValues.price}
            onChange={handleTxnChange}
            onBlur={handleTxnBlur}
            error={txnTouched.price ? txnErrors.price : ''}
            step="0.01"
            fullWidth
            required
          />

          <Input
            label="Date"
            type="date"
            name="transactionDate"
            value={txnValues.transactionDate}
            onChange={handleTxnChange}
            onBlur={handleTxnBlur}
            fullWidth
            required
          />

          <Input
            label="Notes"
            name="notes"
            placeholder="Optional notes"
            value={txnValues.notes}
            onChange={handleTxnChange}
            onBlur={handleTxnBlur}
            fullWidth
          />
        </form>
      </Modal>
    </MainLayout>
  );
};
