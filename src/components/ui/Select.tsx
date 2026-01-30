/**
 * Select Component
 * Reusable dropdown select input
 */

import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  fullWidth = false,
  placeholder = 'Select an option',
  className = '',
  id,
  ...props
}) => {
  const selectId = id || props.name || 'select';
  const hasError = !!error;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <select
        id={selectId}
        className={`
          w-full px-4 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-offset-0
          transition-colors duration-200
          bg-white
          ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
          ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hasError && <p className="text-sm text-red-500 mt-1">{error}</p>}
      {helperText && !hasError && <p className="text-sm text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
};
