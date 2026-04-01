import { SignUpDTO } from '../dto/SignUpDTO';
import { PasswordService } from '../services/PasswordService';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserAlreadyExistsError } from '../../domain/errors/UserAlreadyExistsError';

export class SignUpUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService
  ) {}

  async execute(data: SignUpDTO) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    const user = await this.userRepository.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}