export function validateSignup(username: string, email: string, password: string) {
  if (!username || !email || !password) {
    throw new Error('All fields are required');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
}