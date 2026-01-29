//src/components/ui/Input.tsx
import React from 'react';

/**
 * Input Component
 * Reusable input field with validation support
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || props.name || 'input';
  const hasError = !!error;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={inputId}
        className={`
          w-full px-4 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-offset-0
          transition-colors duration-200
          ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
          ${className}
        `}
        {...props}
      />

      {hasError && <p className="text-sm text-red-500 mt-1">{error}</p>}
      {helperText && !hasError && <p className="text-sm text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
};
