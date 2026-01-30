/**
 * Password Change Form Component
 */

import React from 'react';
import { Input, Button, Alert } from '@components/ui';
import { useForm, useUser } from '@hooks';
import { validators } from '@utils';
import { ChangePasswordRequest } from '@types';

interface PasswordChangeFormProps {
  onSuccess?: () => void;
}

export const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({ onSuccess }) => {
  const { changePassword, isLoading, error, clearError } = useUser();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useForm<ChangePasswordRequest>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: (values) => {
      const newErrors: { [key: string]: string } = {};

      if (!values.currentPassword) {
        newErrors.currentPassword = 'Current password is required';
      }

      const passwordError = validators.password(values.newPassword);
      if (passwordError) newErrors.newPassword = passwordError;

      if (values.newPassword && values.confirmPassword) {
        if (values.newPassword !== values.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      }

      if (values.currentPassword && values.newPassword) {
        if (values.currentPassword === values.newPassword) {
          newErrors.newPassword = 'New password must be different from current password';
        }
      }

      return newErrors;
    },
    onSubmit: async (values) => {
      const success = await changePassword(values);
      if (success) {
        resetForm();
        onSuccess?.();
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} onClose={clearError} />}

      <Input
        label="Current Password"
        type="password"
        name="currentPassword"
        placeholder="••••••••"
        value={values.currentPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.currentPassword ? errors.currentPassword : ''}
        fullWidth
        required
      />

      <Input
        label="New Password"
        type="password"
        name="newPassword"
        placeholder="••••••••"
        value={values.newPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.newPassword ? errors.newPassword : ''}
        helperText="At least 8 characters with uppercase, lowercase, number, and special character"
        fullWidth
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="••••••••"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.confirmPassword ? errors.confirmPassword : ''}
        fullWidth
        required
      />

      <Button type="submit" fullWidth isLoading={isSubmitting || isLoading}>
        Change Password
      </Button>
    </form>
  );
};
