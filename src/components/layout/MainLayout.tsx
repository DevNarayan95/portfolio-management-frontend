// src/components/layout/MainLayout.tsx
import React from 'react';
import { Header, Sidebar, Footer } from '@components/common';

/**
 * Main Layout Component
 * Wraps the main application with header, sidebar, and footer
 */

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1 relative">
        {/* <Sidebar /> */}

        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
