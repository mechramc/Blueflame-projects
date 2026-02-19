// Project management CRUD operations

import { Router } from 'express';
import { ProjectController } from '../controllers/projectController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Middleware for authentication and authorization
router.use(authenticate);

// Create a new project
router.post('/', authorize('Admin', 'Editor'), ProjectController.createProject);

// Get all projects
router.get('/', ProjectController.getAllProjects);

// Get a specific project by ID
router.get('/:id', ProjectController.getProjectById);

// Update a project by ID
router.patch('/:id', authorize('Admin', 'Editor'), ProjectController.updateProject);

// Delete a project by ID
router.delete('/:id', authorize('Admin'), ProjectController.deleteProject);

export default router;
