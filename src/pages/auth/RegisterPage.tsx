/**
 * Register Page
 */

import React from 'react';
import { AuthLayout } from '@components/layout';
import { RegisterForm } from '@components/forms';

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout title="Create Account" subtitle="Start managing your investments">
      <RegisterForm />
    </AuthLayout>
  );
};
