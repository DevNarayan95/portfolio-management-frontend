/**
 * Login Form Component
 * Handles user login with validation
 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useForm } from '@hooks/useForm';
import { Input, Button, Alert } from '@components/ui';
import { validateEmail, validatePassword } from '@utils/validation';
import { LoginPayload } from '@types/index';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useForm<LoginPayload>({
      initialValues: {
        email: '',
        password: '',
      },
      validate: (values) => {
        const newErrors: Record<string, string> = {};

        const emailError = validateEmail(values.email);
        if (emailError) newErrors.email = emailError;

        const passwordError = validatePassword(values.password);
        if (passwordError) newErrors.password = passwordError;

        return newErrors;
      },
      onSubmit: async (values) => {
        try {
          await login(values);
          navigate('/dashboard');
        } catch {
          // Error is handled by the store
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} onClose={clearError} />}

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
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
        placeholder="Enter your password"
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
        <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
          Sign up
        </Link>
      </p>
    </form>
  );
};
