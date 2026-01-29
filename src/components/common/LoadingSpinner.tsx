/**
 * Loading Spinner Component
 * Full-page loading indicator
 */

import React from 'react';
import { Spinner } from '@components/ui';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <Spinner size="lg" color="primary" />
        <p className="text-gray-600 font-medium mt-4">Loading...</p>
      </div>
    </div>
  );
};
