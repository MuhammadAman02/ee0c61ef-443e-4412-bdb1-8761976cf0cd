import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const GetTimeQueryZod = z.object({
  timezone: z.string().optional(),
});

const TimeResponseZod = z.object({
  current_time: z.string(),
  timezone: z.string(),
  utc_time: z.string(),
  utc_offset: z.string(),
  day_of_week: z.number(),
  day_of_year: z.number(),
  week_number: z.number(),
});

// Fastify-compatible JSON schema
export const getTimeSchema = {
  tags: ["Time"],
  querystring: zodToJsonSchema(GetTimeQueryZod),
  response: {
    200: zodToJsonSchema(TimeResponseZod),
    400: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    },
    500: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  },
};