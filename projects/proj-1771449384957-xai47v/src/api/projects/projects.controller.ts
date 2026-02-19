// Projects Controller
import { Request, Response } from 'express';
import { ProjectService } from './projects.service';

export class ProjectsController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  public async createProject(req: Request, res: Response): Promise<void> {
    const projectData = req.body;
    const project = await this.projectService.createProject(projectData);
    res.status(201).json(project);
  }

  public async getProjects(req: Request, res: Response): Promise<void> {
    const projects = await this.projectService.getProjects();
    res.status(200).json(projects);
  }

  public async updateProject(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const projectData = req.body;
    const updatedProject = await this.projectService.updateProject(id, projectData);
    res.status(200).json(updatedProject);
  }

  public async deleteProject(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.projectService.deleteProject(id);
    res.status(204).send();
  }
}
