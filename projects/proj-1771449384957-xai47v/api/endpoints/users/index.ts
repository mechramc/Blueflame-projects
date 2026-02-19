// index.ts

import { Router } from 'express';
import { deleteUser } from './delete-user';

const router = Router();

// User deletion endpoint
router.delete('/:id', deleteUser);

export default router;
