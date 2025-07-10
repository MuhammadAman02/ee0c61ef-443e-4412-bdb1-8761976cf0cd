import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const LoginZod = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const LoginResponseZod = z.object({
  message: z.string(),
  token: z.string(),
  user: z.object({
    email: z.string().email(),
  }),
});

// Fastify-compatible JSON schema
export const loginSchema = {
  tags: ["Auth"],
  body: zodToJsonSchema(LoginZod),
  response: {
    200: zodToJsonSchema(LoginResponseZod),
    401: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  },
};