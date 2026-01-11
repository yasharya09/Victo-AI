import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { env, getApiUrl } from '@/config/env';

// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: env.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: env.api.timeout,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(env.auth.tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request ID for tracking
    config.headers['X-Request-ID'] = generateRequestId();
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem(env.auth.refreshTokenKey);
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(getApiUrl('auth/login/refresh/'), {
          refresh: refreshToken,
        });
        
        const { access } = response.data;
        localStorage.setItem(env.auth.tokenKey, access);
        
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${access}`,
        };
        
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        localStorage.removeItem(env.auth.tokenKey);
        localStorage.removeItem(env.auth.refreshTokenKey);
        localStorage.removeItem(env.auth.tokenExpiryKey);
        
        // Redirect to login only if not already there
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
          window.location.href = '/auth/login';
        }
        
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    
    // Only show toast for non-401 errors to avoid spam
    if (error.response?.status !== 401) {
      toast.error(errorMessage);
    }
    
    return Promise.reject(error);
  }
);

// Generate unique request ID
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// API error handler with better typing
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    return message;
  }
  return error instanceof Error ? error.message : 'An unknown error occurred';
};

// API request wrapper with loading state and error handling
export const withLoading = async <T>(
  request: () => Promise<T>,
  setLoading: (loading: boolean) => void,
  setError?: (error: string | null) => void
): Promise<T> => {
  try {
    setLoading(true);
    if (setError) setError(null);
    return await request();
  } catch (error) {
    const errorMessage = handleApiError(error);
    if (setError) setError(errorMessage);
    throw error;
  } finally {
    setLoading(false);
  }
};

// Generic API methods
export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.get<T>(url, config);
  },
  
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.post<T>(url, data, config);
  },
  
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.put<T>(url, data, config);
  },
  
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.patch<T>(url, data, config);
  },
  
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.delete<T>(url, config);
  },
};

// Blog Posts API
export const getBlogPosts = async (params?: { 
  category?: string; 
  tag?: string; 
  page?: number; 
  pageSize?: number;
}): Promise<PaginatedResponse<any>> => {
  const response = await api.get('/blog/', { params });
  return response.data;
};

export const getBlogPost = async (slug: string): Promise<any> => {
  const response = await api.get(`/blog/${slug}/`);
  return response.data;
};

export const incrementBlogPostViews = async (slug: string): Promise<void> => {
  await api.post(`/blog/${slug}/increment-views/`);
};

// Categories and Tags API
export const getCategories = async (): Promise<any[]> => {
  const response = await api.get('/categories/');
  return response.data;
};

export const getTags = async (): Promise<any[]> => {
  const response = await api.get('/tags/');
  return response.data;
};

// Comments API
export const getComments = async (params: { 
  blog_post?: string | undefined; 
  case_study?: string | undefined;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResponse<any>> => {
  const response = await api.get('/comments/', { params });
  return response.data;
};

export const createComment = async (data: {
  content: string;
  blog_post?: number | undefined;
  case_study?: number | undefined;
  parent_comment?: number;
}): Promise<any> => {
  const response = await api.post('/comments/', data);
  return response.data;
};

// Case Studies API
export const getCaseStudies = async (params?: {
  industry?: string;
  page?: number;
  pageSize?: number;
}): Promise<PaginatedResponse<any>> => {
  const response = await api.get('/case-studies/', { params });
  return response.data;
};

export const getCaseStudy = async (slug: string): Promise<any> => {
  const response = await api.get(`/case-studies/${slug}/`);
  return response.data;
};

export const incrementCaseStudyViews = async (slug: string): Promise<void> => {
  await api.post(`/case-studies/${slug}/increment-views/`);
};

// Authentication API
export const login = async (credentials: { email: string; password: string }): Promise<{
  access: string;
  refresh: string;
  user: any;
}> => {
  const response = await api.post('/auth/login/', credentials);
  return response.data;
};

export const register = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<{
  access: string;
  refresh: string;
  user: any;
}> => {
  const response = await api.post('/auth/register/', userData);
  return response.data;
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout/');
  } finally {
    localStorage.removeItem(env.auth.tokenKey);
    localStorage.removeItem(env.auth.refreshTokenKey);
    localStorage.removeItem(env.auth.tokenExpiryKey);
  }
};

// Export the axios instance for custom requests
export { api };
export default api; 
