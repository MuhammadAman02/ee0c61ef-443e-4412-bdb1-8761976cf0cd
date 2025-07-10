import { FastifyInstance } from 'fastify';
import { getTimeHandler } from '../controllers/time.controller';
import { getTimeSchema } from '../schemas/time.schema';

export async function timeRoutes(app: FastifyInstance) {
  app.get('/api/time', {
    schema: getTimeSchema,
    handler: getTimeHandler,
  });
}