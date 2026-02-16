/**
 * API client with authentication support
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: HeadersInit;
  requiresAuth?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = async <T = unknown>(
  endpoint: string,
  options: RequestOptions = { method: 'GET', requiresAuth: false }
): Promise<ApiResponse<T>> => {
  const { method, body, headers, requiresAuth = false } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // Add auth token if required
  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || 'An error occurred',
        response.status,
        data.details
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error', 500);
  }
};

// Auth helpers
export const authApi = {
  register: (userData: { name: string; email: string; password: string }) =>
    api('/auth/register', { method: 'POST', body: userData }),

  login: (credentials: { email: string; password: string }) =>
    api<{ user: unknown; accessToken: string; refreshToken: string }>('/auth/login', {
      method: 'POST',
      body: credentials,
    }),

  verifyEmail: (token: string) =>
    api(`/auth/verify-email/${token}`, { method: 'GET' }),
};

// Category helpers
export const categoryApi = {
  getAll: (params?: { page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return api<unknown[]>(`/categories${query ? `?${query}` : ''}`);
  },

  getById: (id: number) =>
    api<unknown>(`/categories/${id}`),
};

// Book helpers
export const bookApi = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    categoryId?: number;
    search?: string;
  }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return api<unknown[]>(`/books${query ? `?${query}` : ''}`);
  },

  getById: (id: number) =>
    api<unknown>(`/books/${id}`),

  getMyBooks: (params?: { page?: number; limit?: number }) => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return api<unknown[]>(`/books/my/books${query ? `?${query}` : ''}`, { requiresAuth: true });
  },

  create: (data: unknown) =>
    api('/books', { method: 'POST', body: data, requiresAuth: true }),

  update: (id: number, data: unknown) =>
    api(`/books/${id}`, { method: 'PUT', body: data, requiresAuth: true }),

  delete: (id: number) =>
    api(`/books/${id}`, { method: 'DELETE', requiresAuth: true }),
};
