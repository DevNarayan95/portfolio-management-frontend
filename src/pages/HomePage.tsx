/**
 * Home Page
 * Landing page for unauthenticated users
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { Button } from '@components/ui';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      {/* Navigation */}
      <nav className="bg-white bg-opacity-10 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="text-2xl font-bold">💼</div>
            <span className="font-bold text-xl">Portfolio Manager</span>
          </Link>

          <div className="flex gap-4">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:bg-opacity-10"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-white">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Manage Your Investments with Ease</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Track your portfolio performance, monitor multiple asset classes, and make informed
            investment decisions with our comprehensive portfolio management system.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:bg-opacity-10"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-left">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Real-time Analytics</h3>
            <p className="text-blue-100">
              Track your portfolio performance with detailed analytics and insights.
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-left">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-3">Multiple Assets</h3>
            <p className="text-blue-100">
              Manage stocks, mutual funds, bonds, and cryptocurrencies in one place.
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 text-left">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-3">Secure & Reliable</h3>
            <p className="text-blue-100">
              Your data is protected with industry-standard security measures.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black bg-opacity-20 text-white text-center py-6 mt-12">
        <p>&copy; 2024 Portfolio Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};
