// task-service.ts
export class TaskService {
  public async reassignTasks(oldUserId: string, newUserId: string): Promise<void> {
    // Logic to reassign tasks from oldUserId to newUserId
  }

  public async deleteTasksByUserId(userId: string): Promise<void> {
    // Logic to delete tasks associated with userId
  }
}
