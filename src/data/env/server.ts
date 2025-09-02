import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  // Server-only vars (never exposed to the client)
  server: {
    // ✅ Required right now
    ARCJET_KEY: z.string().min(1, 'ARCJET_KEY is required'),
    CLERK_SECRET_KEY: z.string().min(1, 'CLERK_SECRET_KEY is required'),

    // 🟨 Optional for now (make required later when you actually use them)
    DB_HOST: z.string().optional(),
    DB_PORT: z.coerce.number().int().positive().default(5432), // default 5432
    DB_USER: z.string().optional(),
    DB_PASSWORD: z.string().optional(),
    DB_NAME: z.string().optional(),

    HUME_API_KEY: z.string().optional(),
    HUME_SECRET_KEY: z.string().optional(),

    GEMINI_API_KEY: z.string().optional(),
  },

  // Client-exposed vars (must start with NEXT_PUBLIC_)
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z
      .string()
      .min(1, 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is required'),
  },

  // Wire actual process.env
  runtimeEnv: {
    ARCJET_KEY: process.env.ARCJET_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,

    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,

    HUME_API_KEY: process.env.HUME_API_KEY,
    HUME_SECRET_KEY: process.env.HUME_SECRET_KEY,

    GEMINI_API_KEY: process.env.GEMINI_API_KEY,

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },

  emptyStringAsUndefined: true,
});
