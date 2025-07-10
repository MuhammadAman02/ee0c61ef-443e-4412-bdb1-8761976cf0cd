import { FastifyRequest, FastifyReply } from 'fastify';
import { authenticateUser } from '../services/auth.service';
import { AppError } from '../utils/AppError';

export async function loginHandler(
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  res: FastifyReply
) {
  try {
    const result = await authenticateUser(req.body);
    res.status(200).send(result);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal server error' });
  }
}