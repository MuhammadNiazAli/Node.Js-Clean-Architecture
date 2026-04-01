import jwt from 'jsonwebtoken';
import { TokenService } from '../../application/services/TokenService';

export class JwtTokenService implements TokenService {
  generate(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );
  }

  verify(token: string): { userId: string } {
    return jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId: string };
  }
}