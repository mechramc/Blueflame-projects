// JWT-based authentication and authorization implementation

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const EXPIRATION_TIME = '1h'; // Token expiration time

// User roles
export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

// Generate JWT token
export function generateToken(userId: string, role: UserRole): string {
  const payload = { userId, role };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
}

// Middleware to authenticate JWT
export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.sendStatus(403); // Forbidden
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
}

// Middleware to authorize based on role
export function authorize(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  };
}

// Example usage in routes
// app.post('/login', loginHandler);
// app.get('/admin', authenticateJWT, authorize([UserRole.Admin]), adminHandler);
