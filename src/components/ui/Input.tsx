/**
 * Input Component
 * Reusable text input with validation, animations, and professional design
 */

import React, { useState } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'flushed';
  inputSize?: 'sm' | 'md' | 'lg';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  icon,
  variant = 'default',
  inputSize = 'md',
  className = '',
  id,
  disabled,
  onFocus,
  onBlur,
  ...props
}) => {
  const inputId = id || props.name || 'input';
  const hasError = !!error;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  // Input variants
  const getVariantClasses = () => {
    const base = `
      w-full rounded-lg font-medium
      transition-all duration-200 ease-out
      focus:outline-none
      ${sizeClasses[inputSize]}
      ${className}
    `;

    switch (variant) {
      case 'filled':
        return `${base}
          ${hasError ? 'bg-red-50 border border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'bg-gray-100 border border-transparent focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100'}
          ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'hover:bg-gray-200'}
        `;

      case 'flushed':
        return `${base}
          border-b-2 bg-transparent px-0 rounded-none
          ${hasError ? 'border-b-red-500 focus:border-b-red-600' : 'border-b-gray-300 focus:border-b-blue-500'}
          ${disabled ? 'cursor-not-allowed opacity-60' : ''}
        `;

      default: // 'default'
        return `${base}
          border-2 
          ${hasError ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white hover:border-gray-300'}
        `;
    }
  };

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={inputId}
          className={`
            block text-sm font-semibold mb-2 transition-colors duration-200
            ${hasError ? 'text-red-600' : isFocused ? 'text-blue-600' : 'text-gray-500'}
          `}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={`relative ${isFocused && variant !== 'flushed' ? 'scale-100' : ''}`}>
        {/* Leading Icon */}
        {icon && (
          <div
            className={`
              absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 pointer-events-none
              ${isFocused ? 'text-blue-500' : hasError ? 'text-red-500' : 'text-gray-400'}
              ${inputSize === 'sm' ? 'text-base' : inputSize === 'lg' ? 'text-xl' : 'text-lg'}
            `}
          >
            {icon}
          </div>
        )}

        <input
          id={inputId}
          className={`
            ${getVariantClasses()}
            ${icon ? 'pl-10' : ''}
            placeholder:text-gray-400
          `}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {/* Animated focus indicator for flushed variant */}
        {variant === 'flushed' && (
          <div
            className={`
              absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300
              ${isFocused && !hasError ? 'w-full' : 'w-0'}
              ${hasError ? 'bg-gradient-to-r from-red-500 to-red-600 w-full' : ''}
            `}
          />
        )}
      </div>

      {/* Error or Helper Text */}
      <div className="mt-2">
        {hasError && (
          <p className="text-xs font-medium text-red-600 animate-fadeIn flex items-center gap-1">
            <span className="text-base leading-none">⚠</span>
            {error}
          </p>
        )}
        {helperText && !hasError && (
          <p className="text-xs text-gray-500 animate-fadeIn">{helperText}</p>
        )}
      </div>
    </div>
  );
};
