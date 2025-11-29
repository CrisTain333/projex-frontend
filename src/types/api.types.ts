// Success Response
export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// Error Response
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

// Paginated Response
export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// List Response (no pagination)
export interface ListResponse<T> {
  success: true;
  data: T[];
  count: number;
}

// Query params for pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Search params
export interface SearchParams extends PaginationParams {
  q?: string;
}
