// Service for project management logic

import { Project } from '../models/project';

export class ProjectService {
  static async createProject(data: any) {
    const project = new Project(data);
    return await project.save();
  }

  static async getAllProjects() {
    return await Project.find().populate('tasks');
  }

  static async getProjectById(id: string) {
    return await Project.findById(id).populate('tasks');
  }

  static async updateProject(id: string, data: any) {
    return await Project.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteProject(id: string) {
    return await Project.findByIdAndDelete(id);
  }
}
