// Middleware for consistent JSON-based error handling

import { Request, Response, NextFunction } from 'express';

// Custom error interface
interface CustomError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'An unexpected error occurred.';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export default errorHandler;
