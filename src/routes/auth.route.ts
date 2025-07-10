import { FastifyInstance } from 'fastify';
import { loginHandler } from '../controllers/auth.controller';
import { loginSchema } from '../schemas/auth.schema';

export async function authRoutes(app: FastifyInstance) {
  app.post('/api/auth/login', {
    schema: loginSchema,
    handler: loginHandler,
  });
}