// Rate Limiter Middleware
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// General rate limit: 60 requests per minute
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
  message: 'Too many requests, please try again later.',
});

// Payment action rate limit: 10 requests per minute
const paymentLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: 'Too many payment requests, please try again later.',
});

export { generalLimiter, paymentLimiter };