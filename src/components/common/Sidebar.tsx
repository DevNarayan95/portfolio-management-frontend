/**
 * Sidebar Component
 * Collapsible sidebar navigation
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItem {
  label: string;
  path: string;
  icon: string;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Portfolios', path: '/portfolios', icon: '💼' },
  { label: 'Settings', path: '/settings', icon: '⚙️' },
];

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 pt-24
          ${isOpen ? 'w-64' : 'w-0 -translate-x-full'}
          lg:w-64 lg:translate-x-0 lg:pt-24
          z-30
        `}
      >
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
