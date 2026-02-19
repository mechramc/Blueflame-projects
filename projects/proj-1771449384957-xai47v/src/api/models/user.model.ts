// User model definition
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Additional user fields can be added here
});

export const User = model('User', userSchema);
