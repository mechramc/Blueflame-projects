import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  deadline: Date;
  priority: number;
  dependencies: string[];
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  priority: { type: Number, required: true },
  dependencies: [{ type: String }],
});

export const Task = model<ITask>('Task', taskSchema);