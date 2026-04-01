import { UserRepository } from '../../domain/repositories/UserRepository';

export class GetProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}