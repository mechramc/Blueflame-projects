// Projects Model
import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Project = model('Project', projectSchema);
