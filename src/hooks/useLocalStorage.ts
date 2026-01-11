import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing localStorage with type safety and error handling
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
        // Save state
        setStoredValue(valueToStore);
        
        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes to this localStorage key in other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook for managing authentication tokens
 */
export function useAuthTokens() {
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage<string | null>(
    'access_token',
    null
  );
  
  const [refreshToken, setRefreshToken, removeRefreshToken] = useLocalStorage<string | null>(
    'refresh_token',
    null
  );

  const [tokenExpiry, setTokenExpiry, removeTokenExpiry] = useLocalStorage<number | null>(
    'token_expiry',
    null
  );

  const isTokenExpired = useCallback(() => {
    if (!tokenExpiry) return true;
    return Date.now() >= tokenExpiry;
  }, [tokenExpiry]);

  const setTokens = useCallback(
    (tokens: { access: string; refresh: string; expiresIn?: number }) => {
      setAccessToken(tokens.access);
      setRefreshToken(tokens.refresh);
      
      if (tokens.expiresIn) {
        const expiry = Date.now() + tokens.expiresIn * 1000;
        setTokenExpiry(expiry);
      }
    },
    [setAccessToken, setRefreshToken, setTokenExpiry]
  );

  const clearTokens = useCallback(() => {
    removeAccessToken();
    removeRefreshToken();
    removeTokenExpiry();
  }, [removeAccessToken, removeRefreshToken, removeTokenExpiry]);

  return {
    accessToken,
    refreshToken,
    tokenExpiry,
    isTokenExpired,
    setTokens,
    clearTokens,
    isAuthenticated: !!accessToken && !isTokenExpired(),
  };
}
