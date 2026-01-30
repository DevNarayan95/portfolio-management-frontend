/**
 * Portfolio List Page
 * Display all portfolios and manage them
 */

import React, { useEffect, useState } from 'react';
import { MainLayout } from '@components/layout';
import { PortfolioCard } from '@components/features';
import { Button, Card, Input, Spinner, Alert, Modal } from '@components/ui';
import { usePortfolio, useForm } from '@hooks';
import { CreatePortfolioRequest, Portfolio } from '@types';
import { validators } from '@utils';

export const PortfolioListPage: React.FC = () => {
  const {
    portfolios,
    dashboardSummary,
    isLoading,
    error,
    fetchPortfolios,
    createPortfolio,
    clearError,
  } = usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useForm<CreatePortfolioRequest>({
    initialValues: {
      name: '',
      description: '',
    },
    validate: (values) => {
      const newErrors: { [key: string]: string } = {};
      const nameError = validators.required(values.name, 'Portfolio name');
      if (nameError) newErrors.name = nameError;
      return newErrors;
    },
    onSubmit: async (values) => {
      const success = await createPortfolio(values);
      if (success) {
        resetForm();
        setIsModalOpen(false);
        await fetchPortfolios();
      }
    },
  });

  if (isLoading) {
    return (
      <MainLayout>
        <Spinner size="lg" color="primary" />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolios</h1>
          <p className="text-gray-600 mt-2">Manage and track your investment portfolios</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Create Portfolio</Button>
      </div>

      {/* Error Alert */}
      {error && <Alert type="error" message={error} onClose={clearError} />}

      {/* Portfolios Grid */}
      {portfolios.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You don't have any portfolios yet</p>
            <Button onClick={() => setIsModalOpen(true)}>Create Your First Portfolio</Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio: Portfolio) => {
            const summary = dashboardSummary?.portfolios.find(
              (p: { portfolioId: string }) => p.portfolioId === portfolio.id
            );

            if (!summary) return null;

            return (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                stats={{
                  totalValue: summary.totalCurrentValue,
                  totalInvested: summary.totalInvestedAmount,
                  profit: summary.totalGainLoss,
                  profitPercentage: parseFloat(summary.gainLossPercentage),
                }}
              />
            );
          })}
        </div>
      )}

      {/* Create Portfolio Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Create New Portfolio"
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        onConfirm={() => handleSubmit({} as React.FormEvent<HTMLFormElement>)}
        confirmText="Create"
        isLoading={isSubmitting}
      >
        <form className="space-y-4">
          <Input
            label="Portfolio Name"
            type="text"
            name="name"
            placeholder="e.g., My Growth Portfolio"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name ? errors.name : ''}
            fullWidth
            required
          />

          <Input
            label="Description"
            name="description"
            placeholder="Describe your portfolio goals..."
            value={values.description || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
          />
        </form>
      </Modal>
    </MainLayout>
  );
};
