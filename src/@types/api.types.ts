/**
 * API Request/Response Type Definitions
 */

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errors?: Array<{ field: string; message: string }>;
  timestamp: string;
}

export interface SuccessResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data?: T;
  timestamp: string;
}

export type ApiResult<T> = SuccessResponse<T> | ApiErrorResponse;
