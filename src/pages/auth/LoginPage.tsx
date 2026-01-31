/**
 * Login Page
 */

import React from 'react';
import { AuthLayout } from '@components/layout';
import { LoginForm } from '@components/forms';

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout title="Sign In" subtitle="Welcome back to your portfolio">
      <LoginForm />
    </AuthLayout>
  );
};
