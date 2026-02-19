import { Request, Response, NextFunction } from 'express';
import { Role } from './role.enum';

const rolePermissions = {
  [Role.Admin]: ['create', 'read', 'update', 'delete'],
  [Role.Editor]: ['create', 'read', 'update'],
  [Role.Viewer]: ['read']
};

export function rbac(role: Role) {
  return (req: Request, res: Response, next: NextFunction) => {
    const action = req.method.toLowerCase();
    if (rolePermissions[role].includes(action)) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden' });
  };
}