// Task management API endpoints

import { Router } from 'express';
import { TaskController } from '../controllers/task-controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/rbac';

const router = Router();
const taskController = new TaskController();

// Create a new task
router.post('/', authenticate, authorize('Editor', 'Admin'), taskController.createTask);

// Get all tasks
router.get('/', authenticate, authorize('Viewer', 'Editor', 'Admin'), taskController.getAllTasks);

// Get a specific task by ID
router.get('/:id', authenticate, authorize('Viewer', 'Editor', 'Admin'), taskController.getTaskById);

// Update a task by ID
router.patch('/:id', authenticate, authorize('Editor', 'Admin'), taskController.updateTask);

// Delete a task by ID
router.delete('/:id', authenticate, authorize('Admin'), taskController.deleteTask);

export default router;
