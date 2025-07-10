import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../utils/AppError';

// Static credentials
const STATIC_USERS = [
  { email: 'admin@joylo.com', password: 'admin123' },
  { email: 'user@joylo.com', password: 'user123' },
];

export async function authenticateUser({ email, password }: { email: string; password: string }) {
  // Find user with matching credentials
  const user = STATIC_USERS.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  // Generate JWT token
  const token = jwt.sign(
    { email: user.email },
    env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    message: 'Login successful! Welcome to Joylo.',
    token,
    user: {
      email: user.email,
    },
  };
}