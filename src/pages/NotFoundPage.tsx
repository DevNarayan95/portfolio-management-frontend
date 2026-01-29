// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components/ui';

/**
 * Not Found Page (404)
 * Displayed when a page is not found
 */

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="text-center text-white">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-xl text-blue-100 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>

        <Link to="/">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
