/**
 * Login Page
 */

import React from 'react';
import { AuthLayout } from '@components/layout';
import { LoginForm } from '@components/forms';
import { ROUTES } from '@constants';

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back to your portfolio"
      footerLink={{
        text: "Don't have an account?",
        url: ROUTES.REGISTER,
      }}
    >
      <LoginForm />
    </AuthLayout>
  );
};
