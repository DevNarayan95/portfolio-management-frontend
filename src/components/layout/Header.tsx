/**
 * Header Component
 * Main application header with navigation
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks';
import { Button } from '@components/ui';
import { ROUTES } from '@constants';
import { formatters } from '@utils';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  const userInitials = user ? formatters.initials(user.firstName, user.lastName) : '?';

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="text-2xl font-bold">💼</div>
          <div>
            <h1 className="text-xl font-bold">Portfolio Manager</h1>
            <p className="text-xs text-blue-100">Investment Tracker</p>
          </div>
        </Link>

        {/* Navigation */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to={ROUTES.DASHBOARD}
              className="hover:text-blue-100 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              to={ROUTES.PORTFOLIOS}
              className="hover:text-blue-100 transition-colors font-medium"
            >
              Portfolios
            </Link>
          </nav>
        )}

        {/* User Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="relative">
              {/* User Avatar Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-3 hover:bg-blue-500 px-3 py-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center font-semibold text-sm">
                  {userInitials}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium leading-tight">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-blue-100">{user.email}</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-xl">
                  <Link
                    to={ROUTES.PROFILE}
                    className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-200 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👤 Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={ROUTES.LOGIN}>
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-100">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
