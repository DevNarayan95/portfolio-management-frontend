/**
 * Footer Component
 */

import React from 'react';
import { Heart, Shield, HelpCircle, Settings } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      label: 'Documentation',
      href: 'https://devnarayan95.github.io/portfolio-management-docs/',
      icon: HelpCircle,
    },
    { label: 'Security', href: '#', icon: Shield },
    { label: 'Settings', href: '#', icon: Settings },
    { label: 'Support', href: 'mailto:support@example.com', icon: Heart },
  ];

  const socialLinks = [
    { label: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' },
    { label: 'GitHub', href: 'https://github.com', icon: '⚙' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Copyright & Status */}
          <div className="flex items-center gap-6 min-w-0">
            <p className="text-xs text-gray-500 whitespace-nowrap">
              © {currentYear} Portfolio Management System
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>System Status: Operational</span>
            </div>
          </div>

          {/* Center: Footer Links */}
          <div className="flex items-center gap-8">
            {footerLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors group"
                  title={link.label}
                >
                  <Icon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="hidden sm:inline">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right: Social Links & Version */}
          <div className="flex items-center gap-4">
            <div className="flex gap-3 text-xs">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors font-semibold"
                  title={link.label}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <span className="text-xs text-gray-600 px-2 border-l border-gray-700">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
