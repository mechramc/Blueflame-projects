// delete-user.ts

import { Request, Response } from 'express';
import { UserModel } from '../../models/user';
import { TaskModel } from '../../models/task';
import { ProjectModel } from '../../models/project';
import { Result } from '../../utils/result';

/**
 * Deletes a user and reassigns or cleans up associated tasks and projects.
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;

    try {
        // Find tasks associated with the user
        const tasks = await TaskModel.find({ assignedTo: userId });
        const projects = await ProjectModel.find({ owner: userId });

        // Reassign tasks to a default user or handle cleanup
        if (tasks.length > 0) {
            await TaskModel.updateMany({ assignedTo: userId }, { assignedTo: 'defaultUserId' }); // Replace with actual default user ID
        }

        // Handle project reassignment or cleanup
        if (projects.length > 0) {
            await ProjectModel.updateMany({ owner: userId }, { owner: 'defaultUserId' }); // Replace with actual default user ID
        }

        // Delete the user
        await UserModel.findByIdAndDelete(userId);

        res.status(204).send();
    } catch (error) {
        res.status(500).json(Result.error('Failed to delete user', error));
    }
};
