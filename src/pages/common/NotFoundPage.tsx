/**
 * Not Found Page
 * 404 error page
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@constants';

export const NotFoundPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Subtle background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-right gradient accent */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-b from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

        {/* Bottom-left gradient accent */}
        <div className="absolute -bottom-32 -left-40 w-72 h-72 bg-gradient-to-t from-purple-100 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

        {/* Subtle horizontal lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '100px 1px',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl">
          <div
            className={`transition-all duration-1000 ease-out transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Error code with refined styling */}
            <div className="mb-8 relative">
              <div className="relative inline-block w-full">
                <h1
                  className="text-8xl sm:text-9xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tighter"
                  style={{
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '-0.04em',
                    fontWeight: 300,
                  }}
                >
                  404
                </h1>

                {/* Decorative underline */}
                <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              </div>
            </div>

            {/* Heading and description */}
            <div className="mb-10">
              <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
                Page Not Found
              </h2>

              <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                The page you're looking for doesn't exist or has been moved. We're sorry for the
                inconvenience.
              </p>
            </div>

            {/* Helpful suggestions */}
            <div className="mb-10 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <p className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <span className="w-6 h-6 mr-3 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs">
                  ✓
                </span>
                What you can do:
              </p>

              <ul className="text-sm text-gray-700 space-y-2 ml-9">
                <li>Check the URL for typos</li>
                <li>Return to the homepage</li>
                <li>Use the navigation menu</li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={ROUTES.HOME} className="flex-1">
                <button
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 text-base border border-transparent hover:border-blue-400"
                  style={{
                    boxShadow: isLoaded ? '0 4px 20px rgba(59, 130, 246, 0.15)' : 'none',
                  }}
                >
                  Go Home
                </button>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 active:bg-blue-100 text-base"
              >
                Go Back
              </button>
            </div>

            {/* Footer text */}
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500">
                Need help?{' '}
                <a
                  href="#"
                  className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200"
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>

          {/* Animated background shapes - secondary layer */}
          <div
            className={`absolute -z-10 inset-0 transition-all duration-1000 ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              background:
                'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
