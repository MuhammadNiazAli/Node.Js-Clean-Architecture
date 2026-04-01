export interface TokenService {
  generate(userId: string): string;
  verify(token: string): { userId: string };
}