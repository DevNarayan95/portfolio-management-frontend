// src/components/common/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { Button } from '@components/ui';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold">💼</div>
          <div>
            <h1 className="text-xl font-bold">Portfolio Manager</h1>
            <p className="text-xs text-blue-100">Investment Tracker</p>
          </div>
        </Link>

        {/* Navigation */}
        {isAuthenticated && (
          <nav className="flex items-center gap-6">
            <Link to="/dashboard" className="hover:text-blue-100 transition-colors">
              Dashboard
            </Link>
            <Link to="/portfolios" className="hover:text-blue-100 transition-colors">
              Portfolios
            </Link>
          </nav>
        )}

        {/* User Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center font-semibold">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-blue-100">{user.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-blue-200 text-blue-100 hover:bg-blue-500"
              >
                Logout
              </Button>
            </>
          )}

          {!isAuthenticated && (
            <Link to="/login">
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
