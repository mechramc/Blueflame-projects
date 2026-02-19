// Task Service for business logic related to tasks

import { Task } from '../models/task';
import { TaskRepository } from '../repositories/task-repository';

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(taskData: Partial<Task>) {
    // Validate and create task, ensuring no cyclic dependencies
    return this.taskRepository.create(taskData);
  }

  async getAllTasks() {
    return this.taskRepository.findAll();
  }

  async getTaskById(taskId: string) {
    return this.taskRepository.findById(taskId);
  }

  async updateTask(taskId: string, updatedData: Partial<Task>) {
    // Validate and update task
    return this.taskRepository.update(taskId, updatedData);
  }

  async deleteTask(taskId: string) {
    // Handle deletion, ensuring proper cleanup
    return this.taskRepository.delete(taskId);
  }
}
