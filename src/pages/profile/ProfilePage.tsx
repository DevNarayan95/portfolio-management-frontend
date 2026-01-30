/**
 * Profile Page
 * User profile and settings management
 */

import React, { useEffect } from 'react';
import { MainLayout } from '@components/layout';
import { ProfileForm, PasswordChangeForm } from '@components/forms';
import { Tabs, Spinner, Alert } from '@components/ui';
import { useAuth } from '@hooks';

export const ProfilePage: React.FC = () => {
  const { user, isLoading, refreshUser } = useAuth();

  useEffect(() => {
    refreshUser();
  }, []);

  if (isLoading) {
    return (
      <MainLayout>
        <Spinner size="lg" color="primary" />
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <Alert type="error" message="User not found. Please log in again." />
      </MainLayout>
    );
  }

  const tabsData = [
    {
      id: 'profile',
      label: 'Profile Information',
      content: (
        <div className="max-w-2xl">
          <ProfileForm user={user} onSuccess={refreshUser} />
        </div>
      ),
    },
    {
      id: 'security',
      label: 'Security',
      content: (
        <div className="max-w-2xl">
          <PasswordChangeForm onSuccess={() => {}} />
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account information and security</p>
      </div>

      <Tabs tabs={tabsData} />
    </MainLayout>
  );
};
