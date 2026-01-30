/**
 * Home Page
 * Landing page for unauthenticated users
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks';
import { Button } from '@components/ui';
import { ROUTES } from '@constants';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="text-2xl font-bold">💼</div>
            <div>
              <h1 className="text-xl font-bold">Portfolio Manager</h1>
            </div>
          </Link>
          <div className="flex gap-4">
            <Link to={ROUTES.LOGIN}>
              <Button variant="secondary">Login</Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
        <h2 className="text-5xl font-bold mb-6">Manage Your Investments</h2>
        <p className="text-xl text-blue-100 mb-8">
          Track, analyze, and optimize your investment portfolio with ease
        </p>
        <Link to={ROUTES.REGISTER}>
          <Button size="lg" variant="outline" className="border-white text-white">
            Get Started Free
          </Button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Portfolio Tracking',
                description: 'Monitor all your investments in one place',
              },
              {
                icon: '📈',
                title: 'Performance Analytics',
                description: 'Get detailed insights into your returns',
              },
              {
                icon: '💡',
                title: 'Investment Planning',
                description: 'Plan your SIP investments systematically',
              },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
