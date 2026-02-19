// User model for handling user data and authentication

import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    email: string;
    password: string;
    comparePassword(password: string): Promise<boolean>;
    generateAuthToken(): string;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function (): string {
    // Implementation for generating JWT token
};

export const User = mongoose.model<IUser>('User', userSchema);