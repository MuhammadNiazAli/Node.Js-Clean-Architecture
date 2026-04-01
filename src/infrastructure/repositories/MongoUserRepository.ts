import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserModel } from '../database/models/UserModel';

export class MongoUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });

    if (!user) return null;

    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id);

    if (!user) return null;

    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }

  async create(user: User): Promise<User> {
    const createdUser = await UserModel.create(user);

    return {
      id: createdUser._id.toString(),
      username: createdUser.username,
      email: createdUser.email,
      password: createdUser.password,
    };
  }
}