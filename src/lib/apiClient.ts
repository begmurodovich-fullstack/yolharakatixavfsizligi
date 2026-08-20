/**
 * ============================================================================
 * HTTP API Client Wrapper
 * ============================================================================
 * Standard fetch abstraction with automatic Authorization header injection,
 * unified JSON parsing, and error normalization for backend integration.
 * ============================================================================
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...restOptions } = options;

  let url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Retrieve stored token in browser environment
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    try {
      const storedAuth = localStorage.getItem('srsp_auth_user');
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        token = parsed.token || null;
      }
    } catch {
      // Ignore parsing errors
    }
  }

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...restOptions,
  });

  if (!response.ok) {
    let errorData: any = null;
    let errorMessage = `HTTP xatosi: ${response.status} ${response.statusText}`;

    try {
      errorData = await response.json();
      if (errorData?.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Body is not JSON
    }

    throw new ApiError(errorMessage, response.status, errorData);
  }

  // If response has no content (204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
