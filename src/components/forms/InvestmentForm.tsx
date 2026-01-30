/**
 * Investment Form Component
 */

import React, { useState } from 'react';
import { Input, Select, Button, Card, Alert } from '@components/ui';
import { useForm } from '@hooks';
import { validators } from '@utils';
import { CreateInvestmentRequest, InvestmentType } from '@types';
import { INVESTMENT_TYPES } from '@constants';

interface InvestmentFormProps {
  onSubmit: (values: CreateInvestmentRequest) => Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
}

export const InvestmentForm: React.FC<InvestmentFormProps> = ({
  onSubmit,
  isLoading = false,
  onCancel,
}) => {
  const [showSIPFields, setShowSIPFields] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const investmentTypeOptions = Object.entries(INVESTMENT_TYPES).map(([key, label]) => ({
    value: key,
    label,
  }));

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useForm<CreateInvestmentRequest>({
    initialValues: {
      name: '',
      symbol: '',
      type: InvestmentType.STOCK,
      quantity: 0,
      purchasePrice: 0,
      currentPrice: 0,
      purchaseDate: new Date().toISOString().split('T')[0],
      notes: '',
      isSIP: false,
    },
    validate: (values) => {
      const newErrors: { [key: string]: string } = {};

      if (!values.name) newErrors.name = 'Investment name is required';
      if (!values.symbol) newErrors.symbol = 'Symbol is required';
      if (!values.type) newErrors.type = 'Investment type is required';

      const quantityError = validators.number(values.quantity, 'Quantity');
      if (quantityError) newErrors.quantity = quantityError;

      const priceError = validators.number(values.purchasePrice, 'Purchase price');
      if (priceError) newErrors.purchasePrice = priceError;

      const currentPriceError = validators.number(values.currentPrice, 'Current price');
      if (currentPriceError) newErrors.currentPrice = currentPriceError;

      if (!values.purchaseDate) newErrors.purchaseDate = 'Purchase date is required';

      if (values.isSIP) {
        if (!values.sipAmount || values.sipAmount <= 0) {
          newErrors.sipAmount = 'SIP amount is required';
        }
        if (!values.sipStartDate) newErrors.sipStartDate = 'SIP start date is required';
        if (!values.sipDuration || values.sipDuration <= 0) {
          newErrors.sipDuration = 'SIP duration is required';
        }
      }

      return newErrors;
    },
    onSubmit,
  });

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Add New Investment</h3>

        {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Investment Type"
            name="type"
            options={investmentTypeOptions}
            value={values.type}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.type ? errors.type : ''}
            required
          />

          <Input
            label="Investment Name"
            type="text"
            name="name"
            placeholder="e.g., HDFC Growth Fund"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name ? errors.name : ''}
            required
          />

          <Input
            label="Symbol"
            type="text"
            name="symbol"
            placeholder="e.g., HDFCG"
            value={values.symbol}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.symbol ? errors.symbol : ''}
            required
          />

          <Input
            label="Quantity"
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={values.quantity}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.quantity ? errors.quantity : ''}
            step="0.01"
            required
          />

          <Input
            label="Purchase Price"
            type="number"
            name="purchasePrice"
            placeholder="Enter purchase price"
            value={values.purchasePrice}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.purchasePrice ? errors.purchasePrice : ''}
            step="0.01"
            required
          />

          <Input
            label="Current Price"
            type="number"
            name="currentPrice"
            placeholder="Enter current price"
            value={values.currentPrice}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.currentPrice ? errors.currentPrice : ''}
            step="0.01"
            required
          />

          <Input
            label="Purchase Date"
            type="date"
            name="purchaseDate"
            value={values.purchaseDate}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.purchaseDate ? errors.purchaseDate : ''}
            required
          />
        </div>

        <Input
          label="Notes"
          name="notes"
          placeholder="Add any notes about this investment"
          value={values.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
        />

        {/* SIP Section */}
        <div className="border-t pt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showSIPFields}
              onChange={(e) => {
                setShowSIPFields(e.target.checked);
                setFieldValue('isSIP', e.target.checked);
              }}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Is this a SIP (Systematic Investment Plan)?
            </span>
          </label>

          {showSIPFields && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="SIP Amount"
                type="number"
                name="sipAmount"
                placeholder="Enter monthly SIP amount"
                value={values.sipAmount || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.sipAmount ? errors.sipAmount : ''}
                step="0.01"
              />

              <Input
                label="SIP Start Date"
                type="date"
                name="sipStartDate"
                value={values.sipStartDate || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.sipStartDate ? errors.sipStartDate : ''}
              />

              <Input
                label="SIP Duration (Months)"
                type="number"
                name="sipDuration"
                placeholder="Enter duration in months"
                value={values.sipDuration || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.sipDuration ? errors.sipDuration : ''}
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button type="submit" isLoading={isSubmitting || isLoading} fullWidth>
            Add Investment
          </Button>

          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel} fullWidth>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};
