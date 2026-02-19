// Projects Routes
import { Router } from 'express';
import { ProjectsController } from './projects.controller';

const router = Router();
const projectsController = new ProjectsController();

router.post('/', projectsController.createProject.bind(projectsController));
router.get('/', projectsController.getProjects.bind(projectsController));
router.put('/:id', projectsController.updateProject.bind(projectsController));
router.delete('/:id', projectsController.deleteProject.bind(projectsController));

export default router;
