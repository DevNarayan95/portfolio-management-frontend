/**
 * Login Form Component
 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, useForm } from '@hooks';
import { Input, Button, Alert } from '@components/ui';
import { validators } from '@utils';
import { ROUTES } from '@constants';
import { LoginRequest } from '@types';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useForm<LoginRequest>({
      initialValues: {
        email: '',
        password: '',
      },
      validate: (values) => {
        const newErrors: { [key: string]: string } = {};

        const emailError = validators.email(values.email);
        if (emailError) newErrors.email = emailError;

        const passwordError = validators.required(values.password, 'Password');
        if (passwordError) newErrors.password = passwordError;

        return newErrors;
      },
      onSubmit: async (values) => {
        const success = await login(values);
        if (success) {
          navigate(ROUTES.DASHBOARD);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} onClose={clearError} />}

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : ''}
        fullWidth
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password ? errors.password : ''}
        fullWidth
        required
      />

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Sign In
      </Button>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to={ROUTES.REGISTER} className="text-blue-600 hover:text-blue-700 font-medium">
          Sign up here
        </Link>
      </p>
    </form>
  );
};
