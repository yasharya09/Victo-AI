import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as authService from '@/services/auth';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const loadUser = useCallback(async () => {
    try {
      if (authService.isAuthenticated()) {
        const user = await authService.getProfile();
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Failed to load user profile',
      });
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (username: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await authService.login({ username, password });
      await loadUser();
      router.push('/dashboard');
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Invalid credentials',
      }));
    }
  };

  const register = async (userData: {
    username: string;
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
  }) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await authService.register(userData);
      await login(userData.username, userData.password);
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Registration failed',
      }));
    }
  };

  const logout = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await authService.logout();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      router.push('/');
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Logout failed',
      }));
    }
  };

  const updateProfile = async (userData: {
    first_name?: string;
    last_name?: string;
    email?: string;
  }) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedUser = await authService.updateProfile(userData);
      setState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to update profile',
      }));
    }
  };

  const changePassword = async (passwordData: {
    old_password: string;
    new_password: string;
    new_password2: string;
  }) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await authService.changePassword(passwordData);
      setState(prev => ({ ...prev, isLoading: false, error: null }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to change password',
      }));
    }
  };

  return {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
  };
} 