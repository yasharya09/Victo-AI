import axios from 'axios';
import { env } from '@/config/env';

const authApi = axios.create({
  baseURL: env.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(env.auth.tokenKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem(env.auth.refreshTokenKey);
        const response = await authApi.post('/auth/login/refresh/', {
          refresh: refreshToken,
        });
        const { access } = response.data;
        localStorage.setItem(env.auth.tokenKey, access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return authApi(originalRequest);
      } catch (error) {
        // If refresh fails, logout user
        localStorage.removeItem(env.auth.tokenKey);
        localStorage.removeItem(env.auth.refreshTokenKey);
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}) => {
  const response = await authApi.post('/auth/register/', userData);
  return response.data;
};

export const login = async (credentials: { username: string; password: string }) => {
  const response = await authApi.post('/auth/login/', credentials);
  const { access, refresh } = response.data;
  localStorage.setItem(env.auth.tokenKey, access);
  localStorage.setItem(env.auth.refreshTokenKey, refresh);
  return response.data;
};

export const logout = async () => {
  const refreshToken = localStorage.getItem(env.auth.refreshTokenKey);
  if (refreshToken) {
    try {
      await authApi.post('/auth/logout/', { refresh_token: refreshToken });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  localStorage.removeItem(env.auth.tokenKey);
  localStorage.removeItem(env.auth.refreshTokenKey);
};

export const getProfile = async () => {
  const response = await authApi.get('/auth/profile/');
  return response.data;
};

export const updateProfile = async (userData: {
  first_name?: string;
  last_name?: string;
  email?: string;
}) => {
  const response = await authApi.patch('/auth/profile/', userData);
  return response.data;
};

export const changePassword = async (passwordData: {
  old_password: string;
  new_password: string;
  new_password2: string;
}) => {
  const response = await authApi.post('/auth/change-password/', passwordData);
  return response.data;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(env.auth.tokenKey);
};

export const getToken = () => {
  return localStorage.getItem(env.auth.tokenKey);
};
