export interface BaseError {
  error?: {
    message?: string;
  };
}

export interface PayloadError {
  statusCode: number;
  message: string;
}
