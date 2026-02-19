// Task model definition

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: number;
  predecessorId?: string;
  successorIds?: string[];
}
