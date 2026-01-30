/**
 * General Helper Functions
 */

export const helpers = {
  // Calculate profit/loss
  calculateProfit: (currentPrice: number, purchasePrice: number, quantity: number) => {
    const profit = (currentPrice - purchasePrice) * quantity;
    const profitPercentage = ((currentPrice - purchasePrice) / purchasePrice) * 100;
    return { profit, profitPercentage };
  },

  // Get profit color
  getProfitColor: (value: number): string => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  },

  // Get profit background color
  getProfitBgColor: (value: number): string => {
    if (value > 0) return 'bg-green-50';
    if (value < 0) return 'bg-red-50';
    return 'bg-gray-50';
  },

  // Debounce function
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Storage helpers
  storage: {
    get: (key: string) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch {
        return localStorage.getItem(key);
      }
    },
    set: (key: string, value: any) => {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    },
    remove: (key: string) => {
      localStorage.removeItem(key);
    },
    clear: () => {
      localStorage.clear();
    },
  },

  // Generate UUID
  generateId: (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Sleep function
  sleep: (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  // Check if value is empty
  isEmpty: (value: any): boolean => {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    );
  },
};
