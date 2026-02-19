// Projects Service
import { Project } from './projects.model';
import { Task } from '../tasks/tasks.model';

export class ProjectService {
  public async createProject(data: any): Promise<Project> {
    // Logic to create a project and associate tasks
    const project = new Project(data);
    await project.save();
    return project;
  }

  public async getProjects(): Promise<Project[]> {
    // Logic to retrieve all projects
    return Project.find();
  }

  public async updateProject(id: string, data: any): Promise<Project> {
    // Logic to update a project
    const project = await Project.findByIdAndUpdate(id, data, { new: true });
    return project;
  }

  public async deleteProject(id: string): Promise<void> {
    // Logic to delete a project and handle associated tasks
    await Task.deleteMany({ projectId: id }); // Ensure no orphaned tasks
    await Project.findByIdAndDelete(id);
  }
}
