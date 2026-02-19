// Database schema definition for tasks, projects, users, and RBAC roles

import { Schema, model } from 'mongoose';

// User schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Admin', 'Editor', 'Viewer'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = model('User', userSchema);

// Task schema
const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  dependencies: [{ type: Schema.Types.ObjectId, ref: 'Task' }], // Successor/predecessor relationships
  createdAt: { type: Date, default: Date.now },
});

const Task = model('Task', taskSchema);

// Project schema
const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  createdAt: { type: Date, default: Date.now },
});

const Project = model('Project', projectSchema);

// RBAC Role schema
const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  permissions: { type: [String], required: true },
});

const Role = model('Role', roleSchema);

export { User, Task, Project, Role };