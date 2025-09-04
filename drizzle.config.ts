// drizzle.config.ts
import * as dotenv from 'dotenv';
// Load .env.local first (contains your real secrets, gitignored)
dotenv.config({ path: '.env.local' });
// Then load .env (template) as fallback
dotenv.config();

import { defineConfig } from 'drizzle-kit';

const {
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_USER = 'postgres',
  DB_PASSWORD='[REDACTED]',
  DB_NAME = 'ai_job_prep',
  DATABASE_URL,
} = process.env;

const url =
  DATABASE_URL ?? `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export default defineConfig({
  schema: './src/drizzle/schema/**/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url,
  },
});
