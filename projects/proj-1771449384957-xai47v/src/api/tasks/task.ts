// Task Model

export interface Task {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    priority: number;
    dependencies: string[]; // List of task IDs that this task depends on
}
