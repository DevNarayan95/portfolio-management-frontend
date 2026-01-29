/**
 * Investment Form Component
 * Form for creating and updating investments
 */

import React, { useState, useEffect } from 'react';
import { Investment, CreateInvestmentPayload, InvestmentType } from '@types/index';
import { Input, Select, Button, Card, Alert } from '@components/ui';
import { useForm } from '@hooks/useForm';
import { validateRequired, validateNumber } from '@utils/validation';
import { INVESTMENT_TYPES } from '@constants/index';
import { formatDateForInput } from '@utils/helpers';

interface InvestmentFormProps {
  investment?: Investment;
  onSubmit: (payload: CreateInvestmentPayload) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  onCancel?: () => void;
}

const investmentTypeOptions = Object.entries(INVESTMENT_TYPES).map(([key, label]) => ({
  value: key,
  label,
}));

export const InvestmentForm: React.FC<InvestmentFormProps> = ({
  investment,
  onSubmit,
  isLoading = false,
  error,
  onCancel,
}) => {
  const [showSIPFields, setShowSIPFields] = useState(investment?.isSIP || false);

  const initialValues: CreateInvestmentPayload = {
    type: investment?.type || InvestmentType.MUTUAL_FUND,
    name: investment?.name || '',
    symbol: investment?.symbol || '',
    quantity: investment?.quantity || 0,
    purchasePrice: investment?.purchasePrice || 0,
    purchaseDate: investment?.purchaseDate || new Date().toISOString().split('T')[0],
    notes: investment?.notes || '',
    isSIP: investment?.isSIP || false,
    sipAmount: investment?.sipAmount || undefined,
    sipStartDate: investment?.sipStartDate || undefined,
    sipDuration: investment?.sipDuration || undefined,
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useForm<CreateInvestmentPayload>({
    initialValues,
    validate: (values) => {
      const newErrors: Record<string, string> = {};

      if (!values.type) newErrors.type = 'Investment type is required';
      if (!values.name) newErrors.name = 'Investment name is required';
      if (!values.symbol) newErrors.symbol = 'Symbol is required';

      const quantityError = validateNumber(values.quantity.toString(), 'Quantity');
      if (quantityError) newErrors.quantity = quantityError;

      const priceError = validateNumber(values.purchasePrice.toString(), 'Purchase price');
      if (priceError) newErrors.purchasePrice = priceError;

      if (!values.purchaseDate) newErrors.purchaseDate = 'Purchase date is required';

      if (values.isSIP) {
        const sipAmountError = validateNumber((values.sipAmount || 0).toString(), 'SIP amount');
        if (sipAmountError) newErrors.sipAmount = sipAmountError;

        if (!values.sipStartDate) newErrors.sipStartDate = 'SIP start date is required';

        const sipDurationError = validateNumber(
          (values.sipDuration || 0).toString(),
          'SIP duration'
        );
        if (sipDurationError) newErrors.sipDuration = sipDurationError;
      }

      return newErrors;
    },
    onSubmit,
  });

  useEffect(() => {
    setFieldValue('isSIP', showSIPFields);
  }, [showSIPFields, setFieldValue]);

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {investment ? 'Update Investment' : 'Add New Investment'}
        </h2>

        {error && <Alert type="error" message={error} />}

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
            label="Purchase Date"
            type="date"
            name="purchaseDate"
            value={formatDateForInput(values.purchaseDate)}
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
              onChange={(e) => setShowSIPFields(e.target.checked)}
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
                value={values.sipStartDate ? formatDateForInput(values.sipStartDate) : ''}
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
          <Button type="submit" isLoading={isSubmitting || isLoading} className="flex-1">
            {investment ? 'Update Investment' : 'Add Investment'}
          </Button>

          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};
