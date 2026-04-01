import { LoginDTO } from '../dto/LoginDTO';
import { PasswordService } from '../services/PasswordService';
import { TokenService } from '../services/TokenService';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { InvalidCredentialsError } from '../../domain/errors/InvalidCredentialsError';

export class LoginUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService
  ) {}

  async execute(data: LoginDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = await this.passwordService.compare(
      data.password,
      user.password
    );

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const token = this.tokenService.generate(user.id!);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}