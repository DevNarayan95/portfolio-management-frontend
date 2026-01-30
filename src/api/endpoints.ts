/**
 * API Endpoint Helper
 */

export const getErrorMessage = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const getStatusCode = (error: any): number => {
  return error.response?.status || 500;
};

export const handleApiError = (error: any) => {
  return {
    success: false,
    statusCode: getStatusCode(error),
    message: getErrorMessage(error),
    timestamp: new Date().toISOString(),
  };
};
