import { useState, useCallback } from 'react';
import { handleApiError } from '@/services/api';

interface UseLoadingReturn {
  loading: boolean;
  error: string | null;
  withLoading: <T>(fn: () => Promise<T>) => Promise<T | undefined>;
  resetError: () => void;
}

export const useLoading = (): UseLoadingReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const withLoading = useCallback(async <T>(fn: () => Promise<T>): Promise<T | undefined> => {
    try {
      setLoading(true);
      setError(null);
      return await fn();
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return { loading, error, withLoading, resetError };
}; 