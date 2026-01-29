// src/components/ui/Alert.tsx
import React from 'react';

/**
 * Alert Component
 * Reusable alert/notification component
 */

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
  showIcon?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  showIcon = true,
}) => {
  const typeStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const icons = {
    info: 'ℹ️',
    success: '✓',
    warning: '⚠️',
    error: '✕',
  };

  return (
    <div className={`border rounded-lg p-4 ${typeStyles[type]}`}>
      <div className="flex items-start gap-3">
        {showIcon && <span className="text-xl flex-shrink-0">{icons[type]}</span>}

        <div className="flex-1">
          {title && <h3 className="font-semibold mb-1">{title}</h3>}
          <p className="text-sm">{message}</p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-lg font-bold hover:opacity-70 transition-opacity flex-shrink-0"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
