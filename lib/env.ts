import { z } from "zod";

const envSchema = z.object({
  DB_DRIVER: z.enum(["sqlite", "postgres"]).default("sqlite"),
  SQLITE_PATH: z.string().default("./data/pulse.db"),
  DATABASE_URL: z.string().optional(),
  DIRECT_URL: z.string().optional(),
  APP_PASSWORD: z.string().default("pulse-demo-1234"),
  OPENROUTER_API_KEY: z.string().optional(),
  CRON_SECRET: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().optional(),
  APOLLO_API_KEY: z.string().optional(),
  HUNTER_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid env:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment config. See .env.example");
}

export const env = parsed.data;
export type Env = typeof env;
