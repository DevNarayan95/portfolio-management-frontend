/**
 * Data Formatting Utilities
 */

import { CURRENCY_CONFIG } from '@constants';

export const formatters = {
  // Format currency
  currency: (value: number): string => {
    return `${CURRENCY_CONFIG.SYMBOL} ${value.toLocaleString(CURRENCY_CONFIG.LOCALE, {
      minimumFractionDigits: CURRENCY_CONFIG.DECIMAL_PLACES,
      maximumFractionDigits: CURRENCY_CONFIG.DECIMAL_PLACES,
    })}`;
  },

  // Format percentage
  percentage: (value: number, decimal: number = 2): string => {
    return `${value.toFixed(decimal)}%`;
  },

  // Format date
  date: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(CURRENCY_CONFIG.LOCALE, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  // Format date for input
  dateInput: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  },

  // Format date and time
  dateTime: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(CURRENCY_CONFIG.LOCALE, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Format number with decimals
  number: (value: number, decimals: number = 2): string => {
    return value.toFixed(decimals);
  },

  // Format investment type
  investmentType: (type: string): string => {
    const typeMap: { [key: string]: string } = {
      STOCK: 'Stock',
      MUTUAL_FUND: 'Mutual Fund',
      BOND: 'Bond',
      CRYPTOCURRENCY: 'Cryptocurrency',
    };
    return typeMap[type] || type;
  },

  // Format transaction type
  transactionType: (type: string): string => {
    const typeMap: { [key: string]: string } = {
      BUY: 'Buy',
      SELL: 'Sell',
    };
    return typeMap[type] || type;
  },

  // Truncate text
  truncate: (text: string, length: number): string => {
    if (text.length <= length) return text;
    return `${text.substring(0, length)}...`;
  },

  // Get initials
  initials: (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  },
};
