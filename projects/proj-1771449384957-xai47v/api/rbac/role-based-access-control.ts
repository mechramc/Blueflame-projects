// Role-based access control (RBAC) implementation

import { Request, Response, NextFunction } from 'express';

// Define roles
export enum Role {
  Admin = 'Admin',
  Editor = 'Editor',
  Viewer = 'Viewer'
}

// Middleware to check user roles
export const authorize = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role; // Assuming req.user is populated by authentication middleware

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    next();
  };
};

// Example usage in routes
// app.post('/tasks', authorize([Role.Admin, Role.Editor]), createTask);
// app.get('/tasks', authorize([Role.Admin, Role.Editor, Role.Viewer]), getTasks);
