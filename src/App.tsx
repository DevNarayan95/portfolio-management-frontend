// src/App.tsx
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { APP_ROUTES } from '@constants/index';
import { ProtectedRoute, ErrorBoundary, LoadingSpinner } from '@components/common';
import { useAuthStore } from '@store/authStore';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('@pages/HomePage').then((m) => ({ default: m.HomePage })));
const LoginPage = React.lazy(() =>
  import('@pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = React.lazy(() =>
  import('@pages/RegisterPage').then((m) => ({ default: m.RegisterPage }))
);
const DashboardPage = React.lazy(() =>
  import('@pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const PortfolioListPage = React.lazy(() =>
  import('@pages/PortfolioListPage').then((m) => ({ default: m.PortfolioListPage }))
);
const PortfolioDetailPage = React.lazy(() =>
  import('@pages/PortfolioDetailPage').then((m) => ({ default: m.PortfolioDetailPage }))
);
const NotFoundPage = React.lazy(() =>
  import('@pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

/**
 * App Component
 * Main application component with routing configuration
 * Initializes authentication on app load
 */
export const App: React.FC = () => {
  const { initializeAuth, isLoading } = useAuthStore();

  /**
   * Initialize authentication on app mount
   * Restores user session from stored tokens
   */
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Show loading spinner while initializing auth
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path={APP_ROUTES.HOME} element={<HomePage />} />
            <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              path={APP_ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={APP_ROUTES.PORTFOLIOS}
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
            <Route path="*" element={<Navigate to={APP_ROUTES.NOT_FOUND} replace />} />
            <Route path={APP_ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
