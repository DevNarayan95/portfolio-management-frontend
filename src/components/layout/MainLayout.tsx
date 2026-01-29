/**
 * Main Layout Component
 * Wraps the main application with header, sidebar, and footer
 */

import React from 'react';
import { Header, Sidebar, Footer } from '@components/common';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 lg:ml-64">
          <div className="max-w-7xl mx-auto w-full p-4 lg:p-6">{children}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
};
