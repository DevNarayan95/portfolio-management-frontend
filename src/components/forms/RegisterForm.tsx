/**
 * Register Form Component
 * Compact & Efficient with Enhanced Inputs
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, useForm } from '@hooks';
import { Input, PasswordInput, Button, Alert } from '@components/ui';
import { validators } from '@utils';
import { ROUTES } from '@constants';
import { RegisterRequest } from '@types';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Handle navigation after successful registration
  useEffect(() => {
    if (shouldRedirect) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [shouldRedirect, navigate]);

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
          setShouldRedirect(true);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <Alert type="error" message={error} onClose={clearError} />}

      {/* Full Name Row */}
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
          variant="default"
          inputSize="md"
          required
          disabled={isSubmitting}
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
          variant="default"
          inputSize="md"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Email */}
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
        disabled={isSubmitting}
      />

      {/* Phone */}
      <Input
        label="Phone (Optional)"
        type="tel"
        name="phone"
        placeholder="+1 (555) 000-0000"
        value={values.phone || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="default"
        inputSize="md"
        fullWidth
        disabled={isSubmitting}
      />

      {/* Password Row */}
      <div className="grid grid-cols-2 gap-3">
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
          required
          disabled={isSubmitting}
        />
        <PasswordInput
          label="Confirm"
          name="confirmPassword"
          placeholder="••••••••"
          value={values.confirmPassword || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword ? errors.confirmPassword : ''}
          variant="default"
          inputSize="md"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Password requirement hint */}
      {touched.password && (
        <p className="text-xs text-gray-500 px-0.5">
          Min 8 chars: uppercase, lowercase, number & special character
        </p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
        disabled={isSubmitting}
        className="mt-4"
      >
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </Button>

      {/* Sign In Link */}
      <p className="text-center text-xs text-gray-600 mt-3">
        Already have an account?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};
