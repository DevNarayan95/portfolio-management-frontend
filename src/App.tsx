/**
 * Main App Component
 * Application root with routing
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@components/common';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  PortfolioListPage,
  PortfolioDetailPage,
  NotFoundPage,
} from '@pages/index';

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolios"
          element={
            <ProtectedRoute>
              <PortfolioListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolios/:id"
          element={
            <ProtectedRoute>
              <PortfolioDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Catch All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
