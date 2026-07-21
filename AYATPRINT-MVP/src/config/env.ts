import { z } from 'zod';
import dotenv from 'dotenv';

// Load .env variables (mostly needed for backend or local script testing)
dotenv.config();

const envSchema = z.object({
  // Core
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
  API_URL: z.string().url().default('http://localhost:3000/api'),
  
  // AI (Gemini)
  GEMINI_API_KEY: z.string().optional(),
  
  // Database & Cache
  DATABASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
  
  // Storage
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().optional(),
  S3_BUCKET_NAME: z.string().optional(),
  
  // Payments
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  
  // POD
  GELATO_API_KEY: z.string().optional(),
  SENSARIA_API_KEY: z.string().optional(),
  
  // Communications
  RESEND_API_KEY: z.string().optional(),
  SUPPORT_EMAIL: z.string().email().default('support@ayatprint.com'),
  
  // Observability
  SENTRY_DSN: z.string().url().optional(),
  POSTHOG_API_KEY: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
