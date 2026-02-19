// Task Controller for handling task-related operations

import { Request, Response } from 'express';
import { TaskService } from '../services/task-service';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async createTask(req: Request, res: Response) {
    try {
      const taskData = req.body;
      const task = await this.taskService.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      const task = await this.taskService.getTaskById(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      const updatedData = req.body;
      const updatedTask = await this.taskService.updateTask(taskId, updatedData);
      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      await this.taskService.deleteTask(taskId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
