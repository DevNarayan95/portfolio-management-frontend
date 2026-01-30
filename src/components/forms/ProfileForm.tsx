/**
 * Profile Update Form Component
 */

import React from 'react';
import { Input, Button, Alert } from '@components/ui';
import { useForm, useUser } from '@hooks';
import { UpdateProfileRequest, User } from '@types';

interface ProfileFormProps {
  user: User;
  onSuccess?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSuccess }) => {
  const { updateProfile, isLoading, error, clearError } = useUser();

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } =
    useForm<UpdateProfileRequest>({
      initialValues: {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
      },
      validate: (values) => {
        const newErrors: { [key: string]: string } = {};

        if (!values.firstName) newErrors.firstName = 'First name is required';
        if (!values.lastName) newErrors.lastName = 'Last name is required';

        return newErrors;
      },
      onSubmit: async (values) => {
        const success = await updateProfile(values);
        if (success) {
          onSuccess?.();
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} onClose={clearError} />}

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
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
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName ? errors.lastName : ''}
          required
        />
      </div>

      <Input label="Email" type="email" value={user.email} disabled fullWidth />

      <Input
        label="Phone"
        type="tel"
        name="phone"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        fullWidth
      />

      <Button type="submit" fullWidth isLoading={isSubmitting || isLoading}>
        Update Profile
      </Button>
    </form>
  );
};
