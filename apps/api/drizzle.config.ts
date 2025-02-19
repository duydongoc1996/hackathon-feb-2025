import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const DB_USERNAME = process.env.DB_USERNAME!;
const DB_PASSWORD = process.env.DB_PASSWORD!;
const DB_HOST = process.env.DB_HOST!;
const DB_PORT = process.env.DB_PORT!;
const DB_DATABASE = process.env.DB_DATABASE!;

export default defineConfig({
  out: './src/database/migrations',
  schema: './src/database/schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  },
});
