/**
 * Toast Component
 * Individual toast notification
 */

import React, { useEffect } from 'react';
import { ToastType } from '@types';

interface ToastProps {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

const typeStyles = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: '✓',
    iconBg: 'bg-green-100 text-green-600',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: '✕',
    iconBg: 'bg-red-100 text-red-600',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    icon: '⚠',
    iconBg: 'bg-amber-100 text-amber-600',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'ℹ',
    iconBg: 'bg-blue-100 text-blue-600',
  },
};

export const Toast: React.FC<ToastProps> = ({ type, title, message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const styles = typeStyles[type];

  return (
    <div
      className={`${styles.bg} ${styles.border} border rounded-lg p-4 shadow-lg flex items-start gap-3 animate-in fade-in slide-in-from-right-5 duration-300`}
      role="alert"
    >
      <div
        className={`${styles.iconBg} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm`}
      >
        {styles.icon}
      </div>

      <div className="flex-1">
        {title && <h3 className={`${styles.text} font-semibold text-sm mb-1`}>{title}</h3>}
        <p className={`${styles.text} text-sm`}>{message}</p>
      </div>

      <button
        onClick={onClose}
        className={`${styles.text} hover:opacity-70 transition-opacity flex-shrink-0 font-bold text-lg leading-none`}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

/**
 * Toast Container Component
 * Renders all toasts
 */
interface ToastContainerProps {
  toasts: Array<{
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    duration?: number;
  }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            id={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            duration={toast.duration}
            onClose={() => onRemove(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};
