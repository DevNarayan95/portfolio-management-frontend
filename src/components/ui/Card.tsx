// src/components/ui/Card.tsx
import React from 'react';

/**
 * Card Component
 * Reusable card component for content grouping
 */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false, onClick }) => {
  const hoverStyles = hover ? 'hover:shadow-lg cursor-pointer transition-shadow duration-200' : '';

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
