// user-service.ts
import { TaskService } from '../tasks/task-service';
import { ProjectService } from '../projects/project-service';

export class UserService {
  private taskService: TaskService;
  private projectService: ProjectService;

  constructor() {
    this.taskService = new TaskService();
    this.projectService = new ProjectService();
  }

  public async deleteUser(userId: string, reassignmentId?: string): Promise<void> {
    // If reassignmentId is provided, reassign tasks and projects
    if (reassignmentId) {
      await this.taskService.reassignTasks(userId, reassignmentId);
      await this.projectService.reassignProjects(userId, reassignmentId);
    } else {
      // Cascade delete associated tasks and projects
      await this.taskService.deleteTasksByUserId(userId);
      await this.projectService.deleteProjectsByUserId(userId);
    }
    // Finally, delete the user
    await this.deleteUserFromDatabase(userId);
  }

  private async deleteUserFromDatabase(userId: string): Promise<void> {
    // Logic to delete user from the database
  }
}
