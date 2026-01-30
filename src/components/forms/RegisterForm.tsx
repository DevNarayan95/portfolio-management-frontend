/**
 * Register Form Component
 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, useForm } from '@hooks';
import { Input, Button, Alert } from '@components/ui';
import { validators } from '@utils';
import { ROUTES } from '@constants';
import { RegisterRequest } from '@types';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useForm<RegisterRequest>({
      initialValues: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
      },
      validate: (values) => {
        const newErrors: { [key: string]: string } = {};

        const emailError = validators.email(values.email);
        if (emailError) newErrors.email = emailError;

        const passwordError = validators.password(values.password);
        if (passwordError) newErrors.password = passwordError;

        const firstNameError = validators.required(values.firstName, 'First name');
        if (firstNameError) newErrors.firstName = firstNameError;

        const lastNameError = validators.required(values.lastName, 'Last name');
        if (lastNameError) newErrors.lastName = lastNameError;

        if (values.password && values.confirmPassword) {
          if (values.password !== values.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
          }
        }

        return newErrors;
      },
      onSubmit: async (values) => {
        const success = await register({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
        });
        if (success) {
          navigate(ROUTES.LOGIN);
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
          placeholder="John"
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
          placeholder="Doe"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName ? errors.lastName : ''}
          required
        />
      </div>

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
        label="Phone (Optional)"
        type="tel"
        name="phone"
        placeholder="+1 (555) 000-0000"
        value={values.phone || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
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
        helperText="At least 8 characters with uppercase, lowercase, number, and special character"
        fullWidth
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="••••••••"
        value={values.confirmPassword || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.confirmPassword ? errors.confirmPassword : ''}
        fullWidth
        required
      />

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-blue-600 hover:text-blue-700 font-medium">
          Sign in here
        </Link>
      </p>
    </form>
  );
};
