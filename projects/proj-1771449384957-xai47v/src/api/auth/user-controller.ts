// user-controller.ts
import { Request, Response } from 'express';
import { UserService } from './user-service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const { reassignmentId } = req.body; // Optional reassignment ID

    try {
      // Check if user is admin
      if (!req.user || req.user.role !== 'Admin') {
        res.status(403).send('Forbidden');
        return;
      }

      // Perform deletion with cascading cleanup or reassignment
      await this.userService.deleteUser(userId, reassignmentId);
      res.status(204).send();
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }
}
