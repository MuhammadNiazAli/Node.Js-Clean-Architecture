export function validateLogin(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
}