/**
 * Spinner Component
 * Loading indicator
 */

import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const colorStyles = {
  primary: 'border-blue-500 border-t-blue-200',
  white: 'border-white border-t-gray-200',
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'primary' }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeStyles[size]} ${colorStyles[color]} border-4 rounded-full animate-spin`}
      />
    </div>
  );
};
