import bcrypt from 'bcryptjs';
import { PasswordService } from '../../application/services/PasswordService';

export class BcryptPasswordService implements PasswordService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}