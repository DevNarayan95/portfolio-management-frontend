/**
 * Root App Component
 * Main application component with routing
 */

import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore, useToastStore } from '@store';
import { ToastContainer } from '@components/ui';
import { ProtectedRoute, ErrorBoundary, LoadingSpinner } from '@components/common';
import { ROUTES } from '@constants';

// Lazy load pages
const HomePage = React.lazy(() => import('@pages').then((m) => ({ default: m.HomePage })));
const LoginPage = React.lazy(() => import('@pages').then((m) => ({ default: m.LoginPage })));
const RegisterPage = React.lazy(() => import('@pages').then((m) => ({ default: m.RegisterPage })));
const DashboardPage = React.lazy(() =>
  import('@pages').then((m) => ({ default: m.DashboardPage }))
);
const PortfolioListPage = React.lazy(() =>
  import('@pages').then((m) => ({ default: m.PortfolioListPage }))
);
const PortfolioDetailPage = React.lazy(() =>
  import('@pages').then((m) => ({ default: m.PortfolioDetailPage }))
);
const ProfilePage = React.lazy(() => import('@pages').then((m) => ({ default: m.ProfilePage })));
const NotFoundPage = React.lazy(() => import('@pages').then((m) => ({ default: m.NotFoundPage })));

/**
 * Inner App Component (with store access)
 */
const AppContent: React.FC = () => {
  const { initializeAuth, isLoading } = useAuthStore();
  const { toasts, removeToast } = useToastStore();

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.PORTFOLIOS}
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
            <Route
              path={ROUTES.PROFILE}
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Catch All */}
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
          </Routes>
        </Suspense>

        {/* Toast Container */}
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </Router>
    </ErrorBoundary>
  );
};

/**
 * Root App Component
 */
export const App: React.FC = () => {
  return <AppContent />;
};

export default App;
