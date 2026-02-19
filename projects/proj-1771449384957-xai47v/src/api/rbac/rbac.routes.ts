import { Router } from 'express';
import { RbacController } from './rbac.controller';
import { rbac } from './rbac.middleware';
import { Role } from './role.enum';

const router = Router();

router.get('/role', rbac(Role.Viewer), RbacController.checkRole);

export default router;