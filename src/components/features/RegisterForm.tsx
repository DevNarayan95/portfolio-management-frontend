/**
 * Register Form Component
 * Handles user registration with validation
 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { useForm } from '@hooks/useForm';
import { Input, Button, Alert } from '@components/ui';
import { validateEmail, validatePassword, validateRequired } from '@utils/validation';
import { RegisterPayload } from '@types/index';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useForm<RegisterPayload>({
      initialValues: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
      },
      validate: (values) => {
        const newErrors: Record<string, string> = {};

        const emailError = validateEmail(values.email);
        if (emailError) newErrors.email = emailError;

        const passwordError = validatePassword(values.password);
        if (passwordError) newErrors.password = passwordError;

        const firstNameError = validateRequired(values.firstName, 'First Name');
        if (firstNameError) newErrors.firstName = firstNameError;

        const lastNameError = validateRequired(values.lastName, 'Last Name');
        if (lastNameError) newErrors.lastName = lastNameError;

        return newErrors;
      },
      onSubmit: async (values) => {
        try {
          await register(values);
          // After successful registration, redirect to login
          navigate('/login');
        } catch {
          // Error is handled by the store
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} onClose={clearError} />}

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName ? errors.firstName : ''}
          required
        />

        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName ? errors.lastName : ''}
          required
        />
      </div>

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
        label="Phone"
        type="tel"
        name="phone"
        placeholder="Enter your phone"
        value={values.phone || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
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
        helperText="At least 8 characters with uppercase, lowercase, and number"
        fullWidth
        required
      />

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
};
