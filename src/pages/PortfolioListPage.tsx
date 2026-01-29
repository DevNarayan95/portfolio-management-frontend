/**
 * Portfolio List Page
 * Display all portfolios and allow creating new ones
 */

import React, { useEffect, useState } from 'react';
import { MainLayout } from '@components/layout';
import { PortfolioCard } from '@components/features';
import { usePortfolio } from '@hooks/usePortfolio';
import { Button, Spinner, Alert, Modal } from '@components/ui';
import { Card } from '@components/ui';
import { useForm } from '@hooks/useForm';
import { Input } from '@components/ui';
import { CreatePortfolioPayload } from '@types/index';

export const PortfolioListPage: React.FC = () => {
  const { portfolios, dashboardSummary, isLoading, error, fetchPortfolios, createNewPortfolio } =
    usePortfolio();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useForm<CreatePortfolioPayload>({
    initialValues: {
      name: '',
      description: '',
    },
    validate: (values) => {
      const newErrors: Record<string, string> = {};
      if (!values.name) newErrors.name = 'Portfolio name is required';
      return newErrors;
    },
    onSubmit: async (values) => {
      try {
        await createNewPortfolio(values);
        setIsModalOpen(false);
        resetForm();
        await fetchPortfolios();
      } catch {
        // Error is handled by the store
      }
    },
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolios</h1>
          <p className="text-gray-600 mt-2">Manage and track all your investment portfolios</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ New Portfolio</Button>
      </div>

      {/* Error Alert */}
      {error && <Alert type="error" message={error} />}

      {/* Portfolios Grid */}
      {portfolios.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No portfolios yet. Create one to get started!</p>
            <Button onClick={() => setIsModalOpen(true)}>Create Your First Portfolio</Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => {
            const portfolioData = dashboardSummary?.portfolios.find(
              (p) => p.portfolioId === portfolio.id
            );

            return (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                totalValue={portfolioData?.totalValue || 0}
                profit={portfolioData?.profit || 0}
                profitPercentage={portfolioData?.profitPercentage || 0}
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
        onConfirm={handleSubmit as any}
        confirmText="Create"
      >
        <form className="space-y-4">
          <Input
            label="Portfolio Name"
            type="text"
            name="name"
            placeholder="e.g., Primary Portfolio"
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
            placeholder="Optional description"
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
