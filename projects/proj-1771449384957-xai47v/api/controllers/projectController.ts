// Controller for managing projects

import { Request, Response } from 'express';
import { ProjectService } from '../services/projectService';

export class ProjectController {
  static async createProject(req: Request, res: Response) {
    try {
      const project = await ProjectService.createProject(req.body);
      return res.status(201).json(project);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getAllProjects(req: Request, res: Response) {
    try {
      const projects = await ProjectService.getAllProjects();
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getProjectById(req: Request, res: Response) {
    try {
      const project = await ProjectService.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.status(200).json(project);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateProject(req: Request, res: Response) {
    try {
      const updatedProject = await ProjectService.updateProject(req.params.id, req.body);
      if (!updatedProject) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.status(200).json(updatedProject);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async deleteProject(req: Request, res: Response) {
    try {
      const deleted = await ProjectService.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
