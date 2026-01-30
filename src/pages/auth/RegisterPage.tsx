/**
 * Register Page
 */

import React from 'react';
import { AuthLayout } from '@components/layout';
import { RegisterForm } from '@components/forms';
import { ROUTES } from '@constants';

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start managing your investments"
      footerLink={{
        text: 'Already have an account?',
        url: ROUTES.LOGIN,
      }}
    >
      <RegisterForm />
    </AuthLayout>
  );
};
