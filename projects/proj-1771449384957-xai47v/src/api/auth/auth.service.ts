// Service for handling authentication logic
import { User } from '../models/user.model';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export class AuthService {
  public async register(userData: any): Promise<User> {
    const hashedPassword = await hash(userData.password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
    return user;
  }

  public async login(userData: any): Promise<string> {
    const user = await User.findOne({ email: userData.email });
    if (!user || !(await compare(userData.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return sign({ id: user._id }, 'your_jwt_secret');
  }

  public async deleteUser(userId: string): Promise<void> {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    await User.deleteOne({ _id: userId });
    // Additional logic for cascading deletion of associated tasks and projects
  }
}
