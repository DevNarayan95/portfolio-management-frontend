/**
 * Login Form Component
 * With Enhanced Input and Password Toggle
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useForm } from '@hooks';
import { Input, PasswordInput, Button, Alert } from '@components/ui';
import { validators } from '@utils';
import { ROUTES } from '@constants';
import { LoginRequest } from '@types';

export const LoginForm: React.FC = () => {
  const { login, error, clearError, isLoading } = useAuth();

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
        clearError();

        try {
          await login(values);
        } catch (err) {
          console.error('LoginForm: Error:', err);
        }
      },
    });

  const isLoggingIn = isSubmitting || isLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <Alert type="error" title="Login Failed" message={error} onClose={clearError} />}

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : ''}
        variant="default"
        inputSize="md"
        fullWidth
        required
        disabled={isLoggingIn}
      />

      <PasswordInput
        label="Password"
        name="password"
        placeholder="••••••••"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password ? errors.password : ''}
        variant="default"
        inputSize="md"
        fullWidth
        required
        disabled={isLoggingIn}
      />

      <Button
        type="submit"
        fullWidth
        isLoading={isLoggingIn}
        disabled={isLoggingIn}
        className="mt-4"
      >
        {isLoggingIn ? 'Signing in...' : 'Sign In'}
      </Button>

      <p className="text-center text-xs text-gray-600 mt-3">
        Don't have an account?{' '}
        <Link
          to={ROUTES.REGISTER}
          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};
