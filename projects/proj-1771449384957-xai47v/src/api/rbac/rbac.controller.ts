import { Request, Response } from 'express';
import { Role } from './role.enum';

export class RbacController {
  public static checkRole(req: Request, res: Response) {
    const userRole: Role = req.user.role; // Assuming user role is set in req.user
    return res.json({ role: userRole });
  }
}