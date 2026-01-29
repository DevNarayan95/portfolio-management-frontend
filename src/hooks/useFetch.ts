// src/hooks/useFetch.ts
import { useState, useCallback } from 'react';

/**
 * Custom Hook for Data Fetching
 * Provides a reusable hook for API calls with loading and error states
 */

interface UseFetchOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useFetch = <T = any>(options: UseFetchOptions = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (apiCall: () => Promise<any>) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await apiCall();

        if (result.success) {
          setData(result.data);
          options.onSuccess?.(result.data);
        } else {
          const errorMessage = result.message || 'An error occurred';
          setError(errorMessage);
          options.onError?.(errorMessage);
        }
      } catch (err: any) {
        const errorMessage = err.message || 'An error occurred';
        setError(errorMessage);
        options.onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
  };
};
