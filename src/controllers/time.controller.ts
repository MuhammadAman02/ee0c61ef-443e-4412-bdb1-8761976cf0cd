import { FastifyRequest, FastifyReply } from 'fastify';
import { getCurrentTime } from '../services/time.service';
import { AppError } from '../utils/AppError';

export async function getTimeHandler(
  req: FastifyRequest<{ Querystring: { timezone?: string } }>,
  res: FastifyReply
) {
  try {
    const timeData = await getCurrentTime(req.query.timezone);
    res.status(200).send(timeData);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal server error' });
  }
}