// Task Repository for data access layer

import { Task } from '../models/task';

export class TaskRepository {
  private tasks: Task[] = [];

  async create(taskData: Partial<Task>): Promise<Task> {
    const newTask: Task = { id: generateId(), ...taskData };
    this.tasks.push(newTask);
    return newTask;
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findById(taskId: string): Promise<Task | undefined> {
    return this.tasks.find(task => task.id === taskId);
  }

  async update(taskId: string, updatedData: Partial<Task>): Promise<Task | undefined> {
    const task = await this.findById(taskId);
    if (task) {
      Object.assign(task, updatedData);
      return task;
    }
    return undefined;
  }

  async delete(taskId: string): Promise<void> {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
