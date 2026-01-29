// src/pages/RegisterPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { AuthLayout } from '@components/layout';
import { RegisterForm } from '@components/features';

/**
 * Register Page
 * User registration page
 */

export const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout title="Create Account" subtitle="Join us to start managing your investments">
      <RegisterForm />
    </AuthLayout>
  );
};
