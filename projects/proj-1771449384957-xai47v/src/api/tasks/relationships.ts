// Task Relationships Module

import { Task } from './task';

export interface TaskRelationship {
    taskId: string;
    predecessorIds: string[];
    successorIds: string[];
}

export class TaskRelationshipManager {
    private relationships: Map<string, TaskRelationship> = new Map();

    public addRelationship(taskId: string, predecessorIds: string[], successorIds: string[]): void {
        this.validateNoCyclicDependencies(taskId, predecessorIds, successorIds);
        this.relationships.set(taskId, { taskId, predecessorIds, successorIds });
    }

    public getRelationship(taskId: string): TaskRelationship | undefined {
        return this.relationships.get(taskId);
    }

    public updateRelationship(taskId: string, predecessorIds: string[], successorIds: string[]): void {
        this.validateNoCyclicDependencies(taskId, predecessorIds, successorIds);
        this.relationships.set(taskId, { taskId, predecessorIds, successorIds });
    }

    public deleteRelationship(taskId: string): void {
        this.relationships.delete(taskId);
    }

    private validateNoCyclicDependencies(taskId: string, predecessorIds: string[], successorIds: string[]): void {
        const allIds = new Set([taskId, ...predecessorIds, ...successorIds]);
        if (this.hasCyclicDependency(taskId, predecessorIds) || this.hasCyclicDependency(taskId, successorIds)) {
            throw new Error('Cyclic dependencies are not allowed.');
        }
    }

    private hasCyclicDependency(taskId: string, relatedIds: string[]): boolean {
        // Implement graph traversal or DAG validation logic here
        // This is a placeholder for actual cyclic check logic
        return false;
    }
}
